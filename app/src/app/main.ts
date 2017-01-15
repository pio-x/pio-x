import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

// dev mode only on localhost
if (window.location.hostname != 'localhost') {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule);
