const jwt = require("jsonwebtoken");
const Responses = require("../../common/API_Responses");
const Dynamo = require("../../common/Dynamo");
const SENSOR_TYPES = require("../../common/SensorTypes");

exports.handler = async event => {
    const authorization = event.headers && event.headers.Authorization;
    if (!authorization) return Responses._401({ error: true, message: 'Unauthorized' });

    const verification = jwt.verify(authorization, process.env.tokenSecret);
    if (!verification) return Responses._401({ error: true, message: 'Unauthorized' });
    
    const {sensorType} = event.pathParameters;
    if(!(sensorType in SENSOR_TYPES)) {
        return Responses._400({ error: true, message: 'Invalid sensor type' });
    }
    const { accountName } = verification;
    
    try {
        items = await Dynamo.queryDocumentsSkBegins(`ACCOUNT#${accountName}`, `#${SENSOR_TYPES[sensorType]}#`);
        return Responses._200({ success: true, data: items });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: `Could not get ${SENSOR_TYPES[sensorType]}s` });
    }
};

