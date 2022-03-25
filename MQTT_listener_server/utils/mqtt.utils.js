const { messageForwardingFunctions } = require('./message_forwarding.utils');

const handleIncomingMessage = (topic, payload) => {
    console.log(`Incoming message to ${topic}`);

    const topicSplit = topic.split('/');
    const accountId = topicSplit[0];
    const measurement = topicSplit[1]
    try {
        console.log(payload.toString());
        message = JSON.parse(payload.toString());

        if (!message.measurement || !message.value || !message.accountPassword) {
            console.log("Error. Invalid JSON payload.");
        } else {
            console.log(`AccountId ${accountId} - ${measurement}: ${message.value} ${message.measurement}`);
            if (messageForwardingFunctions[measurement]) {
                messageForwardingFunctions[measurement](accountId, message);
            } else {
                console.log("Invalid sensor measurement on topic.");
            }
        }
    } catch (error) {
        console.log(error);
        console.log(`Error. Could not process ${measurement} payload sent to ${accountId}. Please send JSON message.`);
    }
}

module.exports = {
    handleIncomingMessage,
}