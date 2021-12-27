const { model, Schema } = require('mongoose')

// USER SCHEMA

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,

	userPic: String,
	userBio: String,
	
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],

	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	bookmarks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	createdAt: String,
	createdOn: String
})

module.exports = model('User', userSchema)