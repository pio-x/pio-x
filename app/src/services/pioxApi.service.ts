import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import {LocationService} from "./location.service";

import {Platform} from "ionic-angular";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PioxApiService {

  private get baseurl() {
      if (localStorage.getItem('api') === null) {
          return null;
      } else {
          return localStorage.getItem('api');
      }
  }

  constructor(private http: Http, private locationService: LocationService, public platform: Platform) {
  }

  private getOptions(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('X-Piox-Team', localStorage.getItem('team'));
    headers.append('X-Piox-Player', localStorage.getItem('player'));
    headers.append('X-Piox-Hash', localStorage.getItem('hash'));
    headers.append('X-Piox-Location', JSON.stringify(this.locationService.getLocation()));
    return new RequestOptions({ headers: headers });
  }

  get(url): Promise<any> {
      if (this.baseurl === null) {
          return new Promise((resolve) => {resolve(); });
      } else {
          return this.http.get(this.baseurl + url, this.getOptions())
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
      }
  }
  post(url, data): Promise<any> {
      if (this.baseurl === null) {
          return new Promise((resolve) => {resolve(); });
      } else {
          return this.http.post(this.baseurl + url, data, this.getOptions())
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
      }
  }
  put(url, data): Promise<any> {
      if (this.baseurl === null) {
          return new Promise((resolve) => { resolve(); });
      } else {
          return this.http.put(this.baseurl + url, data, this.getOptions())
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
      }
  }

  private handleError(error: any): Promise<any> {
    console.error('A http error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
