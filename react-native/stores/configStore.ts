import {observable, action, runInAction, computed} from 'mobx';
import authStore from "./authStore";
import SyncableStoreBase from "./SyncableStoreBase";
import {IConfig} from "../interfaces/IConfig";

class ConfigStore extends SyncableStoreBase {
	@observable
	config: IConfig = {};

	@observable
	isLoading: boolean = false;

	@action
	reload(): void {
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
