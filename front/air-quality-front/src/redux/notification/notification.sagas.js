import { takeLatest, put, all, call } from 'redux-saga/effects';

import NotificationActionTypes from './notification.types';

import {
    openSuccessNotification,
    openErrorNotification,
    closeNotification,
} from './notification.actions';

export function* launchSuccessNotification({ payload }) {
    yield put(closeNotification());
    yield put(openSuccessNotification(payload));
}
export function* launchErrorNotification({ payload }) {
    yield put(closeNotification());
    yield put(openErrorNotification(payload));
}


export function* onOpenSuccessNotification() {
    yield takeLatest(NotificationActionTypes.OPEN_SUCCESS_NOTIFICATION_START, launchSuccessNotification)
}
export function* onOpenErrorNotification() {
    yield takeLatest(NotificationActionTypes.OPEN_ERROR_NOTIFICATION_START, launchErrorNotification)
}


export function* notificationSagas() {
    yield all([
        call(onOpenSuccessNotification),
        call(onOpenErrorNotification),
    ])
}