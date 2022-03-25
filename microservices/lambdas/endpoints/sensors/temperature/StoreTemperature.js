const jwt = require("jsonwebtoken");
const Responses = require("../../../common/API_Responses");
const Dynamo = require("../../../common/Dynamo");

const addTemperatureValue = async (accountName, value, measurement) => {
    const now = new Date();
    let record = {
        PK: `ACCOUNT#${accountName}`,
        SK: `#TEMPERATURE#${now.toISOString()}`,
        date: now.toISOString(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        value: value,
        measurement, measurement,
    }
    return Dynamo.write(record);
}

exports.handler = async event => {
    const body = JSON.parse(event.body);

    if (!body || !body.value || !body.measurement || !body.accountName) {
        return Responses._400({ error: true, message: 'Missing field in body' });
    }
    const { value, measurement, accountName } = body;
    try {
        await addTemperatureValue(accountName, value, measurement);

        return Responses._201({ success: true, message: `Temperature Stored` });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: `Could not store temperature` });
    }
};