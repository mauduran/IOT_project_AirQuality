const jwt = require("jsonwebtoken");
const Responses = require("../../common/API_Responses");
const Dynamo = require("../../common/Dynamo");
const dateUtils = require("../../common/dates");
const SENSOR_TYPES = require("../../common/SensorTypes");

const getPM25sForWeek = async (accountName, sensorType, weekYear, weekNum) => {
    params = {
        KeyConditionExpression: "PK = :pk  and begins_with (week, :week)",
        FilterExpression: "begins_with(SK, :sensorType)",
        ExpressionAttributeValues: {
            ":pk": `ACCOUNT#${accountName}`,
            ":week": `#YEAR#${weekYear}#WEEKNUM#${weekNum}`,
            ":sensorType": `#${sensorType}#`,
        },
    }
    const items = await Dynamo.queryDocumentsIndex('PK-week-index', params);

    return items || [];
}

exports.handler = async event => {
    const authorization = event.headers && event.headers.Authorization;
    if (!authorization) return Responses._401({ error: true, message: 'Unauthorized' });

    const verification = jwt.verify(authorization, process.env.tokenSecret);
    if (!verification) return Responses._401({ error: true, message: 'Unauthorized' });

    const { accountName } = verification;
    const { offset, sensorType } = event.pathParameters;

    if (!(sensorType in SENSOR_TYPES)) {
        return Responses._400({ error: true, message: 'Invalid sensor type' });
    }

    if (!Number.isInteger(parseInt(offset)))
        return Responses._400({ error: true, message: 'Could not get PM2.5s' });

    const { weekYear, weekNum } = dateUtils.getWeekFromOffset(offset);

    try {
        items = await getPM25sForWeek(accountName, SENSOR_TYPES[sensorType], weekYear, weekNum);

        return Responses._200({ success: true, data: items });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: `Could not get ${SENSOR_TYPES[sensorType]}` });
    }
};
