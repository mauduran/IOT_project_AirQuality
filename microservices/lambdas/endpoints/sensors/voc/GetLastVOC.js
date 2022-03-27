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

        const params = {
            Limit: 1,
            ScanIndexForward: false,
        }
        items = await Dynamo.queryDocumentsSkBeginsAndParams(`ACCOUNT#${accountName}`, '#VOC#', params);

        return Responses._200({ success: true, voc: items.length ? items[0] : null });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: 'Could not get VOC ' });
    }
};

