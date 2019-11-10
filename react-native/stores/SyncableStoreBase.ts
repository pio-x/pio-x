
export default abstract class SyncableStoreBase {

	_interval: number|null = null;

	abstract reload(): any;

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
