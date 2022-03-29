const axios = require('axios').default;
const { getAccountAuthHeaders } = require("../constants/http_headers");

const getAccountInfo = async (token) => {

    const configParams = {
        headers: getAccountAuthHeaders(token)
    };

    return await axios.get(`${process.env.API_GATEWAY_URL}/accounts/account`, configParams);
}

module.exports = { getAccountInfo }