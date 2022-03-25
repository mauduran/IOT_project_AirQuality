const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');
const jwt = require("jsonwebtoken");


const findAccountByName = async (accountName) => {
    const key = {
        "PK": `ACCOUNT#${accountName}`,
        "SK": `#ACCOUNT#`
    }

    return Dynamo.findDocumentByKey(key);
}


exports.handler = async event => {
    try {
        const authorization = event.headers && event.headers.Authorization;

        if (!authorization) return Responses._401({ message: 'Unauthorized' });

        const verification = jwt.verify(authorization, process.env.tokenSecret);


        if (!verification) return Responses._401({ message: 'Unauthorized' });
        const accountName = event.pathParameters && event.pathParameters.accountName || verification.accountName;
        account = await findAccountByName(accountName);
        delete account.p_hash;
        return Responses._200({ success: true, account: account });
    } catch (error) {
        console.log(error);
        return Responses._400({ message: 'Could not find account' });
    }
};
