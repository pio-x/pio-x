
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Config } from '../interfaces/config';
import { PioxApiService } from './pioxApi.service';
import {Platform} from "ionic-angular";

@Injectable()
export class ConfigService {

  private _config: BehaviorSubject<Config> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateConfig();
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
    // autoupdate every 10min
    if (!this.intervalSubscription) {
      let timer = IntervalObservable.create(10 * 60 * 1000);
      this.intervalSubscription = timer.subscribe((n) => {
        this.updateConfig();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get config(): Observable<Config> {
    return this._config.asObservable();
  }

  public getConfig(): Config {
    return this._config.getValue();
  }

  public updateConfig(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/config');
    promise.then((response) => {
        this._config.next(response)
    })
    .catch(this.handleError);
    return promise;
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}