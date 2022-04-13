import { combineReducers } from 'redux';
import accountReducer from './account/account.reducer';

const rootReducer = combineReducers({
    account: accountReducer,
});

export default rootReducer;