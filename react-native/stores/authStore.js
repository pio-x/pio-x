import {observable, action, computed} from 'mobx';

class AuthStore {
	@observable
	team = null;

	@observable
	mrx = null;

	@observable
	hash = null;

	@observable
	api_url = null;

	@action
	authenticate(team, mrx, hash, api_url) {
		// only set team or mrx
		if (team) {
			this.team = team;
			this.mrx = null;
		} else {
			this.team = null;
			this.mrx = mrx;
		}
		this.hash = hash;
		this.api_url = api_url;
	}

	@computed
	get isMrx() {
		return this.mrx !== null;
	}

	@computed
	get isTeam() {
		return !!this.team;
	}
}

const authStore = new AuthStore();
export default authStore;
