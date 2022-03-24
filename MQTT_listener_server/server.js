const mqtt = require('async-mqtt');
const MQTT_OPTIONS = require('./config/mqtt_options');
const { SENSOR_TOPICS } = require('./constants/mqtt_topics');
const { messageForwardingFunctions } = require('./utils/message_forwarding.utils');

if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

const client = mqtt.connect(process.env.MQTT_ENDPOINT, MQTT_OPTIONS);

const handleSuccessfulMqttConnection = () => {
    client.subscribe(SENSOR_TOPICS)
        .then(() => console.log("Listening to incoming MQTT messages"))
        .catch(console.log);
}

const handleFailedMqttConnection = (err) => {
    console.log("Could not connect to MQTT broker");
    console.log(err);
}


const handleIncomingMessage = (topic, payload) => {
    console.log(`Incoming message to ${topic}`);

    const topicSplit = topic.split('/');
    const accountId = topicSplit[0];
    const measurement = topicSplit[1]
    try {
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

client.on('error', handleFailedMqttConnection);
client.on('connect', handleSuccessfulMqttConnection);
client.on('message', handleIncomingMessage);
