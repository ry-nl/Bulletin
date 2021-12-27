const {UserInputError} = require('apollo-server')

const Post = require('../../models/Post')
const authenticate = require('../../util/authenticate')
const { formatAMPM, formatYMD } = require('../../util/time')

module.exports = {
        Mutation: {
                async likePost(parent, {postId}, context, info) {
                        const {id, username} = authenticate(context)

                        const post = await Post.findById(postId)

                        if(!post) throw new UserInputError('Post does not exist')

                        const likeIndex = post.likes.findIndex(like => like.liker === username)

                        if(likeIndex !== -1) post.likes.splice(likeIndex, 1)
                        else {
                                post.likes.push({
                                        likerId: id,
                                        liker: username,
                                        createdAt: formatAMPM(new Date()),
                                        createdOn: formatYMD(new Date())
                                })
                        }

                        await post.save()
                        return post
                }
        }
}
