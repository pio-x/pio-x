import { combineReducers } from 'redux';

// we don't have a login yet
const INITIAL_STATE = {
	team: null,
	hash: null,
	api_url: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_AUTH':
			return Object.assign({}, state, {
				team: action.team,
				hash: action.hash,
				api_url: action.api_url,
			});
		default:
			return state
	}
};

export default combineReducers({
	auth: authReducer,
});