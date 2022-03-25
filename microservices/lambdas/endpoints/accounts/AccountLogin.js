const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');


const findAccountByName = async (accountName) => {
    const key = {
        "PK": `ACCOUNT#${accountName}`,
        "SK": `#ACCOUNT#`
    }

    return Dynamo.findDocumentByKey(key);
}

const verifyCredentials = async (hash, password) => {
    try {
        const validCredentials = await bcrypt.compare(password, hash);
        if (validCredentials) return Promise.resolve(true);
        throw "Credentials not valid";
    } catch (error) {
        return Promise.reject({message:error});
    }
}

exports.handler = async event => {
    const body = JSON.parse(event.body);
    if (!body || !body.accountName || !body.password) {
        return Responses._400({ message: 'missing fields in body' });
    }

    const { accountName, password } = body;
    try {
        const account = await findAccountByName(accountName);
        await verifyCredentials(account.p_hash, password);
        const token = jwt.sign({
            accountName,
        }, process.env.tokenSecret);
        return Responses._201({ success: true, token: token });
    } catch (error) {
        console.log(error);
        return Responses._400({ error: true, message: "Could not login" });
    }
};
