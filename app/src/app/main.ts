import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

// dev mode only when served at port 8100 (ionic serve)
if (window.location.port != '8100') {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule);
