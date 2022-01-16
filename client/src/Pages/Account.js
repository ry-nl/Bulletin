import React, { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'

import '../css/Account.css'
import EditIcon from '@mui/icons-material/Edit'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import { CircularProgress, Avatar } from '@mui/material'
import Post from '../components/Post/Post'

import { FETCH_USER_POSTS, GET_USER } from '../util/queries'
import { AuthContext } from '../context/auth'


function Account() {
    const { user } = useContext(AuthContext)
    const { username } = useParams()
    const { loadingPosts, data: postData } = useQuery(FETCH_USER_POSTS, {
        variables: {
            quantity: 5,
            startingIndex: 0,
            username: username,
            userId: ''
        }
    })

    const { loadingUser, data: userData } = useQuery(GET_USER, {
        variables: {
            username: username,
            userId: ''
        }
    })

    console.log(postData)

    return (
        <div className='account'>
                { user ?
                    loadingPosts || loadingUser ?
                        <div className='loading-container'>
                            <CircularProgress className='loading' color="inherit" />
                        </div> :
                        <>
                            <div className='account-header'>
                                <Avatar className='userpic' src={userData && userData.getUser.userPic}/>
                                <div>
                                    <h1 className='username'>{userData && userData.getUser.username}</h1>
                                    <p className='userbio'>{userData && userData.getUser.userBio}</p>
                                </div>
                                { userData && (userData.getUser.id === user.id) &&
                                    <div className='header-buttons'>
                                            <ProfileIcon className='button' />
                                            <EditIcon className='button' />
                                    </div>
                                }
                            </div>
                            {(postData && userData && postData.getUserPosts.length > 0) ? postData.getUserPosts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        postId={post.id}
                                        userId={userData.getUser.id}
                                        username={userData.getUser.username}
                                        userPic={userData.getUser.userPic}
                                        createdAt={post.createdAt}
                                        createdOn={post.createdOn}
                                        text={post.content.text}
                                        image={post.content.image}
                                    />
                                )}):
                                <div className='no-posts'>
                                    <h2>No posts yet</h2>
                                </div>
                            }
                        </>:

                    <Navigate to='/login' replace />
                }
        </div>
    )
}

export default Account