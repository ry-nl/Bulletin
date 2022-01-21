import gql from 'graphql-tag'

// USER QUERIES --------------------------------------

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

// USER MUTATIONS --------------------------------------

export const REGISTER_USER = gql`
    mutation register(
        $email: String!
        $username: String!
        $password: String!
        $cPassword: String!
    ) {
        register(
            registerInput: {
                email: $email
                username: $username
                password: $password
                cPassword: $cPassword

            }
        ) {
            id
            email
            username
            userPic
            userBio
            token
        }
    }
`

export const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            username
            userPic
            userBio
            token
        }
    }
`

export const CHANGE_BIO = gql`
    mutation changeUserBio(
        $content: String!
    ) {
        changeUserBio(content: $content) {
            id
            username
            userBio
        }
    }
`

export const CHANGE_PFP = gql`
    mutation changeUserPic(
        $image: String!
    ) {
        changeUserPic(image: $image) {
            id
            username
            userPic
        }
    }
`

// POST QUERIES --------------------------------------

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

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            poster {
                id
                username
                userPic
            }
            content {
                text
                image
            }
            likes {
                likerId
            }
            likeCount
            commentCount
            
            createdAt
            createdOn
        }
    }
`

// POST MUTATIONS --------------------------------------

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
