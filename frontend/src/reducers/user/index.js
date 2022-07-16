
import { REGISTER_USER, LOGIN_SUCCESS, USER_SUCCESS, GET_USERS } from "../../actions/userActions"

const initialState = {

    registerResult: false,
    registerLoading: false,
    registerError: false,

    isLogin: false,
    userResult: false,
    userLoading: false,
    userError: false,

    getUsersResult: false,
    getUsersLoading: false,
    getUsersError: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER:
            return {
                ...state,
                registerResult: action.payload.data,
                registerLoading: action.payload.loading,
                registerError: action.payload.errorMessage
            }
        
        case USER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.data.token);
            return {
                ...state,
                isLogin: action.payload.isLogin,
                userResult: action.payload.data,
                userLoading: action.payload.loading,
                userError: action.payload.errorMessage
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                isLogin: false,
                userResult: false,
            };

        case GET_USERS:
            return {
                ...state,
                getUsersResult: action.payload.data,
                getUsersLoading: action.payload.loading,
                getUsersError: action.payload.errorMessage
            }

        default: return state
    }
}

export default user
