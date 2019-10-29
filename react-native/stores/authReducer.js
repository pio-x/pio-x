const INITIAL_STATE = {
	team: null,
	hash: null,
	api_url: null,
};

export default (state = INITIAL_STATE, action) => {
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
