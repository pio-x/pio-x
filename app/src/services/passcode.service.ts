import { Injectable }    from '@angular/core';

import { PioxApiService } from './pioxApi.service';

@Injectable()
  export class PasscodeService {

  constructor(private pioxApi: PioxApiService) {}

  public claimPasscode(passcode): Promise<any> {
    let promise = this.pioxApi.post('/passcode/solve', {'passcode': passcode, 'team_ID': '1'});
    promise.then((response) => {
        return;
    });
    return promise
  }
}
