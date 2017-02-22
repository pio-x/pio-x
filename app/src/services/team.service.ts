
import { Injectable }    from '@angular/core';

import { BehaviorSubject, Observable} from "rxjs";
import { IntervalObservable} from "rxjs/observable/IntervalObservable";

import { Team } from '../interfaces/team';
import { PioxApiService } from './pioxApi.service';

@Injectable()
export class TeamService {

  private _teams: BehaviorSubject<Array<Team>> = new BehaviorSubject([]);

  constructor(private pioxApi: PioxApiService) {
    this.updateTeams();

    // autoupdate every 60sec
    IntervalObservable.create(60000).subscribe((n) => {
        this.updateTeams();
    });
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
}