# IoT Air Quality Microservices

Serverless project that includes all lambdas for the API gateway.

REST API comprised of different microservices to interact with the database and provide operations such as Account Access, Sensor Data management, and SMS alerting. These microservices receive and return json objects, which makes them highly versatile.

It is important to note that these microservices were deployed using the serverless framework, which enables the developer to quickly create the API and leverage reusable components. The specification of the whole API is done in the `serverless.yml` file.

Note: This project is deployed to AWS and uses the credentials stored in the machine to handle all the authentication.

## Environment
- **tableName**: The name of the table in DynamoDB. 
- **tokenSecret**: Secret used for JWT tokens.

## Project Structure
Because the project contains multiple lambdas. There is no project entrypoints. 

When the `npm run deploy` command is executed. Webpack is used to package each lambda function with its code and common dependencies and then is deployed into the AWS account registered on the machine.

The `lambdas` dir contains the directories on which all the lambda functions and common code is specified.

### Lambdas
List of all lambda functions implemented. These are divided into categories and there is a directory for each. Each file will be its own lambda function.
Lambda categories:
- Account
- Phone
- Sensors

### Common
This directory contains code that is reused in multiple lambda functions. Instead of repeating it everywere single files are created and imported wherever needed. These are injected into each lambda when the solution is packaged in order to deploy.

**List of common files**
- `Air_Quality_Levels.js`: Constant which has all the Air Quality level categories that trigger an SMS message.
- `API_Responses.js`: Contains the HTTP responses (200, 201, 401, 400, etc.) to be returned by the lambdas. 
- `dates.js`: Functions to manipulate and work with dates. (Could be replaced by moment.js)
- `Dynamo.js`: Functions that handle all the interactions to be made with the dynamo db (Get, Create, Update, etc.)
- `SensorTypes`: Constant that includes the valid sensorTypes: **pm2.5, pm10, voc, co2, temperature and humidity**.

## Endpoints

### Account

#### `/account`
- POST:
  - **What it does**: Registers a new Account.
  - **Requires Authorization Token**: No
  - **Requires API Key**: No
  - **Body**: `{accountName: string, password: string, title: string, description?: string}`
  - **Returns**:
    - 201: When the account was created. Response: `{ success: true, message: "Account Successfully created" }` 
    - 409: When a account with that accountName already exists. Response: `{ error: true, message: "Account name already exists." }`
    - 400: With any other error such as missing fields. Response: `{ error: true, message:'Could not process request'}`


#### `/account/login`
- POST: 
  - **What it does**: Logs in into an account
  - **Requires Authorization Token**: No
  - **Requires API Key**: No
  - **Body**: `{ accountName: string, password: string}`
  - **Returns**:
    - 200: When the user successfuly logs in. Response: `{ success: true, token: Authorization Token}` 
    - 400: When credentials are invalid or any other error occurs. Response: `{ error: true, message: 'Could not log in'}`

#### `/accounts/account`
- GET: 
  - **What it does**: Gets the account information for the logged account.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Returns**:
    - 200: When account information could be fetched. Response: `{ success: true, account: Account with all its info}`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{error: true, message: 'Could not find account'}`

#### `/account/change-password`
- POST: 
  - **What it does**: Changes password for account.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Body**: `{ currentPassword: string, newPassword: string}`
  - **Returns**:
    - 200: When the password was changed. Response: `{ success: true, message: 'Password changed!' }`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{error: true, message: 'Could not change password'}`

#### `/account/description`
- PUT: 
  - **What it does**: Changes description for account.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Body**: `{ description: string}`
  - **Returns**:
    - 200: When the password was changed. Response: `{ success: true, message: 'Account title changed' }`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{error: true, message: 'Could not change title.'}`

#### `/account/title`
- PUT: 
  - **What it does**: Changes title for account.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Body**: `{ title: string}`
  - **Returns**:
    - 200: When the password was changed. Response: `{ success: true, message: 'Account description changed' }`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{error: true, message: 'Could not change description'}`
    - 
### Phone

#### `/account/phone/register`
- POST: 
  - **What it does**: Begins phone registration for account.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Body**: `{ phoneNumber: user phone number}`
  - **Returns**:
    - 200: When phone registration process started. Response: `{ success: true, message: 'Phone number register process started!'}`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{ error: true, message: 'Could not start phone number registration'}`

#### `/account/phone/verify`
- POST: 
  - **What it does**: Verifies phone by using a six digit code and registers it on the db
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Body**: `{ phoneNumber: string, verificationCode: string}`
  - **Returns**:
    - 200: When phone registration process started. Response: `{ success: true, message: 'Phone number changed!'}`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{ error: true, message: 'Could not verify phone number' }`

#### `/send-sms`
- POST: 
  - **What it does**: Sends an sms message to a phone number.
  - **Requires Authorization Token**: No
  - **Requires API Key**: Yes
  - **Body**: `{ number: string, message: string}`
  - **Returns**:
    - 200: When phone registration process started. Response: `{ success: true, message: 'Text has been sent'}`
    - 401: When there is no Authorization header or the token is invalid. Response: `{ message: 'Unauthorized' }` 
    - 400: When any error occurs. Response: `{ error: true, message: 'Could not process request' }`

### Sensors 

#### `/:sensorType`
- POST: 
  - **What it does**: Stores sensor data for given sensorType in db.
  - **Requires Authorization Token**: No
  - **Requires API Key**: Yes
  - **Body**: `{ accountName: string, password: string}`
  - **Returns**:
    - 200: When the sensor data is successfully stored. Response: `{ success: true, message: '{sensorType} Stored'}` 
    - 400:
      - When sensorType is invalid. Response: `{ error: true, message: 'Invalid sensor type' }`
      - When any other error occurs. Response: `{error: true, message: 'Could not store {sensorType}'}`

#### `/:sensorType/most-recent`
- POST: 
  - **What it does**: Gets most recent sensor data object for specified sensor type.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Returns**:
    - 200: When the sensor data could be fetched. Response: `{ success: true, data: Sensor data object}` 
    - 400:
      - When sensorType is invalid. Response: `{ error: true, message: 'Invalid sensor type' }`
      - When any other error occurs. Response: `{ error: true, message: 'Could not get {sensorType}'}`

#### `/:sensorType/:year/:month/:day`
- POST: 
  - **What it does**: Gets sensor data list for specified sensor type and day.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Returns**:
    - 200: When the sensor data could be fetched. Response: `{ success: true, data: Sensor data list for day and sensorType}` 
    - 400:
      - When sensorType is invalid. Response: `{ error: true, message: 'Invalid sensor type' }`
      - When any other error occurs. Response: `{ error: true, message: 'Could not get {sensorType}s'}`

#### `/:sensorType/:year/:month`
- POST: 
  - **What it does**: Gets sensor data list for specified sensor type and month.
  - **Requires Authorization Token**: Yes
  - **Requires API Key**: No
  - **Returns**:
    - 200: When the sensor data could be fetched. Response: `{ success: true, data: Sensor data list for month and sensorType}` 
    - 400:
      - When sensorType is invalid. Response: `{ error: true, message: 'Invalid sensor type' }`
      - When any other error occurs. Response: `{ error: true, message: 'Could not get {sensorType}s'}`


