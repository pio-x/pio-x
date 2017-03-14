import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Station } from '../interfaces/station';
import { PioxApiService } from './pioxApi.service';
import {Platform} from "ionic-angular";

@Injectable()
export class StationService {

  private _stations: BehaviorSubject<Array<Station>> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateStations();
    this.startSync();

    // disable sync if app is in background
    this.platform.pause.subscribe(() => {
      this.stopSync();
    });

    // resume sync
    this.platform.resume.subscribe(() => {
      this.startSync();
    });
  }

  private startSync(): void {
     // autoupdate every 15sec
    if (!this.intervalSubscription) {
      let timer = IntervalObservable.create(15 * 1000);
      this.intervalSubscription = timer.subscribe((n) => {
        this.updateStations();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get stations(): Observable<Array<Station>> {
        return this._stations.asObservable();
  }

  public updateStations(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/station');
    promise.then((response) => {
        this._stations.next(response);
    })
    .catch(this.handleError);
    return promise;
  }

  captureStation(stationId: number, imageData: any, tags: any): Promise<any> {
      // Tags disabled because lots of problems
      /*
      let cleanTags = {};

      for (var key in tags) {   
        if (tags.hasOwnProperty(key) && (JSON.stringify(tags[key]).length < 50)) {
          cleanTags[key] = tags[key];
        }
      }

      return this.pioxApi.post('/station/' + stationId + '/capture?tags=' + JSON.stringify(cleanTags), imageData)
      */
      return this.pioxApi.post('/station/' + stationId + '/capture', imageData)
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}