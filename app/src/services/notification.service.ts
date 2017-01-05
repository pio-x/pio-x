
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/toPromise';

import { Notification } from '../interfaces/notification';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class NotificationService {

  private _notifications: BehaviorSubject<Array<Notification>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateNotifications();

    // autoupdate every 60sec
    IntervalObservable.create(60000).subscribe((n) => {
        this.updateNotifications();
    });
  }

  get notifications(): Observable<Array<Notification>> {
        return this._notifications.asObservable();
    }

  public updateNotifications(): void {
    this.pioxApi.get('/notification')
        .then((response) => {
            this._notifications.next(response)
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}