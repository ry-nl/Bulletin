const {AuthenticationError, UserInputError} = require('apollo-server')

const User = require('../../models/User')
const authenticate = require('../../util/authenticate')

// FOLLOW METHODS

module.exports = {
    Mutation: {
        async follow(parent, { userId }, context, info) {
            const {id} = authenticate(context) 

            try {
                const thisUser = await User.findById(id)
                const otherUser = await User.findById(userId)

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