const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user_model");
const Feed = require("./models/feed_model");
const Post = require("./models/post_model");
const Comment = require(`./models/comment_model`);
const Message = require(`./models/chat_message_model`);
const Room = require(`./models/chatroom_model`);
const sanitizeHtml = require("sanitize-html");
const { Upload } = require("@aws-sdk/lib-storage");
const {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
  PutObjectCommand,
  CreateMultipartUploadCommand,
} = require("@aws-sdk/client-s3");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const { v4: uuidv4 } = require("uuid");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();
const MESSAGE_SENT = "messageSent";

const client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
});

const resolvers = {
  Upload: GraphQLUpload,
  Search: {
    __resolveType(obj, contextValue, info) {
      if (obj.headline) {
        return "Post";
      }
      if (obj.feedname) {
        return "Feed";
      }
      if (obj.username) {
        return "User";
      }
      return null;
    },
  },
  NewRoomResult: {
    __resolveType(obj, contextValue, info) {
      if (obj.feedname) {
        return "Feed";
      }
      if (obj.username) {
        return "User";
      }
      if (obj.name) {
        return "Room";
      }
      return null;
    },
  },
  Query: {
    me: (root, args, context) => {
      console.log(context, "context");
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      if (currentUser.active == false) {
        throw new GraphQLError("account not active");
      }

      return currentUser;
    },
    getuser: async (root, args) => {
      console.log(args);
      const user = await User.findById(args.id)
        .populate({ path: "ownedfeeds", select: ["feedname", "id"] })
        .populate([
          {
            path: "posts",
            select: [
              "headline",
              "description",
              "karma",
              "img",
              "active",
              "createdAt",
              "updatedAt",
              "id",
              "feed",
            ],
          },
        ])
        .populate({
          path: [
            "likedposts",
            "dislikedposts",
            "likedcomments",
            "dislikedcomments",
            "feedsubs",
            "comments",
          ],
          select: ["_id"],
        });
      console.log(user);
      return user;
    },
    getfeed: async (root, args) => {
      console.log(args.querytype);
      try {
        if (args.querytype === "single") {
          const feed = await Feed.findOne({ feedname: args.feedname })
            .populate({
              path: "posts",
              select: [
                "headline",
                "description",
                "owner",
                "karma",
                "id",
                "createdAt",
              ],
              populate: {
                path: "owner",
                select: ["username", "id", "avatar", "active"],
              },
            })
            .populate("owner", { username: 1, id: 1, avatar: 1, active: 1 })
            .populate("subs", { username: 1, id: 1 })
            .populate("moderators", {
              username: 1,
              id: 1,
              avatar: 1,
              active: 1,
            })
            .populate("bannedusers", { id: 1 })
            .populate({
              path: "chatRoom",
              select: ["owner", "id", "name", "users"],
              populate: { path: ["owner", "users"], select: ["id"] },
            });
          console.log(feed);
          return [feed];
        }
        if (args.querytype === "many") {
          const feeds = await Feed.find({ active: true })
            .sort({ subs: -1 })
            .limit(20);
          return feeds;
        }
      } catch (e) {
        console.log(e);
        throw new GraphQLError(e);
      }
    },
    getfeedposts: async (root, args) => {
      console.log(args.feedname, args.orderBy, args.offset);
      const feed = await Feed.findOne({ feedname: args.feedname });
      if (args.orderBy === "HOTTEST") {
        try {
          const posts = await Post.find({ feed: feed._id, active: true })
            .sort({ karma: -1 })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "POPULAR") {
        console.log("popular");
        try {
          const posts = await Post.find({ feed: feed._id, active: true })
            .sort({ karma: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          console.log(posts);
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "NEWEST") {
        try {
          const posts = await Post.find({ feed: feed._id, active: true })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
    },
    getpostcomments: async (root, args) => {
      console.log(args.postid, args.offset);
      const comments = await Comment.find({
        post: args.postid,
        depth: 0,
        active: true,
      })
        .populate({
          path: "replies",
          select: ["id"],
        })
        .populate({
          path: "user",
          select: ["username", "avatar", "id"],
        })
        .sort({ karma: -1 })
        .skip(args.offset)
        .limit(20);
      console.log(comments);
      return comments;
    },
    getpopularposts: async (root, args, context) => {
      console.log(args.orderBy);
      if (args.orderBy === "HOTTEST") {
        try {
          const posts = await Post.find({ active: true })
            .sort({ commentsCount: -1 })
            .sort({ karma: -1 })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "POPULAR") {
        console.log("popular");
        try {
          const posts = await Post.find({ active: true })
            .sort({ karma: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          console.log(posts);
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "NEWEST") {
        try {
          const posts = await Post.find({ active: true })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });
          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "SUBSCRIPTIONS") {
        try {
          console.log(context.currentUser.feedsubs);
          const subs = context.currentUser.feedsubs.map((x) => x._id);
          const posts = await Post.find({ feed: { $in: [...subs] } })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(20)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });

          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.orderBy === "OWNEDFEEDS") {
        try {
          console.log(context.currentUser.ownedfeeds);
          const feeds = context.currentUser.ownedfeeds.map((x) => x._id);

          const posts = await Post.find({ feed: { $in: [...feeds] } })
            .sort({ createdAt: -1 })
            .skip(args.offset)
            .limit(10)
            .populate("feed", { feedname: 1 })
            .populate("owner", { username: 1, id: 1, avatar: 1 });

          return posts;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
    },
    getpost: async (root, args) => {
      const post = await Post.find({ _id: args.id })
        .populate({
          path: "feed",
          select: ["feedname", "id", "owner", "moderators", "feedavatar"],
          populate: {
            path: ["owner", "moderators"],
            select: ["id", "username", "avatar"],
          },
        })
        .populate("owner", { username: 1, id: 1, avatar: 1 });
      return post[0];
    },
    getcomments: async (root, args) => {
      console.log(args);
      const comments = await Comment.find({ _id: args.commentid })
        .populate({
          path: "user",
          select: ["username", "id", "avatar"],
        })
        .populate({
          path: "replies",
          select: [
            "content",
            "active",
            "karma",
            "depth",
            "id",
            "createdAt",
            "updatedAt",
            "user",
            "replies",
          ],
          populate: {
            path: ["user", "replies"],
            select: ["username", "avatar", "id"],
          },
        });
      console.log(comments);
      return comments;
    },
    getuserposts: async (root, args) => {
      try {
        const user = await User.findById(args.userid).populate({
          path: "posts",
          select: [
            "headline",
            "description",
            "karma",
            "img",
            "commentsCount",
            "active",
            "createdAt",
            "updatedAt",
            "id",
            "owner",
          ],
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 20,
          },
          populate: {
            path: ["feed", "owner"],
            select: ["feedname", "id"],
          },
        });
        console.log(user);
        return user.posts;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getusercomments: async (root, args) => {
      console.log(args);
      try {
        const user = await User.findById(args.userid).populate({
          path: "comments",
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 20,
          },
          select: [
            "content",
            "active",
            "karma",
            "depth",
            "createdAt",
            "updatedAt",
            "id",
            "replies",
            "replyto",
            "post",
          ],
          populate: [
            {
              path: "replies",
              select: ["id"],
            },
            {
              path: "post",
              select: ["id", "headline", "description"],
            },
            {
              path: "replyto",
              select: [
                "id",
                "content",
                "active",
                "karma",
                "depth",
                "createdAt",
                "updatedAt",
                "id",
                "user",
              ],
              populate: [
                {
                  path: "user",
                  select: ["id", "username", "avatar"],
                },
              ],
            },
          ],
        });

        console.log(user);
        return user.comments;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getusersubs: async (root, args) => {
      try {
        const user = await User.findById(args.userid).populate({
          path: "feedsubs",
          select: ["feedname", "description", "id", "active", "createdAt"],
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 20,
          },
        });
        return user.feedsubs;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getuserownedfeeds: async (root, args) => {
      try {
        const user = await User.findById(args.userid).populate({
          path: "ownedfeeds",
          select: ["feedname", "description", "id", "active", "createdAt"],
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 20,
          },
        });
        return user.ownedfeeds;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getsearchbar: async (root, args) => {
      if (args.searchby == "") {
        const feeds = await Feed.find({
          feedname: { $regex: "//", $options: "i" },
        }).limit(10);
        return feeds;
      }
      try {
        const feeds = await Feed.find({
          feedname: { $regex: args.searchby, $options: "i" },
        }).limit(10);
        const posts = await Post.find({
          headline: { $regex: args.searchby, $options: "i" },
        }).limit(10);
        const users = await User.find({
          username: { $regex: args.searchby, $options: "i" },
        }).limit(10);
        const result = [...feeds, ...posts, ...users];
        console.log(result);

        return result;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getsearchusers: async (root, args) => {
      if (args.searchby == "") {
        const users = await User.find({
          username: { $regex: "//", $options: "i" },
        }).limit(10);
        return users;
      }
      try {
        const users = await User.find({
          username: { $regex: args.searchby, $options: "i" },
        }).limit(10);
        return users;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getSubsCount: async (root, args) => {
      try {
        const feed = await Feed.findOne({ feedname: args.feedname });
        const subs = feed.subs.length;
        console.log(subs);
        return subs;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },

    getFiles: async (_, { userId }) => {
      try {
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Prefix: `${userId}/`,
        };

        const response = await s3.listObjectsV2(params).promise();
        if (response.Contents.length === 0) {
          console.log(`No images found in folder: ${userId}`);
          return [];
        }
        const imageUrls = response.Contents.map((object) => {
          // Generate a pre-signed URL for each object (image) in the folder
          return s3.getSignedUrl("getObject", {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: object.Key,
            Expires: 3600,
          });
        });
        console.log(
          `Retrieved ${imageUrls.length} images from folder: ${userId}`
        );
        return imageUrls;
      } catch (error) {
        console.error("Error retrieving images:", error);
        throw new Error("Failed to retrieve images");
      }
    },
    getImage: async (root, args, context) => {
      try {
        console.log("getimage");
        let command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: args.imageId,
        });
        return await getSignedUrl(client, command, { expiresIn: 60 });
      } catch (error) {
        return error;
      }
    },
    getUserRooms: async (root, args, context) => {
      const user = await User.findById(context.currentUser).populate({
        path: "chatrooms",
        select: ["name", "owner", "users"],
        populate: {
          path: ["users", "owner"],
          select: ["username", "id", "avatar"],
        },
      });
      return user;
    },
    getMessagesForRoom: async (root, args, context) => {
      const room = await Room.findById(args.roomId).populate({
        path: "messages",
        options: {
          sort: { createdAt: -1 },
          skip: args.offset,
          limit: 20,
        },
        select: ["id", "content", "author", "createdAt"],
        populate: { path: "author", select: ["id", "username", "avatar"] },
      });
      return room;
    },
    getMessages: async (_, input) => {
      const query = {
        room: input.roomId,
      };
      console.log(input.offset);
      const options = {
        sort: {
          createdAt: -1,
        },
        skip: input.offset,
        limit: 10,
      };

      const messages = await Message.find(query, null, options)
        .populate("author")
        .populate("room", { id: 1 });

      return messages;
    },
    getChatRoomInfo: async (root, args, context) => {
      const room = await Room.findById(args.roomId)
        .populate("users", { id: 1, username: 1, avatar: 1 })
        .populate("owner", { id: 1, username: 1, avatar: 1 });
      return room;
    },
  },

  Mutation: {
    subscribe: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      const feed = await Feed.findOne({ feedname: args.feedname });
      if (args.type === "sub") {
        const newfeed = await Feed.findOneAndUpdate(
          { _id: feed._id },
          {
            $addToSet: { subs: context.currentUser._id },
            $inc: { subsCount: 1 },
          }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $addToSet: { feedsubs: feed._id } }
        )
          .populate("ownedfeeds", { feedname: 1, id: 1 })
          .populate("feedsubs", { id: 1, feedname: 1 });
        console.log(feed, newuser);
        return newuser;
      }
      if (args.type === "unsub") {
        const newfeed = await Feed.findOneAndUpdate(
          { _id: feed._id },
          { $pull: { subs: context.currentUser._id }, $inc: { subsCount: -1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { feedsubs: feed._id } }
        )
          .populate("ownedfeeds", { feedname: 1, id: 1 })
          .populate("feedsubs", { id: 1, feedname: 1 });
        console.log(feed, newuser);
        return newuser;
      }
    },
    makePost: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      const feed = await Feed.findOne({ feedname: args.feedname });
      const user = context.currentUser;
      const bannedusers = feed.bannedusers.map((i) => i._id.toString());
      console.log(bannedusers, bannedusers.includes(user._id.toString()));
      if (bannedusers.includes(user._id.toString())) {
        return new GraphQLError("User is banned");
      } else {
        const post = new Post({
          headline: args.headline,
          description: sanitizeHtml(args.description),
          feed: feed._id,
          karma: 0,
          owner: context.currentUser,
          img: args.img,
        });
        await post.save();
        console.log(post);
        const newpost = await Post.findById(post._id)
          .populate({
            path: "feed",
            select: [
              "feedname",
              "description",
              "active",
              "createdAt",
              "updatedAt",
              "id",
            ],
          })
          .populate({ path: "owner", select: ["id", "username", "avatar"] });
        const newfeed = await Feed.findByIdAndUpdate(
          { _id: feed._id },
          { $push: { posts: newpost._id } }
        );
        const newuser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { posts: newpost._id } }
        );
        return newpost;
      }
    },
    createUser: async (root, args) => {
      if (args.username.match(/^\S*$/) > 0) {
        throw new GraphQLError("Username not allowed characters.");
      }
      const salt_rounds = 10;
      const passwordHash = await bcrypt.hash(args.password, salt_rounds);
      const user = new User({
        username: args.username,
        email: args.email,
        password_hash: passwordHash,
      });
      return user.save().catch((error) => {
        if (error.errorResponse.keyValue.username) {
          console.log("username error");
          throw new GraphQLError("Username already in use", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: error.errorResponse.keyValue,
              error,
            },
          });
        }
        if (error.errorResponse.keyValue.email) {
          console.log("email error");
          throw new GraphQLError("Email already in use", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: error.errorResponse.keyValue,
              error,
            },
          });
        }
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const password_correct =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.password_hash);

      if (!user) {
        throw new GraphQLError("Wrong Username!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      if (!password_correct) {
        throw new GraphQLError("Wrong Password!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      console.log(user);
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    makeFeed: async (root, args, context) => {
      console.log(context.currentUser);
      const newfeed = new Feed({
        feedname: args.feedname,
        description: sanitizeHtml(args.description),
        owner: context.currentUser,
      });
      await newfeed.save();
      const user = context.currentUser;
      const newuser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { ownedfeeds: newfeed._id } }
      ).populate({path:ownedfeeds,select:["id","feedname"]});
      return newuser;
    },
    likeComment: async (root, args, context) => {
      const user = context.currentUser;
      console.log(user);
      const comment = await Comment.findById(args.id)
        .populate({
          path: "user",
          select: ["id"],
        })
        .populate({ path: "replies", select: ["id"] })
        .populate({ path: "replyto", select: ["id"] });
      if (comment.user.id == user.id) {
        throw new GraphQLError("Cant give karma to yourself.");
      }
      console.log(comment);
      const likecommentids = user.likedcomments.map((comment) =>
        comment._id.toString()
      );
      const dislikecommentids = user.dislikedcomments.map((comment) =>
        comment._id.toString()
      );
      if (likecommentids.includes(comment._id.toString())) {
        comment.karma = comment.karma - 1;
        const commentOwner = await User.findByIdAndUpdate(
          { _id: comment.user.id },
          { $inc: { userKarma: -1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { likedcomments: comment._id } }
        );
        await comment.save();
        return comment;
      } else {
        if (dislikecommentids.includes(comment._id.toString())) {
          comment.karma = comment.karma + 1;
          const commentOwner = await User.findByIdAndUpdate(
            { _id: comment.user.id },
            { $inc: { userKarma: +1 } }
          );
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { dislikedcomments: comment._id } }
          );
        }
        comment.karma = comment.karma + 1;
        const commentOwner = await User.findByIdAndUpdate(
          { _id: comment.user.id },
          { $inc: { userKarma: +1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $addToSet: { likedcomments: comment._id } }
        );

        await comment.save();
        return comment;
      }
    },
    dislikeComment: async (root, args, context) => {
      const user = context.currentUser;
      const comment = await Comment.findById(args.id)
        .populate({
          path: "user",
          select: ["id"],
        })
        .populate({ path: "replies", select: ["id"] })
        .populate({ path: "replyto", select: ["id"] });
      if (comment.user.id == user.id) {
        throw new GraphQLError("Cant give karma to yourself.");
      }
      const dislikecommentids = user.dislikedcomments.map((comment) =>
        comment._id.toString()
      );
      const likecommentids = user.likedcomments.map((comment) =>
        comment._id.toString()
      );
      if (dislikecommentids.includes(comment._id.toString())) {
        comment.karma = comment.karma + 1;
        const commentOwner = await User.findByIdAndUpdate(
          { _id: comment.user.id },
          { $inc: { userKarma: +1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { dislikedcomments: comment._id } }
        );

        await comment.save();
        return comment;
      } else {
        if (likecommentids.includes(comment._id.toString())) {
          comment.karma = comment.karma - 1;
          const commentOwner = await User.findByIdAndUpdate(
            { _id: comment.user.id },
            { $inc: { userKarma: -1 } }
          );
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { likedcomments: comment._id } }
          );
        }
        comment.karma = comment.karma - 1;
        const commentOwner = await User.findByIdAndUpdate(
          { _id: comment.user.id },
          { $inc: { userKarma: -1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $addToSet: { dislikedcomments: comment._id } }
        );
        await comment.save();
        return comment;
      }
    },
    likePost: async (root, args, context) => {
      const user = context.currentUser;
      const post = await Post.findById(args.id).populate({
        path: "owner",
        select: ["id"],
      });
      if (post.owner.id == user.id) {
        throw new GraphQLError("Cant give karma to yourself.");
      }
      const likeids = user.likedposts.map((post) => post._id.toString());
      const dislikedids = user.dislikedposts.map((post) => post._id.toString());
      if (likeids.includes(post._id.toString())) {
        post.karma = post.karma - 1;
        const postOwner = await User.findByIdAndUpdate(
          { _id: post.owner.id },
          { $inc: { userKarma: -1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { likedposts: post._id } }
        );
        await post.save();
        return post;
      } else {
        if (dislikedids.includes(post._id.toString())) {
          post.karma = post.karma + 1;
          const postOwner = await User.findByIdAndUpdate(
            { _id: post.owner.id },
            { $inc: { userKarma: +1 } }
          );
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { dislikedposts: post._id } }
          );
        }
        post.karma = post.karma + 1;
        const postOwner = await User.findByIdAndUpdate(
          { _id: post.owner.id },
          { $inc: { userKarma: +1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $addToSet: { likedposts: post._id } }
        ).populate("likedposts", { id: 1, karma: 1 });
        await post.save();
        return post;
      }
    },
    dislikePost: async (root, args, context) => {
      const user = context.currentUser;
      const post = await Post.findById(args.id).populate("owner", { id: 1 });
      if (post.owner.id == user.id) {
        throw new GraphQLError("Cant give karma to yourself.");
      }
      const dislikeids = user.dislikedposts.map((post) => post._id.toString());
      const likeids = user.likedposts.map((post) => post._id.toString());
      if (dislikeids.includes(post._id.toString())) {
        post.karma = post.karma + 1;
        const postOwner = await User.findByIdAndUpdate(
          { _id: post.owner.id },
          { $inc: { userKarma: +1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { dislikedposts: post._id } }
        )
          .populate("dislikedposts", { id: 1, karma: 1 })
          .populate("likedposts", { id: 1, karma: 1 });
        await post.save();
        return post;
      } else {
        if (likeids.includes(post._id.toString())) {
          post.karma = post.karma - 1;
          const postOwner = await User.findByIdAndUpdate(
            { _id: post.owner.id },
            { $inc: { userKarma: -1 } }
          );
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { likedposts: post._id } }
          );
        }
        post.karma = post.karma - 1;
        const postOwner = await User.findByIdAndUpdate(
          { _id: post.owner.id },
          { $inc: { userKarma: -1 } }
        );
        const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $addToSet: { dislikedposts: post._id } }
        )
          .populate("dislikedposts", { id: 1, karma: 1 })
          .populate("likedposts", { id: 1, karma: 1 });

        await post.save();
        return post;
      }
    },
    modifyComment: async (root, args, context) => {
      console.log(args.action);
      const user = context.currentUser;
      const comment = await Comment.findById(args.commentid).populate({
        path: "user",
        select: ["id"],
      });
      if (args.action === "delete" && comment.user.id === user.id) {
        comment.content = "This comment has been deleted by the user.";
        await comment.save();
        return comment;
      }

      if ((args.action === "edit") & (comment.user.id == user.id)) {
        comment.content = args.content;
        await comment.save();
        return comment;
      }
      throw new GraphQLError("unknown operation", {
        extensions: {
          code: "UNKNOWN ACTION",
        },
      });
    },
    modifyPost: async (root, args, context) => {
      const user = context.currentUser;
      const post = await Post.findById(args.postid).populate({
        path: "owner",
        select: ["id"],
      });

      if (args.action === "delete" && post.owner.id === user.id) {
        post.headline = "Post has been deleted by the owner!";
        post.description = "<u>This post has been deleted by <b>Owner</b></u>";
        post.img = null;
        await post.save();
        return post;
      }
      if (args.action === "edit" && post.owner.id == user.id) {
        if (post.locked == true) {
          throw new GraphQLError("Post is locked cant modify post");
        }
        post.content = sanitizeHtml(args.content);
        await post.save();
        return post;
      }
      throw new GraphQLError("unknown operation", {
        extensions: {
          code: "UNKNOWN ACTION",
        },
      });
    },
    modifyUser: async (root, args, context) => {
      const user = context.currentUser;
      if (args.type === "Avatar") {
        try {
          console.log(args.content);
          user.avatar = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Description") {
        try {
          user.description = sanitizeHtml(args.content);
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Email") {
        try {
          user.email = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Username") {
        try {
          user.username = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Firstname") {
        try {
          user.firstname = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Lastname") {
        try {
          user.lastname = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Relationship") {
        try {
          user.relationship = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Work") {
        try {
          user.work = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "Nationality") {
        try {
          user.nationality = args.content;
          await user.save();
          return user;
        } catch (e) {
          throw new GraphQLError(e);
        }
      }
      if (args.type === "removefriend") {
        const newuser = await User.findByIdAndUpdate(user.id, {
          $pull: { friends: args.content },
        }).populate("friends", { id: 1, username: 1, avatar: 1 });
        return newuser;
      }
    },
    modifyFeed: async (root, args, context) => {
      const feed = await Feed.findById(args.feedid)
        .populate("bannedusers", {
          id: 1,
        })
        .populate("moderators", { id: 1 })
        .populate("owner", { id: 1 });
      const mods = feed.moderators.map((i) => i._id.toString());
      console.log(mods);
      const bannedusers = feed.bannedusers.map((i) => i._id.toString());
      const user = context.currentUser;
      console.log(feed.owner._id.toString() == user._id.toString());
      if (
        mods.includes(user._id.toString()) ||
        feed.owner._id.toString() == user._id.toString()
      ) {
        if (
          (args.action == "mod") &
          (feed.owner._id.toString() == user._id.toString())
        ) {
          try {
            const newmod = await User.findById(args.content);
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $addToSet: { moderators: newmod._id } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1 })
              .populate("owner", { id: 1, username: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (
          (args.action == "unmod") &
          (feed.owner._id.toString() == user._id.toString())
        ) {
          try {
            const newmod = await User.findById(args.content);
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $pull: { moderators: newmod._id } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1 })
              .populate("owner", { id: 1, username: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action === "ban") {
          try {
            const banneduser = await User.findById(args.content);
            console.log(banneduser);
            if (bannedusers.includes(banneduser._id.toString())) {
              throw new GraphQLError("User already banned");
            }
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $addToSet: { bannedusers: banneduser._id } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1 })
              .populate("owner", { id: 1, username: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "unban") {
          try {
            const unbanneduser = await User.findById(args.content);
            console.log(unbanneduser);
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $pull: { bannedusers: unbanneduser._id } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1 })
              .populate("owner", { id: 1, username: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "editdesc") {
          try {
            const cleandesc = sanitizeHtml(args.content);
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $set: { description: cleandesc } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1 })
              .populate("owner", { id: 1, username: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "lockpost") {
          try {
            const post = await Post.findById(args.content).populate("feed", {
              id: 1,
              owner: 1,
              mods: 1,
            });
            if (post.feed._id.toString() == feed._id) {
              const newpost = await Post.findByIdAndUpdate(
                { _id: post._id },
                { $set: { locked: true } }
              );
              const res = await Post.findById(post._id);
              return res;
            }
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "unlockpost") {
          try {
            const post = await Post.findById(args.content).populate("feed", {
              id: 1,
              owner: 1,
              mods: 1,
            });
            if (post.feed._id.toString() == feed._id) {
              const newpost = await Post.findByIdAndUpdate(
                { _id: post._id },
                { $set: { locked: false } }
              );
              const res = await Post.findById(post._id);
              return res;
            }
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "deletepost") {
          try {
            const post = await Post.findById(args.content).populate("feed", {
              id: 1,
              owner: 1,
              mods: 1,
            });
            if (post.feed._id.toString() == feed._id) {
              const newpost = await Post.findByIdAndUpdate(
                { _id: post._id },
                {
                  $set: {
                    headline: "Post has been deleted by moderation!",
                    description:
                      "<u>This post has been deleted by <b>Mods</b></u>",
                    img: null,
                    active: false,
                  },
                }
              );
              const res = await Post.findById(post._id);
              return res;
            }
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
        if (args.action == "changeavatar") {
          try {
            const newfeed = await Feed.findOneAndUpdate(
              { _id: feed._id },
              { $set: { feedavatar: args.content } }
            );

            const res = await Feed.findById(feed._id)
              .populate("bannedusers", {
                id: 1,
                username: 1,
              })
              .populate("moderators", { id: 1, username: 1, avatar: 1 })
              .populate("owner", { id: 1, username: 1, avatar: 1 });
            return res;
          } catch (e) {
            throw new GraphQLError(e);
          }
        }
      } else {
        console.log("notmod");
      }
    },
    makeComment: async (root, args, context) => {
      const post = await Post.findById(args.postid);
      if (post.active == false) {
        throw new GraphQLError("Post is locked cant create comment");
      }
      if (args.replyto) {
        const user = context.currentUser;

        console.log(post);
        const replyto = await Comment.findById(args.replyto);
        console.log(replyto);
        const newComment = new Comment({
          content: args.content,
          post: post,
          user: user,
          replyto: replyto._id,
          depth: replyto.depth + 1,
        });
        await newComment.save();
        const newreplyto = await Comment.findByIdAndUpdate(
          { _id: args.replyto },
          { $push: { replies: newComment._id } }
        )
          .populate({
            path: "user",
            select: ["username", "id", "avatar"],
          })
          .populate({ path: "post", select: ["id"] })
          .populate({ path: "replyto", select: ["id"] });
        const newpost = await Post.findByIdAndUpdate(
          { _id: args.postid },
          { $inc: { commentsCount: 1 } }
        );
        const newuser = await User.findByIdAndUpdate(
          { _id: user.id },
          { $push: { comments: newComment._id } }
        );
        const res = await Comment.findById({ _id: args.replyto })
          .populate({
            path: "user",
            select: ["username", "id", "avatar"],
          })
          .populate({ path: "replies", select: ["id"] })
          .populate({ path: "replyto", select: ["id"] })
          .populate({ path: "post", select: ["id"] });
        return res;
      } else {
        console.log("newcomment");
        const user = context.currentUser;
        const newComment = new Comment({
          content: args.content,
          post: post,
          user: user,
          karma: 0,
          depth: 0,
        });
        await newComment.save();
        console.log(user, post);
        const newpost = await Post.findByIdAndUpdate(
          { _id: args.postid },
          { $push: { comments: newComment._id }, $inc: { commentsCount: 1 } }
        );
        const newuser = await User.findByIdAndUpdate(
          { _id: user.id },
          { $push: { comments: newComment._id } }
        );
        return newComment;
      }
    },
    singleUpload: async (_, { input: { userId, file } }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      try {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const uploadimage = new Upload({
          client: client,
          params: {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `images/${userId}/${uuidv4()}${filename}`,
            Body: stream,
          },
        });
        await uploadimage.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });
        await uploadimage.done();
        console.log(uploadimage.singleUploadResult.Key);
        return [
          `${uploadimage.singleUploadResult.Key}`,
          `Image: ${filename} uploaded successfully`,
        ];
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
      }
    },
    multiUpload: async (_, { input: { userId, files } }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      try {
        const uploadPromises = files.map(async (file) => {
          const { createReadStream, filename } = await file;
          const stream = createReadStream();
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `images/${userId}/${uuidv4()}${filename}`,
            Body: stream,
          };
          const res = await s3.upload(params).promise();
          console.log(`File: ${filename} uploaded successfully`);
          return `Uploaded Location: ${res.Location}`;
        });
        const response = await Promise.all(uploadPromises);
        return JSON.stringify(response);
      } catch (error) {
        console.error("Error uploading files:", error);
        throw new Error("Failed to upload files");
      }
    },
    createRoom: async (root, args, context) => {
      if (args.type == "group") {
        const newroom = new Room({
          owner: context.currentUser,
          name: args.name,
          type: "GROUP",
        });
        await newroom.save();
        const newuser = await User.findByIdAndUpdate(
          { _id: context.currentUser.id },
          { $push: { chatrooms: newroom } }
        );
        const returnuser = await User.findById(context.currentUser.id).populate(
          "chatrooms",
          { id: 1, name: 1 }
        );
        return returnuser;
      }
      if (args.type == "feedchat") {
        const newroom = new Room({
          owner: context.currentUser,
          name: args.name,
          type: "FEED",
        });
        const feed = await Feed.findById({ _id: args.feedId }).populate(
          "owner",
          { id: 1 }
        );
        console.log(context.currentUser.id, feed.owner.id);
        if (context.currentUser.id == feed.owner.id) {
          newroom.save();
          feed.chatRoom = newroom;
          feed.save();
          console.log(feed);
          return feed;
        } else {
          return new GraphQLError("Not the owner of feed");
        }
      }
    },
    editRoom: async (root, args, context) => {
      if (args.type == "removeChatFeed") {
        const feed = await Feed.findById(args.feedId)
          .populate("chatRoom", { id: 1 })
          .populate("owner", { id: 1 });
        console.log(context.currentUser.id, feed.owner.id);
        if (context.currentUser.id == feed.owner.id) {
          const newfeed = await Feed.findByIdAndUpdate(
            { _id: feed._id },
            { chatRoom: null }
          ).populate({path:"chatRoom", select:[ "id" ,"name","type","owner","users"],populate:{ path: ["users","owner"], select: ["id", "username", "avatar"] },})
          return newfeed;
        } else {
          return new GraphQLError("Not the owner of chat or feed");
        }
      }
      if (args.type == "leaveroom") {
        const room = await Room.findById(args.roomId);
        if (room.owner.id == context.currentUser.id) {
          await Room.findByIdAndDelete(args.roomId);
          const newuser = await User.findByIdAndUpdate(
            context.currentUser._id,
            {
              $pull: { chatrooms: args.roomId },
            }
          ).populate("chatrooms", { id: 1, name: 1 });
          return newuser;
        } else {
          const newuser = await User.findByIdAndUpdate(
            context.currentUser._id,
            {
              $pull: { chatrooms: args.roomId },
            }
          ).populate("chatrooms", { id: 1, name: 1 });
          const newroom = await Room.findByIdAndUpdate(args.roomId, {
            $pull: { users: context.currentUser._id },
          });
          return newuser;
        }
      }
      if (args.type == "kick") {
        const room = await Room.findById(args.roomId).populate("owner", {
          id: 1,
        });

        if (room.owner.id == context.currentUser.id) {
          const newroom = await Room.findByIdAndUpdate(args.roomId, {
            $pull: { users: args.content },
          })
            .populate("users", { id: 1, username: 1, avatar: 1 })
            .populate("owner", { id: 1, username: 1, avatar: 1 });
          const newuser = await User.findByIdAndUpdate(args.content, {
            $pull: { chatrooms: args.roomId },
          });
          return newroom;
        } else {
          return new GraphQLError("not owner");
        }
      }
      if (args.type == "changename") {
        const newroom = await Room.findByIdAndUpdate(args.roomId, {
          $set: { name: args.content },
        });
        const user = await User.findById(context.currentUser.id).populate(
          "chatrooms",
          { id: 1, name: 1 }
        );
        return user;
      }
      return new GraphQLError("no such type of action");
    },
    inviteToRoom: async (root, args, context) => {
      const room = await Room.findById(args.roomId);
      const inviteduser = await User.findByIdAndUpdate(args.invitedId, {
        $addToSet: { chatroominvites: room._id },
      });
      return room;
    },
    roomInviteAction: async (root, args, context) => {
      if (args.type == "accept") {
        const newroom = await Room.findByIdAndUpdate(args.roomId, {
          $addToSet: { users: context.currentUser._id },
        });

        const newuser = await User.findByIdAndUpdate(context.currentUser.id, {
          $pull: { chatroominvites: newroom._id },
          $addToSet: { chatrooms: newroom._id },
        });
        const returnuser = await User.findById(newuser.id)
          .populate("chatroominvites", { id: 1, name: 1 })
          .populate("chatrooms", { id: 1, name: 1 });
        return returnuser;
      }
      if (args.type == "decline") {
        const newuser = await User.findByIdAndUpdate(context.currentUser.id, {
          $pull: { chatroominvites: args.roomId },
        });
        const returnuser = await User.findById(newuser.id)
          .populate("chatroominvites", { id: 1, name: 1 })
          .populate("chatrooms", { id: 1, name: 1 });
        return returnuser;
      }
    },

    message: async (root, args, context) => {
      const author = context.currentUser;
      const room = await Room.findById(args.roomId);

      const data = {
        content: args.content,
        author: author,
        room: room,
      };

      const message = new Message(data);
      await message.save();
      console.log(message);
      const newroom = await Room.findByIdAndUpdate(
        { _id: room.id },
        { $push: { messages: message } }
      );
      const newmessage = await Message.findById(message.id)
        .populate("author", {
          id: 1,
          username: 1,
          avatar: 1,
        })
        .populate("room", { id: 1 });
      pubsub.publish(MESSAGE_SENT, { messageSent: newmessage });
      return newmessage;
    },
    sendFriendRequest: async (root, args, context) => {
      if (!context.currentUser) {
        return new GraphQLError("No user logon.");
      }
      if (args.userId == context.currentUser.id) {
        return new GraphQLError("Cant send friend request to yourself!");
      }
      const requestedUser = await User.findByIdAndUpdate(
        { _id: args.userId },
        { $addToSet: { friendsRequests: context.currentUser._id } }
      );
      const newuser = await User.findByIdAndUpdate(
        { _id: context.currentUser._id },
        { $addToSet: { friendsRequestsSent: requestedUser._id } }
      ).populate("friendsRequestsSent", { id: 1 });
      return newuser;
    },
    friendRequestAction: async (root, args, context) => {
      if (args.type == "accept") {
        const accepteduser = await User.findById(args.userId);
        const newuser = await User.findByIdAndUpdate(context.currentUser.id, {
          $addToSet: { friends: accepteduser._id },
          $pull: { friendsRequests: accepteduser._id },
        })
          .populate("friends", { username: 1, id: 1, avatar: 1 })
          .populate("friendsRequests", { username: 1, id: 1, avatar: 1 });
        const newaccepteduser = await User.findByIdAndUpdate(accepteduser.id, {
          $addToSet: { friends: context.currentUser._id },
          $pull: { friendsRequestsSent: context.currentUser._id },
        });
        return newuser;
      }
      if (args.type == "decline") {
        const declineduser = await User.findById(args.userId);
        const newuser = await User.findByIdAndUpdate(context.currentUser.id, {
          $pull: { friendsRequests: declineduser._id },
        })
          .populate("friends", { username: 1, id: 1, avatar: 1 })
          .populate("friendsRequests", { username: 1, id: 1, avatar: 1 });
        const newdeclineduser = await User.findByIdAndUpdate(declineduser.id, {
          $pull: { friendsRequestsSent: context.currentUser._id },
        });
        return newuser;
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(MESSAGE_SENT),
        (payload, variables) =>
          payload.messageSent.room._id.equals(variables.roomId)
      ),
    },
  },
};
module.exports = resolvers;
