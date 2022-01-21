import React, { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'

import '../css/Account.css'
import EditIcon from '@mui/icons-material/Edit'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import { Button, CircularProgress, Avatar } from '@mui/material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import Post from '../components/Post/Post'

import { useForm } from '../util/hooks'
import { FETCH_USER_POSTS, GET_USER, CHANGE_BIO, CHANGE_PFP, FOLLOW_USER } from '../util/queries'
import { AuthContext } from '../context/auth'


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#212121',
    p: 4,
    outline: 'none',
};


function Account() {
    
    window.scrollTo({ top: 0 });

    const { user } = useContext(AuthContext)
    const { username } = useParams()

    const [modalOpen, setModalOpen] = useState('')

    // EDIT ACCOUNT FORMS ----------------------------------

    const { handleChange: handleBioChange, handleSubmit: handleBioSubmit, data: bioData } = useForm(newBio, {
        content: ''
    })

    const { handleChange: handlePfpChange, handleSubmit: handlePfpSubmit, data: pfpData } = useForm(newPfp, {
        image: ''
    })

    const [createNewBio] = useMutation(CHANGE_BIO, {
        update() {
            window.location.reload()
        },
        variables: bioData
    })

    const [createNewPfp] = useMutation(CHANGE_PFP, {
        update() {
            window.location.reload()
        },
        variables: pfpData
    })

    function newBio() {
        createNewBio();
    }

    function newPfp() {
        createNewPfp();
    }

    // FOLLOW USER ----------------------------------

    const [followUser] = useMutation(FOLLOW_USER, {
        variables: username
    })

    // GET USER POSTS ----------------------------------

    const { loadingUser, data: userData } = useQuery(GET_USER, {
        variables: {
            username: username,
            userId: ''
        }
    })

    const { loadingPosts, data: postData } = useQuery(FETCH_USER_POSTS, {
        variables: {
            quantity: 5,
            startingIndex: 0,
            username: username,
            userId: ''
        }
    })

    // RENDERING ----------------------------------

    return (
        <div className='account'>

            { user ?    // if user is logged in render account page, else redirect to login
                loadingPosts || loadingUser ?   // if feed is loading display loading, else display feed
                    <div className='loading-container'>
                        <CircularProgress className='loading' color="inherit" />
                    </div> :


                    <>
                        {/* account header */}
                        <div className='account-header'>
                            <Avatar className='userpic' src={ userData && userData.getUser.userPic }/>

                            <div>
                                <div className='account-header-container'>
                                    <h1 className='username'>{ userData && userData.getUser.username }</h1>
                                    { user.username !== username && 
                                        <p className='follow' onClick={()=>{ followUser() }}>Follow</p>    // render follow button for other accounts
                                    }
                                </div>
                                <p className='userbio'>{ userData && userData.getUser.userBio }</p>
                            </div>
                            
                            { userData && (userData.getUser.id === user.id) &&      // if viewing own page display edit buttons
                                <div className='header-buttons'>
                                        <ProfileIcon className='button' onClick={()=>{ setModalOpen('pfp') }}/>
                                        <EditIcon className='button' onClick={()=>{ setModalOpen('bio') }}/>
                                </div>
                            }


                            {/* popup for account edit buttons */}
                            <Modal className='account-edit' open={ modalOpen !== '' } onClose={()=>{ setModalOpen('') }} >
                                <Box sx={ modalStyle } className='account-edit-content'>
                                    { modalOpen === 'bio' ?     // bio modal
                                        <>
                                            <p>Change Bio</p>
                                            <form className='account-edit-form' onSubmit={ handleBioSubmit }>
                                                <input className='account-edit-input' name='content' placeholder='New bio' value={ bioData.content } onChange={ handleBioChange } type='text' />
                                                <Button type='submit' className='account-edit-submit'>Change Bio</Button>
                                            </form>
                                        </>
                                    : modalOpen === 'pfp' ?     // pfp modal
                                        <>
                                            <p>Change PFP</p>
                                            <form className='account-edit-form' onSubmit={ handlePfpSubmit }>
                                                <input className='account-edit-input' name='image' placeholder='New profile picture' value={ pfpData.image } onChange={ handlePfpChange } type='text' />
                                                <Button type='submit' className='account-edit-submit'>Change PFP</Button>
                                            </form>
                                        </> : <></>
                                    }
                                </Box>
                            </Modal>
                        </div>
                        

                        {/* user posts */}
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