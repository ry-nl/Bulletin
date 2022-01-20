import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/react-hooks'

import '../css/Register.css'
import { Button, Alert, CircularProgress } from '@mui/material'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth'


function Register() {
    const [errors, setErrors] = useState({})
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { handleChange, handleSubmit, data } = useForm(register, {
        email: '',
        username: '',
        password: '',
        cPassword: ''
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: data
    })

    function register() {
        registerUser();
    }

    return (
        <div className='register'>
            <div className='title'>
                <h1>REGISTER</h1>
            </div>
            <form className='register-form' onSubmit={ handleSubmit }>
                { loading ? 
                    <CircularProgress className='loading' color="inherit" /> : 
                    <>
                        <input className={ !errors.email ? 'register-input' : 'register-input-error' } name='email' placeholder='Email' type='text' value={ data.email } onChange={ handleChange }></input>
                        <input className={ !errors.username ? 'register-input' : 'register-input-error' } name='username' placeholder='Username' type='text' value={ data.username } onChange={ handleChange }></input>
                        <input className={ !errors.password ? 'register-input' : 'register-input-error' } name='password' placeholder='Password' type='password' value={ data.password } onChange={ handleChange }></input>
                        <input className={ !errors.cPassword ? 'register-input' : 'register-input-error' } name='cPassword' placeholder='Confirm Password' type='password' value={ data.cPassword } onChange={ handleChange }></input>
                        <Button type='submit' className='register-submit'>register</Button>
                    </>
                }
                { Object.keys(errors).length > 0 && Object.values(errors).map((error, index) => {
                    return (
                        <Alert key={ index } className='error' variant='filled' severity='error'>
                            { error }
                        </Alert>
                    )
                })}
            </form>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $email: String!
        $username: String!
        $password: String!
        $cPassword: String!
    ) {
        register(
            registerInput: {
                email: $email
                username: $username
                password: $password
                cPassword: $cPassword

            }
        ) {
            id
            email
            username
            userPic
            userBio
            token
        }
    }
`

export default Register