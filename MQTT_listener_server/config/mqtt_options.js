
if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}


const MQTT_OPTIONS = {
    username: process.env.MQTT_USR,
    password: process.env.MQTT_PWD, 
}

module.exports = MQTT_OPTIONS;