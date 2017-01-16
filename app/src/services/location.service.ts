import {Injectable}    from '@angular/core';
import {LatLngLocation} from "../interfaces/LatLngLocation";

import {BehaviorSubject, Observable} from "rxjs";

declare var google;

@Injectable()
export class LocationService {

    private _userLocation: BehaviorSubject<LatLngLocation> = new BehaviorSubject(null);

    private locationWatch: any;
    private locationWatchOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    constructor() {
        // Try HTML5 geolocation
        if (navigator.geolocation) {
            this.locationWatch = navigator.geolocation.watchPosition(
                (pos) => { this.userLocationUpdated(pos)} ,
                (error) => {
                    if (error.code == error.PERMISSION_DENIED) {
                          alert("Du musst dieser App erlauben auf deinen Standort zuzugreifen.");
                    }
                    console.log('ERROR getting user location', error)
                },
                this.locationWatchOptions
            );
        } else {
            // Browser doesn't support Geolocation
            alert('Keine GPS Position gefunden!');
        }
    }

    userLocationUpdated(position) {
        //console.log('location updated', position);
        this._userLocation.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }

    getLocation(): LatLngLocation {
        return this._userLocation.getValue();
    }

    get userLocation(): Observable<LatLngLocation> {
        return this._userLocation.asObservable();
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

    getDistanceToUser(lat, lng) {
        if (!this._userLocation.getValue()) {
            // if location is not available, return a huge number :P
            return Number.MAX_VALUE;
        }
        return this.getDistanceBetween(lat, lng, this._userLocation.getValue().lat, this._userLocation.getValue().lng)
    }

    private deg2rad(deg): number {
        return deg * (Math.PI/180)
    }
}