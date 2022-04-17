import { all, call } from 'redux-saga/effects';
import { accountSagas } from './account/account.sagas';
import { phoneSagas } from './phone/phone.sagas';
import { sensorsSagas } from './sensors/sensors.sagas';

export default function* rootSaga() {
    yield all([
        call(accountSagas),
        call(phoneSagas),
        call(sensorsSagas),
    ]);
}