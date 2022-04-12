#include <MQUnifiedsensor.h> // install MQUnifiedsensor library
//Definitions
#define BOARD "ESP-32"
#define VOLTAGE_RESOLUTION 3.3
#define ANALOG 34 //Analog input 0 
#define TYPE "MQ-135" //MQ135
#define ADC_BIT_RESOLUTION 12
#define RatioMQ135CleanAir 3.6//RS / R0 = 3.6 ppm 
#define A 110.47 // value used in equation of CO2 ppm calculation
#define B -2.862 // value used in equation of CO2 ppm calculation

MQUnifiedsensor MQ135(BOARD, VOLTAGE_RESOLUTION, ADC_BIT_RESOLUTION, ANALOG, TYPE);
float CO2;

void setup() {
  Serial.begin(115200);
  if(Serial) Serial.println("Serial is open");
  
  //Set math model to calculate the PPM concentration and the value of constants
  MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ135.setA(A); MQ135.setB(B); // Configure the equation to to calculate CO2 concentration
  
  MQ135.init(); 
  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for(int i = 1; i<=10; i ++)
  {
    MQ135.update(); // Update data, the arduino will be read the voltage on the analog pin
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
    Serial.print(".");
  }
  MQ135.setR0(calcR0/10);
  Serial.println("  done!.");
  
  if(isinf(calcR0)) {Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply"); while(1);}
  /*****************************  MQ CAlibration ********************************************/ 
  MQ135.serialDebug(false);
  
}

void loop() {
  MQ135.update(); // Update data, the arduino will be read the voltage on the analog pin   
  CO2 = MQ135.readSensor(); // Sensor will read CO2 concentration using the model and a and b values setted before or in the setup   
  Serial.print("CO2: ");   
  Serial.println(CO2);    
  delay(5000); 

}
