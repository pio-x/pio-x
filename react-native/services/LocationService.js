import React from 'react';
import {Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import store from '../stores/store'

export default class LocationService {

	static myInstance = null;

	_errorMessage = "";
	_location = null;

	constructor() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this._errorMessage = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!';
		} else {
			Permissions.askAsync(Permissions.LOCATION).then((response) => {
				if (response.status !== 'granted') {
					this._errorMessage = 'Permission to access location was denied';
				}

				let watchOptions = {
					accuracy: Location.Accuracy.Highest,
					timeInterval: 1000
				};
				Location.watchPositionAsync(watchOptions, (location) => {
					console.log(location);
					this._location = location;
					store.dispatch({
						type: 'SET_LOCATION',
						location: location
					})
				});
			});
		}
	}


	/**
	 * @returns {LocationService}
	 */
	static getInstance() {
		if (LocationService.myInstance == null) {
			LocationService.myInstance = new LocationService();
		}

		return this.myInstance;
	}

	get errorMessage() {
		return this._errorMessage;
	}

	get location() {
		return this._location;
	}
}