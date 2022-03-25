const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyCredentials = async (hash, password) => {
    try {
        const validCredentials = await bcrypt.compare(password, hash);
        if (validCredentials) return Promise.resolve(true);
        throw "Credentials not valid";
    } catch (error) {
        return Promise.reject({ message: error });
    }
}

const findAccountByName = async (accountName) => {
    const key = {
        "PK": `ACCOUNT#${accountName}`,
        "SK": '#ACCOUNT#',
    }
    return Dynamo.findDocumentByKey(key);
}

const changePassword = async (accountName, newPassword) => {
    let hash = await bcrypt.hash(newPassword, 10);

    params = {
        Key: {
            "PK": `ACCOUNT#${accountName}`,
            "SK": '#ACCOUNT#',
        },
        UpdateExpression: "set p_hash = :p_hash",
        ExpressionAttributeValues: {
            ":p_hash": hash,
        },
    }

    return Dynamo.updateDocument(params);
};

exports.handler = async event => {
    const body = JSON.parse(event.body);

    const authorization = event.headers && event.headers.Authorization;
    const verification = jwt.verify(authorization, process.env.tokenSecret);
    if (!verification) return Responses._401({ message: 'Unauthorized' });

    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) return Responses._400({ error: true, message: "Missing required fields" });
    try {
        const { accountName } = verification;
        const account = await findAccountByName(accountName);
        await verifyCredentials(account.p_hash, currentPassword);
        await changePassword(accountName, newPassword);
        return Responses._200({ success: true, message: "Password changed!" });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not change password" });
    }

};
