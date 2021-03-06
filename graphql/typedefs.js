const {gql} = require('graphql-tag')

// GQL TABLE DEFINITIONS

const typeDefs = gql`

	# MODELS -----------------------------------------------------
	type Post {
		id: ID!
		createdOn: String!
		createdAt: String!

		content: Content!
		poster: User!
		
		likes: [Like]!
		comments: [Comment]!

		likeCount: Int!
		commentCount: Int!
	}
	type Content {
		text: String,
		image: String
	}
	type Comment {
		id: ID!
		createdOn: String!
		createdAt: String!
		commenterId: String!
		commenter: String!
		content: String!
	}
	type Like {
		createdOn: String!
		createdAt: String!
		likerId: String!
		liker: String!
	}
	type User {
		id: ID!
		createdOn: String!
		createdAt: String!

		username: String!
		password: String!
		email: String!

		userPic: String!
		userBio: String!

		followers: [User]!
		following: [User]!

		followerCount: Int!
		followingCount: Int!

		posts: [Post]!
		bookmarks: [Post]!

		token: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		cPassword: String!
		email: String!
	}

	# QUERIES AND MUTATIONS -----------------------------------------
	type Query {
		# posts
		getPosts: [Post]
		getPost(postId: ID!): Post
		getUserPosts(quantity: Int!, startingIndex: Int!, userId: ID, username: String): [Post]!
		getUserFeedPosts(quantity: Int!, startingIndex: Int!): [Post]!

		# users
		getUsers: [User]
		getUser(userId: ID, username: String): User
	}

	type Mutation {
		# login and registration
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!

		# profile
		changeUserBio(content: String!): User!
		changeUserPic(image: String!): User!

		# posts
		createPost(text: String, image: String): Post!
		deletePost(postId: ID!): String!

		# comments
		createComment(postId: ID!, content: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!

		# likes
		likePost(postId: ID!): Post!

		# follows
		follow(userId: ID, username: String): User!
	}
`

module.exports = typeDefs
