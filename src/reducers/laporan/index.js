
import { GET_TRANSACTIONS } from "../../actions/laporanActions"

const initialState = {

    laporanResult: false,
    laporanLoading: false,
    laporanError: false,
}

const wallet = (state = initialState, action) => {
    switch (action.type) {

        case GET_TRANSACTIONS:
            return {
                ...state,
                laporanResult: action.payload.data,
                laporanLoading: action.payload.loading,
                laporanError: action.payload.errorMessage
            }

        default: return state
    }
}

export default wallet
