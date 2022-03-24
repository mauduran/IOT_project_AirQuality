const mqtt = require('async-mqtt');
const MQTT_OPTIONS = require('./config/mqtt_options');
const { SENSOR_TOPICS } = require('./utils/mqtt_utils');

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
            switch (measurement) {
                case "temperature":
                    console.log("Temperature message");
                    break;
                case "voc":
                    console.log("VOC message");
                    break;
                case "humidity":
                    console.log("Humidity message");
                    break;
                case "co2":
                    console.log("CO2 message");
                    break;
                case "pm25":
                    console.log("PM2.5 message");
                    break;
                case "pm10":
                    console.log("PM10 message");
                    break;
                default:
                    console.log("Invalid sensor measurement on topic.");
            }

        }
    } catch (error) {
        console.log(`Error. Could not process ${measurement} payload sent to ${accountId}. Please send JSON message.`);
    }

}

client.on('error', handleFailedMqttConnection);
client.on('connect', handleSuccessfulMqttConnection);
client.on('message', handleIncomingMessage);
