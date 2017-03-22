
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Riddle } from '../interfaces/riddle';
import { PioxApiService } from './pioxApi.service';
import {Platform} from "ionic-angular";

@Injectable()
export class RiddleService {

  private _riddles: BehaviorSubject<Array<Riddle>> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateRiddles();
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
        this.updateRiddles();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get riddles(): Observable<Array<Riddle>> {
    return this._riddles.asObservable();
  }

  public updateRiddles(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/riddle');
    promise.then((response) => {
        this._riddles.next(response)
    })
    .catch(this.handleError);
    return promise;
  }

  public solveRiddle(riddleId, answer, imageData, tags): Promise<any> {
    let promise;
    if (imageData) {
        promise = this.pioxApi.post('/riddle/' + riddleId + '/solve', imageData);
    } else {
      promise = this.pioxApi.post('/riddle/' + riddleId + '/solve', {'answer': answer});
    }
    promise.then((response) => {
        this.updateRiddles();
    });
    return promise
  }

  public unlockRiddle(riddleId): Promise<any> {
    let promise = this.pioxApi.post('/riddle/' + riddleId + '/unlock', []);
    promise.then((response) => {
        this.updateRiddles();
    });
    return promise
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
