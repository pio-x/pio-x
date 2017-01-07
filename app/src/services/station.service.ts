import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import 'rxjs/add/operator/toPromise';

import { Station } from '../interfaces/station';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class StationService {

  private _stations: BehaviorSubject<Array<Station>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateStations();

    // autoupdate every 15sec
    IntervalObservable.create(15000).subscribe((n) => {
        this.updateStations();
    });
  }

  get stations(): Observable<Array<Station>> {
        return this._stations.asObservable();
  }

  public updateStations(): void {
    this.pioxApi.get('/station')
        .then((response) => {
            this._stations.next(response);
        })
        .catch(this.handleError);
  }

  captureStation(stationId: number, imageData: any, tags: any): Promise<any> {
      return this.pioxApi.post('/station/' + stationId + '/capture?tags=' + JSON.stringify(tags), imageData)
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}