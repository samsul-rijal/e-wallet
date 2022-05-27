import { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { transferSaldo } from '../../actions/transferActions'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/userActions';

function Transfer(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { transferResult, transferError } = useSelector((state) => state.TransferReducer)
    const { getUsersResult, getUsersLoading, getUsersError } = useSelector((state) => state.UserReducer)
    const { userResult } = useSelector((state) => state.UserReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const [form, setForm] = useState({
        receiver: '',
        nominal: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // console.log(transferResult);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(transferSaldo(form))

        setTimeout(() => {
            setForm({
                receiver: '',
                nominal: ''
            })
            setShow(false)
        }, 3000)
    }

    return (
        <>
            <Button className='text-white me-3 mb-3' variant="primary" onClick={handleShow}>
                {props.title}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer Saldo</Modal.Title>
                </Modal.Header>
                {transferResult ?
                    <span className="alert alert-success  mx-2 mt-2" role="alert">
                        Transfer Berhasil
                    </span>
                    :
                    transferError ?
                        <span className="alert alert-danger  mx-2 mt-2" role="alert">
                            {transferError}
                        </span>
                        :
                        <></>
                }

                <Modal.Body>
                    <Form>
                        <Form.Label>Pilih Akun Penerima</Form.Label>
                        <Form.Select onChange={handleChange} value={form.receiver} name="receiver" aria-label="Email Akun">
                            <option>Email Akun</option>

                            {getUsersResult ?
                                <>
                                    {getUsersResult.filter(user => user.id !== userResult.id).map((users) => (
                                        <option value={users.id} key={users.id}>{users.email}</option>
                                    ))}
                                </>
                                :
                                getUsersLoading ? 'Loading . . .' :
                                    getUsersError ? getUsersError :
                                        <span>Data Kosong</span>
                            }
                        </Form.Select>
                        <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Masukan Jumlah Saldo</Form.Label>
                            <Form.Control type="number" name='nominal' value={form.nominal} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Transfer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Transfer