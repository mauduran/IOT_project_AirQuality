
/**
 * 2022 Air Quality System
 * Measures pollution levels in the air using CO2, VOC and PM levels
 * as reference with the following hardware:
 *    ESP32 development kit
 *    MQ135 gas sensor for CO2
 *    BME680 gas sensor for temperature, humidity and VOC
 *    PMS5003 gas sensor for PM2.5 and PM10
 *
 * @file  air_quality.c
 * @date  23 Jan 2020
 * @version 3.5.10
 * @brief Install all libraries from Arduino platform 
 *
 */

/************************ Sensors libraries ******************************/
#include <MQUnifiedsensor.h>    //MQ135 sensor library
#include "PMS.h"                //PMS5003 sensor library
#include "bsec.h"               //BME680 sensor library
/************************ Connectivity libraries **************************/
#include "Wire.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define BOARD "ESP-32"
/***************************  PMS5003 definitions *************************/
#define WAKE_UP 30000         // 30 seconds
#define SLEEP 60000           // 60 seconds 
#define PM2_5_CALIBRATION 5.5 // Compared to external sensor calibration 
#define PM10_CALIBRATION          4.5 // Compared to external sensor calibration
/***************************  BME680 definitions ***************************/
#define I2C_SDA 21            // GPIO21 SDA
#define I2C_SCL 22            // GPIO22 SCL

/************************* Global definitions ****************************/
/* Data sampling time to server*/
#define SERVER_UPLOAD 60000*4 //Upload data to cloud each 4 minutes
float CO2;

/*PMS functions and variables*/
void checkPMSSensorStatus(void);
PMS pms(Serial2);
PMS::DATA data;

/*BME680 functions and variables*/
void checkBMESensorStatus(void);
Bsec iaqSensor;

/* Network functions definitions*/
void setup_wifi();
void reconnect();
void send_data();
/* Network variables*/
const char* ssid = "INFINITUMC9C6_2.4";
const char* password = "DrA32ehN9D";
//const char* ssid = "redsatot_2.4Gnormal";
//const char* password = "Son2008sel";

WiFiClient espClient;
PubSubClient client(espClient);
/* MQTT connectivity  */
const char* mqtt_server = "3.87.40.9";
const char* mqttUser = "iot_airquality_admin";
const char* mqttPassword = "admin123";

/*Timing definitions for sampling time*/
unsigned long currentMillis;
unsigned long startMillis_sampling;
unsigned long wakeupMillis_pms;
unsigned long sleepMillis_pms;
unsigned long lastUpdateMillis_server;

bool awake_PMS = true;
bool sleep_PMS = false;

/* IAQ variables to upload to cloud*/
struct IAQ_pollutants{
  float CO2; 
  float PM2_5;
  float PM10;
  float temp;
  float hum;
  float VOC;
  };
IAQ_pollutants pollutants;

String output;

void setup() 
{
  Serial.begin(115200);
  if(Serial) Serial.println("Serial is open");
  /* BME680 setup*/
  Wire.begin(I2C_SDA,I2C_SCL); 
  iaqSensor.begin(BME680_I2C_ADDR_SECONDARY, Wire);
  checkBMESensorStatus();
  bsec_virtual_sensor_t sensorList[10] = {
    BSEC_OUTPUT_RAW_TEMPERATURE,
    BSEC_OUTPUT_RAW_PRESSURE,
    BSEC_OUTPUT_RAW_HUMIDITY,
    BSEC_OUTPUT_RAW_GAS,
    BSEC_OUTPUT_IAQ,
    BSEC_OUTPUT_STATIC_IAQ,
    BSEC_OUTPUT_CO2_EQUIVALENT,
    BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };
  iaqSensor.updateSubscription(sensorList, 10, BSEC_SAMPLE_RATE_LP);
  checkBMESensorStatus();
  /* PMS5003 setup*/
  Serial2.begin(9600);          // PMS5003 UART TX2 RX2 
  pms.passiveMode();            // Switch to passive mode
  pms.wakeUp();
  awake_PMS = true;

  /*Network setup*/
  setup_wifi();                         //Init wifi network
  client.setServer(mqtt_server, 1883);  //Init server connection

  while(1)
  {
    if (iaqSensor.run()) 
    {
      if((int(iaqSensor.co2Equivalent) != 500) || (int((iaqSensor.breathVocEquivalent*10)) != 4))
      {
        pollutants.CO2 = iaqSensor.co2Equivalent; 
        pollutants.VOC = iaqSensor.breathVocEquivalent * 15;
        pollutants.temp = iaqSensor.temperature;
        pollutants.hum = iaqSensor.humidity;
        pms.requestRead();
        if (pms.readUntil(data))
        {
          pollutants.PM2_5 = data.PM_AE_UG_2_5;
          pollutants.PM10 = data.PM_AE_UG_10_0;
        }
        break;
      }
      else
      {
        Serial.println("Waiting calibration");
      }
    } 
    else 
    {
      checkBMESensorStatus();
    }
  } 
}




void loop() 
{
    currentMillis = millis(); /* Get the current time since the program started*/
    /* BME680 sensor*/ 
     if (iaqSensor.run()) 
     { // If new data is available send to make the average
      output = "";
      output += ", " + String(iaqSensor.temperature);
      output += ", " + String(iaqSensor.humidity);
      output += ", " + String(iaqSensor.co2Equivalent);
      output += ", " + String(iaqSensor.breathVocEquivalent * 15);

      pollutants.CO2 = (pollutants.CO2 + iaqSensor.co2Equivalent)/2; 
      pollutants.VOC = ((pollutants.VOC + (iaqSensor.breathVocEquivalent)*15)/2);
      pollutants.temp = (pollutants.temp + iaqSensor.temperature)/2;
      pollutants.hum = (pollutants.hum + iaqSensor.humidity)/2;
      Serial.println(output);

      pms.requestRead();
      if (pms.readUntil(data))
      {
          Serial.print("PM 2.5 (ug/m3): ");
          Serial.println(data.PM_AE_UG_2_5);
          pollutants.PM2_5 = (pollutants.PM2_5 + data.PM_AE_UG_2_5)/2;

          Serial.print("PM 10 (ug/m3): ");
          Serial.println(data.PM_AE_UG_10_0);
          pollutants.PM10 = (pollutants.PM10 + data.PM_AE_UG_10_0)/2;
      }
      else
      {
        Serial.println("No data.");
      }
     }
     else
     {
      checkBMESensorStatus();
     }
    startMillis_sampling = currentMillis;
    
    currentMillis = millis();
  /*Send data to the brocker each 3 minutes*/
    if((currentMillis - lastUpdateMillis_server) >= SERVER_UPLOAD)
    {
      //send_data();
      lastUpdateMillis_server = currentMillis;
    }
}

void setup_wifi() 
{
  delay(10);
  /* Connect to a Wifi Network*/
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() 
{
  /* Loop until we're reconnected */
  while (!client.connected()) 
  {
    Serial.print("Attempting MQTT connection...");
     if (client.connect("ESP32Client", mqttUser, mqttPassword )) 
     {
        Serial.println("connected");
      } 
      else 
      {
        Serial.print("failed with state ");
        Serial.println(client.state());
        delay(2000);
      }
  }
}

void checkBMESensorStatus(void)
{
  if (iaqSensor.status != BSEC_OK) {
    if (iaqSensor.status < BSEC_OK) {
      output = "BSEC error code : " + String(iaqSensor.status);
      Serial.println(output);
    } else {
      output = "BSEC warning code : " + String(iaqSensor.status);
      Serial.println(output);
    }
  }

  if (iaqSensor.bme680Status != BME680_OK) {
    if (iaqSensor.bme680Status < BME680_OK) {
      output = "BME680 error code : " + String(iaqSensor.bme680Status);
      Serial.println(output);     
    } else {
      output = "BME680 warning code : " + String(iaqSensor.bme680Status);
      Serial.println(output);
    }
  }
}

void send_data()
{
  if (!client.connected()) 
  {
    reconnect();
  }
  client.loop();
  
  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& JSONencoder = JSONbuffer.createObject();
  char JSONmessageBuffer[100];  

  //Get temperature data on buffer
  JSONencoder["value"] = String(pollutants.temp);
  JSONencoder["measurement"] = "°C";
  JSONencoder["accountPassword"] = "test123";
  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending temperature message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/temperature", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending temperature message");
  } 
  else 
  {
    Serial.println("Error sending temperature message");
  }
  //Get Humidity data on buffer
  JSONencoder["value"] = String(pollutants.hum);
  JSONencoder["measurement"] = "%";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending humidity message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/humidity", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending humidity message");
  } 
  else 
  {
    Serial.println("Error sending humidity message");
  }

  JSONencoder["value"] = String(pollutants.VOC);
  JSONencoder["measurement"] = "ppm";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending VOC  message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/voc", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending VOC message");
  } 
  else 
  {
    Serial.println("Error sending VOC message");
  }

  JSONencoder["value"] = String(pollutants.CO2);
  JSONencoder["measurement"] = "ppm";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending CO2  message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/co2", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending CO2 message");
  } 
  else 
  {
    Serial.println("Error sending CO2 message");
  }
  JSONencoder["value"] = String(pollutants.PM2_5);
  JSONencoder["measurement"] = "ug/m3";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending PM2.5  message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/pm2.5", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending PM2.5 message");
  } 
  else 
  {
    Serial.println("Error sending PM2.5 message");
  }
  JSONencoder["value"] = String(pollutants.PM10);
  JSONencoder["measurement"] = "ug/m3";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending PM10  message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/pm10", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending PM10 message");
  } 
  else 
  {
    Serial.println("Error sending PM10 message");
  }
}
