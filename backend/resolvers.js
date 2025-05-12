const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user_model')

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
    },
    Mutation: {
      createUser: async (root,args) => {
        const salt_rounds = 10
        const passwordHash = await bcrypt.hash(args.password,salt_rounds)
        const user = new User({ username: args.username,email:args.email, password_hash: passwordHash})
        return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
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
    }},
    
  }
module.exports = resolvers