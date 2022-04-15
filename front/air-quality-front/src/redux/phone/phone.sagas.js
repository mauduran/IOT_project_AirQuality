import { takeLatest, put, all, call } from 'redux-saga/effects';

import PhoneActionTypes from './phone.types';

import { registerPhoneFailed, registerPhoneSuccess, verifyPhoneFailed, verifyPhoneSuccess } from './phone.actions';

export function* registerPhone({ payload: phoneNumber }) {
    const body = { phoneNumber };

    try {
        const response = yield fetch("/phone/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
        })

        const responseBody = yield response.json();

        if (!responseBody.success) {
            throw new Error(responseBody.message);
        }

        yield put(registerPhoneSuccess(responseBody.message));
    } catch (error) {
        yield put(registerPhoneFailed(error));
    }
}

export function* verifyPhone({ payload: phoneNumber, verificationCode }) {
    const body = { phoneNumber, verificationCode };

    try {
        const response = yield fetch("/phone/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
        })

        const responseBody = yield response.json();

        if (!responseBody.success) {
            throw new Error(responseBody.message);
        }

        yield put(verifyPhoneSuccess({message: responseBody.message, phoneNumber}));
    } catch (error) {

        yield put(verifyPhoneFailed(error));
    }
}

export function* onRegisterPhoneStart() {
    yield takeLatest(PhoneActionTypes.REGISTER_PHONE_START, registerPhone)
}
export function* onVerifyPhoneStart() {
    yield takeLatest(PhoneActionTypes.VERIFY_PHONE_START, verifyPhone)
}


export function* phoneSagas() {
    yield all([
        call(onRegisterPhoneStart),
        call(onRegisterPhoneStart),
    ])
}