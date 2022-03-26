const Responses = require("../../../common/API_Responses");
const Dynamo = require("../../../common/Dynamo");
const jwt = require("jsonwebtoken");

exports.handler = async event => {
    try {
        const authorization = event.headers && event.headers.Authorization;
        if (!authorization) return Responses._401({ error: true, message: 'Unauthorized' });

        const verification = jwt.verify(authorization, process.env.tokenSecret);
        if (!verification) return Responses._401({ error: true, message: 'Unauthorized' });

        const { accountName } = verification;
        const { year, month, day } = event.pathParameters;

        items = await Dynamo.queryDocumentsSkBegins(`ACCOUNT#${accountName}`, `#TEMPERATURE#${year}-${month}-${day}`);

        return Responses._200({ success: true, temperatures: items });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: 'Could not get temperatures ' });
    }
};

