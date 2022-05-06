# IoT Air Quality Project

## Pages
- **Sign In / Sign Up**: `/signin` - Used to create account or login.\

![image](https://user-images.githubusercontent.com/43227523/167073010-f97aaa70-3f42-43c8-a467-c4f43e592ee2.png)

- **Dashboard**: `/` or `dashboard` - Dashboard. Shows sensor levels as well as daily and monthly charts for sensors.\ 

![image](https://user-images.githubusercontent.com/43227523/167073170-9e770dd1-81f4-4c7a-987c-e36f1cd8fa4f.png)


- **Account**: `/account` - Account settings. Allows user to see current settings and do operations such as changing the title or password for the account and registering a phone number for SMS alerts. \ 
- 
![image](https://user-images.githubusercontent.com/43227523/167073225-48ce645f-9db7-4b80-845e-f2860f2a8cd9.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## File Structure

### App.js
- Sets up the whole application.
- Defines the app routes and assigns components to them.
- Checks if user is logged 

### src/common
This dir includes components that can be reutilized. Such as LoadingSpinner, Daily Sensor Graphs and Monthly Sensor Graphs.

### src/components
Includes the components to be used in the containers. All components are included in a folder with their name. This folder contains the jsx commponent along with a styles file which can be of .css or .js extension.

### src/constants
Includes constants to be used in the project. This prevents from having typos.

**Constants files**
- `AirQualityLevels,js` - Air Quality level categories.
- `Risk Level Colors.js` - Colors associated to the different Air Quality level categories.
- `SensorLimits.js` - Air Quality limits for each category per sensor type.
- `SensorTypes.js` - All the kinds of sensor types.

### src/containers
Includes the main sections of the website. Containers import other components and make bigger componens such as pages.

### src/hooks
Lifecycle hooks that can be leveraged by components to do some particular work.

**Hooks files**
- `useInterval.js` - React hook that executes some action at a every given interval (given in milliseconds).

### src/redux
These folder is in charge of managing the main state of the app. State can be changed anywhere in the app by dispatching actions that trigger the state change workflow.

The dir contains three main files for managing state:
 - `root.reducer.js`:  Combines all reducers into one big reducer.
 - `root.saga.js`: Sets all the sagas (action dispatch listeners) up for use.
 - `store.js`: Sets the redux environment, creates a store using the root reducer, runs tha root saga and includes redux middlewaress.

**Redux states**
- `Account` - Manages all state and actions related to the user account
- `Sensors` - Manages all state and actions related to sensors.
- `Phone` - Manages all state and actions related to an account's phone number.

### src/utils
Utility files that do a particular kind of work that is leveraged by the components.

**Utils files**
- `sensors.utils.js`: Functions that aggregate sensor data in a way that can be shown using graphs.
- `time.utils.js`: Functions to do specific operations with dates. Uses `moment.js`

