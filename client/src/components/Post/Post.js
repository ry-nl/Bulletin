import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import './Post.css'
import Avatar from '@mui/material/Avatar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/SendRounded';
import DeleteIcon from '@mui/icons-material/Delete'

import Input from '../Input/Input'

import { formatYMD } from '../../util/time'
import { DELETE_POST, LIKE_POST, CREATE_COMMENT } from '../../util/queries'
import { useForm } from '../../util/hooks'
import { AuthContext } from '../../context/auth'


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


function Post({ postId, userId, userPic, username, text, image, createdOn, createdAt, likes, numLikes, comments, numComments }) {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(numLikes)


    // COMMENT MUTATION ----------------------------------------
    const [commentCount, setCommentCount] = useState(numComments)
    
    const { handleChange, handleSubmit, data } = useForm(comment, {
        text: '',
    })

    const [makeComment] = useMutation(CREATE_COMMENT, {
        update() {
            window.location.reload(false)
        },
        variables: {
            postId, 
            content: data.text
        }
    })

    function comment() {
        makeComment()
    }

    console.log(comments)


    // POST MUTATION -----------------------------------
    const [deletePost] = useMutation(DELETE_POST, {
        update() {
            window.location.reload(false)
        },
        onError(err) {
            console.log(err)
        },
        variables: {
            postId
        }
    })

    const [likePost] = useMutation(LIKE_POST, {
        update(_, { data: { likePost: post }}) {
            if(post) setLikeCount(post.likeCount)
        },
        onError(err) {
            console.log(err)
        },
        variables: {
            postId
        }
    })

    function handleLike() {
        likePost()
        setLiked(!liked)
    }

    useEffect(() => {
        if(likes && likes.find(like => like.likerId === user.id)) setLiked(true)
        else setLiked(false)
    }, [user, likes])


    return (
        <div className='post'>
            <div className='post-header'>
                <span className='userinfo'>
                    <Avatar src={ userPic } onClick={() => { navigate(`/account/${ username }`) }} />
                    <h3 onClick={() => { navigate(`/account/${ username }`) }}>{ username }</h3>
                </span>
                <h3>{ formatYMD(new Date()) === createdOn ? createdAt : createdOn }</h3>
            </div>
            <div className='post-content'>
                <p>{text}</p>
                <img src={image} alt=''></img>
            </div>
            <span className='post-links'>
                <FavoriteIcon className={ liked ? 'post-icon active-like' : 'post-icon' } onClick={ handleLike } />
                <p>{ likeCount }</p>
                <CommentIcon className='post-icon' onClick={()=> { setCommentsOpen(true) }} />
                <p>{ commentCount }</p>
                <Modal className='comments' open={ commentsOpen } onClose={()=>{ setCommentsOpen(false) }}>
                    <Box sx={ modalStyle } className='comment-content'>
                        { comments && comments.map((comment) => {
                            return (
                                <div key={ comment.id}>
                                    <h3>{ comment.commenter }</h3>
                                    <p>{ comment.content }</p>
                                    <p>{ comment.createdOn }</p>
                                </div>
                            )
                        })}
                        <Input placeholder='What do you think?' action='Comment' handleChange={ handleChange } handleSubmit={ handleSubmit } data={ data }/>
                    </Box>
                </Modal>
                <BookmarkIcon className='post-icon' />
                <ShareIcon className='post-icon' style={{ 'marginLeft': '25px' }} />
                { user.id === userId &&
                    <DeleteIcon className='post-icon' onClick={ deletePost } style={{ 'marginLeft': '20px' }} />
                }
            </span>
        </div>
    )
}

export default Post