const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user_model')
const Feed = require('./models/feed_model')
const Post = require('./models/post_model')

const resolvers = {
    Query: {
      me: (root, args, context) => {
        console.log(context,"context")
        const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
        return currentUser
      },
      getfeed: async (root,args) => {
        if (args.querytype === "single"){
        const feed = await Feed.findOne({feedname:args.feedname}).populate({ path: 'posts',select: ["headline","description","owner","karma","id"],
        populate: { path: 'owner' ,select:["username"]}
      }).populate("owner",{username:1,id:1}).populate("subs",{username:1,id:1})
        console.log(feed)
        return [feed]
        } 
        if(args.querytype === "many"){
          const feeds = await Feed.find({})
          return feeds
        }
      }
    },
    Mutation: {
      subscribe: async (root,args,context) => {
        if(!context.currentUser){
          throw new GraphQLError("not logged in")
        }
        if (args.type === "sub"){
        const feed = await Feed.findOne({feedname:args.feedname})
        const user = await User.findById(context.currentUser._id)
        feed.subs = [...feed.subs,user]
        user.feedsubs = [...user.feedsubs,feed]
        console.log(feed,user)
        await user.save()
        await feed.save()
        return user
        }
        if (args.type === "unsub"){
          console.log("juu")
        const feed = await Feed.findOneAndUpdate(
        {'feedname':args.feedname},
        { $pull: { subs: context.currentUser._id }},)
        console.log(feed)
        const user = await User.findOneAndUpdate(
        {'_id':context.currentUser._id},
        { $pull: { feedsubs: feed._id }},).populate("feedsubs",{feedname:1,id:1})
        console.log(feed,user)

        return user
        }
      },
      makePost: async (root,args,context) => {
        if(!context.currentUser){
          throw new GraphQLError("not logged in")
        }
        const feed = await Feed.findOne({feedname:args.feedname})
        const user = await User.findById(context.currentUser._id)
        const post = new Post({headline:args.headline,description:args.description,feed:feed,karma:0,owner:context.currentUser,img:args.img})
        feed.posts = [...feed.posts,post]
        user.posts = [...user.posts,post]
        await feed.save()
        await user.save()
        return post.save()
      },
      createUser: async (root,args) => {
        const salt_rounds = 10
        const passwordHash = await bcrypt.hash(args.password,salt_rounds)
        const user = new User({ username: args.username,email:args.email, password_hash: passwordHash})
        return user.save()
        .catch(error => {
          if (error.errorResponse.keyValue.username){
            console.log("username error")
            throw new GraphQLError('Username already in use', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: error.errorResponse.keyValue,
              error
          }
          })
          }
          if(error.errorResponse.keyValue.email){
            console.log("email error")
            throw new GraphQLError('Email already in use', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: error.errorResponse.keyValue,
              error
          }
          })
          }
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const password_correct = user === null
      ? false
      : await bcrypt.compare(args.password,user.password_hash)
      
      if ( !user || !password_correct) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
      console.log(user)
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    makeFeed: async (root, args,context) => {
      console.log(context.currentUser)
      const newfeed = new Feed({ feedname:args.feedname,description:args.description,owner:context.currentUser})
      const user = await User.findById(context.currentUser._id)
      console.log(user)
      user.ownedfeeds = [...context.currentUser.ownedfeeds,newfeed]
      console.log(user)
      await user.save()
      return newfeed.save()
        .catch(error => {
          console.log(error)
        })
    }
  },
    
  }
module.exports = resolvers