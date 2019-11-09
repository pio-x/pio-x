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
		this.loadTeams();
	}

	@action
	loadTeams() {
		this.isLoading = true;
		return fetch(authStore.api_url + '/team?hash=' + authStore.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				runInAction(() => {
					this.teams = responseJson.sort((a, b) => { return a.score < b.score });
					this.isLoading = false;
				})
			})
			.catch((error) => {
				//console.error(error);
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
