const initState = {
    loginError: null,
    changePassError: null,
    signupError: null,
    reload: null,
    updated: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state;
        case 'CHANGE_PASS_SUCCESS':
            return {
                ...state,
                changePassSuccess: true
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: 'Wrong credentials, please try again!'
            }
        case 'USER_UPDATED':
            return {
                ...state,
                updated: true
            }
        case 'USER_DELETED':
            return {
                ...state,
                reload: true
            }
        case "LOGOUT_SUCCESS":
            return state;
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                signupError: "no"
            }
        case "USER_REMOVED":
            return {
                ...state,
                reload: true
            }
        case "SIGNUP_ERROR":
            return {
                ...state,
                signupError: action.signupError
            }
        case "CHANGE_PASS_ERROR":
            return {
                ...state,
                changePassError: action.error
            }
        case "CLEAR_MESSAGES":
            return {
                ...state,
                changePassError: null,
                changePassSuccess: null
            }
        default:
            return state;
    }

}

export default authReducer;