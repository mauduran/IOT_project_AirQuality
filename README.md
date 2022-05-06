# IOT project AirQuality
According to the World Health Organization, air pollution is the main risk for health because microscopic contaminants can enter the respiratory and circulatory systems, damaging the lungs, heart, and brain.  As said, the importance of monitoring air quality is evident in the impact pollutants have on the human health, so companies are starting to give a track of this issue.
To act on the impact of air pollution on human living, it is necessary to understand where and how the pollution is most concentrated, for doing this air monitoring must be undertaken. 

This IOT project aims to ensure that people are not inhaling bad air and maintain the closed space on the healthier side, possibly reducing risk of illness.

Users can visualize current and historic Air Quality levels so they can act when the quality is not good by filtering the air or opening windows. Additonally, if users register their phone on the web app, they can receive SMS alerts when the levels of any of the pollutants is considered unhealthy. 
## Measures and pollutants
- Temperature
- Humidity
- VOC
- CO2
- PM2.5
- PM10

## Air Quality Levels
![image](https://user-images.githubusercontent.com/43227523/167077565-7edbe21f-c624-4d22-aed3-3d7eefc89d52.png)


## Technical Architecture
![image](https://user-images.githubusercontent.com/43227523/167076636-396cbbdf-5d97-4355-857e-cc6601f75020.png)

## Services

### Frontend
React Web App for visualization of sensor data.\
[Project](front/air-quality-front)

### Frontend Prod
Production ready version of the frontend. App is served statically and a proxy is used to communicate with the backend microservices.\
[Project](front/air-quality-front-prod)

### Backend Microservices
AWS lambdas based REST API in charge of CRUD operations, sms alerts and interaction with the database.\
[Project](microservices)

### MQTT Broker
Mosquitto MQTT broker official docker contaqiner.\
[Project](MQTT_Broker)

### MQTT Listener Server
Server in charge of handling incoming sensor data through MQTT subscriptions and storing into the db. Also triggers SMS alerts when required.\
[Project](MQTT_listener_server)

## Documentation
For more information on the services. Refer to the README file located inside each of the services' directories.
- [Frontend](front/air-quality-front/README.md)
- [Frontend=Prod](front/air-quality-front-prod/README.md)
- [Microservices](microservices/README.md)
- [MQTT Broker](MQTT_Broker/README.md)
- [MQTT listener server](MQTT_listener_server/README.md)
