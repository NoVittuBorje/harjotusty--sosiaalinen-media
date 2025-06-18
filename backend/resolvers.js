const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user_model");
const Feed = require("./models/feed_model");
const Post = require("./models/post_model");
const Comment = require(`./models/comment_model`);

const resolvers = {
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
      const user = await User.findById(args.id).populate("ownedfeeds",{feedname:1,id:1})  
      console.log(user);
      return user;
    },
    getfeed: async (root, args) => {
      if (args.querytype === "single") {
        const feed = await Feed.findOne({ feedname: args.feedname })
          .populate({
            path: "posts",
            select: ["headline", "description", "owner", "karma", "id","createdAt"],
            populate: { path: "owner", select: ["username", "id", "avatar"] },
          })
          .populate("owner", { username: 1, id: 1 })
          .populate("subs", { username: 1, id: 1 });
        console.log(feed);
        return [feed];
      }
      if (args.querytype === "many") {
        const feeds = await Feed.find({});
        return feeds;
      }
    },
    getpost: async (root, args) => {
      const post = await Post.find({ _id: args.id }).populate("owner", {
        username: 1,
        id: 1,
        avatar: 1,
      });
      console.log(post);
      return post[0];
    },
    getcomments: async (root, args) => {
      const comments = await Comment.find({ _id: args.commentid });
      console.log(comments);
      return comments;
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
      const user = context.currentUser;
      const comment = await Comment.findById(args.commentid);
      if (args.action === "delete" && comment.user.id === user.id) {
        comment.active = false;
        await comment.save();
        return comment;
      }
      if (args.action === "modify") {
        comment.content = args.content;
        await comment.save();
        return comment;
      }
      if(args.action === "like") {
        const likecommentids = user.likedcomments.map(comment => comment._id.toString())
        const dislikecommentids = user.dislikedcomments.map(comment => comment._id.toString())
        if (likecommentids.includes(comment._id.toString())){
          comment.karma = comment.karma -1
          const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { likedcomments: comment._id } }
        )
          await newuser.save()
          await comment.save()
          return comment
        }else{
        comment.karma = comment.karma +1
        user.likedcomments = [...user.likedcomments,comment]
        await user.save()
        await comment.save()
        return comment
        }
      }
      if(args.action === "dislike") {
        const dislikecommentids = user.dislikedcomments.map(comment => comment._id.toString())
        const likecommentids = user.likedcomments.map(comment => comment._id.toString())
        if (dislikecommentids.includes(comment._id.toString())){
          comment.karma = comment.karma +1
          const newuser = await User.findOneAndUpdate(
          { _id: context.currentUser._id },
          { $pull: { dislikedcomments: comment._id } }
        )
          await newuser.save()
          await comment.save()
          return comment
        }else{
        comment.karma = comment.karma -1
        user.dislikedcomments = [...user.dislikedcomments,comment]
        await user.save()
        await comment.save()
        return comment
        }
      }
      throw new GraphQLError("unknown operation", {
          extensions: {
            code: "UNKNOWN ACTION",
          },
        });
    },
    makeComment: async (root, args, context) => {
      if (args.replyto) {
        //reply
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
        //newComment
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
  },
};
module.exports = resolvers;
