import {IonicErrorHandler} from "ionic-angular";
import Raven from 'raven-js';

Raven
    .config('https://3528ad7d573949958527bf5126feb1b3@sentry.io/153912')
    .install();

export class PioxErrorHandler extends IonicErrorHandler {

  handleError(error) {

    super.handleError(error);

    // show error to user on live app (do not show in dev mode)
    if (window.location.port != '8100') {
      //alert(error);
      document.getElementById('js-error').style.display = 'block';
      document.getElementById('js-error-text').innerHTML = 'Ein Fehler ist aufgetreten: ' + error;

      // Report Error to sentry.io
      try {
        let myteam = 'unknown';
        let myname = 'unknown';
        try {
          myteam = localStorage.getItem('team');
          myname = decodeURIComponent(localStorage.getItem('player')).replace( /\+/g, ' ');
        } catch(e) {}

        Raven.setUserContext({
          username: myteam + '-' + myname
        });
        Raven.captureException(error.originalError || error);
      }
      catch(e) {
        console.error(e);
      }
    }
  }
}
