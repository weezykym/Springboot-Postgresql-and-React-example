import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })

    const { name, username, email } = user

    const onInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        await axios.post("http://localhost:8080/api/addUser", user)    //perfoms the posting function
        navigate("/")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounder p-4 mt-2 shadow'>
                    <h3>Register User</h3>
                    <form onSubmit = {(event)=> onSubmit(event)}>
                        <div className='m-2'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={(event) => onInputChange(event)} />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='form-label'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter username'
                                name='username'
                                value={username}
                                onChange={(event) => onInputChange(event)} />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='form-label'>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter email address'
                                name='email'
                                value={email}
                                onChange={(event) => onInputChange(event)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary m-2'>Submit</button>

                        <button type='cancel' className='btn btn-outline-danger mx-2'>Cancel</button>
                    </form>

                </div>

            </div>

        </div>
    );
}
