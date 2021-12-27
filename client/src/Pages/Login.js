import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/react-hooks'

import '../css/Login.css'
import { Button, Alert, CircularProgress } from '@mui/material'
import { useForm } from '../util/hooks'

import { AuthContext } from '../context/auth'


function Login() {
    const [errors, setErrors] = useState({})
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { handleChange, handleSubmit, data } = useForm(login, {
        username: '',
        password: '',
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: data
    })

    function login() {
        loginUser();
    }

    return (
        <div className='login'>
            <div className='title'>
                <h1>LOG IN</h1>
            </div>
            <form className='login-form' onSubmit={handleSubmit}>
                { loading ? 
                    <CircularProgress className='loading' color="inherit" /> : 
                    <>
                        <input className={!errors.username ? 'login-input' : 'login-input-error'} name='username' placeholder='Username' type='text' value={data.username} onChange={handleChange}></input>
                        <input className={!errors.password ? 'login-input' : 'login-input-error'} name='password' placeholder='Password' type='password' value={data.password} onChange={handleChange}></input>
                        <Button type='submit' className='login-submit'>log in</Button>
                        <Link className='register-container' to='/register' style={{'textDecoration': 'none', 'color': 'white'}}>
                            <Button className='register-link'>register</Button>
                        </Link>
                    </>
                }
                { Object.keys(errors).length > 0 && Object.values(errors).map((error, index) => {
                    return (
                        <Alert key={index} className='error' variant='filled' severity='error'>
                            {error}
                        </Alert>
                    )
                })}
            </form>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            username
            userPic
            token
        }
    }
`

export default Login