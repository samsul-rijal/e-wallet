import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../actions/laporanActions'
import convertRupiah from 'rupiah-format';

import dateFormat from "dateformat";
import Header from '../components/Header';

const Laporan = () => {

    const title = "Laporan"
    document.title = 'E-Wallet | ' + title

    const headerTable = ['Jenis', 'Nominal', 'Penerima', 'Tanggal']
    const { laporanResult, laporanLoading, laporanError } = useSelector((state) => state.LaporanReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])

    // console.log(laporanResult);
    return (
        <div>
            <Header title="Laporan" />
            <div className='container mt-5'>
                <h3 className='mb-3'>Laporan Transaksi</h3>
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

                        {laporanResult ? laporanResult.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{convertRupiah.convert(item.nominal)}</td>
                                { item.receiverUser ?
                                    <td>{item.receiverUser.name} - <i>{item.receiverUser.email}</i></td>
                                    :
                                    <td>-</td>
                                }
                                <td>{dateFormat(item.createdAt, "dddd, d mmmm yyyy, H:MM:ss")}</td>
                            </tr>
                        ))
                            :
                            laporanLoading ? 'Loading ...' :
                            laporanError ? laporanError : 'Data Kosong'
                        }

                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Laporan