import { combineReducers } from 'redux';

// we don't have a login yet
const INITIAL_STATE = {
	team: '5',
	hash: 'DreiradJustizirrtumentdecken',
	api_url: 'https://api.pio-x.ch',
	loggedIn: true
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	default:
		return state
	}
};

export default combineReducers({
	auth: authReducer,
});