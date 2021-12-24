const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose') //interface with mongoDB
const express = require('express')
const gql = require('graphql-tag')

const typeDefs = require('./graphql/typedefs') //graphQL type definitions
const resolvers = require('./graphql/resolvers/index') //graphQL resolver definitions
const { MONGODB } = require('./config') //uri and secret key

// const path = require('path')
// const logger = require('./middleware/logger')

// const pubsub = new PubSub()

const server = new ApolloServer({ // create apollo server
	typeDefs,
	resolvers,
	context: ({req})=>({req})
})

const PORT = process.env.PORT || 5000 // get porrt

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true},) // connect to mongodb database
	.then(() => {
		console.log('MongoDB server connected')
		return server.listen(PORT)})
	.then(res => {
		console.log(`Running on port ${PORT} at ${res.url}`)
	})

// // initialize express
// const app = express()

// // load middleware
// app.use(logger)
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// // static
// app.use(express.static(path.join(__dirname, 'public')))

// // member api routes
// app.use('/api/members', require('./routes/api/members'))

// // create endpoints/route handlers
// // app.get('/', (req, res)=>{
// // 	res.sendFile(path.join(__dirname, 'public', 'index.html'))
// // })
