import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import '../css/Home.css'
import EditIcon from '@mui/icons-material/Edit'
import { CircularProgress, Fab } from '@mui/material'
import InputBox from '../components/InputBox/InputBox'
import Post from '../components/Post/Post'

import { AuthContext } from '../context/auth'

function Home() {
    const context = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <div className='home'>
            { context.user ?
                <>
                    <InputBox />
                    { loading ?
                        <div className='loading-container'>
                            <CircularProgress className='loading' color="inherit" />
                        </div> :
                        (data.getPosts && data.getPosts.map((post) => {
                            return (
                                <Post
                                    key={post.id}
                                    postId={post.id}
                                    userId={post.poster.id}
                                    username={post.poster.username}
                                    userPic={post.poster.userPic}
                                    timeStamp={post.createdAt}
                                    text={post.content.text}
                                    image={post.content.image}
                                />
                            )
                        }))
                    }
                    <Fab className='post-fab' color="default" aria-label="edit" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}>
                        <EditIcon />
                    </Fab>
                </> :
                <Navigate to='/login' replace />
            }
        </div> 
    )
}

// const FETCH_FEED_QUERY = gql`
//     {
//         getUserFeedPosts(id: userId) {
//             id
//             poster
//             posterId
//             posterPic
//             content {
//                 text
//                 image
//             }
//             likeCount
//             commentCount
//             createdAt
//         }
//     }
// `

const FETCH_POSTS_QUERY = gql`
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
            likeCount
            commentCount
            
            createdAt
            createdOn
        }
    }
`

export default Home