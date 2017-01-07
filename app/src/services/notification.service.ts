
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/toPromise';

import { Notification } from '../interfaces/notification';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class NotificationService {

  private _notifications: BehaviorSubject<Array<Notification>> = new BehaviorSubject([]);
  private _notificationsReadUntil: Date;
  private _unread: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private pioxApi: PioxApiService) {
    this.updateNotifications();

    // autoupdate every 60sec
    IntervalObservable.create(60000).subscribe((n) => {
        this.updateNotifications();
    });

    //subscribe to count unread notifications
    this._notificationsReadUntil = new Date(0);
    this.notifications.subscribe((notifications: Array<Notification>) => {
        this.countUnread();
    });
  }

  get notifications(): Observable<Array<Notification>> {
        return this._notifications.asObservable();
    }

  get notificationsUnread(): Observable<number> {
        return this._unread.asObservable();
    }

  public updateNotifications(): void {
    this.pioxApi.get('/notification')
        .then((response) => {
            this._notifications.next(response);
        })
        .catch(this.handleError);
  }

  public notificationsRead(): void {
    this._notificationsReadUntil = new Date();
    this.countUnread();
  }

  private countUnread(): void {
    let count = 0;
    for (let n of this._notifications.getValue()) {
      let timestamp = new Date(n.timestamp).getTime();
      if (timestamp - this._notificationsReadUntil.getTime() > 0) {
        count += 1;
      }
    }
    this._unread.next(count);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}