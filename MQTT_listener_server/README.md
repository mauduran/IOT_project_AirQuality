# MQTT Listener Server
A NodeJs server that is in charge of:
- Receiving the sensor data coming from the development board
- Evaluating the levels of the sensor data 
- Calling a lambda to send SMS alerts to the user in case of air quality levels not being healthy
- Calling a lambda function to store the sensor data into the database.

To do this, the server connects to the MQTT broker and subscribes to the relevant topics to receive the sensor data messages.

Note: This server authenticates to the user account of the IoT solution so the username is part of the topic and the password is included in the message body which is in a `JSON Object`

This server is deployed as a docker container running in AWS Elastic Container Service (ECS)

## Environment
- **API_GATEWAY_URL**: URL to which this server makes requests to send SMS alerts and to store the sensor data.
- **SERVERLESS_API_KEY**: API Key to make successful http requests to the protected endpoints of the API Gateway.
- **MQTT_ENDPOINT**: Address of the MQTT broker.
- **MQTT_USR**: Username to authenticate with the MQTT Broker.
- **MQTT_PWD**: Password to authenticate with the MQTT Broker.
- **TOKEN_SECRET**: Secret used for JWT token.


## MQTT topics 
The MQTT listener server subscribes to the following topics:
- `+/co2`
- `+/pm2.5`
- `+/pm10`
- `+/temperature`
- `+/humidity`
- `+/voc`

Note: Sensor data is published to a topic in the following format: `{accountId}/{sensorType}` meaning that  when sending MQTT messages for the previous topics the `+` wildcard must be replaced with the **accountId** of the account. e.g) `test/temperature`

## Project Structure
`server.js` is the entrypoint of the project. It connects to the MQTT broker, subscribes to the aforementioned topics, and sets up the handlers for the MQTT events such as Error, Connect and Message.

The `src` directory contains different subfolders that take care of different responsibilities.

### Config
Files that create configuration objects to set the server up.

**Current config files**:
- `mqtt_options.js`: Creates the configuration to connect to the mqtt broker (usr/pwd).

### Constants
Constants to be used in the code to avoid typos. 

**Current constants files**:
- `airquality_categories.js`: Air Quality level categories
- `airquality_max_levels.js`: Maximum level values for all the pollutants.
- `alert_levels.js`: Air Quality level categories that will trigger an SMS alert.
- `http_headers.js`: HTTP headers that need to be added when sending requests to the API. (Headers for public and protected endpoints)
- `mqtt_topics.js`: Topics this server needs to subscribe to. (Shown above)
- `co2_quality_levels.js`: CO2 Quality levels for each Air Quality Category
- `pm25_quality_levels.js`: PM2.5 Quality levels for each Air Quality Category
- `pm10_quality_levels.js`: PM10 Quality levels for each Air Quality Category
- `voc_quality_levels.js`: VOC Quality levels for each Air Quality Category

### Utils
Utility functions that are used by the server to do some work.

**Current utils files**
- `account.utils.js`: Contains function make an API request to get the information of an account given its jwt token
- `air_quality.utils.js`: Contains functions to get the quality level of a **CO2, PM2.5, PM10, or VOC** value.
- `alerts.utils.js`: Contains function to make an API request to send a SMS Alert given a phone number and a message.
- `authentication.js`: Contains function to authenticate the sender of the MQTT message and make sure it comes with valid credentials.
- `message_forwarding_utils.js`: Contains functions to forward the message data top a particular sensorType and then call a function to store the data.
- `mqtt.utils.js`: Contains function that handles incoming MQTT messages.
- `sensors.utils.js` Contains function to make API call to store the sensor data to the database.

