import {observable, action} from 'mobx';
import * as Location from 'expo-location';

class LocationStore {
	@observable
	lat: number|null = null;

	@observable
	long: number|null = null;

	@observable
	accuracy: number|null = null;

	@action
	setLocation(location: Location.LocationData): void {
		this.lat = location.coords.latitude;
		this.long = location.coords.longitude;
		this.accuracy = location.coords.accuracy;
	}
}

const locationStore = new LocationStore();
export default locationStore;
