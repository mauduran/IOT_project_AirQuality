import PhoneActionTypes from './phone.types';

const INITIAL_STATE = {
    number: null,
    error: null,
    successMessage: null,
    waitingForVerification: false,
    registeringPhone: false,
    verifyingCode: false,
}

const phoneReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PhoneActionTypes.VERIFY_PHONE_SUCCESS:
            return {
                ...state,
                number: action.payload.phoneNumber,
                error: null,
                successMessage: action.payload.message,
                waitingForVerification: false,
                verifyingCode: false,
            }
        case PhoneActionTypes.REGISTER_PHONE_SUCCESS:
            return {
                ...state,
                number: null,
                error: null,
                successMessage: null,
                waitingForVerification: true,
                registeringPhone: false,
            }

        case PhoneActionTypes.REGISTER_PHONE_START:
            return {
                ...state,
                registeringPhone: true,
            }
        
        case PhoneActionTypes.VERIFY_PHONE_START:
            return {
                ...state,
                verifyingCode: true,
            }

        case PhoneActionTypes.REGISTER_PHONE_FAILED:
        case PhoneActionTypes.VERIFY_PHONE_FAILED:
            return {
                ...state,
                error: action.payload,
                successMessage: null,
                number: null,
                waitingForVerification: false,
                registeringPhone: false,
                verifyingCode: false,
            }
        default: return state;
    }
}

export default phoneReducer;