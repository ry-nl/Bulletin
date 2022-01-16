const { AuthenticationError, UserInputError } = require('apollo-server')

const User = require('../../models/User')
const Post = require('../../models/Post')
const authenticate = require('../../util/authenticate')
const { formatAMPM, formatYMD } = require('../../util/time')

// POST QUERY METHODS

module.exports = {
	Query: {
		async getPosts() { // GET ALL POSTS
			try {
				const posts = await Post.find().populate('poster').populate('likes') // get all existing posts from database
				return posts // return all posts
			}
			catch(err) { // handle exception
				throw new Error(err)
			}
		},

		async getUserPosts(parent, { quantity, startingIndex, userId, username }, context, info) {
			if(!userId && !username) throw new Error('Empty fields')
			else if((userId && userId.toString().trim() === '') && (username && username.trim() === '')) throw new Error('Empty fields')
			
			try {
				if(userId)
				{
					const userById = await User.findById(userId).populate('posts')
					if(userById) return userById.posts.slice(startingIndex, startingIndex + quantity)
				}

				if(username)
				{
					const userByUsername = await User.findOne({ username }).populate('posts')
					if(userByUsername) return userByUsername.posts.slice(startingIndex, startingIndex + quantity)
				}

				throw new Error('User not found')
			}
			catch(err) {
				throw new Error(err)
			}
		},

		async getUserFeedPosts(parent, { quantity, startingIndex }, context, info) {
			const { id } = authenticate(context)
			try {
				const user = await User.findById(id)

				if(!user) throw new Error('User not found')

				const posts = await Post.find({posterId: {$in: user.following}}).populate('poster')

				return posts.slice(startingIndex, startingIndex + quantity)
			}
			catch(err) {
				throw new Error(err)
			}
		},

		async getPost(parent, { postId }, context, info) { // GET ONE POST
			try {
				const post = await Post.findById(postId).populate('poster') // get post by id

				if(post) return post // return post if it exists
				else throw new Error('Post not found') // throw error if post does not exist
			}
			catch(err) { // handle exception
				throw new Error(err)
			}
		}

	},

	Mutation: {
		async createPost(parent, { text, image }, context, info) { // CREATE POST
			const { id, username } = authenticate(context) // check if user is logged in and has valid token

			try {
				const user = await User.findById(id)

				if(!user) throw new Error('Poster not found')

				if(text.trim() === '' && image.trim() === ''){
					throw new UserInputError('Empty post', {
						errors: {
							content: 'Post must have content'
						}
					})
				}

				const newPost = new Post({ // create a new post object
					content: {text: text, image: image},
					poster: user,
					createdAt: formatAMPM(new Date()),
					createdOn: formatYMD(new Date())
				})

				user.posts.unshift(newPost)

				const post = await newPost.save() // save post to database
				await user.save()

				return post // return post
			}
			catch(err) {
				throw new Error(err)
			}

			// context.pubsub.publish('NEW_POST', { // publish post to subscribers
			// 	onPost: post
			// })

		},

		async deletePost(parent, { postId }, context, info) { // DELETE POST
			const { id } = authenticate(context) // check if user is logged in and has valid token

			try {
				const user = await User.findById(id)
				const post = await Post.findById(postId).populate('poster') // get post by id

				if(!user) throw new Error('Poster not found')
				if(!post) throw new Error('Post not found') // throw error if post does not exist

				if(id === post.poster.id) // check if post was made by current user
				{
					await post.delete() // remove post from database
					const postIndex = user.posts.indexOf(postId)
					user.posts.splice(postIndex, 1)
					await user.save()

					return 'Post deleted'
				}
				else throw new AuthenticationError('User can only delete own posts') // throw error
			}
			catch(err) { // handle exception
				throw new Error(err)
			}
		}
	},

	// Subcription: {
	// 	onPost: {
	// 		subscribe: (parent, {}, {pubsub}, info) => { // subscribe to new posts
	// 			pubsub.asyncIterator('NEW_POST')
	// 		}
	// 	}
	// }
}
