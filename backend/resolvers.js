const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user_model");
const Feed = require("./models/feed_model");
const Post = require("./models/post_model");
const Comment = require(`./models/comment_model`);
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

const client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
});



const resolvers = {
  Upload: GraphQLUpload,
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
        ]);
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
              populate: { path: "owner", select: ["username", "id", "avatar"] },
            })
            .populate("owner", { username: 1, id: 1 })
            .populate("subs", { username: 1, id: 1 });
          console.log(feed);
          return [feed];
        }
        if (args.querytype === "many") {
          const feeds = await Feed.find({active:true}).sort({ subs: -1 }).limit(10);
          return feeds;
        }
      } catch (e) {
        console.log(e);
        throw new GraphQLError(e);
      }
    },
    getfeedposts: async (root, args) => {
      console.log(args.feedname, args.offset, args.limit);
      try {
        const feed = await Feed.findOne({ feedname: args.feedname });
        console.log(feed);
        const posts = await Post.find({ feed: feed._id, active: true })
          .sort({ createdAt: -1 })
          .skip(args.offset)
          .limit(10)
          .populate("owner", { username: 1, avatar: 1, id: 1, active: 1 })
          .populate("feed", { feedname: 1, id: 1 });
        console.log(posts);
        return posts;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getpostcomments: async (root, args) => {
      console.log(args.postid, args.offset, args.limit);
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
        .limit(10);
      if (comments.length != args.offset + args.limit) {
        console.log("ei oo enempää");
      }
      console.log(comments);
      return comments;
    },
    getpopularposts: async (root, args,context) => {
      console.log(args.orderBy);
      if (args.orderBy === "HOTTEST") {
        try{
        const posts = await Post.find({ active: true })
          .sort({ karma: -1 })
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
      if (args.orderBy === "POPULAR") {
        console.log("popular");
        try{
        const posts = await Post.find({ active: true })
          .sort({ karma: -1 })
          .skip(args.offset)
          .limit(10)
          .populate("feed", { feedname: 1 })
          .populate("owner", { username: 1, id: 1, avatar: 1 });
        console.log(posts);
        return posts;
        } catch (e) {
        throw new GraphQLError(e);
      }
      }
      if(args.orderBy === "NEWEST"){
      try {
        const posts = await Post.find({ active: true })
          .sort({ createdAt: -1 })
          .skip(args.offset)
          .limit(10)
          .populate("feed", { feedname: 1 })
          .populate("owner", { username: 1, id: 1, avatar: 1 });
        return posts;
      } catch (e) {
        throw new GraphQLError(e);
      }}
      if(args.orderBy === "SUBSCRIPTIONS"){
        try{
          console.log(context.currentUser.feedsubs)
          const subs = context.currentUser.feedsubs.map(x => x._id)
          const posts = await Post.find({feed:{$in:[...subs]}}).sort({ createdAt: -1 })
          .skip(args.offset)
          .limit(10)
          .populate("feed", { feedname: 1 })
          .populate("owner", { username: 1, id: 1, avatar: 1 });

        return posts;
        }catch(e) {
          throw new GraphQLError(e);
        }
      }
            if(args.orderBy === "OWNEDFEEDS"){
        try{
          console.log(context.currentUser.ownedfeeds)
          const feeds = context.currentUser.ownedfeeds.map(x => x._id)
          
          const posts = await Post.find({feed:{$in:[...feeds]}}).sort({ createdAt: -1 })
          .skip(args.offset)
          .limit(10)
          .populate("feed", { feedname: 1 })
          .populate("owner", { username: 1, id: 1, avatar: 1 });

        return posts;
        }catch(e) {
          throw new GraphQLError(e);
        }
      }
    },
    getpost: async (root, args) => {
      const post = await Post.find({ _id: args.id })
        .populate("feed", { feedname: 1, id: 1 })
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
            "active",
            "createdAt",
            "updatedAt",
            "id",
            "owner",
          ],
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 10,
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
          select: [
            "content",
            "active",
            "karma",
            "depth",
            "createdAt",
            "updatedAt",
            "id",
            "user",
            "replies",
            "post",
          ],
          populate: {
            path: ["user", "replies", "post"],
            select: ["username", "id", "avatar", "headline", "description"],
          },
          options: {
            sort: { createdAt: -1 },
            skip: args.offset,
            limit: 10,
          },
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
            limit: 10,
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
            limit: 10,
          },
        });
        return user.ownedfeeds;
      } catch (e) {
        throw new GraphQLError(e);
      }
    },
    getsearchbar: async (root, args) => {
      try {
        const feeds = await Feed.find({
          feedname: { $regex: args.searchby, $options: "i" },
        }).limit(10);
        return feeds;
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
        console.log("getimage")
        let command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: args.imageId,
        });
        
        return await getSignedUrl(client, command, { expiresIn: 60 });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    subscribe: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      if (args.type === "sub") {
        const feed = await Feed.findOne({ feedname: args.feedname });
        const user = context.currentUser;
        feed.subs = [...feed.subs, user];
        user.feedsubs = [...user.feedsubs, feed];
        console.log(feed, user);
        await user.save();
        await feed.save();
        return user;
      }
      if (args.type === "unsub") {
        console.log("juu");
        const feed = await Feed.findOneAndUpdate(
          { feedname: args.feedname },
          { $pull: { subs: context.currentUser._id } }
        );
        console.log(feed);
        const user = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { feedsubs: feed._id } }
        );
        console.log(feed, user);

        await feed.save();
        await user.save();
        const res = await User.findById(context.currentUser._id)
          .populate("ownedfeeds", { feedname: 1, id: 1 })
          .populate("feedsubs", { id: 1, feedname: 1 });
        return res;
      }
    },
    makePost: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      const feed = await Feed.findOne({ feedname: args.feedname });
      const user = context.currentUser;
      const post = new Post({
        headline: args.headline,
        description: args.description,
        feed: feed,
        karma: 0,
        owner: context.currentUser,
        img: args.img,
      });
      console.log(post);
      feed.posts = [...feed.posts, post];
      user.posts = [...user.posts, post];
      await feed.save();
      await user.save();
      return post.save();
    },
    createUser: async (root, args) => {
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

      if (!user || !password_correct) {
        throw new GraphQLError("wrong credentials", {
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
        description: args.description,
        owner: context.currentUser,
      });
      const user = context.currentUser;
      console.log(user);
      user.ownedfeeds = [...user.ownedfeeds, newfeed];
      console.log(user);
      await user.save();
      return newfeed.save().catch((error) => {
        console.log(error);
      });
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
      if (args.action === "like") {
        const likecommentids = user.likedcomments.map((comment) =>
          comment._id.toString()
        );
        const dislikecommentids = user.dislikedcomments.map((comment) =>
          comment._id.toString()
        );
        if (likecommentids.includes(comment._id.toString())) {
          comment.karma = comment.karma - 1;
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { likedcomments: comment._id } }
          );
          await newuser.save();
          await comment.save();
          return comment;
        } else {
          if (dislikecommentids.includes(comment._id.toString())) {
            comment.karma = comment.karma + 1;
            const newuser = await User.findOneAndUpdate(
              { _id: context.currentUser._id },
              { $pull: { dislikedcomments: comment._id } }
            );
          }
          comment.karma = comment.karma + 1;
          user.likedcomments = [...user.likedcomments, comment];
          await user.save();
          await comment.save();
          return comment;
        }
      }
      if (args.action === "dislike") {
        const dislikecommentids = user.dislikedcomments.map((comment) =>
          comment._id.toString()
        );
        const likecommentids = user.likedcomments.map((comment) =>
          comment._id.toString()
        );
        if (dislikecommentids.includes(comment._id.toString())) {
          comment.karma = comment.karma + 1;
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { dislikedcomments: comment._id } }
          );
          await newuser.save();
          await comment.save();
          return comment;
        } else {
          if (likecommentids.includes(comment._id.toString())) {
            comment.karma = comment.karma - 1;
            const newuser = await User.findOneAndUpdate(
              { _id: context.currentUser._id },
              { $pull: { likedcomments: comment._id } }
            );
          }
          comment.karma = comment.karma - 1;
          user.dislikedcomments = [...user.dislikedcomments, comment];
          await user.save();
          await comment.save();
          return comment;
        }
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
        post.headline = "This post has been deleted by the user.";
        post.description = "This post has been deleted by the user."
        post.img = null
        await post.save();
        return post;
      }
      if (args.action === "edit" && post.owner.id == user.id) {
        post.content = args.content;
        await post.save();
        return post;
      }
      if (args.action === "like") {
        const likeids = user.likedposts.map((post) => post._id.toString());
        const dislikedids = user.dislikedposts.map((post) =>
          post._id.toString()
        );
        if (likeids.includes(post._id.toString())) {
          post.karma = post.karma - 1;
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { likedposts: post._id } }
          );
          await newuser.save();
          await post.save();
          return post;
        } else {
          if (dislikedids.includes(post._id.toString())) {
            post.karma = post.karma + 1;
            const newuser = await User.findOneAndUpdate(
              { _id: context.currentUser._id },
              { $pull: { dislikedposts: post._id } }
            );
          }
          post.karma = post.karma + 1;
          user.likedposts = [...user.likedposts, post];
          await user.save();
          await post.save();
          return post;
        }
      }
      if (args.action === "dislike") {
        const dislikeids = user.dislikedposts.map((post) =>
          post._id.toString()
        );
        const likeids = user.likedposts.map((post) => post._id.toString());
        if (dislikeids.includes(post._id.toString())) {
          post.karma = post.karma + 1;
          const newuser = await User.findOneAndUpdate(
            { _id: context.currentUser._id },
            { $pull: { dislikedposts: post._id } }
          );
          await newuser.save();
          await post.save();
          return post;
        } else {
          if (likeids.includes(post._id.toString())) {
            post.karma = post.karma - 1;
            const newuser = await User.findOneAndUpdate(
              { _id: context.currentUser._id },
              { $pull: { likedposts: post._id } }
            );
          }
          post.karma = post.karma - 1;
          user.dislikedposts = [...user.dislikedposts, post];
          await user.save();
          await post.save();
          return post;
        }
      }
      throw new GraphQLError("unknown operation", {
        extensions: {
          code: "UNKNOWN ACTION",
        },
      });
    },
    modifyUser: async (root,args,context) => {
      if(args.type === "avatar"){
        try{
          console.log(args.content)
          const user = context.currentUser
          user.avatar = args.content
          await user.save()
          return user
        }catch(e){
          throw new GraphQLError(e);
        }
      }
    },
    makeComment: async (root, args, context) => {
      if (args.replyto) {
        const user = context.currentUser;
        const post = await Post.findById(args.postid);
        console.log(post);
        const replyto = await Comment.findById(args.replyto);
        console.log(replyto);
        const newComment = new Comment({
          content: args.content,
          post: post,
          user: user,
          replyto: replyto,
          depth: replyto.depth + 1,
        });
        replyto.replies.push(newComment);
        user.comments.push(newComment);
        await replyto.save();
        await user.save();
        await newComment.save();
        return newComment;
      } else {
        console.log("newcomment");
        const user = context.currentUser;
        const post = await Post.findOne({ _id: args.postid });

        const newComment = new Comment({
          content: args.content,
          post: post,
          user: user,
          karma: 0,
          depth: 0,
        });
        console.log(user, post);
        post.comments.push(newComment);
        user.comments.push(newComment);
        await newComment.save();
        await user.save();
        await post.save();
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
          params:{          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `images/${userId}/${uuidv4()}${filename}`,
          Body: stream,}
        })
        await uploadimage.on("httpUploadProgress",(progress) => {
          console.log(progress)
        })
        await uploadimage.done()
        console.log(uploadimage.singleUploadResult.Key)
        return [`${uploadimage.singleUploadResult.Key}`,`Image: ${filename} uploaded successfully`]
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
  },
};
module.exports = resolvers;
