import { combineReducers } from 'redux';
import accountReducer from './account/account.reducer';
import notificationReducer from './notification/notification.reducer';


const rootReducer = combineReducers({
    account: accountReducer,
    notification: notificationReducer,
});

export default rootReducer;