
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Team } from '../interfaces/team';
import { PioxApiService } from './pioxApi.service';
import {Platform} from "ionic-angular";

@Injectable()
export class TeamService {

  private _teams: BehaviorSubject<Array<Team>> = new BehaviorSubject([]);

  private intervalSubscription = null;

  constructor(private pioxApi: PioxApiService, public platform: Platform) {
    this.updateTeams();
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
     // autoupdate every 60sec
    if (!this.intervalSubscription) {
      let timer = IntervalObservable.create(60 * 1000);
      this.intervalSubscription = timer.subscribe((n) => {
        this.updateTeams();
      });
    }
  }

  private stopSync(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  get teams(): Observable<Array<Team>> {
    return this._teams.asObservable();
  }

  public updateTeams(): Promise<any> {
    let promise: Promise<any> = this.pioxApi.get('/team');
    promise.then((response) => {
        this._teams.next(response)
    })
    .catch(this.handleError);
    return promise;
  }

  updateProfileImage(imageData: any): Promise<any> {
      let teamId: string = localStorage.getItem('team');
      return this.pioxApi.put('/team/' + teamId + '/image', imageData)
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public distinctColor(id): string {
      // 32 distinct colors
      let colors = ['#f23e22', '#d1c51d', '#77baad', '#1d1dd1', '#eb2172', '#f0a599', '#b0ac71', '#24fff0', '#9999f0', '#e391a7', '#c96f4f', '#bbeb5b', '#1b9ebf', '#7654d6', '#f2223e', '#ed7321', '#94c981', '#9ee6f7', '#9122f2', '#c74e5e', '#ebb896', '#1ed41e', '#23b2fa', '#a672b3', '#b28046', '#23f794', '#1d65d1', '#f563ff', '#f0ab22', '#18ad7c', '#a3c8ff', '#e359b5']
      return colors[id % 32];
  };

  public imageUrl(img_ID: string) {
      if (this.platform.is('cordova') || window.location.hostname == 'app.pio-x.ch') {
          // on live, use real api url
          return 'https://api.pio-x.ch/uploaded_images/' + img_ID + '.jpg';
      } else {
          // if local_config.js was loaded, use that domain config
          if (window['pioxApiDomain']) {
            return window['pioxApiDomain'] + '/uploaded_images/' + img_ID + '.jpg';
          } else {
            return '';
          }
      }
  }
}