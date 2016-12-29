import { Console } from '@angular/compiler/src/private_import_core';
import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PioxApiService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  private get baseurl() {
      if (window.location.hostname == 'app.pio-x.ch') {
          // on live, use real api url
          return 'https://api.pio-x.ch';
      } else {
          // on dev, use static files on localhost
          return '/api_dummy';
      }
  }

  constructor(private http: Http) {
  }

  get(url): Promise<any> {
    return this.http.get(this.baseurl + url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  post(url, data): Promise<any> {
    return this.http.post(this.baseurl + url, data, this.options)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}