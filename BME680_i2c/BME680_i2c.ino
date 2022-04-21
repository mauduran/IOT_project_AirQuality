#include "bsec.h"
#include "Wire.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>


//Replace for ESP32 I2C pinout, GPIO21 SDA, GPIO22 SCL
#define I2C_SDA 21
#define I2C_SCL 22

// Replace the next variables with your SSID/Password combination
const char* ssid = "INFINITUMC9C6_2.4";
const char* password = "DrA32ehN9D";

// Add your MQTT Broker IP address, example:
const char* mqtt_server = "3.87.40.9";
const char* mqttUser = "iot_airquality_admin";
const char* mqttPassword = "admin123";

// Helper functions declarations
void checkIaqSensorStatus(void);
void errLeds(void);
//Client to server communication functions
void setup_wifi();
void reconnect();
void send_data();

// Create an object of the class Bsec
Bsec iaqSensor;
WiFiClient espClient;
PubSubClient client(espClient);

String output;


void setup(void)
{
  Serial.begin(115200);
  Wire.begin(I2C_SDA,I2C_SCL); 
  
  
   if (!iaqSensor.begin(BME680_I2C_ADDR_PRIMARY, Wire)) {
    Serial.println(F("Could not find a valid BME680 sensor, check wiring!"));
    while (1);
  }
  output = "\nBSEC library version " + String(iaqSensor.version.major) + "." + String(iaqSensor.version.minor) + "." + String(iaqSensor.version.major_bugfix) + "." + String(iaqSensor.version.minor_bugfix);
  Serial.println(output);
  //Init wifi network 
  setup_wifi();
  //Init server connection
  client.setServer(mqtt_server, 1883); 

  //Init the IAQ sensor 
  checkIaqSensorStatus();

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
  checkIaqSensorStatus();

  // Print the header
  output = "Timestamp [ms], raw temperature [°C], pressure [hPa], raw relative humidity [%], gas [Ohm], IAQ, IAQ accuracy, temperature [°C], relative humidity [%], Static IAQ, CO2 equivalent, breath VOC equivalent";
  Serial.println(output);
}

void setup_wifi() 
{
  delay(10);
  // We start by connecting to a WiFi network
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
  // Loop until we're reconnected
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
// Function that is looped forever
void loop(void)
{
  unsigned long time_trigger = millis();
  if (iaqSensor.run()) { // If new data is available, TODO: erase the unused data
    output = String(time_trigger);
    output += ", " + String(iaqSensor.rawTemperature);
    output += ", " + String(iaqSensor.pressure);
    output += ", " + String(iaqSensor.rawHumidity);
    output += ", " + String(iaqSensor.gasResistance);
    output += ", " + String(iaqSensor.iaq);
    output += ", " + String(iaqSensor.iaqAccuracy);
    output += ", " + String(iaqSensor.temperature);
    output += ", " + String(iaqSensor.humidity);
    output += ", " + String(iaqSensor.staticIaq);
    output += ", " + String(iaqSensor.co2Equivalent);
    output += ", " + String(iaqSensor.breathVocEquivalent);
    Serial.println(output);
    Serial.print(F("Data avilable at "));
    Serial.println(millis());

    if (!client.connected()) 
    {
      reconnect();
    }
    client.loop();
    send_data();
  } else {
    checkIaqSensorStatus();
  }
}

void send_data()
{
  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& JSONencoder = JSONbuffer.createObject();
  char JSONmessageBuffer[100];  

  //Get temperature data on buffer
  JSONencoder["value"] = String(iaqSensor.temperature);
  JSONencoder["measurement"] = "°C";
  JSONencoder["accountPassword"] = "test123";
  
  if (client.publish("test/temperature", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending temperature message");
  } 
  else 
  {
    Serial.println("Error sending temperature message");
  }
  //Get Humidity data on buffer
  JSONencoder["value"] = String(iaqSensor.humidity);
  JSONencoder["measurement"] = "%";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/humidity", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending humidity message");
  } 
  else 
  {
    Serial.println("Error sending humidity message");
  }

  JSONencoder["value"] = String(iaqSensor.breathVocEquivalent);
  JSONencoder["measurement"] = "ppm";
  JSONencoder["accountPassword"] = "test123";

  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  Serial.println("Sending message to MQTT topic..");
  Serial.println(JSONmessageBuffer);
  
  if (client.publish("test/voc_equivalent", JSONmessageBuffer) == true) 
  {
    Serial.println("Success sending VOC message");
  } 
  else 
  {
    Serial.println("Error sending VOC message");
  }
  delay(60000);
}
// Helper function definitions
void checkIaqSensorStatus(void)
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
