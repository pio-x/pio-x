import {observable, action} from 'mobx';

class LocationStore {
	@observable
	lat = null;

	@observable
	long = null;

	@observable
	accuracy = null;

	@action
	setLocation(location) {
		this.lat = location.coords.latitude;
		this.long = location.coords.longitude;
		this.accuracy = location.coords.accuracy;
	}
}

const locationStore = new LocationStore();
export default locationStore;
