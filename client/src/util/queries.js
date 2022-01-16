import gql from 'graphql-tag'

export const FETCH_USER_POSTS = gql`
    query getUserPosts(
        $quantity: Int!
        $startingIndex: Int!
        $userId: ID
        $username: String
    ) {
        getUserPosts(
            quantity: $quantity
            startingIndex: $startingIndex
            userId: $userId
            username: $username
        ){
            id
            content {
                text
                image
            }
            likeCount
            commentCount
            
            createdAt
            createdOn
        }
    }
`

export const GET_USER = gql`
    query getUser(
        $userId: ID
        $username: String
    ) {
        getUser(
            userId: $userId
            username: $username
        ) {
            id
            username
            userPic
            userBio
            followerCount
            followingCount
            followers {
                id
            }
            following {
                id
            }
        }
    }
`

export const LIKE_POST = gql`
    mutation likePost(
        $postId: ID!
    ) {
        likePost(postId: $postId) {
            likes {
                likerId
            }
            likeCount
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost(
        $postId: ID!
    ) {
        deletePost(postId: $postId)
    }
`
