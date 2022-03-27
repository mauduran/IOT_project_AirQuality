const bcrypt = require("bcryptjs");
const Responses = require('../../common/API_Responses');
const Dynamo = require('../../common/Dynamo');

const createAccount = async (accountName, password, title, description) => {
    let hash = await bcrypt.hash(password, 10);

    let account = {
        PK: `ACCOUNT#${accountName}`,
        SK: `#ACCOUNT#`,
        joined: new Date().toISOString(),
        accountName: accountName,
        title: title,
        description: description,
        object_type: "ACCOUNT",
        p_hash: hash,
    }

    return Dynamo.writeIfNotExists(account, 'PK');
}

exports.handler = async event => {
    const body = JSON.parse(event.body);
    if (!body || !body.accountName || !body.password || !body.title) {
        return Responses._400({ message: 'missing fields in body' });
    }

    const { accountName, password, description, title } = body;
    try {
        await createAccount(accountName, password, title, description);
        return Responses._201({ success: true, message: "Account Successfully created" });
    } catch (error) {
        console.log(error);
        if (error.code && error.code == "ConditionalCheckFailedException") {
            return Responses._409({ error: true, message: "Account name already exists." });
        }
        return Responses._400({ error: true, message: "Could not process request" });
    }
};
