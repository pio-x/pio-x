import {observable, action, computed} from 'mobx';

class AuthStore {
	@observable
	team: number|null = null;

	@observable
	mrx: number|null = null;

	@observable
	hash: string|null = null;

	@observable
	api_url: string|null = null;

	@action
	authenticate(team: string|null, mrx: string|null, hash: string|null, api_url: string|null) {
		// only set team or mrx
		if (team !== null) {
			this.team = parseInt(team);
			this.mrx = null;
		} else if (mrx !== null) {
			this.team = null;
			this.mrx = parseInt(mrx);
		}
		this.hash = hash;
		this.api_url = api_url;
	}

	@computed
	get isMrx(): boolean {
		return !!this.mrx;
	}

	@computed
	get isTeam(): boolean {
		return !!this.team;
	}
}

const authStore = new AuthStore();
export default authStore;
