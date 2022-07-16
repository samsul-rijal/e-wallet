import axios from 'axios'

export const baseURL = axios.create({
    baseURL: "https://sr-wallet-api.herokuapp.com/api/v1/"
})