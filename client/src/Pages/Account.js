import React, { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';

import '../css/Account.css'
import EditIcon from '@mui/icons-material/Edit'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import { Button, CircularProgress, Avatar } from '@mui/material'
import Post from '../components/Post/Post'

import { FETCH_USER_POSTS, GET_USER, CHANGE_BIO, CHANGE_PFP } from '../util/queries'
import { useForm } from '../util/hooks'
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
    const { user } = useContext(AuthContext)
    const { username } = useParams()

    const [modalOpen, setModalOpen] = useState('')

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
                                            <ProfileIcon className='button' onClick={()=>{ setModalOpen('pfp') }}/>
                                            <EditIcon className='button' onClick={()=>{ setModalOpen('bio') }}/>
                                    </div>
                                }
                                <Modal className='account-edit' open={ modalOpen !== '' } onClose={()=>{ setModalOpen('') }} >
                                    <Box sx={ modalStyle } className='account-edit-content'>
                                        { modalOpen === 'bio' ?
                                            <>
                                                <p>Change Bio</p>
                                                <form className='account-edit-form' onSubmit={ handleBioSubmit }>
                                                    <input className='account-edit-input' name='content' placeholder='New bio' value={ bioData.content } onChange={ handleBioChange } type='text' />
                                                    <Button type='submit' className='account-edit-submit'>Change Bio</Button>
                                                </form>
                                            </>
                                        : modalOpen === 'pfp' ?
                                            <>
                                                <p>Change PFP</p>
                                                <form className='account-edit-form' onSubmit={ handlePfpSubmit }>
                                                    <input className='account-edit-input' name='image' placeholder='New profile picture' value={ pfpData.image } onChange={ handlePfpChange } type='text' />
                                                    <Button type='submit' className='account-edit-submit'>Change PFP</Button>
                                                </form>
                                            </> :
                                            <>XD</>
                                        }
                                    </Box>
                                </Modal>
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