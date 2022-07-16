import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../actions/laporanActions'
import convertRupiah from 'rupiah-format';

import moment from 'moment'
import idLocale from 'moment/locale/id'; 

import Header from '../components/Header';

const Laporan = () => {

    const title = "Laporan"
    document.title = 'E-Wallet | ' + title

    const headerTable = ['Jenis', 'Nominal', 'Pengirim', 'Penerima', 'Tanggal']
    const { laporanResult, laporanLoading, laporanError } = useSelector((state) => state.LaporanReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])

    moment.updateLocale('id', idLocale);

    return (
        <div>
            <Header title="Laporan" />
            <div className='container mt-5'>
                <h3 className='mb-3'>Laporan Transaksi</h3>
                {
                    laporanResult ? 
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {headerTable.map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            
                            <tbody>
                                {laporanResult.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.type}</td>
                                            <td>{convertRupiah.convert(item.nominal)}</td>
                                            <td>{item.senderUser.name} - <i>{item.senderUser.email}</i></td>
                                            <td>{item.receiverUser.name} - <i>{item.receiverUser.email}</i></td>
                                            <td>{moment(item.createdAt).format('dddd, Do MMMM YYYY, H:mm')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </Table>
                    :

                    laporanLoading ? <h3 className='mt-5 text-center text-danger'>Loading ...</h3> :
                    laporanError ? laporanError : <h3 className='mt-5 text-center text-danger'>'Data Kosong'</h3>
                }
            </div>
        </div>
    )
}

export default Laporan