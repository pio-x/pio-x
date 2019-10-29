const INITIAL_STATE = {
	lat: null,
	long: null,
	accuracy: null,
};

export default  (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_LOCATION':
			return Object.assign({}, state, {
				lat: action.location.coords.latitude,
				long: action.location.coords.longitude,
				accuracy: action.location.coords.accuracy,
			});
		default:
			return state
	}
};
