const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentResolvers = require('./comments')
const likeResolvers = require('./likes')
const followResolvers = require('./follow')

// RESOLVERS

module.exports = {
	Post: { // any time a query or mutation returns post, will go through post resolver
		likeCount: parent => parent.likes.length,
		commentCount: parent => parent.comments.length
	},
	User: {
		followerCount: parent => parent.followers.length,
		followingCount: parent => parent.following.length
	},
	Query: { // get posts, get post
		...userResolvers.Query,
		...postResolvers.Query
	},
	Mutation: { // register/login user, create/delete post, create/delete reply, create/delete like
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation,
		...likeResolvers.Mutation,
		...followResolvers.Mutation
	},
	// Subscription: { // new post subscription
	// 	...postResolvers.Subscription
	// }
}
