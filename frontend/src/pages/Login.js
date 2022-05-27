import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Login = () => {

    const title = "Login"
    document.title = 'E-Wallet | ' + title

    const { userLoading, userError } = useSelector((state) => state.UserReducer)
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(loginUser(form))
        setForm({
            email: '',
            password: ''
        })

        if(localStorage.token===undefined){
            navigate('/login')
        } else {
            navigate('/profile')
        }
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row mt-5 col-md-6 mx-auto shadow p-5'>
                    <div className='col-12 '>
                        <h3 className='text-center'>Form Login</h3>
                    </div>

                    {userError ? 
                        <div class="alert alert-danger" role="alert">
                            {userError}
                        </div>
                        :
                        <></>
                    }

                    <div className='col-12 col-sm-12'>
                        {userError ? userError : ''}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' value={form.email} onChange={handleChange} placeholder="masukan email" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' value={form.password} placeholder="masukan password" onChange={handleChange} required />
                            </Form.Group>
                            <div className='d-flex justify-content-end'>
                                <Button type='submit' variant='primary'>{userLoading ? 'Loading ...':'Login'}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login