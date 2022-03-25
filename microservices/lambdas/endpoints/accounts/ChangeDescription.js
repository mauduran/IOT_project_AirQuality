const jwt = require("jsonwebtoken");

const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');


const changeDescription = async (accountName, description) => {

    let params = {
        Key: {
            "PK": `ACCOUNT#${accountName}`,
            "SK": `#ACCOUNT#`
        },
        UpdateExpression: "set description = :description",
        ExpressionAttributeValues: {
            ":description": description,
        },
    }

    return await Dynamo.updateDocument(params);
}

exports.handler = async event => {
    const body = JSON.parse(event.body);

    const authorization = event.headers && event.headers.Authorization;
    const verification = jwt.verify(authorization, process.env.tokenSecret);

    if (!verification) return Responses._401({ message: 'Unauthorized' });

    const { accountName } = verification;

    const { description } = body;

    if (!accountName || !description ) return Responses._400({ error: true, message: "Missing fields!" })

    try {
        await changeDescription(accountName, description);
        return Responses._200({ success: true, message: "Account description changed!" });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not change description" });
    }

};