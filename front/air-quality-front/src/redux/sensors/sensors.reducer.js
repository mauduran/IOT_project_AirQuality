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
    switch (action.type) {
        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_START: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingDailySensorData: true,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_START: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingWeeklySensorData: true,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_START: {
            const sensorObj = state[action.payload.sensorType];
            sensorObj.fetchingMonthlySensorData = true;
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingMonthlySensorData: true,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_LAST_SENSOR_DATA_START: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingLastSensorData: true,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_SUCCESS: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingDailySensorData: false,
                    dailySensorData: action.payload.sensorData,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_SUCCESS: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingWeeklySensorData: false,
                    weeklySensorData: action.payload.sensorData,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_SUCCESS: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingMonthlySensorData: false,
                    monthlySensorData: action.payload.sensorData,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_LAST_SENSOR_DATA_SUCCESS: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingLastSensorData: false,
                    lastSensorData: action.payload.sensorData,
                },
                error: null
            }
        }

        case SensorsActionTypes.GET_DAILY_SENSOR_DATA_FAILURE: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingDailySensorData: false,
                    dailySensorData: null,
                },
                error: action.payload.error
            }
        }

        case SensorsActionTypes.GET_WEEKLY_SENSOR_DATA_FAILURE: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingWeeklySensorData: false,
                    weeklySensorData: null,
                },
                error: action.payload.error
            }
        }

        case SensorsActionTypes.GET_MONTHLY_SENSOR_DATA_FAILURE: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingMonthlySensorData: false,
                    monthlySensorData: null,
                },
                error: action.payload.error
            }
        }

        case SensorsActionTypes.GET_LAST_SENSOR_DATA_FAILURE: {
            return {
                ...state,
                [action.payload.sensorType]: {
                    ...state[action.payload.sensorType],
                    fetchingLastSensorData: false,
                    lastSensorData: null,
                },
                error: action.payload.error
            }
        }

        default: return state;
    }
}

export default sensorsReducer;