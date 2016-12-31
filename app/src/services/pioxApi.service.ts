import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {LocationService} from "./location.service";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PioxApiService {

  private get baseurl() {
      if (window.location.hostname == 'app.pio-x.ch') {
          // on live, use real api url
          return 'https://api.pio-x.ch';
      } else {
          // on dev, use static files on localhost
          return '/api_dummy';
      }
  }

  constructor(private http: Http, private locationService: LocationService) {
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
    return this.http.get(this.baseurl + url, this.getOptions())
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  post(url, data): Promise<any> {
    return this.http.post(this.baseurl + url, data, this.getOptions())
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}