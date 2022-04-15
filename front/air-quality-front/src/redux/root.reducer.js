import { combineReducers } from 'redux';
import accountReducer from './account/account.reducer';
import notificationReducer from './notification/notification.reducer';
import phoneReducer from './phone/phone.reducer';
import sensorsReducer from './sensors/sensors.reducer';


const rootReducer = combineReducers({
    account: accountReducer,
    notification: notificationReducer,
    phone: phoneReducer,
    sensors: sensorsReducer,
});

export default rootReducer;