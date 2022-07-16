
import { TOPUP_SALDO } from "../../actions/walletActions"

const initialState = {

    topupResult: false,
    topupLoading: false,
    topupError: false,
}

const wallet = (state = initialState, action) => {
    switch (action.type) {

        case TOPUP_SALDO:
            return {
                ...state,
                topupResult: action.payload.data,
                topupLoading: action.payload.loading,
                topupError: action.payload.errorMessage
            }

        default: return state
    }
}

export default wallet
