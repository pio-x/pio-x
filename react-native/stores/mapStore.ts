import {observable, action, runInAction} from 'mobx';
import authStore from "./authStore";
import SyncableStoreBase from "./SyncableStoreBase";
import {IStation} from "../interfaces/IStation";
import {IMrx} from "../interfaces/IMrx";

class MapStore extends SyncableStoreBase {
	@observable
	stations: IStation[] = [];

	@observable
	mrx: IMrx[] = [];

	@action
	reload() {
		this.loadStations();
		this.loadMrx();
	}

	@action
	loadStations() {
		return fetch(authStore.api_url + '/station?hash=' + authStore.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				runInAction(() => {
					this.stations = responseJson;
				})
			})
			.catch((error) => {
				//console.error(error);
			});
	}

	@action
	loadMrx() {
		return fetch(authStore.api_url + '/mrx?hash=' + authStore.hash)
			.then((response) => response.json())
			.then((responseJson) => {
				runInAction(() => {
					this.mrx = responseJson;
				})
			})
			.catch((error) => {
				//console.error(error);
			});
	}
}

const mapStore = new MapStore();
export default mapStore;
