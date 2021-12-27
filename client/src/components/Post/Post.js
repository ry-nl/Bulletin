import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import './Post.css'
import Avatar from '@mui/material/Avatar'
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/SendRounded';
import DeleteIcon from '@mui/icons-material/Delete'

import { AuthContext } from '../../context/auth'

function Post({ postId, userId, userPic, username, text, image, timeStamp, likes, numLikes, comments, numComments}) {
    const { user } = useContext(AuthContext)

    console.log(postId)

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy, data) {
            window.location.reload(false)
        },
        variables: {
            postId
        }
    })

    return (
        <div className='post'>
            <div className='post-header'>
                <span className='userinfo'>
                    <Avatar src={userPic}></Avatar>
                    <h3>{username}</h3>
                </span>
                <h3>{timeStamp}</h3>
            </div>
            <div className='post-content'>
                <p>{text}</p>
                <img src={image} alt=''></img>
            </div>
            <span className='post-links'>
                <FavoriteIcon className='post-icon' />
                <BookmarkIcon className='post-icon' />
                <CommentIcon className='post-icon' />
                <ShareIcon className='post-icon' />
                { user.id === userId &&
                    <DeleteIcon className='post-icon' onClick={deletePost} />
                }
            </span>
        </div>
    )
}

const DELETE_POST = gql`
    mutation deletePost(
        $postId: ID!
    ) {
        deletePost(postId: $postId)
    }
`

export default Post