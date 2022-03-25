const axios = require('axios').default;
const { HTTP_HEADERS_AUTH } = require('../constants/http_headers');

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const { authenticate } = require('./authentication');

const storeSensorData = async(path, accountName, payload) => {
    try {
        const { value, measurement } = payload;

        if(!value || !measurement ) return;

        await authenticate(accountName, payload.accountPassword);

        const configParams = {
            headers: HTTP_HEADERS_AUTH
        }

        const response = await axios.post(`${process.env.API_GATEWAY_URL}/${path}`,
            { measurement, value, accountName: accountName },
            configParams
        );
    } catch (error) {
        console.log(error.response.data);
    }
}

const storeTemperature = async (accountName, payload) => {
    await storeSensorData("temperature", accountName, payload);
}

const storeVOC = async (accountName, payload) => {
    await storeSensorData("voc", accountName, payload);
}

const storeHumidity = async (accountName, payload) => {
    await storeSensorData("humidity", accountName, payload);
}

const storePM25 = async (accountName, payload) => {
    await storeSensorData("pm25", accountName, payload);
}
const storePM10 = async (accountName, payload) => {
    await storeSensorData("pm10", accountName, payload);
}

const storeCO2 = async (accountName, payload) => {
    await storeSensorData("co2", accountName, payload);
}

const messageForwardingFunctions = {
    temperature: storeTemperature,
    humidity: storeHumidity,
    co2: storeCO2,
    pm25: storePM25,
    pm10: storePM10,
    voc: storeVOC,
}

module.exports = {
    messageForwardingFunctions
};