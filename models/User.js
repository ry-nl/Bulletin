const {model, Schema} = require('mongoose')

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
			ref: 'users'
		}
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],

	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'posts'
		}
	],
	bookmarks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'posts'
		}
	],
	createdAt: String,
})

module.exports = model('User', userSchema)