import SensorsActionTypes from './sensors.types';

export const getLastSensorDataStart = (sensorType) => ({
    type: SensorsActionTypes.GET_LAST_SENSOR_DATA_START,
    payload: sensorType
});

export const getLastSensorDataSuccess = (sensorType, sensorData) => ({
    type: SensorsActionTypes.GET_LAST_SENSOR_DATA_SUCCESS,
    payload: { sensorType, sensorData }
});

export const getLastSensorDataFailed = (sensorType, error) => ({
    type: SensorsActionTypes.GET_LAST_SENSOR_DATA_FAILURE,
    payload: { sensorType, error }
});

export const getDailySensorDataStart = (sensorType, day, month, year) => ({
    type: SensorsActionTypes.GET_DAILY_SENSOR_DATA_START,
    payload: { sensorType, day, month, year }
});

export const getDailySensorDataSuccess = (sensorType, sensorData) => ({
    type: SensorsActionTypes.GET_DAILY_SENSOR_DATA_SUCCESS,
    payload: { sensorType, sensorData }
});

export const getDailySensorDataFailed = (sensorType, error) => ({
    type: SensorsActionTypes.GET_DAILY_SENSOR_DATA_FAILURE,
    payload: { sensorType, error }
});

export const getWeeklySensorDataStart = (sensorType, offset) => ({
    type: SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_START,
    payload: { sensorType, offset }
});

export const getWeeklySensorDataSuccess = (sensorType, sensorData) => ({
    type: SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_SUCCESS,
    payload: { sensorType, sensorData }
});

export const getWeeklySensorDataFailed = (sensorType, error) => ({
    type: SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_FAILURE,
    payload: { sensorType, error }
});

export const getMonthlySensorDataStart = (sensorType, month, year) => ({
    type: SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_START,
    payload: { sensorType, month, year }
});

export const getMonthlySensorDataSuccess = (sensorType, sensorData) => ({
    type: SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_SUCCESS,
    payload: { sensorType, sensorData }
});

export const getMonthlySensorDataFailed = (sensorType, error) => ({
    type: SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_FAILURE,
    payload: { sensorType, error }
});
