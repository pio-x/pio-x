import { NotificationsPage } from '../pages/notifications/notifications';
import { Console } from '@angular/compiler/src/private_import_core';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Notification } from '../interfaces/notification';

import { PioxApiService } from './pioxApi.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class NotificationService {

  private notifications:Notification[] = [];
  private storage: Storage;

  constructor(private pioxApi: PioxApiService, storage: Storage) {
    this.storage = storage;
    this.storage.get('notifications').then(notifications => {
       if (notifications != null) {
         console.log(notifications);
          this.update(JSON.parse(notifications))
       }
     })
  }

  read(id: number): void {
    //TODO: use a find method
    for (let idx in this.notifications) {
      if ((this.notifications[idx].n_ID == id)) {
        this.notifications[idx].read = true;
        this.toStorage();
      }
    }
  }

  toStorage(): void {
    this.storage.set('notifications', JSON.stringify(this.notifications));
  }

  update(notifications: Notification[]): Notification[] {
    for (let idx in notifications) {
      if (!(idx in this.notifications)) {
        this.notifications[idx] = notifications[idx];
      }
    }
    this.notifications.sort((e1,e2) => e1.timestamp - e2.timestamp);
    this.toStorage();
    return this.notifications;
  }

  get(): Promise<Notification[]> {
    return this.pioxApi.get('/notification').then(response => this.update(response))
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}