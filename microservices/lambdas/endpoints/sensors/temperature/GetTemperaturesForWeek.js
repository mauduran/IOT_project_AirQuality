const Responses = require("../../../common/API_Responses");
const Dynamo = require("../../../common/Dynamo");
const dateUtils = require("../../../common/dates");
const jwt = require("jsonwebtoken");


const getTemperaturesForWeek = async (accountName, weekYear, weekNum) => {
    params = {
        KeyConditionExpression: "PK = :pk  and begins_with (week, :week)",
        FilterExpression: "begins_with(SK, :sensorType)",
        ExpressionAttributeValues: {
            ":pk": `ACCOUNT#${accountName}`,
            ":week": `#YEAR#${weekYear}#WEEKNUM#${weekNum}`,
            ":sensorType": `#TEMPERATURE#`
        },
    }
    const items = await Dynamo.queryDocumentsIndex('PK-week-index', params);

    return items || [];
}

exports.handler = async event => {
    try {
        const authorization = event.headers && event.headers.Authorization;
        if (!authorization) return Responses._401({ error: true, message: 'Unauthorized' });

        const verification = jwt.verify(authorization, process.env.tokenSecret);
        if (!verification) return Responses._401({ error: true, message: 'Unauthorized' });

        const { accountName } = verification;
        const { offset } = event.pathParameters;

        const { weekYear, weekNum } = dateUtils.getWeekFromOffset(offset);

        items = await getTemperaturesForWeek(accountName, weekYear, weekNum);

        return Responses._200({ success: true, temperatures: items });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: 'Could not get temperatures' });
    }
};
