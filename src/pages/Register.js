import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/userActions'
import { Button, Form } from 'react-bootstrap'
import Header from '../components/Header'

const Register = () => {

    const title = "Register"
    document.title = 'E-Wallet | ' + title

    const { registerResult, registerLoading, registerError } = useSelector((state) => state.UserReducer)
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(registerUser(form))

        setForm({
            name: '',
            email: '',
            password: ''
        })

    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row mt-5 col-md-6 mx-auto shadow p-5'>
                    <div className='col-12'>
                        <h3 className='text-center'>Form Register</h3>
                    </div>

                    <div className='col-12'>
                        {registerResult ?
                            <div class="alert alert-success" role="alert">
                                Register berhasil
                            </div>
                            :
                            registerError
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name='name' value={form.name} onChange={handleChange} placeholder="masukan nama" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' value={form.email} onChange={handleChange} placeholder="masukan email" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' value={form.password} placeholder="masukan password" onChange={handleChange} required />
                            </Form.Group>
                            <div className='d-flex justify-content-end'>
                                <Button type='submit' variant='danger'>{registerLoading ? 'Loading ...':'Register'}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register