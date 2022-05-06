# IoT Air Quality Microservices

Serverless project that includes all lambdas for the API gateway.

REST API comprised of different microservices to interact with the database and provide operations such as Account Access, Sensor Data management, and SMS alerting. These microservices receive and return json objects, which makes them highly versatile.

It is important to note that these microservices were deployed using the serverless framework, which enables the developer to quickly create the API and leverage reusable components. The specification of the whole API is done in the `serverless.yml` file.

Note: This project is deployed to AWS and uses the credentials stored in the machine to handle all the authentication.

## Environment
- **tableName**: The name of the table in DynamoDB. 
- **tokenSecret**: Secret used for JWT tokens.

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
    - 400: With any other error such as missing fields. Response: `{ success: false, message:'Could not process request'}`
