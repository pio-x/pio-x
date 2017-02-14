
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Config } from '../interfaces/config';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class ConfigService {

  private _config: BehaviorSubject<Config> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateConfig();

    // autoupdate every 10min
    IntervalObservable.create(10 * 60 * 1000).subscribe((n) => {
        this.updateConfig();
    });
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