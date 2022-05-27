
import { TRANSFER_SALDO } from "../../actions/transferActions"

const initialState = {

    transferResult: false,
    transferLoading: false,
    transferError: false,
}

const wallet = (state = initialState, action) => {
    switch (action.type) {

        case TRANSFER_SALDO:
            return {
                ...state,
                transferResult: action.payload.data,
                transferLoading: action.payload.loading,
                transferError: action.payload.errorMessage
            }

        default: return state
    }
}

export default wallet
