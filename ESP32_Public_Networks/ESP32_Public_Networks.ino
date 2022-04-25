// Load Wi-Fi library
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino.h>

// Replace with your network credentials
const char* ssid = "My Minga Guest";
const char* password = "";
String url = "http://hotspot.my-minga.de/login?dst=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect&username=T-";
//String url = "http://hotspot.my-minga.de/login?dst=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect&username=T-C8%3AC9%3AA3%3ACE%3A8F%3ACC";
String payload;
int httpResponseCode;

void setup() {
  Serial.begin(115200);
  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  GetUrl();
  Serial.println(url);
  
  HTTPClient http;
  http.useHTTP10(true);
  http.begin(url);
  httpResponseCode = http.GET();
  Serial.println(httpResponseCode);
  payload = http.getString();
  Serial.println(payload);
  http.end();
  url = "http://google.com";
  Serial.println(url);
  delay(2000);
  http.begin(url);
  httpResponseCode = http.GET();
  Serial.println(httpResponseCode);
  payload = http.getString();
  Serial.println(payload);
}

void loop(){
  

}

void GetUrl(){
  byte mac[6];
  WiFi.macAddress(mac);
  String aux = String(mac[0],HEX) + "%3A" + String(mac[1],HEX) + "%3A" + String(mac[2],HEX) + "%3A" + String(mac[3],HEX) + "%3A" + String(mac[4],HEX) + "%3A" + String(mac[5],HEX);
  aux.toUpperCase();
  url = url + aux;  
}
