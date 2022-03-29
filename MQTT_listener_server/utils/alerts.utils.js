const axios = require('axios').default;
const { HTTP_HEADERS_AUTH } = require("../constants/http_headers");

const sendSMSAlert = async (phoneNumber, message) => {

    const configParams = {
        headers: HTTP_HEADERS_AUTH
    };

    return await axios.post(`${process.env.API_GATEWAY_URL}/send-sms`,
        {
            number: phoneNumber,
            message: message,
        },
        configParams
    );
}

module.exports = { sendSMSAlert }