import {observable, action, runInAction, computed} from 'mobx';
import authStore from "./authStore";
import SyncableStoreBase from "./SyncableStoreBase";

class TeamStore extends SyncableStoreBase {
	@observable
	teams = [];

	@observable
	isLoading = false;

	@action
	reload() {
		return new Promise((resolve, reject) => {
			this.loadTeams()
				.then(resolve)
				.catch(reject)
		});
	}

	@action
	loadTeams() {
		return new Promise((resolve, reject) => {
			this.isLoading = true;
			return fetch(authStore.api_url + '/team?hash=' + authStore.hash)
				.then((response) => response.json())
				.then((responseJson) => {
					runInAction(() => {
						this.teams = responseJson.sort((a, b) => { return a.score < b.score });
						this.isLoading = false;
						resolve();
					})
				})
				.catch((error) => {
					//console.error(error);
					reject();
				});
		});
	}

	@computed
	get teamsById() {
		let teams = {};
		this.teams.forEach((team) => {
			teams[team.t_ID] = team;
		});
		return teams;
	}
}

const teamStore = new TeamStore();
export default teamStore;
