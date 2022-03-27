const Responses = require("../../common/API_Responses");
const Dynamo = require("../../common/Dynamo");
const dateUtils = require("../../common/dates");
const SENSOR_TYPES = require("../../common/SensorTypes");

const addSensorValue = async (accountName, sensorType, value, measurement) => {
    const now = new Date();

    const { weekYear, weekNum } = dateUtils.getWeekNumber(now);
    let record = {
        PK: `ACCOUNT#${accountName}`,
        SK: `#${sensorType}#${now.toISOString()}`,
        date: now.toISOString(),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        weekYear: weekYear,
        weekNum: weekNum,
        week: `#YEAR#${weekYear}#WEEKNUM#${weekNum}`,
        object_type: sensorType,
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
    const { sensorType } = event.pathParameters;

    if (!(sensorType in SENSOR_TYPES)) {
        return Responses._400({ error: true, message: 'Invalid sensor type' });
    }

    const { value, measurement, accountName } = body;

    const numericValue = parseFloat(value);

    if (Number.isNaN(numericValue)) {
        return Responses._400({ error: true, message: 'Invalid sensor value. Must be a number' });
    }

    try {
        await addSensorValue(accountName, SENSOR_TYPES[sensorType], numericValue, measurement);

        return Responses._201({ success: true, message: `${SENSOR_TYPES[sensorType]} Stored` });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: `Could not store ${SENSOR_TYPES[sensorType]}` });
    }
};