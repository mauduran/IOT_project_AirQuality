# MQTT Broker

Docker image containing the MQTT main server which handles publishing and subscribing to messages in given topics.This image comes from the official mosquitto implementation.
This container definition uses MQTT authentication which is configured with the files inside the config directory.

## Configuration
In order to set the broker up in the desired way, a configuration file is created. This file contains all the definitions to enable different features such as **persistence, logging, and authentication**.
The configuration file is located in the following path `config/mosquitto.conf` 

Node: this file needs to be copied into the container in the working directory including the config dir.

### Persistence
For this broker persistence is enabled, which means that the messages are temporarily stored by the broker in case there is no subscriber to receive the messages published.
The data is persisted within the `data` directory.

### Logging
Logging is also enabled so that we can see the actions that are taken by the broker and also the errors that may appear.
The log file is located in the following path: `log/mosquitto.log`

### Authentication
MQTT allows for multiple means of authentication such as user/password auth and certificates.
For this particular instance, **user/password** authentication is used for the sake of simplicity.

Credentials are configured in the main config file setting the `password_file` property to the following file location: `/mosquitto/config/mqtt_passwd`.

The password file contains the user credentials in the form `{username}:{password}`. In this case, the password is encoded in a way that is not visible for security reasons.

This authentication configuration ensures that the only operations allowed are the ones made by a client that has authenticated itself.

Note: It is important to also set the `allow_anonymous` property to `false` in the config file.
