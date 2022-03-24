const mqtt = require('async-mqtt');
const MQTT_OPTIONS = require('./config/mqtt_options');
const { SENSOR_TOPICS } = require('./constants/mqtt_topics');
const {handleIncomingMessage} = require('./utils/mqtt.utils');

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


client.on('error', handleFailedMqttConnection);
client.on('connect', handleSuccessfulMqttConnection);
client.on('message', handleIncomingMessage);
