const axios = require('axios').default;

const { HTTP_HEADERS_AUTH } = require('../constants/http_headers');
const { UNHEALTHY_AIR_QUALITY_CATEGORIES } = require("../constants/airquality_categories");

const { getAccountInfo } = require('./account.utils');
const { sendSMSAlert } = require("./alerts.utils");
const { authenticate } = require('./authentication');

const storeSensorData = async (path, accountName, payload) => {
    const { value, measurement, level, maxValue } = payload;

    if (!value || !measurement) return;

    const numericValue = parseFloat(value);

    if (Number.isNaN(numericValue)) {
        return;
    }
    try {

        const token = await authenticate(accountName, payload.accountPassword);

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

        if (level in UNHEALTHY_AIR_QUALITY_CATEGORIES) {
            console.log("Air quality is not healthy");
            const response = await getAccountInfo(token);
            const { account } = response && response.data;

            if (account && account.phone_number) {
                console.log("Sending alert...");
                const message = `Alert for ${account.title}. ${path.toUpperCase()} levels are ${level.replace("_", " ").toLowerCase()} - ${value} ${measurement}`;
                await sendSMSAlert(account.phone_number, message);
                console.log("Alert sent.");
            }
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

module.exports = { storeSensorData };