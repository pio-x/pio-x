
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Mrx } from '../interfaces/mrx';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class MrxService {

  private _mrxs: BehaviorSubject<Array<Mrx>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateMrxs();

    // autoupdate every 60sec
    IntervalObservable.create(15000).subscribe((n) => {
        this.updateMrxs();
    });
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

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}