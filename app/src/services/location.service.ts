import {Injectable}    from '@angular/core';
import {LatLngLocation} from "../interfaces/LatLngLocation";

declare var google;

@Injectable()
export class LocationService {

    userLocation: LatLngLocation = null;

    locationWatch: any;
    locationWatchOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    subscriptions = [];

    constructor() {
        // Try HTML5 geolocation
        if (navigator.geolocation) {
            this.locationWatch = navigator.geolocation.watchPosition(
                (pos) => { this.userLocationUpdated(pos)} ,
                (err) => { console.log('ERROR getting user location', err) },
                this.locationWatchOptions
            );
        } else {
            // Browser doesn't support Geolocation
            alert('Keine GPS Position gefunden!');
        }
    }

    userLocationUpdated(position) {
        //console.log('location updated', position);
        this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // call all subscribers
        this.subscriptions.forEach((callback) => {
            callback(this.userLocation);
        });
    }

    getLocation(): LatLngLocation {
        return this.userLocation;
    }

    subscribe(callback: (location: LatLngLocation) => void) {
        this.subscriptions.push(callback);
    }
}