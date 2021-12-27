const { model, Schema } = require('mongoose')

// POST SCHEMA

const postSchema = new Schema({
	content: {
		text: String,
		image: String
	},

	poster: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	comments: [
		{
			commenterId: String,
			commenter: String,
			content: String,
			createdAt: String
		}
	],
	likes: [
		{
			likerId: String,
			liker: String,
			createdAt: String
		}
	],

	createdAt: String,
	createdOn: String
})

module.exports = model('Post', postSchema)