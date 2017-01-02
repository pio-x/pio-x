import { Console } from '@angular/compiler/src/private_import_core';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Station } from '../interfaces/station';

import { PioxApiService } from './pioxApi.service';

@Injectable()
export class StationService {

  private stations:Station[] = [];

  constructor(private pioxApi: PioxApiService) {
    this.getStations().then(response => this.stations = response)
                  .catch(this.handleError);
  }

  getStations(): Promise<Station[]> {
    return this.pioxApi.get('/station');
  }

  captureStation(stationId: number): Promise<any> {
      return this.pioxApi.post('/station/' + stationId + '/capture', {})
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}