import axios from 'axios'
import { baseURL } from '../config/BaseURL'

export const TOPUP_SALDO = 'TOPUP_SALDO'

export const topupSaldo = (data) => {
    return (dispatch) => {
        dispatch({
            type: TOPUP_SALDO,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        baseURL({
            method: 'PATCH',
            url: '/wallet',
            timemout: 120000,
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
            data: data,
        }).then((response) => {
            dispatch({
                type: TOPUP_SALDO,
                payload: {
                    loading: false,
                    data: response.data.body.saldo,
                    errorMessage: false
                }
            })

        }).catch((error) => {
            dispatch({
                type: TOPUP_SALDO,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
        })
    }
}