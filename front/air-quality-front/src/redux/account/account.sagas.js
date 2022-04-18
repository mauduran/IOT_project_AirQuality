import { takeLatest, put, all, call } from 'redux-saga/effects';
import AccountActionTypes from './account.types';
import {
    getAccountProfileSuccess,
    getAccountProfileFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpFailure,
    signUpSuccess,
    changePasswordSuccess,
    changePasswordFailure,
    changeTitleSuccess,
    changeTitleFailure,
    changeDescriptionSuccess,
    changeDescriptionFailure,

} from './account.actions';
import { notification } from 'antd';

export function* isAccountAuthenticated() {
    try {
        const token = localStorage.getItem("token");
        const accountName = localStorage.getItem("accountName");

        if (!token || !accountName) return;

        yield put(signInSuccess({ token: token, accountName: accountName }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* getAccountProfile() {
    try {
        const response = yield fetch("/accounts/account", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
            },
        });

        const responseBody = yield response.json();

        if (!responseBody.success) {
            throw new Error(responseBody.message);
        }

        yield put(getAccountProfileSuccess({ profile: responseBody.account }));
    } catch (error) {
        yield put(getAccountProfileFailure(error))
    }
}

export function* changePassword({ payload: { currentPassword, newPassword } }) {
    const body = { currentPassword, newPassword };

    try {
        const response = yield fetch("/account/change-password", {
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
            key: "ChangedPassword",
            message: 'Success!',
            description: "Successfully changed account password.",
            duration: 5,
        });
        yield put(changePasswordSuccess(responseBody.message));
    } catch (error) {
        notification.error({
            key: "unable to change password",
            message: 'Could not change account password.',
            description: error.message,
            duration: 5,
        });
        yield put(changePasswordFailure(error));
    }
}

export function* changeTitle({ payload: { title } }) {
    const body = { title };

    try {
        const response = yield fetch("/account/title", {
            method: 'PUT',
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

        yield put(changeTitleSuccess({ message: responseBody.message, title }));
    } catch (error) {
        notification.error({
            key: "unable to change title",
            message: 'Could not change account title.',
            description: error.message,
            duration: 5,
        });
        yield put(changeTitleFailure(error));
    }
}

export function* changeDescription({ payload: { description } }) {
    const body = { description };

    try {
        const response = yield fetch("/account/description", {
            method: 'PUT',
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

        yield put(changeDescriptionSuccess({ message: responseBody.message, description }));
    } catch (error) {
        notification.error({
            key: "unable to change description",
            message: 'Could not change account description.',
            description: error.message,
            duration: 5,
        });
        yield put(changeDescriptionFailure(error));
    }
}

export function* signIn({ payload: { accountName, password } }) {
    const body = { accountName, password };
    console.log(accountName + " " + password);
    try {
        const response = yield fetch("/account/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        const responseBody = yield response.json();

        if (!responseBody.success) {
            throw new Error(responseBody.message);
        }
        const { token } = responseBody;
        localStorage.setItem('token', token);
        localStorage.setItem('accountName', accountName);

        yield put(signInSuccess({ token, accountName }));
    } catch (error) {
        notification.error({
            key: "incorrect credentials",
            message: 'Error Logging in',
            description: error.message,
            duration: 5,
        });
        yield put(signInFailure(error.message));
    }
}

export function* signOut() {
    try {
        localStorage.clear();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* signUp({ payload: { accountName, password, title } }) {
    try {
        const response = yield fetch("/account", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountName, password, title }),
        })

        const responseBody = yield response.json();

        if (!responseBody.success) {
            throw new Error(responseBody.message);
        }

        yield put(signUpSuccess({ accountName, password }));

    } catch (error) {
        notification.error({
            key: "error registering ",
            message: 'Error Signing Up',
            description: error.message,
            duration: 5,
        });
        yield put(signUpFailure(error))
    }
}

export function* onChangePassword() {
    yield takeLatest(AccountActionTypes.CHANGE_PASSWORD_START, changePassword);
}

export function* onChangeTitle() {
    yield takeLatest(AccountActionTypes.CHANGE_TITLE_START, changeTitle);
}

export function* onChangeDescription() {
    yield takeLatest(AccountActionTypes.CHANGE_DESCRIPTION_START, changeDescription);
}

export function* onGetAccountProfile() {
    yield takeLatest(AccountActionTypes.GET_ACCOUNT_PROFILE_START, getAccountProfile);
}

export function* onCheckAccountSession() {
    yield takeLatest(AccountActionTypes.CHECK_ACCOUNT_SESSION, isAccountAuthenticated)
}

export function* onSignInStart() {
    yield takeLatest(AccountActionTypes.SIGN_IN_START, signIn)
}

export function* onSignOutStart() {
    yield takeLatest(AccountActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(AccountActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(AccountActionTypes.SIGN_UP_SUCCESS, signIn);
}

export function* accountSagas() {
    yield all([
        call(onCheckAccountSession),
        call(onSignInStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onGetAccountProfile),
        call(onChangePassword),
        call(onChangeTitle),
        call(onChangeDescription),
    ])
}