#include "PMS.h" // include PMS_Library
#define WAKE_UP 30000 // 30 seconds
#define SLEEP 60000 // 60 seconds
PMS pms(Serial2);
PMS::DATA data;

void setup()
{
  Serial.begin(115200);   // PC UART
  Serial2.begin(9600);  // PSM UART TX2 RX2 
  pms.passiveMode();    // Switch to passive mode
}
void loop()
{
  Serial.println("Waking up, wait 30 seconds for stable readings...");
  pms.wakeUp();
  delay(WAKE_UP);

  Serial.println("Send read request...");
  pms.requestRead();

  Serial.println("Wait max. 1 second for read...");
  if (pms.readUntil(data))
  {
    Serial.print("PM 1.0 (ug/m3): ");
    Serial.println(data.PM_AE_UG_1_0);

    Serial.print("PM 2.5 (ug/m3): ");
    Serial.println(data.PM_AE_UG_2_5);

    Serial.print("PM 10.0 (ug/m3): ");
    Serial.println(data.PM_AE_UG_10_0);
  }
  else
  {
    Serial.println("No data.");
  }

  Serial1.println("Going to sleep for 60 seconds.");
  pms.sleep();
  delay(SLEEP);
}
