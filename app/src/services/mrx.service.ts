
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Mrx } from '../interfaces/mrx';
import { PioxApiService } from './pioxApi.service';
import {LatLngLocation} from "../interfaces/LatLngLocation";
import {Platform} from "ionic-angular";

@Injectable()
export class MrxService {

  private _mrxs: BehaviorSubject<Array<Mrx>> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateMrxs();
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
        this.updateMrxs();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get mrxs(): Observable<Array<Mrx>> {
    return this._mrxs.asObservable();
  }

  public updateMrxs(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/mrx');
    promise.then((response) => {
        this._mrxs.next(response)
    })
    .catch(this.handleError);
    return promise;
  }

  public sendLocation(location: LatLngLocation, description: string): Promise<any> {
    let myMrxId: number = parseInt(localStorage.getItem('mrx'));
    let promise = this.pioxApi.post('/mrx/' + myMrxId + '/location', {'description': description, 'location': location});
    promise.then((response) => {
        this.updateMrxs();
    });
    return promise
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}