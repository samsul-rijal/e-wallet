import axios from 'axios'

export const TRANSFER_SALDO = 'TRANSFER_SALDO'

export const transferSaldo = (data) => {
    return (dispatch) => {
        dispatch({
            type: TRANSFER_SALDO,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/v1/transaction',
            timemout: 120000,
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
            data: data,
        }).then((response) => {
            dispatch({
                type: TRANSFER_SALDO,
                payload: {
                    loading: false,
                    data: response.data.dataTransaksi,
                    errorMessage: false
                }
            })
            // console.log(response.error);

        }).catch((error) => {
            dispatch({
                type: TRANSFER_SALDO,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.response.data.message
                }
            })            
        })
    }
}