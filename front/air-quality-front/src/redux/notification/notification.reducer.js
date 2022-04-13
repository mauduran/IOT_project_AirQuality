import  NotificationActionTypes  from './notification.types';

const INITIAL_STATE = {
    open: false,
    message: '',
    severity: 'success',
    title: "Success"
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NotificationActionTypes.CLOSE_NOTIFICATION:
            return {
                ...state,
                open: false,
                message: "",
                title: "",
            }
        case NotificationActionTypes.OPEN_SUCCESS_NOTIFICATION:
            return {
                ...state,
                open: true,
                severity: "success",
                title: "Success",
                message: action.payload,
            }

        case NotificationActionTypes.OPEN_ERROR_NOTIFICATION:
            return {
                ...state,
                open: true,
                severity: "error",
                title: "Error",
                message: action.payload,
            }
        default: return state;
    }
}

export default userReducer;