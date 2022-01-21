const {AuthenticationError, UserInputError} = require('apollo-server')

const User = require('../../models/User')
const authenticate = require('../../util/authenticate')

// FOLLOW METHODS

module.exports = {
    
	// MUTATIONS ----------------------------------------------------------
    Mutation: {
        async follow(parent, { userId, username }, context, info) {
			if(!userId && !username) throw new Error('Empty fields')
			else if((userId && userId.toString().trim() === '') && (username && username.trim() === '')) throw new Error('Empty fields')

            const { id } = authenticate(context) 

            try {
                const thisUser = await User.findById(id)
                let otherUser = null

                if(userId) otherUser = await User.findById(userId).populate('followers').populate('following')
                else otherUser = await User.findOne({ username }).populate('followers').populate('following')

                if(!otherUser) throw new Error('One or more users not found')

                if(thisUser && otherUser) {
                    const thisUserIndex = thisUser.following.indexOf(otherUser._id)
                    const otherUserIndex = otherUser.followers.indexOf(thisUser._id)

                    if(thisUserIndex === -1 && otherUserIndex === -1) {
                        thisUser.following.push(otherUser)
                        otherUser.followers.push(thisUser)
                    }
                    else {
						thisUser.following.splice(thisUserIndex, 1)
						otherUser.followers.splice(otherUserIndex, 1)
                    }
                }
                else throw new Error('One or more users not found')

                await thisUser.save()
                return await otherUser.save()
            }
            catch(err) {
                throw new Error(err)
            }
        }
    }
}