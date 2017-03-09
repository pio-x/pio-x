import {IonicErrorHandler} from "ionic-angular";

export class PioxErrorHandler extends IonicErrorHandler {

  handleError(error) {

    // show error to user on live app
    // TODO: also show error in app
    if (window.location.hostname == 'app.pio-x.ch') {
      alert(error);
    }

    super.handleError(error);
  }
}
