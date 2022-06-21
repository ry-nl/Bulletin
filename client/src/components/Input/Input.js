import React from 'react'

import './Input.css'
import { Button } from '@mui/material'
import TextArea from 'react-textarea-autosize';

import { useForm } from '../../util/hooks'


export default function Input({ placeholder, action, handleChange, handleSubmit, data }) {

	return (
		<form className='input-form' onSubmit={ handleSubmit }>
			<TextArea placeholder={ placeholder } type='text' name='text' maxRows={5} value={ data.text } onChange={ handleChange } />
			<Button type='submit' className='input-submit'>{ action }</Button>
		</form>
	)
}
