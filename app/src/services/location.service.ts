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

    getDistanceBetween(lat1,lon1,lat2,lon2): number {
      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      let dLon = this.deg2rad(lon2-lon1);
      let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c * 1000; // Distance in meters
      return Math.round(d);
    }

    private deg2rad(deg): number {
        return deg * (Math.PI/180)
    }
}