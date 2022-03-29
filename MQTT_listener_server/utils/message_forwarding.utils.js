const axios = require('axios').default;
const { AIR_QUALITY_MAX_LEVELS } = require("../constants/airquality_max_levels");
const airQualityUtils = require("./air_quality.utils");
const { HTTP_HEADERS_AUTH } = require('../constants/http_headers');

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const { authenticate } = require('./authentication');

const storeSensorData = async (path, accountName, payload) => {
    try {
        const { value, measurement, level, maxValue } = payload;

        if (!value || !measurement) return;

        const numericValue = parseFloat(value);

        if (Number.isNaN(numericValue)) {
            return;
        }

        await authenticate(accountName, payload.accountPassword);

        const configParams = {
            headers: HTTP_HEADERS_AUTH
        }

        await axios.post(`${process.env.API_GATEWAY_URL}/${path}`,
            {
                measurement,
                accountName: accountName,
                level: level,
                maxValue: maxValue,
                value: numericValue
            },
            configParams
        );
    } catch (error) {
        console.log(error.response.data);
    }
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
    if(level)
        await storeSensorData("voc", accountName, { ...payload, level: level, maxValue: maxValue });
}


const storePM25 = async (accountName, payload) => {
    const level = airQualityUtils.getPM25QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.PM25_MAX_VALUE;
    if(level)
        await storeSensorData("pm2.5", accountName, { ...payload, level: level, maxValue: maxValue });
}
const storePM10 = async (accountName, payload) => {
    const level = airQualityUtils.getPM10QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.PM10_MAX_VALUE;
    if(level)
        await storeSensorData("pm10", accountName, { ...payload, level: level, maxValue: maxValue });
}

const storeCO2 = async (accountName, payload) => {
    const level = airQualityUtils.getCO2QualityLevel(payload.value);
    const maxValue = AIR_QUALITY_MAX_LEVELS.CO2_MAX_VALUE;
    if(level)
        await storeSensorData("co2", accountName, { ...payload, level: level, maxValue: maxValue });
}

const messageForwardingFunctions = {
    temperature: storeTemperature,
    humidity: storeHumidity,
    co2: storeCO2,
    "pm2.5": storePM25,
    pm10: storePM10,
    voc: storeVOC,
}

module.exports = {
    messageForwardingFunctions
};