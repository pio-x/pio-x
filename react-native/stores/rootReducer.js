import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
	auth: authReducer,
	location: locationReducer
})
