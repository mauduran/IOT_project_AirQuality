const AWS = require('aws-sdk');
const jwt = require("jsonwebtoken");

const Responses = require('../../common/API_Responses');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

const initializePhoneNumberRegistration = (phoneNumber) => {
    var params = {
        PhoneNumber: phoneNumber, 
        LanguageCode: "es-419",
    };

    return SNS.createSMSSandboxPhoneNumber(params).promise()
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
        await initializePhoneNumberRegistration(phoneNumber);
        console.log(data);
        return Responses._200({ success: true, message: "Phone number register process started!" });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not start phone number registration" });
    }

};