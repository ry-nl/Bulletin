# Bulletin
Social media application project using
*HTML, CSS, JavaScript, NodeJS, ReactJS, GraphQL, MongoDB, and Apollo*

# Directory guide

## client
The React application
### public
Contains index and manifest
### src
- **components**: non-page react components
- **context**: authentication context
- **pages**: page react components used by react router
- **util**: utility functions and graphql queries

## graphql
GraphQL models and resolvers
### resolvers
Resolver functions to be called by queries

## models
Mongoose schemas

## util
Utility functions including user authentication and login/register validation

## public
Contains static elements

## middleware
*currently unused*

# Use guide

## Installing dependencies
- Change working directory to **Bulletin**
- Run *npm i* within both **client** and **server** directories

## Running program
### Server
- Change working directory to **Bulletin**
- **general/development**: *npm run dev* 
- **serving**: *npm run build*

### Client:
- Change working directory to **client**
- **general/development**: *npm run start*
- **serving**: *npm run build*
