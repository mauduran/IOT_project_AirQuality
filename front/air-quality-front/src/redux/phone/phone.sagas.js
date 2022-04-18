import { takeLatest, put, all, call } from 'redux-saga/effects';

import PhoneActionTypes from './phone.types';

import { registerPhoneFailed, registerPhoneSuccess, verifyPhoneFailed, verifyPhoneSuccess } from './phone.actions';
import { notification } from 'antd';

export function* registerPhone({ payload: { phoneNumber } }) {
    const body = { phoneNumber };

    try {
        console.log("fetching...?");
        const response = yield fetch("/account/phone/register", {
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
        notification.success({
            key: "success registering phone number",
            message: 'Success registering phone number.',
            description: responseBody.message,
            duration: 5,
        });
        yield put(registerPhoneSuccess(responseBody.message));
    } catch (error) {
        notification.error({
            key: "unable to register phone number",
            message: 'Could not register phone number.',
            description: error.message,
            duration: 5,
        });
        yield put(registerPhoneFailed(error));
    }
}

export function* verifyPhone({ payload: { phoneNumber, verificationCode } }) {
    const body = { phoneNumber, verificationCode };

    try {
        const response = yield fetch("/account/phone/verify", {
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
        notification.success({
            key: "success verifying phone number",
            message: 'Phone verification successful!',
            description: responseBody.message,
            duration: 5,
        });
        yield put(verifyPhoneSuccess({ message: responseBody.message, phoneNumber }));
    } catch (error) {
        notification.error({
            key: "unable to verify phone number",
            message: 'Could not verify phone number.',
            description: error.message,
            duration: 5,
        });
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
        call(onVerifyPhoneStart),
    ])
}