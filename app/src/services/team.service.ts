import { Console } from '@angular/compiler/src/private_import_core';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Team } from '../interfaces/team';

import { PioxApiService } from './pioxApi.service';

@Injectable()
export class TeamService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private teams:Team[] = [];

  constructor(private pioxApi: PioxApiService) {
    this.getTeams().then(response => this.teams = response)
                  .catch(this.handleError);
  }

  getTeams(): Promise<Team[]> {
    return this.pioxApi.get('/teams.json');
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}