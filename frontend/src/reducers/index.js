import { combineReducers } from 'redux'
import UserReducer from './user'
import WaletReducer from './wallet'
import TransferReducer from './transfer'
import LaporanReducer from './laporan'


export default combineReducers({
    UserReducer,
    WaletReducer,
    TransferReducer,
    LaporanReducer
})