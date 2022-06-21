const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')

const {SECRET_KEY} = require('../config')

// AUTHENTICATION HELPER

const authenticate = (context) => { // AUTHENTICATE TOKEN
	const authHeader = context.req.headers.authorization // get authentication header

	if(authHeader) { // authentication header exists
		const token = authHeader.split('Bearer ')[1] // get token from header

		if(token) { // token exists
			try { // verify token with secret key and return user
				const user = jwt.verify(token, SECRET_KEY)
				return user
			}
			catch(err) { // handle exception
				throw new AuthenticationError('Invalid/Expired token')
			}
		}
		else { // token does not exist
			throw new Error('Authentication token must be in the format \'Bearer [token]\'') // throw error
		}
	}
	// authentication header does not exist
	throw new Error('Authentication header must be provided') // throw error
}

module.exports = authenticate