const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')
const authenticate = require('../../util/authenticate')
const { validateRegistration, validateLogin } = require('../../util/validate')
const { formatAMPM, formatYMD } = require('../../util/time')

// USER QUERY METHODS

module.exports = {
	Query: {
		async getUsers() {
			try {
				const users = await User.find()
				return users
			}
			catch(err) {
				throw new Error(err)
			}
		},

		async getUser(parent, { userId, username }, context, info) {
			if(!userId && !username) throw new Error('Empty fields')
			else if((userId && userId.toString().trim() === '') && (username && username.trim() === '')) throw new Error('Empty fields')

			try {
				if(userId) {
					const userById= await User.findById(userId).populate('followers').populate('following')
					if(userById) return userById
				}

				if(username)
				{
					const userByUsername = await User.findOne({ username }).populate('followers').populate('following')
					if(userByUsername) return userByUsername
				}
				else throw new Error('User not found')
			}
			catch(err) {
				throw new Error(err)
			}
		}
	},

	Mutation: {
		async login(parent, { username, password }, context, info) { // LOGIN
			const {valid, errors} = validateLogin(username, password) // make sure input fields are valid

			if(!valid) throw new UserInputError('Errors', { errors }) // if invalid throw error

			const user = await User.findOne({ username }) // get user by username

			if(!user) { // if user does not exist throw error
				errors.username = 'User does not exist'
				throw new UserInputError('One or more fields are incorrect', {errors})
			}

			const comparePW = await bcrypt.compare(password, user.password) // compare hashed passwords

			if(!comparePW) { // if passwords are not the same throw error
				errors.password = 'Password incorrect'
				throw new UserInputError('One or more fields are incorrect', {errors})
			}

			const token = jwt.sign({ // create new token
				id: user.id,
				username: user.username,
				email: user.email,
				userPic: user.userPic,
			}, SECRET_KEY, {expiresIn: '1h'})

			return { // return user info
				...user._doc,
				id: user._id,
				token
			}
		},

		async register(parent, {registerInput: {username, password, cPassword, email}}, context, info) { // CREATE ACCOUNT
			const {valid, errors} = validateRegistration(username, email, password, cPassword) // make sure input fields are valid

			if(!valid) throw new UserInputError('Errors', {errors}) // if invalid throw error

			const userByEmail = await User.findOne({email})

			if(userByEmail) { // if user already exists throw error
				throw new UserInputError('Email is taken', {
					errors: {
						email: 'Email is taken'
					}
				})
			}

			const userByUsername = await User.findOne({username}) // get user by username

			if(userByUsername) { // if user already exists throw error
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'Username is taken'
					}
				})
			}

			password = await bcrypt.hash(password, 12) // hash password

			const newUser = new User({ // create a new user object
				username: username,
				password: password,
				userPic: '',
				userBio: '',
				email: email,
				createdAt: formatAMPM(new Date()),
				createdOn: formatYMD(new Date())
			})

			const added = await newUser.save() // save user to database

			const token = jwt.sign({ // create new token
				id: added.id,
				username: added.username,
				email: added.email,
				userPic: added.userPic,
			}, SECRET_KEY, {expiresIn: '1h'})

			return { // return user info
				...added._doc,
				id: added._id,
				token
			}
		},

		async changeUserBio(parent, { content }, context, info) {
			if(!content) content = ''

			const { id } = authenticate(context)

			try {
				const user = await User.findById(id)

				if(!user) throw new Error('User not found')

				await user.updateOne({ userBio: content })
				
				return await user.save()
			}
			catch(err) {
				throw new Error(err)
			}
		},

		async changeUserPic(parent, { image }, context, info) {
			if(!image) image = ''

			const { id } = authenticate(context)

			try {
				const user = await User.findById(id)

				if(!user) throw new Error('User not found')

				await user.updateOne({ userPic: image })
				
				return await user.save()	
			}
			catch(err) {
				throw new Error(err)
			}
		}
	}
}
