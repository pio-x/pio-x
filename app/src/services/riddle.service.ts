
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/toPromise';

import { Riddle } from '../interfaces/riddle';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class RiddleService {

  private _riddles: BehaviorSubject<Array<Riddle>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateRiddles();

    // autoupdate every 60sec
    IntervalObservable.create(60000).subscribe((n) => {
        this.updateRiddles();
    });
  }

  get riddles(): Observable<Array<Riddle>> {
    return this._riddles.asObservable();
  }

  public updateRiddles(): void {
    this.pioxApi.get('/riddle')
        .then((response) => {
            this._riddles.next(response)
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}