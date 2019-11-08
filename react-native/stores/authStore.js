import {observable, action} from 'mobx';

class AuthStore {
	@observable
	team = null;

	@observable
	hash = null;

	@observable
	api_url = null;

	@action
	authenticate(team, hash, api_url) {
		this.team = team;
		this.hash = hash;
		this.api_url = api_url;
	}
}

const authStore = new AuthStore();
export default authStore;
