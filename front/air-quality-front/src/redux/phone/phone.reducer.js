import PhoneActionTypes from './phone.types';

const INITIAL_STATE = {
    number: null,
    error: null,
    successMessage: null,
    waitingForVerification: false,
}
const phoneReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PhoneActionTypes.VERIFY_PHONE_SUCCESS:
            return {
                ...state,
                number: action.payload.phoneNumber,
                error: null,
                successMessage: action.payload.message,
                waitingForVerification: false
            }
        case PhoneActionTypes.REGISTER_PHONE_SUCCESS:
            return {
                ...state,
                number: null,
                error: null,
                successMessage: null,
                waitingForVerification: true
            }

        case PhoneActionTypes.REGISTER_PHONE_FAILED:
        case PhoneActionTypes.VERIFY_PHONE_FAILED:
            return {
                ...state,
                error: action.payload,
                successMessage: null,
                number: null,
                waitingForVerification: false
            }
        default: return state;
    }
}

export default phoneReducer;