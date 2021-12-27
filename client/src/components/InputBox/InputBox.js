import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import './InputBox.css'
import { Button } from '@mui/material'
import LogoIcon from '@mui/icons-material/SelectAll';
import TextArea from 'react-textarea-autosize';
import { useForm } from '../../util/hooks'

function InputBox() {
    const { handleChange, handleSubmit, data } = useForm(post, {
        text: '',
        image: '',
    })

    const [makePost] = useMutation(CREATE_POST, {
        update(proxy, data) {
            window.location.reload(false)
        },
        variables: data
    })

    function post() {
        makePost()
    }

    return (
        <div className='inputbox'>
            <div className='logo-container'>
                <LogoIcon className='logo'/>
                <p>Bulletin</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inputbox-form'>
                    <TextArea placeholder='Thoughts go here...' type='text' name='text' maxRows={5} value={data.text} onChange={handleChange} />
                </div>
                <div className='inputbox-buttons'>
                    <div className='inputbox-button-icons'>
                        
                    </div>
                    <Button type='submit' className='inputbox-submit'>Post</Button>
                </div>
            </form>
        </div>
    )
}

const CREATE_POST = gql`
    mutation createPost(
        $text: String
        $image: String
    ) {
        createPost(
            text: $text,
            image: $image
        ) {
            id
            content {
                text
                image
            }
        }
    }
`


export default InputBox