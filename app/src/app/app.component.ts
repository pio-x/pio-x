import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#c1272d');
      Splashscreen.hide();

      // In Mobile Browsern warnen wenn man Seite verlassen will (Back Button Problem)
      if (platform.is('mobileweb')) {
        window.onbeforeunload = function() {
          return "Pio-x verlassen?";
        };
      }
    });

  }
}
