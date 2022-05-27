import axios from 'axios'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

export const getTransactions = () => {
    return (dispatch) => {
        dispatch({
            type: GET_TRANSACTIONS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        axios({
            method: 'GET',
            url: 'https://sr-wallet-api.herokuapp.com/api/v1/transactions',
            timeout: 120000,
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }).then((response) => {
            dispatch({
                type: GET_TRANSACTIONS,
                payload: {
                    loading: false,
                    data: response.data.data,
                    errorMessage: false
                }
            })

            // console.log(response);

            }).catch((error) => {
                console.log(error);
            })
    }
}