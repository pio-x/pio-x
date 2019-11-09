import {observable, action, runInAction, computed} from 'mobx';
import authStore from "./authStore";
import SyncableStoreBase from "./SyncableStoreBase";

class ConfigStore extends SyncableStoreBase {
	@observable
	config = {};

	@observable
	isLoading = false;

	@action
	reload() {
		this.loadConfig();
	}

	@action
	loadConfig() {
		this.isLoading = true;
		return fetch(authStore.api_url + '/config?hash=' + authStore.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				runInAction(() => {
					this.config = responseJson;
					this.isLoading = false;
				})
			})
			.catch((error) => {
				//console.error(error);
			});
	}
}

const configStore = new ConfigStore();
export default configStore;
