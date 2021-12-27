import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
    const [data, setData] = useState(initialState)

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        callback()
    }

    return { handleChange, handleSubmit, data }
}