import PhoneActionTypes from './phone.types';

export const registerPhoneStart = (phoneNumber) => ({
    type: PhoneActionTypes.REGISTER_PHONE_START,
    payload: { phoneNumber },
});

export const registerPhoneSuccess = (message) => ({
    type: PhoneActionTypes.REGISTER_PHONE_SUCCESS,
    payload: message,
});

export const registerPhoneFailed = (error) => ({
    type: PhoneActionTypes.REGISTER_PHONE_FAILED,
    payload: error,
});

export const verifyPhoneStart = (phoneNumber, verificationCode) => ({
    type: PhoneActionTypes.VERIFY_PHONE_START,
    payload: {phoneNumber, verificationCode},
});

export const verifyPhoneSuccess = (successfulVerification) => ({
    type: PhoneActionTypes.VERIFY_PHONE_SUCCESS,
    payload: successfulVerification,
});

export const verifyPhoneFailed = (error) => ({
    type: PhoneActionTypes.VERIFY_PHONE_FAILED,
    payload: error,
});