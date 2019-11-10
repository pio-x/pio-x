import {AppState} from 'react-native';
import configStore from "../stores/configStore";
import mapStore from "../stores/mapStore";
import teamStore from "../stores/teamStore";

class SyncManager {

	constructor() {
		AppState.addEventListener('change', (nextAppState) => { this._handleAppStateChange(nextAppState) });
	}

	_handleAppStateChange(nextAppState: string) {
		if (nextAppState === 'active') {
			this.startSync();
		} else {
			this.stopSync();
		}
	};


	startSync(): void {
		// max 60s allowed
		configStore.startSync(60);
		mapStore.startSync(15);
		teamStore.startSync(60);
	}

	stopSync(): void {
		configStore.stopSync();
		mapStore.stopSync();
		teamStore.stopSync();
	}
}

const syncManager = new SyncManager();
export default syncManager;
