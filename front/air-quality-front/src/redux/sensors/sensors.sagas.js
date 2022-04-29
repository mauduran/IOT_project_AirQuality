import { takeLatest, put, all, call, takeEvery } from 'redux-saga/effects';
import SENSOR_TYPES from '../../constants/SensorTypes';
import { getDailySensorDataFailed, getDailySensorDataSuccess, getLastSensorDataFailed, getLastSensorDataSuccess, getMonthlySensorDataFailed, getMonthlySensorDataSuccess, getWeeklySensorDataFailed, getWeeklySensorDataSuccess } from './sensors.actions';

import SensorsActionTypes from './sensors.types';

export function* getLastSensorData({ payload: { sensorType } }) {
    try {
        if (!(sensorType in SENSOR_TYPES))
            throw new Error("Could not fetch sensor data. Invalid sensor type.");

        const response = yield fetch(`/api/${sensorType}/most-recent`, {
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

        yield put(getLastSensorDataSuccess(sensorType, responseBody.data));
    } catch (error) {
        yield put(getLastSensorDataFailed(sensorType, error))
    }
}

export function* getDailySensorData({ payload: { sensorType, day, month, year } }) {
    try {
        if (!(sensorType in SENSOR_TYPES))
            throw new Error("Could not fetch sensor data. Invalid sensor type.");

        const response = yield fetch(`/api/${sensorType}/${year}/${month}/${day}`, {
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

        yield put(getDailySensorDataSuccess(sensorType, responseBody.data));
    } catch (error) {
        yield put(getDailySensorDataFailed(sensorType, error))
    }
}

export function* getWeeklySensorData({ payload: { sensorType, offset } }) {
    try {
        if (!(sensorType in SENSOR_TYPES))
            throw new Error("Could not fetch sensor data. Invalid sensor type.");

        const response = yield fetch(`/api/${sensorType}/week/${offset}`, {
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

        yield put(getWeeklySensorDataSuccess(sensorType, responseBody.data));
    } catch (error) {
        yield put(getWeeklySensorDataFailed(sensorType, error))
    }
}

export function* getMonthlySensorData({ payload: { sensorType, year, month } }) {
    try {
        if (!(sensorType in SENSOR_TYPES))
            throw new Error("Could not fetch sensor data. Invalid sensor type.");

        const response = yield fetch(`/api/${sensorType}/${year}/${month}`, {
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

        yield put(getMonthlySensorDataSuccess(sensorType, responseBody.data));
    } catch (error) {
        yield put(getMonthlySensorDataFailed(sensorType, error))
    }
}

export function* onGetLastSensorData() {
    yield takeEvery(SensorsActionTypes.GET_LAST_SENSOR_DATA_START, getLastSensorData)
}

export function* onGetDailySensorData() {
    yield takeLatest(SensorsActionTypes.GET_DAILY_SENSOR_DATA_START, getDailySensorData)
}

export function* onGetWeeklySensorData() {
    yield takeLatest(SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_START, getWeeklySensorData)
}

export function* onGetMonthlySensorData() {
    yield takeLatest(SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_START, getMonthlySensorData)
}

export function* sensorsSagas() {
    yield all([
        call(onGetLastSensorData),
        call(onGetDailySensorData),
        call(onGetWeeklySensorData),
        call(onGetMonthlySensorData),
    ])
}