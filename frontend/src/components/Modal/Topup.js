import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { topupSaldo } from '../../actions/walletActions'

function Topup(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const [saldo, setSaldo] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(topupSaldo({saldo}))

        setTimeout(() => {
            setShow(false)
            setSaldo(0)
        },2000)
    }

    return (
        <>
            <Button className='text-white me-3 mb-3' variant="primary" onClick={handleShow}>
                {props.title}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Topup Saldo</Modal.Title>
                </Modal.Header>
                {props.message ? 
                        <span className="alert alert-success  mx-2 mt-2" role="alert">
                            {props.message}
                        </span>
                        :
                        <>
                        </>
                }
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Masukan Jumlah Saldo</Form.Label>
                            <Form.Control type="number" name='saldo' value={saldo} onChange={(e) => setSaldo(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Topup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Topup