const jwt = require("jsonwebtoken");

const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const changeTitle = async (accountName, title) => {

    let params = {
        Key: {
            "PK": `ACCOUNT#${accountName}`,
            "SK": `#ACCOUNT#`
        },
        UpdateExpression: "set title = :title",
        ExpressionAttributeValues: {
            ":title": title,
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

    const { title } = body;

    if (!accountName || !title ) return Responses._400({ error: true, message: "Missing fields!" })

    try {
        await changeTitle(accountName, title);
        return Responses._200({ success: true, message: "Account title changed!" });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not change title." });
    }

};