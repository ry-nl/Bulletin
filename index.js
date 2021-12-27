const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose') //interface with mongoDB

const typeDefs = require('./graphql/typedefs') //graphQL type definitions
const resolvers = require('./graphql/resolvers/index') //graphQL resolver definitions
const { MONGODB } = require('./config') //uri and secret key

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