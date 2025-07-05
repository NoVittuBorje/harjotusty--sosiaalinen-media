const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const User = require('./models/user_model')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
  
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/',
    })
    
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer);
  
    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    })
  
    await server.start()
  
    app.use(
      '/',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          console.log(req.headers.authorization,req.body.operationName)
          const auth = req ? req.headers.authorization : null
          console.log(auth)
          if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate("ownedfeeds",{feedname:1,id:1})
            .populate("feedsubs",{id:1,feedname:1,description:1,owner:1})
            .populate({ path: 'posts',select: ["headline","description","owner","karma","id","feed"],
              populate: { path: 'owner' ,select:["username","avatar","id"]},
              populate:{path:"feed",select:["feedname"]}
              }).populate({path:"comments",select:["post","content","replyto","id","karma","depth"],
                populate:{path:"post",select:["headline","id","karma"]},
                populate:{path:"replyto",select:["content","user"],populate:{path:"user",select:["avatar","username","id"]},}
                }).populate("likedposts",{id:1,headline:1}).populate("dislikedposts",{id:1,headline:1}).populate("likedcomments",{id:1,content:1}).populate("dislikedcomments",{id:1,content:1})
            return { currentUser }
          }else{console.log("no auth");return null}
        },
      }),
    )
  
    const PORT = 4000
  
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}`)
    )
  }
  
  start()