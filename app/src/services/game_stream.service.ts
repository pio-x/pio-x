
import { Injectable }    from '@angular/core';
import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { PioxApiService } from './pioxApi.service';
import { Log } from '../interfaces/log';
import {Platform} from "ionic-angular";

@Injectable()
export class GameStreamService {
  private _logs: BehaviorSubject<Array<Log>> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateStream();
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
     // autoupdate every 60sec
    if (!this.intervalSubscription) {
      let timer = IntervalObservable.create(60 * 1000);
      this.intervalSubscription = timer.subscribe((n) => {
        this.updateStream();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get logs(): Observable<Array<Log>> {
    return this._logs.asObservable();
  }

  public updateStream(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/log');
    promise.then((response) => {
        this._logs.next(response)
    })
    .catch(this.handleError);
    return promise;
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
