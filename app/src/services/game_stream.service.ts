
import { Injectable }    from '@angular/core';
import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { PioxApiService } from './pioxApi.service';
import { Log } from '../interfaces/log';

@Injectable()
export class GameStreamService {
  private _logs: BehaviorSubject<Array<Log>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateStream();
    IntervalObservable.create(60000).subscribe((n) => {
        this.updateStream();
    });
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
