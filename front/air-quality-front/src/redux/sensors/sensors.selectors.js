import { createSelector } from 'reselect';

const selectSensors = state => state.sensors;

export const selectVOC = createSelector(
    selectSensors,
    (sensors) => sensors.voc
);

export const selectTemperature = createSelector(
    selectSensors,
    (sensors) => sensors.temperature
);

export const selectHumidity = createSelector(
    selectSensors,
    (sensors) => sensors.humidity
);

export const selectCO2 = createSelector(
    selectSensors,
    (sensors) => sensors.co2
);

export const selectPM25 = createSelector(
    selectSensors,
    (sensors) => sensors["pm2.5"]
);

export const selectPM10 = createSelector(
    selectSensors,
    (sensors) => sensors.pm10
);

export const selectLastSensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].lastSensorData
);

export const selectDailySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].dailySensorData
);

export const selectWeeklySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].weeklySensorData
);

export const selectMonthlySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].monthlySensorData
);

export const fetchingLastSensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].fetchingLastSensorData
);

export const fetchingDailySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].fetchingDailySensorData
);

export const fetchingWeeklySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].fetchingWeeklySensorData
);


export const fetchingMonthlySensorData = (sensorType) => createSelector(
    selectSensors,
    (sensors) => sensors[sensorType] && sensors[sensorType].fetchingMonthlySensorData
);

