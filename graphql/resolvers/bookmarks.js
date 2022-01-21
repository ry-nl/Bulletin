const {AuthenticationError, UserInputError} = require('apollo-server')

const User = require('../../models/User')
const Post = require('../../models/Post')
const authenticate = require('../../util/authenticate')

// BOOKMARK QUERY METHODS

module.exports = {

	// MUTATIONS ----------------------------------------------------------
	Mutation: {
		async bookmark(parent, { postId }, context, info) {
			const { id } = authenticate(context)

			try {
				const user = await User.findById(id)
				const post = await Post.findById(postId) // get post by id

				if(!user) throw new Error('Poster not found')
				if(!post) throw new Error('Post not found') // throw error if post does not exist

				const bookmarkIndex = user.bookmarks.indexOf(postId)
			
				if(bookmarkIndex === -1) user.bookmarks.unshift(post)
				else user.bookmarks.splice(bookmarkIndex, 1)
				
				await user.save()
				return post
			}
			catch(err) {
				throw new Error(err)
			}
		}
	}
}