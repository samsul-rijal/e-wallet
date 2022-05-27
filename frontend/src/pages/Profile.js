import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from 'react-avatar';
import Topup from '../components/Modal/Topup';
import Transfer from '../components/Modal/Transfer';
import convertRupiah from 'rupiah-format';
import { checkUser } from '../actions/userActions';
import Header from '../components/Header';

const Profile = () => {

    const title = "Profile"
    document.title = 'E-Wallet | ' + title

    const { userResult, userLoading, userError } = useSelector((state) => state.UserReducer)
    const { topupResult } = useSelector((state) => state.WaletReducer)
    const { transferResult } = useSelector((state) => state.TransferReducer)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')

    useEffect(() => {
        if (topupResult) {
            dispatch(checkUser())
            setMessage("Topup berhasil")

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
        if (transferResult) {
            dispatch(checkUser())

        }
    }, [topupResult, transferResult, dispatch])

    return (
        <div>
            <Header title="Profile" />
            <div className='container'>
                <div className='mt-5'>
                    {userResult ?
                        <div className='shadow mx-auto p-5 rounded row col-md-6'>
                            <div className='text-center m-3'>
                                <Avatar name={userResult.name} round={true} />
                            </div>
                            <div className='text-center'>
                                <h5>{userResult.name}</h5>
                                <p>{userResult.email}</p>
                                <h5>Saldo</h5>
                                <h3 className='mb-3'>{convertRupiah.convert(userResult.saldo ? userResult.saldo : '0')}</h3>
                                <Topup title="Top Up" message={message} />
                                <Transfer title="Transfer" />
                            </div>
                        </div>
                        :
                        <>
                            {userLoading ? 'Loading . . .' : userError ? userError : 'Error'}
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile