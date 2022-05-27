import axios from 'axios'

export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const USER_SUCCESS = 'USER_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const GET_USERS = 'GET_USERS'

export const registerUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/v1/register',
            timemout: 120000,
            data: data,
        }).then((response) => {
            dispatch({
                type: REGISTER_USER,
                payload: {
                    loading: false,
                    data: response.data.data,
                    errorMessage: false
                }
            })
            // console.log(response.data.data);

        }).catch((error) => {
            dispatch({
                type: REGISTER_USER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.response.data.error.message
                }
            })
        })
    }
}

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                isLogin: false,
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/v1/login',
            timemout: 120000,
            data: data,
        }).then((response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    isLogin: true,
                    loading: false,
                    data: response.data.data,
                    errorMessage: false
                }
            })
            // console.log(response.data.data);

        }).catch((error) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    isLogin: false,
                    loading: false,
                    data: false,
                    errorMessage: error.response.data.message
                }
            })
            console.log(error.response);
        })
    }
}

export const checkUser = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/v1/check-auth',
            timeout: 120000,
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }).then((response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    isLogin: true,
                    loading: false,
                    data: response.data.data,
                    errorMessage: false
                }
            })

        }).catch((error) => {
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })
            // console.log(error.response);
        })
    }
}

export const getUsers = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/v1/users',
            timeout: 120000,
        }).then((response) => {
            dispatch({
                type: GET_USERS,
                payload: {
                    loading: false,
                    data: response.data.data,
                    errorMessage: false
                }
            })

            // console.log(response);

        }).catch((error) => {
            dispatch({
                type: GET_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.message
                }
            })

        })
    }
}