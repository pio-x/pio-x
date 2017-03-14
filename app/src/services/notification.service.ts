
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Notification } from '../interfaces/notification';
import { PioxApiService } from './pioxApi.service';
import {Platform} from "ionic-angular";

@Injectable()
export class NotificationService {

  private _notifications: BehaviorSubject<Array<Notification>> = new BehaviorSubject([]);
  private _notificationsReadUntil: Date;
  private _unread: BehaviorSubject<number> = new BehaviorSubject(0);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateNotifications();
    this.startSync();

    //subscribe to count unread notifications
    this._notificationsReadUntil = new Date(0);
    this.notifications.subscribe((notifications: Array<Notification>) => {
        this.countUnread();
    });

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
        this.updateNotifications();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get notifications(): Observable<Array<Notification>> {
        return this._notifications.asObservable();
    }

  get notificationsUnread(): Observable<number> {
        return this._unread.asObservable();
    }

  public updateNotifications(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/notification');
    promise.then((response) => {
        this._notifications.next(response);
    })
    .catch(() => {
      console.log('an error occured, but we ignore it because its probably a 401 Unauthorized');
    });
    return promise;
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
}
