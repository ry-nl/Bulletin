import React, { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import '../css/Home.css'
import EditIcon from '@mui/icons-material/Edit'
import { CircularProgress, Fab } from '@mui/material'
import InputBox from '../components/InputBox/InputBox'
import Post from '../components/Post/Post'

import { FETCH_POSTS_QUERY } from '../util/queries'
import { AuthContext } from '../context/auth'


function Home() {
    const context = useContext(AuthContext)

    const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY)

    useEffect(() => { refetch() }, [refetch])

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
                                    likes={post.likes}
                                    numLikes={post.likeCount}
                                    numComments={post.commentCount}
                                    createdAt={post.createdAt}
                                    createdOn={post.createdOn}
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

export default Home