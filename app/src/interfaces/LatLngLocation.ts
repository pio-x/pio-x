export interface LatLngLocation {
  lat: number;
  lng: number;
}

export interface UserLatLngLocation extends LatLngLocation{
  accuracy: number;
  timestamp: Date;
}
