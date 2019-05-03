
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Notification } from '../interfaces/notification';
import { PioxApiService } from './pioxApi.service';
import {AlertController, Platform} from "ionic-angular";

@Injectable()
export class NotificationService {

  private _notifications: BehaviorSubject<Array<Notification>> = new BehaviorSubject([]);
  private _unread: BehaviorSubject<number> = new BehaviorSubject(0);

  private intervalSubscription = null;

  private shownNotifications: number[] = [];

  constructor(private pioxApi: PioxApiService, public platform: Platform, public alertController: AlertController) {
    this.updateNotifications();
    this.startSync();

    //subscribe to count unread notifications
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

  get _notificationsReadUntil(): Date {
    let val = localStorage.getItem('notificationsReadUntil');
    if (val && Date.parse(val)) {
      return new Date(val);
    } else {
      return new Date(0);
    }
  }

  set _notificationsReadUntil(date: Date) {
    localStorage.setItem('notificationsReadUntil', date.toString());
  }

  get notifications(): Observable<Array<Notification>> {
        return this._notifications.asObservable();
    }

  get notificationsUnread(): Observable<number> {
        return this._unread.asObservable();
    }

  public updateNotifications(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/notification');
    promise.then((response: Notification[]) => {
        this._notifications.next(response);

        response.forEach((notification) => {
          if (notification.timestamp > this._notificationsReadUntil.getTime()) {
            if (this.shownNotifications.indexOf(notification.n_ID) < 0) {
              this.shownNotifications.push(notification.n_ID);
              this.presentNotification(notification);
            }
          }
        });
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

  async presentNotification(notification: Notification) {
    const alert = await this.alertController.create({
      title: notification.title,
      message: notification.text,
      buttons: [{
          text: 'Okay',
          handler: () => {
            this.notificationsRead();
          }
        }]
    });

    await alert.present();
  }
}
