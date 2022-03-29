const axios = require('axios').default;
const { HTTP_HEADERS } = require('../constants/http_headers');

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const authenticate = async (accountName, password) => {
    const configParams = {
        headers: HTTP_HEADERS
    }

    const response = await axios.post(`${process.env.API_GATEWAY_URL}/account/login`,
        { accountName, password },
        configParams
    );
    return response.data.token;

}

module.exports = { authenticate };