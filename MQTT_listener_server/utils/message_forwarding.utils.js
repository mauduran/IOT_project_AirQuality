const axios = require('axios').default;

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const { authenticate } = require('./authentication');

const storeTemperature = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
}

const storeVOC = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
}

const storeHumidity = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
}

const storePM25 = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
}
const storePM10 = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
}

const storeCO2 = async (accountId, payload) => {
    try {
        const token = await authenticate(accountId, payload.accountPassword);

    } catch (error) {
        console.log(error);
    }
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