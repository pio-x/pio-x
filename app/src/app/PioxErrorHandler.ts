import {IonicErrorHandler} from "ionic-angular";

export class PioxErrorHandler extends IonicErrorHandler {

  handleError(error) {

    // show error to user on live app (do not show in dev mode)
    if (window.location.port != '8100') {
      //alert(error);
      document.getElementById('js-error').style.display = 'block';
      document.getElementById('js-error-text').innerHTML = 'Ein Fehler ist aufgetreten: ' + error;
    }

    super.handleError(error);
  }
}
