import {AppState} from 'react-native';

export default class SyncableStoreBase {

	_interval = null;

	constructor() {
		if (typeof this.reload !== "function") {
			// or maybe test typeof this.method === "function"
			throw new TypeError("A SyncableStore must implement a reload() method");
		}
	}

	startSync(seconds = 60) {
		// autoupdate every x seconds
		if (this._interval === null) {
			this.reload();
			this._interval = setInterval(() => { this.reload() }, seconds * 1000);
		}
	}

	stopSync() {
		if (this._interval !== null) {
			clearInterval(this._interval);
			this._interval = null;
		}
	}
}
