import SensorsActionTypes from './sensors.types';

const defaultSensorState = {
    lastSensorData: null,
    fetchingLastSensorData: false,
    dailySensorData: null,
    fetchingDailySensorData: false,
    monthlySensorData: null,
    fetchingMonthlySensorData: false,
    weeklySensorData: null,
    fetchingWeeklySensorData: false,
}
const INITIAL_STATE = {
    voc: defaultSensorState,
    temperature: defaultSensorState,
    humidity: defaultSensorState,
    "pm2.5": defaultSensorState,
    pm10: defaultSensorState,
    co2: defaultSensorState,
    error: null,
    successMessage: null,
}

const sensorsReducer = (state = INITIAL_STATE, action) => {
    let sensorObj = null;
    switch (action.type) {
        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_START:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingDailySensorData = true;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }

        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_START:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingWeeklySensorData = true;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }
        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_START:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingMonthlySensorData = true;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }

        case SensorsActionTypes.GET_LAST_SENSOR_DATA_START:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingLastSensorData = true;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }

        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_SUCCESS:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingDailySensorData = false;
            sensorObj.dailySensorData = action.payload.sensorData;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }
        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_SUCCESS:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingWeeklySensorData = false;
            sensorObj.weeklySensorData = action.payload.sensorData;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }

        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_SUCCESS:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingMonthlySensorData = false;
            sensorObj.monthlySensorData = action.payload.sensorData;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }
        case SensorsActionTypes.GET_LAST_SENSOR_DATA_SUCCESS:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingLastSensorData = false;
            sensorObj.lastSensorData = action.payload.sensorData;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: null
            }

        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_FAILURE:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingDailySensorData = false;
            sensorObj.dailySensorData = null;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: action.payload.error
            }

        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_FAILURE:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingWeeklySensorData = false;
            sensorObj.weeklySensorData = null;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: action.payload.error
            }
        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_FAILURE:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingMonthlySensorData = false;
            sensorObj.monthlySensorData = null;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: action.payload.error
            }

        case SensorsActionTypes.GET_LAST_SENSOR_DATA_FAILURE:
            sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingLastSensorData = false;
            sensorObj.lastSensorData = null;
            return {
                ...state,
                [action.payload.sensorType]: sensorObj,
                error: action.payload.error
            }

        default: return state;
    }
}

export default sensorsReducer;