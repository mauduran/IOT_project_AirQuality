
const HTTP_HEADERS = { 'Content-Type': 'application/json' };
const HTTP_HEADERS_AUTH = { 'Content-Type': 'application/json', 'X-API-KEY': process.env.SERVERLESS_API_KEY };

const getAccountAuthHeaders = (token) => {
    return { 'Content-Type': 'application/json', 'Authorization': token };
}

module.exports = {
    HTTP_HEADERS,
    HTTP_HEADERS_AUTH,
    getAccountAuthHeaders,
}