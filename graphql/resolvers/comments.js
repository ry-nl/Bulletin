const { UserInputError, AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post')
const authenticate = require('../../util/authenticate')
const { formatAMPM, formatYMD } = require('../../util/time')

module.exports = {
        Mutation: {
                async createComment(parent, {postId, content}, context, info) {
                        const {id, username} = authenticate(context)

                        if(content.trim() === '') {
                                throw new UserInputError('Empty comment', {
                                        errors: {
                                                content: 'Comment must have content'
                                        }
                                })
                        }

                        const post = await Post.findById(postId)

                        if(!post) throw new UserInputError('Post not found')

                        post.comments.unshift({
                                commenterId: id,
                                commenter: username,
                                content: content,
                                createdAt: formatAMPM(new Date()),
                                createdOn: formatYMD(new Date())
                        })

                        await post.save()
                        return post
                },

                async deleteComment(parent, {postId, commentId}, context, info) {
                        const {username} = authenticate(context)

                        const post = await Post.findById(postId)

                        if(!post) {
                                throw new UserInputError('Post not found')
                        }

                        const commentIndex = post.comments.findIndex(comment => comment._id.toString() == commentId)

                        if(commentIndex === -1) {
                                throw new UserInputError('comment not found')
                        }

                        if(post.comments[commentIndex].commenter === username || post.commenter === username) {
                                post.comments.splice(commentIndex, 1)

                                await post.save()
                                return post
                        }

                        throw new AuthenticationError('User can only delete own comments or comments on own posts')
                }
        }
}
