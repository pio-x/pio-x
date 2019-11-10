export interface ILatLngLocation {
  lat: number;
  lng: number;
}

export interface IUserLatLngLocation extends ILatLngLocation{
  accuracy: number;
  timestamp: Date;
}
