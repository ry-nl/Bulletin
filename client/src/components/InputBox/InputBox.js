import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import './InputBox.css'
import { Button } from '@mui/material'
import LogoIcon from '@mui/icons-material/SelectAll';
import ImageIcon from '@mui/icons-material/Image'
import TextArea from 'react-textarea-autosize';

import { useForm } from '../../util/hooks'
import { CREATE_POST } from '../../util/queries'


function InputBox() {
    const [inputMode, setInputMode] = useState(true) // true is text, false is image
    const { handleChange, handleSubmit, data } = useForm(post, {
        text: '',
        image: '',
    })

    const [makePost] = useMutation(CREATE_POST, {
        update() {
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
            <form onSubmit={ handleSubmit }>
                <div className='inputbox-form'>
                    { inputMode ? 
                        <TextArea placeholder='Thoughts go here...' type='text' name='text' maxRows={5} value={ data.text } onChange={ handleChange } /> :
                        <TextArea placeholder='Your favorite meme link' type='text' name='image' maxRows={5} value={ data.image } onChange={ handleChange } />
                    }
                </div>
                <div className='inputbox-buttons'>
                    <div className='inputbox-button-icons'>
                        <ImageIcon className={ inputMode ? 'inputbox-button' : 'inputbox-button-active' } onClick={()=>{ setInputMode(!inputMode) }} />
                    </div>
                    <Button type='submit' className='inputbox-submit'>Post</Button>
                </div>
            </form>
        </div>
    )
}

export default InputBox