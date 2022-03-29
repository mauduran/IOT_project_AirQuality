const { AIR_QUALITY_MAX_LEVELS } = require("../constants/airquality_max_levels");
const { storeSensorData } = require("./sensors.utils");
const airQualityUtils = require("./air_quality.utils");

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const storeTemperature = async (accountName, payload) => {
    await storeSensorData("temperature", accountName, payload);
}

const storeHumidity = async (accountName, payload) => {
    await storeSensorData("humidity", accountName, payload);
}

const storeVOC = async (accountName, payload) => {
    const level = airQualityUtils.getVOCQualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.VOC_MAX_VALUE;
    if (level)
        await storeSensorData("voc", accountName, { ...payload, level: level, maxValue: maxValue });
}

const storePM25 = async (accountName, payload) => {
    const level = airQualityUtils.getPM25QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.PM25_MAX_VALUE;
    if (level)
        await storeSensorData("pm2.5", accountName, { ...payload, level: level, maxValue: maxValue });
}

const storePM10 = async (accountName, payload) => {
    const level = airQualityUtils.getPM10QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.PM10_MAX_VALUE;
    if (level)
        await storeSensorData("pm10", accountName, { ...payload, level: level, maxValue: maxValue });
}

const storeCO2 = async (accountName, payload) => {
    const level = airQualityUtils.getCO2QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.CO2_MAX_VALUE;
    if (level)
        await storeSensorData("co2", accountName, { ...payload, level: level, maxValue: maxValue });
}

const messageForwardingFunctions = {
    "temperature": storeTemperature,
    "humidity": storeHumidity,
    "co2": storeCO2,
    "pm2.5": storePM25,
    "pm10": storePM10,
    "voc": storeVOC,
}

module.exports = {
    messageForwardingFunctions
};