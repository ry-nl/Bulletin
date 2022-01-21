import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import './Post.css'
import Avatar from '@mui/material/Avatar'
import Modal from '@mui/material/Modal'
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/SendRounded';
import DeleteIcon from '@mui/icons-material/Delete'

import { formatYMD } from '../../util/time'
import { DELETE_POST, LIKE_POST } from '../../util/queries'
import { AuthContext } from '../../context/auth'


function Post({ postId, userId, userPic, username, text, image, createdOn, createdAt, likes, numLikes, comments, numComments}) {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(numLikes)
    const [commentCount, setCommentCount] = useState(numComments)

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
                    <Avatar src={userPic} onClick={() => { navigate(`/account/${username}`) }} />
                    <h3 onClick={() => { navigate(`/account/${username}`) }}>{username}</h3>
                </span>
                <h3>{ formatYMD(new Date()) === createdOn ? createdAt : createdOn}</h3>
            </div>
            <div className='post-content'>
                <p>{text}</p>
                <img src={image} alt=''></img>
            </div>
            <span className='post-links'>
                <FavoriteIcon className={ liked ? 'post-icon active-like' : 'post-icon' } onClick={ handleLike } />
                <p>{likeCount}</p>
                <CommentIcon className='post-icon' onClick={()=> { setCommentsOpen(true) }} />
                <p>{commentCount}</p>
                <Modal open={commentsOpen} onClose={()=>{ setCommentsOpen(false) }}>
                    <h1>Comments</h1>
                </Modal>
                <BookmarkIcon className='post-icon' />
                <ShareIcon className='post-icon' style={{ 'marginLeft': '25px' }} />
                { user.id === userId &&
                    <DeleteIcon className='post-icon' onClick={deletePost} style={{ 'marginLeft': '20px' }} />
                }
            </span>
        </div>
    )
}

export default Post