import { all, call } from 'redux-saga/effects';
import { accountSagas } from './account/account.sagas';
import { notificationSagas } from './notification/notification.sagas';
import { phoneSagas } from './phone/phone.sagas';
import { sensorsSagas } from './sensors/sensors.sagas';

export default function* rootSaga() {
    yield all([
        call(accountSagas),
        call(notificationSagas),
        call(phoneSagas),
        call(sensorsSagas),
    ]);
}