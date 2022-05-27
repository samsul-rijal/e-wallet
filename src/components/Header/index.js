import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {

    const { isLogin } = useSelector((state) => state.UserReducer)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });  
        navigate("/login")
    }

    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="#">E-Wallet</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">

                            {isLogin ?
                                <>
                                    <Nav.Link as={Link} to="/profile" className={props?.title === 'Profile' ? `text-danger` : `text-dark`}>Profile</Nav.Link>                                    
                                    <Nav.Link as={Link} to="/laporan" className={props?.title === 'Laporan' ? `text-danger` : `text-dark`}>Laporan</Nav.Link>
                                    <Button variant='danger' size='sm' className='ms-2' onClick={handleLogout}>Keluar</Button>

                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <Button variant='primary' size='sm' className='me-2'>Login</Button>
                                    </Link>

                                    <Link to="/register">
                                        <Button variant='danger' size='sm'>Register</Button>
                                    </Link>

                                </>
                            }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header