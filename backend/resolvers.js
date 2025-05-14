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
      getfeed: async (root,args,context) => {
        const currentUser = context.currentUser
        const feed = await Feed.findOne({feedname:args.feedname}).populate("owner",{username:1})
        return feed
      }
    },
    Mutation: {
      makePost: async (root,args,context) => {
        if(context.currentUser){
          throw new GraphQLError("not logged in")
        }
        const feed = await Feed.findOne({feedname:args.feedname})
        const post = new Post({headline:args.headline,feed:feed,karma:0,owner:context.currentUser,img:args.img})
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
      return newfeed.save()
        .catch(error => {
          console.log(error)
        })
    }
  },
    
  }
module.exports = resolvers