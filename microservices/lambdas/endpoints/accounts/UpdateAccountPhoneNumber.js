const jwt = require("jsonwebtoken");

const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');


const addPhoneNumber = async (accountName, phoneNumber) => {

    let params = {
        Key: {
            "PK": `ACCOUNT#${accountName}`,
            "SK": `#ACCOUNT#`
        },
        UpdateExpression: "set phone_number = :phone_number",
        ExpressionAttributeValues: {
            ":phone_number": phoneNumber,
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

    const { phoneNumber } = body;

    if (!accountName || !phoneNumber) return Responses._400({ error: true, message: "Missing fields!" })

    let regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

    if (!regex.test(phoneNumber)) return Responses._400({ error: true, message: "Invalid phone number" });

    try {
        await addPhoneNumber(accountName, phoneNumber);
        return Responses._200({ success: true, message: "Phone number changed!" });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not change phone number" });
    }

};