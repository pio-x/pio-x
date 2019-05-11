webpackJsonp([0],{

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StationService = (function () {
    function StationService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._stations = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateStations();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    StationService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 15sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(15 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateStations();
            });
        }
    };
    StationService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(StationService.prototype, "stations", {
        get: function () {
            return this._stations.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    StationService.prototype.updateStations = function () {
        var _this = this;
        var promise = this.pioxApi.get('/station');
        promise.then(function (response) {
            _this._stations.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    StationService.prototype.captureStation = function (stationId, imageData, tags) {
        // Tags disabled because lots of problems
        /*
        let cleanTags = {};
  
        for (var key in tags) {
          if (tags.hasOwnProperty(key) && (JSON.stringify(tags[key]).length < 50)) {
            cleanTags[key] = tags[key];
          }
        }
  
        return this.pioxApi.post('/station/' + stationId + '/capture?tags=' + JSON.stringify(cleanTags), imageData)
        */
        return this.pioxApi.post('/station/' + stationId + '/capture', imageData);
    };
    StationService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return StationService;
}());
StationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], StationService);

//# sourceMappingURL=station.service.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RiddlesSolveModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_riddle_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RiddlesSolveModalPage = (function () {
    function RiddlesSolveModalPage(riddleService, params, viewCtrl, loadingCtrl) {
        var _this = this;
        this.riddleService = riddleService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.riddles = {};
        this.answer = '';
        this.answered = false;
        this.imageData = null;
        this.tags = {};
        this.riddleId = params.get('riddleId');
        riddleService.riddles.subscribe(function (riddles) {
            _this.riddlesUpdated(riddles);
        });
    }
    RiddlesSolveModalPage.prototype.riddlesUpdated = function (riddles) {
        this.riddles = {};
        for (var _i = 0, riddles_1 = riddles; _i < riddles_1.length; _i++) {
            var riddle = riddles_1[_i];
            this.riddles[riddle.r_ID] = riddle;
        }
    };
    RiddlesSolveModalPage.prototype.solveRiddle = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Rätsel lösen ...'
        });
        loading.present();
        this.riddleService.solveRiddle(this.riddleId, this.answer, this.imageData, this.tags)
            .then(function (response) {
            _this.answered = true;
            _this.response = response;
            loading.dismiss();
        })
            .catch(function (response) {
            _this.answered = true;
            _this.response = response;
            loading.dismiss();
        });
    };
    RiddlesSolveModalPage.prototype.solveRiddleWithOption = function (answer) {
        this.answer = answer + "";
        this.solveRiddle();
    };
    RiddlesSolveModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return RiddlesSolveModalPage;
}());
RiddlesSolveModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-riddles-solve',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddles-solve.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Rätsel lösen\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Rätsel "{{riddles[riddleId].title}}" lösen</h3>\n  <p>\n    {{riddles[riddleId].question}}\n  </p>\n\n  <span *ngIf="!answered">\n    <div *ngIf="riddles[riddleId].answer_required">\n      <div *ngIf="riddles[riddleId].answer_options_enabled">\n        <div *ngFor="let option of riddles[riddleId].answer_options; let idx = index;">\n          <button ion-button\n                  full\n                  color="light"\n                  (click)="solveRiddleWithOption(idx)"\n          >{{option}}</button>\n        </div>\n      </div>\n      <ion-item *ngIf="!riddles[riddleId].answer_options_enabled">\n        <ion-input type="text" [(ngModel)]="answer" placeholder="Antwort"></ion-input>\n      </ion-item>\n    </div>\n    <div *ngIf="riddles[riddleId].image_required"><i>Um dieses Rätsel zu lösen musst du ein Bild machen.</i></div>\n    <div *ngIf="riddles[riddleId].image_required">\n      <image-uploader [(tags)]="tags" [(image)]="imageData"></image-uploader>\n    </div>\n    <br>\n    <div class="riddle__solve-hint">\n      Hinweis: Falsche Antworten geben Abzug!\n    </div>\n\n    <p *ngIf="!riddles[riddleId].answer_options_enabled">\n      <button ion-button\n              full\n              color="secondary"\n              (click)="solveRiddle()"\n              [disabled]="(riddles[riddleId].answer_required && !answer) || (riddles[riddleId].image_required && !imageData)"\n      >\n        Lösen\n      </button>\n    </p>\n    <p>\n      <button ion-button full color="danger" (click)="dismiss()">Abbrechen</button>\n    </p>\n  </span>\n  <span *ngIf="answered">\n    <div *ngIf="riddles[riddleId].answer_required">\n      <div *ngIf="riddles[riddleId].answer_options_enabled">\n        Deine Antwort: <b>{{riddles[riddleId].answer_options[answer]}}</b>\n      </div>\n      <div *ngIf="!riddles[riddleId].answer_options_enabled">\n        Deine Antwort: <b>{{answer}}</b>\n      </div>\n    </div>\n    <div *ngIf="response.solved">\n      <div class="riddle-solved">\n        <ion-icon name="happy" color="secondary"></ion-icon>\n        <div *ngIf="riddles[riddleId].answer_required">\n          <h3>Korrekt!</h3>\n          Deine Antwort war richtig!<br>\n          Du erhältst <ion-badge color="secondary">{{ response.points }} Punkte!</ion-badge>\n        </div>\n        <div *ngIf="riddles[riddleId].image_required">\n          <h3>Rätsel gelöst!</h3>\n        </div>\n      </div>\n\n    </div>\n    <div *ngIf="!response.solved">\n      <div class="riddle-solved">\n        <ion-icon name="sad" color="danger"></ion-icon>\n        <h3>Oh nein!</h3>\n        {{response.message}} <br />\n        <br>\n        <ion-badge color="danger">{{ response.points }} Punkte!</ion-badge>\n      </div>\n    </div>\n    <br>\n    <br>\n    <button ion-button full color="danger" (click)="dismiss()">Schliessen</button>\n  </span>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddles-solve.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_riddle_service__["a" /* RiddleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], RiddlesSolveModalPage);

//# sourceMappingURL=riddlesSolveModal.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasscodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_passcode_service__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PasscodePage = (function () {
    function PasscodePage(passcodeService, params, viewCtrl, loadingCtrl) {
        this.passcodeService = passcodeService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.passcodes = {};
        this.passcode = '';
        this.passcodeId = params.get('passcodeId');
    }
    PasscodePage.prototype.claimPasscode = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'wird eingelöst ...'
        });
        loading.present();
        this.passcodeService.claimPasscode(this.passcode)
            .then(function (response) {
            _this.response = response;
            loading.dismiss();
        })
            .catch(function (response) {
            _this.response = response;
            loading.dismiss();
        });
    };
    PasscodePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return PasscodePage;
}());
PasscodePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'passcode',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/passcode/passcode.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Passcode einlösen\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="response && response.solved">\n    <div class="riddle-solved">\n      <ion-icon name="happy" color="secondary"></ion-icon>\n      <h3>Richtig!</h3>\n      Passcode eingelöst! Du erhälst <strong>{{ response.points }} Punkte!</strong>\n      <br><br>\n    </div>\n\n    <button ion-button full color="danger" (click)="dismiss()">Schliessen</button>\n  </div>\n\n  <span *ngIf="!response || !response.solved">\n    <div>\n      Wenn du ein Passcode erhalten hast, kannst du ihn hier einlösen um Punkte zu erhalten.\n    </div>\n    <br>\n    <ion-item>\n      <ion-input type="text" [(ngModel)]="passcode" placeholder="Passcode"></ion-input>\n    </ion-item>\n    <p>\n      <button ion-button full color="secondary" (click)="claimPasscode()" [disabled]="!passcode.length">Einlösen</button>\n    </p>\n    <button ion-button full color="danger" (click)="dismiss()">Schliessen</button>\n  </span>\n\n  <div *ngIf="response && !response.solved">\n    <div class="riddle-solved">\n      <ion-icon name="sad" color="danger"></ion-icon>\n      <h3>Falsch</h3>\n      {{response.message}}\n    </div>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/passcode/passcode.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_passcode_service__["a" /* PasscodeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], PasscodePage);

//# sourceMappingURL=passcode.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_team_service__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileImagePage = (function () {
    function ProfileImagePage(teamService, params, viewCtrl, loadingCtrl) {
        this.teamService = teamService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.imageData = null;
        this.tags = {};
        this.isTeam = 0;
        this.isTeam = parseInt(localStorage.getItem('team'));
    }
    ProfileImagePage.prototype.uploadImage = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Bild hochladen ...'
        });
        loading.present();
        this.teamService.updateProfileImage(this.imageData)
            .then(function () {
            _this.dismiss();
            loading.dismiss();
            _this.teamService.updateTeams();
        });
    };
    ProfileImagePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ProfileImagePage;
}());
ProfileImagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'profile-image',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/profile-image/profile-image.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Teambild ändern\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding *ngIf="isTeam">\n  <image-uploader [(tags)]="tags" [(image)]="imageData"></image-uploader>\n  <br>\n  <br>\n  <p>\n    <button ion-button full color="secondary" (click)="uploadImage()" [disabled]="!imageData">Bild hochladen</button>\n    <br>\n    <button ion-button full color="danger" (click)="dismiss()">Abbrechen</button>\n  </p>\n</ion-content>\n\n<ion-content padding *ngIf="!isTeam">\n  Nur Teams können das Teambild ändern.\n  <br>\n  <br>\n  <p>\n    <button ion-button full color="danger" (click)="dismiss()">Abbrechen</button>\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/profile-image/profile-image.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_team_service__["a" /* TeamService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], ProfileImagePage);

//# sourceMappingURL=profile-image.js.map

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 185;

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_map__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leaderboard_leaderboard__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rules_rules__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__riddles_riddles__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mrx_mrx__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_notification_service__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_location_service__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TabsPage = (function () {
    function TabsPage(notificationService, platform, locationService) {
        var _this = this;
        this.notificationService = notificationService;
        this.platform = platform;
        this.locationService = locationService;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__map_map__["a" /* MapPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__leaderboard_leaderboard__["a" /* LeaderboardPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__riddles_riddles__["a" /* RiddlesPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_6__mrx_mrx__["a" /* MrxPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__rules_rules__["a" /* RulesPage */];
        this.tab6Root = __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */];
        this.isLoggedIn = false;
        this.notificationCount = 0;
        this.androidWarningDismissed = false;
        this.isTeam = 0;
        this.isMrx = 0;
        this.hasLocation = false;
        this.location = null;
        this.platform.ready().then(function (readySource) {
            // hide app loading
            document.getElementById('app_loading').style.display = 'none';
        });
        this.isTeam = parseInt(localStorage.getItem('team'));
        this.isMrx = parseInt(localStorage.getItem('mrx'));
        notificationService.notificationsUnread.subscribe(function (notificationsUnread) {
            _this.notificationCount = notificationsUnread;
        });
        if ((this.isTeam || this.isMrx) && localStorage.getItem('hash')) {
            this.isLoggedIn = true;
        }
        // try if location already available
        var location = this.locationService.getLocation();
        if (location && location.lat) {
            this.location = location;
            this.hasLocation = true;
        }
        // or wait for location get available
        if (!this.hasLocation) {
            this.locationService.userLocation.subscribe(function (pos) {
                if (pos && pos.lat) {
                    _this.location = location;
                    _this.hasLocation = true;
                }
            });
        }
    }
    TabsPage.prototype.openAppLink = function () {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.ionicframework.app580766';
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/tabs/tabs.html"*/'<ion-tabs *ngIf="isLoggedIn && hasLocation">\n  <ion-tab [root]="tab1Root" tabTitle="Karte" tabIcon="map" *ngIf="isLoggedIn"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Rangliste" tabIcon="trophy" *ngIf="isLoggedIn"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Rätsel" tabIcon="key" *ngIf="isTeam"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Standort" tabIcon="navigate" *ngIf="isMrx"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="Infos" tabIcon="book" *ngIf="isLoggedIn"></ion-tab>\n  <ion-tab [root]="tab6Root" tabTitle="Nachrichten" tabIcon="megaphone" [tabBadge]="notificationCount" tabBadgeStyle="danger" *ngIf="isLoggedIn"></ion-tab>\n</ion-tabs>\n<ion-content *ngIf="isLoggedIn && !hasLocation">\n  <ion-card>\n    <ion-card-header>\n      <ion-icon name="navigate"></ion-icon> GPS Position suchen...\n    </ion-card-header>\n    <ion-card-content>\n      <div class="searching-gps">\n        <ion-spinner></ion-spinner> <br>\n        GPS Position wird gesucht...\n      </div>\n      Es ist keine GPS Position verfügbar. Ohne GPS kann dieses Spiel leider nicht gespielt werden.<br>\n      <br>Bitte überprüfe folgende Dinge:\n      <ul>\n        <li>Hast du dein GPS aktiviert?</li>\n        <li *ngIf="platform.is(\'cordova\')">Hast du der App erlaubt, auf den Standort zuzugreifen?</li>\n        <li *ngIf="platform.is(\'mobileweb\') || platform.is(\'core\')">Hast du der Webseite erlaubt, auf den Standort zuzugreifen?</li>\n      </ul>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n\n<ion-content *ngIf="!isLoggedIn">\n  <ion-card>\n    <ion-card-header>\n      Pio X - Anmelden\n    </ion-card-header>\n    <ion-card-content>\n\n      Willkommen bei Pio X. Um diese App zu nutzen musst du dich zuerst anmelden.\n      <br><br>\n      Scanne den QR Code den du erhalten hast, dann wirst du automatisch angemeldet.\n      <br><br>\n      <div *ngIf="platform.is(\'android\') && platform.is(\'cordova\')">\n        <native-login></native-login>\n      </div>\n\n      <!--\n      DEV Tip: <a href="login.html">login.html</a>\n      -->\n\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n\n<ion-content *ngIf="platform.is(\'android\') && platform.is(\'mobileweb\') && !androidWarningDismissed">\n  <ion-card>\n    <ion-card-header>\n      Android App\n    </ion-card-header>\n    <ion-card-content>\n      <b>Du solltest die <a href="https://play.google.com/store/apps/details?id=com.ionicframework.app580766" target="_blank">Android App herunterladen</a>! Sie ist schneller und genauer.</b>\n      <br><br>\n      Im Android Webbrowser kann der Standort leider nicht so genau bestimmt werden, dass es für das Spiel nützlich ist. Darum empfehlen wir die App herunterzuladen.\n      <br><br>\n      <p>\n        <button ion-button full color="secondary" (click)="openAppLink()">Download App</button>\n      </p>\n      <br><br><br><br><br><br><br><br><br><br><br>\n      <div style="opacity: 0.3;">\n        <a (click)="androidWarningDismissed = true;">Trotzdem die Web-App benutzen</a>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__services_notification_service__["a" /* NotificationService */],
        __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_9__services_location_service__["a" /* LocationService */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_station_service__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_team_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__capture_capture__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_mrx_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_riddle_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__riddles_riddlesSolveModal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_config_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_navigation_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__agm_core__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MapPage = (function () {
    function MapPage(configService, stationService, teamService, locationService, mrxService, riddleService, modalCtrl, navService, cd) {
        var _this = this;
        this.configService = configService;
        this.stationService = stationService;
        this.teamService = teamService;
        this.locationService = locationService;
        this.mrxService = mrxService;
        this.riddleService = riddleService;
        this.modalCtrl = modalCtrl;
        this.navService = navService;
        this.cd = cd;
        this.default_lat = 47.499163;
        this.default_lng = 8.721871;
        this.default_zoom = 15;
        this.isRefreshing = false;
        this.myTeam = 0;
        this.stations = [];
        this.teams = {};
        this.mrxs = [];
        this.riddles = [];
        this.config = {};
        this.isMrx = 0;
        this.lastInfowindow = null;
        this.tutorialCompleted = false;
        this.tutorialStationCaptured = false;
        this.tutorialStation = {
            s_ID: -1,
            pos_lat: 0,
            pos_long: 0,
            points: 0,
            name: 'Tutorial Station',
            description: 'Tutorial',
            team: 0,
            captured_timestamp: '0'
        };
        this.updateMap();
        this.myTeam = parseInt(localStorage.getItem('team'));
        this.isMrx = parseInt(localStorage.getItem('mrx'));
        this.tutorialCompleted = (localStorage.getItem('tutorialCompleted') == 'true');
        this.stationService.stations.subscribe(function (stations) {
            _this.stationsUpdated(stations);
        });
        this.teamService.teams.subscribe(function (teams) {
            _this.teamsUpdated(teams);
        });
        this.locationService.userLocation.subscribe(function (pos) {
            _this.userLocationUpdated(pos);
        });
        this.mrxService.mrxs.subscribe(function (mrxs) {
            _this.mrxsUpdated(mrxs);
        });
        this.riddleService.riddles.subscribe(function (riddles) {
            _this.riddlesUpdated(riddles);
        });
        this.configService.config.subscribe(function (config) {
            _this.configUpdated(config);
        });
        // bind icons into local scope
        this.fa = fontawesome;
    }
    MapPage.prototype.showTutorial = function () {
        return !this.tutorialCompleted && this.config.game_is_running == 0 && !this.isMrx;
    };
    MapPage.prototype.inRange = function (pos_lat, pos_long) {
        return this.locationService.getDistanceToUser(pos_lat, pos_long) <= this.configService.getConfig().station_radius;
    };
    MapPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    MapPage.prototype.openCaptureModal = function (station) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__capture_capture__["a" /* CaptureModal */], { station: station });
        modal.onDidDismiss(function (data) {
            _this.updateMap();
            // tutorial station captured
            if (station.s_ID == -1) {
                _this.tutorialStationCaptured = true;
            }
        });
        modal.present();
    };
    MapPage.prototype.openSolveModal = function (riddleId) {
        var riddleModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__riddles_riddlesSolveModal__["a" /* RiddlesSolveModalPage */], { riddleId: riddleId });
        riddleModal.present();
    };
    // fired when the map tab comes into view
    MapPage.prototype.ionViewDidEnter = function () {
        this.updateMap();
        this.panToMyLocation();
    };
    MapPage.prototype.updateMap = function () {
        var _this = this;
        this.isRefreshing = true;
        this.cd.markForCheck();
        if (this.map) {
            // attempt to fix map offset that happen sometimes
            this.map.triggerResize(true);
        }
        Promise.all([
            this.stationService.updateStations(),
            this.teamService.updateTeams(),
            this.mrxService.updateMrxs(),
            this.riddleService.updateRiddles(),
            this.configService.updateConfig()
        ]).then(function () {
            _this.isRefreshing = false;
            _this.cd.markForCheck();
        });
    };
    MapPage.prototype.zoomToMyLocation = function () {
        if (this.userLocation && this.userLocation.lat) {
            // hackedyhack
            // call internal map functions (reactivity is gone, but who cares...)
            this.panToMyLocation();
            this.map['_mapsWrapper'].setZoom(17);
            if (this.map) {
                // attempt to fix map offset that happen sometimes
                this.map.triggerResize(true);
            }
        }
    };
    MapPage.prototype.panToMyLocation = function () {
        if (this.userLocation && this.userLocation.lat) {
            // hackedyhack
            // call internal map functions (reactivity is gone, but who cares...)
            this.map['_mapsWrapper'].setCenter({
                lat: this.userLocation.lat,
                lng: this.userLocation.lng
            });
        }
    };
    MapPage.prototype.userLocationUpdated = function (position) {
        this.userLocation = position;
        this.cd.markForCheck();
    };
    MapPage.prototype.teamsUpdated = function (teams) {
        this.teams = {};
        for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
            var team = teams_1[_i];
            this.teams[team.t_ID] = team;
        }
    };
    MapPage.prototype.stationsUpdated = function (stations) {
        if (JSON.stringify(this.stations) != JSON.stringify(stations)) {
            this.stations = stations;
        }
    };
    MapPage.prototype.mrxsUpdated = function (mrxs) {
        if (JSON.stringify(this.mrxs) != JSON.stringify(mrxs)) {
            this.mrxs = mrxs;
        }
    };
    MapPage.prototype.riddlesUpdated = function (riddles) {
        if (JSON.stringify(this.riddles) != JSON.stringify(riddles)) {
            this.riddles = riddles;
        }
    };
    MapPage.prototype.configUpdated = function (config) {
        if (JSON.stringify(this.config) != JSON.stringify(config)) {
            if (config) {
                this.config = config;
                this.tutorialStation.pos_lat = config.home_location_lat;
                this.tutorialStation.pos_long = config.home_location_long;
                this.cd.markForCheck();
            }
        }
    };
    MapPage.prototype.getRiddleStateColor = function (state) {
        switch (state) {
            case 'UNLOCKED':
                return '#009107';
            default:
                return "#F43828";
        }
    };
    MapPage.prototype.getStationColor = function (teamId) {
        if (!teamId) {
            return '#000';
        }
        else if (teamId == this.myTeam) {
            return '#00BD00';
        }
        else {
            return this.teamService.distinctColor(teamId);
        }
    };
    MapPage.prototype.onInfoWindowOpen = function (infoWindow) {
        try {
            if (this.lastInfowindow && this.lastInfowindow !== infoWindow) {
                this.lastInfowindow.close();
            }
            this.lastInfowindow = infoWindow;
        }
        catch (err) { }
        this.cd.markForCheck();
    };
    MapPage.prototype.trackByStationId = function (index, item) {
        return item.s_ID;
    };
    MapPage.prototype.finishTutorial = function () {
        this.tutorialCompleted = true;
        localStorage.setItem('tutorialCompleted', 'true');
        this.cd.markForCheck();
    };
    return MapPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('gmap'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11__agm_core__["b" /* AgmMap */])
], MapPage.prototype, "map", void 0);
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-map',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/map/map.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Map\n      <ion-spinner *ngIf="isRefreshing"></ion-spinner>\n    </ion-title>\n    <ion-buttons end>\n      <button *ngIf="!isRefreshing" ion-button icon-only (click)="updateMap()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="zoomToMyLocation()">\n        <ion-icon ios="ios-locate-outline" md="md-locate"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="presentActionSheet()" >\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <agm-map\n          #gmap\n          [latitude]="default_lat"\n          [longitude]="default_lng"\n          [zoom]="default_zoom"\n          [streetViewControl]="false"\n          [mapTypeControl]="true"\n          [usePanning]="true"\n          [clickableIcons]="false"\n  >\n\n    <!-- Station Radius\n    <agm-circle\n            *ngFor="let station of stations"\n            [latitude]="station.pos_lat"\n            [longitude]="station.pos_long"\n            [radius]="config.station_radius"\n            [fillColor]="getStationColor(station.team)"\n            [fillOpacity]="0.1"\n            [circleDraggable]="false"\n            [editable]="false"\n            [clickable]="false"\n    >\n    </agm-circle>-->\n\n    <div *ngIf="config && !config.game_is_running">\n      <!-- Home Location -->\n      <agm-marker\n              *ngIf="!showTutorial()"\n              (markerClick)="onInfoWindowOpen(infowindow)"\n              [latitude]="config.home_location_lat"\n              [longitude]="config.home_location_long"\n              [iconUrl]="{\n                  path: fa.markers.FLAG,\n                  scale: 0.5,\n                  anchor: {x: 20, y: -30},\n                  strokeWeight: 2,\n                  strokeColor: \'#000000\',\n                  strokeOpacity: 1,\n                  fillColor: \'#008400\',\n                  fillOpacity: 1\n              }"\n      >\n        <agm-info-window [disableAutoPan]="true" [maxWidth]="300" #infowindow>\n          <h3>{{config.home_location_title}}</h3>\n        </agm-info-window>\n      </agm-marker>\n\n      <!-- Tutorial Station -->\n      <agm-marker\n              *ngIf="showTutorial()"\n              (markerClick)="onInfoWindowOpen(infowindow)"\n              [latitude]="tutorialStation.pos_lat"\n              [longitude]="tutorialStation.pos_long"\n              [iconUrl]="{\n                  path: 0,\n                  fillColor: \'#008400\',\n                  fillOpacity: (tutorialCompleted ? 0.5 : 0),\n                  strokeColor: (tutorialCompleted ? \'#008400\' : \'#000000\'),\n                  strokeWeight: (tutorialCompleted ? 3 : 1),\n                  scale: 8\n              }"\n      >\n        <agm-info-window [disableAutoPan]="true" [maxWidth]="300" #infowindow>\n          <h3>Tutorial Station</h3>\n          <div *ngIf="tutorialStationCaptured">\n            <div>\n              Gratulation! Die Station gehört jetzt deinem Team.\n              <br><br>\n            </div>\n            <button ion-button full color="secondary" (click)="finishTutorial()">Tutorial abschliessen</button>\n          </div>\n          <div *ngIf="!tutorialStationCaptured">\n            <div>\n              Dies ist eine Station. Sie gehört noch keinem Team.<br>\n              Du kannst sie für dein Team einnehmen.<br>\n              <br>\n              Alle 5 Minuten erhaltet ihr Punkte für jede Station,<br>\n              die eurem Team gehört.\n              <br><br>\n            </div>\n            <br>\n            <div *ngIf="userLocation">\n              <div *ngIf="inRange(tutorialStation.pos_lat, tutorialStation.pos_long)">\n                <button ion-button full (click)="openCaptureModal(tutorialStation)">Einnehmen</button>\n              </div>\n              <div *ngIf="!inRange(tutorialStation.pos_lat, tutorialStation.pos_long)">\n                <button ion-button full disabled (click)="openCaptureModal(tutorialStation)">zu weit weg</button>\n              </div>\n\n            </div>\n          </div>\n          <div *ngIf="!userLocation">\n            <b>Kein Standort gefunden</b><br>\n            Station kann nicht eingenommen werden.\n          </div>\n        </agm-info-window>\n      </agm-marker>\n    </div>\n\n\n\n    <!-- Station Icons -->\n    <agm-marker\n            *ngFor="let station of stations; trackBy:trackByStationId"\n            (markerClick)="onInfoWindowOpen(infowindow)"\n            [latitude]="station.pos_lat"\n            [longitude]="station.pos_long"\n            [iconUrl]="{\n                path: 0,\n                fillColor: getStationColor(station.team),\n                fillOpacity: (station.team ? 0.5 : 0),\n                strokeColor: (station.team == myTeam ? \'#008400\' : \'#000000\'),\n                strokeWeight: (station.team == myTeam ? 3 : 1),\n                scale: 8\n            }"\n    >\n      <agm-info-window [disableAutoPan]="true" [maxWidth]="300" #infowindow>\n        <h3>{{station.name}}</h3>\n        <ion-item *ngIf="teams[station.team]">\n          <ion-avatar item-left *ngIf="teams[station.team].img_ID">\n              <img [src]="teamService.imageUrl(teams[station.team].img_ID)">\n          </ion-avatar>\n          <h2>\n              {{teams[station.team].name}}\n          </h2>\n          <p *ngIf="station.team == myTeam"><i ion-text color="secondary">Gehört deinem Team</i></p>\n          <p *ngIf="station.team != myTeam">\n            Diese Station gehört {{teams[station.team].name}}<br>\n          </p>\n        </ion-item>\n        <div *ngIf="!teams[station.team]">\n          Diese Station gehört noch keinem Team.\n        </div>\n        <br>\n        <div *ngIf="!isMrx && userLocation && station.team != myTeam" >\n          <div *ngIf="inRange(station.pos_lat, station.pos_long)">\n            <button ion-button full (click)="openCaptureModal(station)">Einnehmen</button>\n          </div>\n          <div *ngIf="!inRange(station.pos_lat, station.pos_long)">\n            <button ion-button full disabled (click)="openCaptureModal(station)">zu weit weg</button>\n          </div>\n          \n        </div>\n        <div *ngIf="!userLocation">\n          <b>Kein Standort gefunden</b><br>\n          Station kann nicht eingenommen werden.\n        </div>\n      </agm-info-window>\n    </agm-marker>\n\n    <!-- User Location Icon -->\n    <agm-marker\n            *ngIf="userLocation"\n            [latitude]="userLocation.lat"\n            [longitude]="userLocation.lng"\n            [iconUrl]="{\n                url: \'assets/bluecircle.png\',\n                anchor: {x: 8, y: 8},\n                size: {width: 16, height: 16},\n                scaledSize: {width: 16, height: 16}\n            }"\n    >\n    </agm-marker>\n\n    <!-- Mrx Paths -->\n    <span *ngFor="let mrx of mrxs">\n      <agm-polyline\n              [editable]="false"\n              [clickable]="false"\n              [polylineDraggable]="false"\n              strokeColor="#c1272d"\n              strokeWeight="3"\n              strokeOpacity="0.7"\n      >\n         <agm-polyline-point\n                 *ngFor="let location of mrx.locations"\n                 [latitude]="location.xpos_lat"\n                 [longitude]="location.xpos_long"\n         >\n         </agm-polyline-point>\n       </agm-polyline>\n    </span>\n\n    <!-- Mrx Icons -->\n    <ng-container *ngFor="let mrx of mrxs">\n      <agm-marker\n              *ngIf="mrx.locations.length > 0"\n              (markerClick)="onInfoWindowOpen(infowindow)"\n              [latitude]="mrx.locations[0].xpos_lat"\n              [longitude]="mrx.locations[0].xpos_long"\n              [iconUrl]="{\n                  url: \'assets/mrx.png\',\n                  anchor: {x: 13, y: 15},\n                  size: {width: 27, height: 30},\n                  scaledSize: {width: 27, height: 30}\n              }"\n      >\n        <agm-info-window [disableAutoPan]="true" [maxWidth]="300" #infowindow>\n          <h3>{{mrx.name}}</h3>\n          <div *ngFor="let loc of mrx.locations; let i = index;" class="mrx-location-description">\n            <b *ngIf="i == 0">\n              <span class="mrx-timestamp">{{loc.timestamp | date:\'HH:mm\'}}</span> {{loc.description}}\n            </b>\n            <span *ngIf="i > 0">\n              <span class="mrx-timestamp">{{loc.timestamp | date:\'HH:mm\'}}</span> {{loc.description}}\n            </span>\n          </div>\n        </agm-info-window>\n      </agm-marker>\n    </ng-container>\n\n\n    <!-- Riddles -->\n    <span *ngFor="let riddle of riddles">\n      <span *ngIf="riddle.pos_lat && riddle.state != \'SOLVED\'">\n\n        <!-- Riddle Radius -->\n        <!--\n        <agm-circle\n                [latitude]="riddle.pos_lat"\n                [longitude]="riddle.pos_long"\n                [radius]="config.riddle_radius"\n                [fillColor]="black"\n                [fillOpacity]="0.1"\n                [circleDraggable]="false"\n                [editable]="false"\n                [clickable]="false"\n        >\n        </agm-circle>\n        -->\n\n        <!-- Riddle Icons -->\n        <agm-marker\n                (markerClick)="onInfoWindowOpen(infowindow)"\n                [latitude]="riddle.pos_lat"\n                [longitude]="riddle.pos_long"\n                [iconUrl]="{\n                    path: fa.markers.QUESTION,\n                    scale: 0.5,\n                    anchor: {x: 20, y: -30},\n                    strokeWeight: 2,\n                    strokeColor: \'white\',\n                    strokeOpacity: 1,\n                    fillColor: getRiddleStateColor(riddle.state),\n                    fillOpacity: 1\n                }"\n        >\n          <agm-info-window [disableAutoPan]="true" [maxWidth]="300" #infowindow>\n            <page-riddle-detail [riddle]="riddle"></page-riddle-detail>\n          </agm-info-window>\n        </agm-marker>\n      </span>\n    </span>\n  </agm-map>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/map/map.html"*/,
        // onPush strategy improves map performance a lot
        // but we need to manually trigger dom updates with this.cd.markForCheck();
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__services_config_service__["a" /* ConfigService */],
        __WEBPACK_IMPORTED_MODULE_2__services_station_service__["a" /* StationService */],
        __WEBPACK_IMPORTED_MODULE_4__services_team_service__["a" /* TeamService */],
        __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_6__services_mrx_service__["a" /* MrxService */],
        __WEBPACK_IMPORTED_MODULE_7__services_riddle_service__["a" /* RiddleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_10__services_navigation_service__["a" /* NavigationService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PioxApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PioxApiService = (function () {
    function PioxApiService(http, locationService, platform) {
        this.http = http;
        this.locationService = locationService;
        this.platform = platform;
    }
    Object.defineProperty(PioxApiService.prototype, "baseurl", {
        get: function () {
            if (localStorage.getItem('api') === null) {
                return null;
            }
            else {
                return localStorage.getItem('api');
            }
        },
        enumerable: true,
        configurable: true
    });
    PioxApiService.prototype.getOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        headers.append('X-Piox-Team', localStorage.getItem('team'));
        headers.append('X-Piox-Player', localStorage.getItem('player'));
        headers.append('X-Piox-Hash', localStorage.getItem('hash'));
        headers.append('X-Piox-Location', JSON.stringify(this.locationService.getLocation()));
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    PioxApiService.prototype.get = function (url) {
        if (this.baseurl === null) {
            return new Promise(function (resolve) { resolve(); });
        }
        else {
            return this.http.get(this.baseurl + url, this.getOptions())
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
    };
    PioxApiService.prototype.post = function (url, data) {
        if (this.baseurl === null) {
            return new Promise(function (resolve) { resolve(); });
        }
        else {
            return this.http.post(this.baseurl + url, data, this.getOptions())
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
    };
    PioxApiService.prototype.put = function (url, data) {
        if (this.baseurl === null) {
            return new Promise(function (resolve) { resolve(); });
        }
        else {
            return this.http.put(this.baseurl + url, data, this.getOptions())
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(this.handleError);
        }
    };
    PioxApiService.prototype.handleError = function (error) {
        console.error('A http error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PioxApiService;
}());
PioxApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__location_service__["a" /* LocationService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */]])
], PioxApiService);

//# sourceMappingURL=pioxApi.service.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptureModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_station_service__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_config_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CaptureModal = (function () {
    function CaptureModal(params, viewCtrl, loadingCtrl, configService, stationService, locationService) {
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.configService = configService;
        this.stationService = stationService;
        this.locationService = locationService;
        this.imageData = null;
        this.tags = {};
        this.station = params.get('station');
    }
    CaptureModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CaptureModal.prototype.distance = function () {
        return this.locationService.getDistanceToUser(this.station.pos_lat, this.station.pos_long);
    };
    CaptureModal.prototype.captureStation = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Station einnehmen ...'
        });
        loading.present();
        this.stationService.captureStation(this.station.s_ID, this.imageData, this.tags)
            .then(function () {
            _this.dismiss();
            loading.dismiss();
        });
    };
    return CaptureModal;
}());
CaptureModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'modal-capture',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/capture/capture.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      "{{station.name}}" einnehmen\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Foto hochladen</h3>\n  <image-uploader [(tags)]="tags" [(image)]="imageData"></image-uploader>\n  <br>\n  <br>\n  <p>\n    <button *ngIf="distance() <= configService.getConfig().station_radius" ion-button full color="secondary" (click)="captureStation()" [disabled]="!imageData">Einnehmen</button>\n    <button *ngIf="distance() > configService.getConfig().station_radius" ion-button full color="secondary" disabled>Zu weit weg</button>\n    <br>\n    <button ion-button full color="danger" (click)="dismiss()">Abbrechen</button>\n  </p>\n  <small>Distanz zur Station: {{distance()}}m</small>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/capture/capture.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__services_config_service__["a" /* ConfigService */],
        __WEBPACK_IMPORTED_MODULE_2__services_station_service__["a" /* StationService */],
        __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */]])
], CaptureModal);

//# sourceMappingURL=capture.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasscodeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pioxApi_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PasscodeService = (function () {
    function PasscodeService(pioxApi) {
        this.pioxApi = pioxApi;
    }
    PasscodeService.prototype.claimPasscode = function (passcode) {
        var promise = this.pioxApi.post('/passcode/solve', { 'passcode': passcode, 'team_ID': '1' });
        promise.then(function (response) {
            return;
        });
        return promise;
    };
    return PasscodeService;
}());
PasscodeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pioxApi_service__["a" /* PioxApiService */]])
], PasscodeService);

//# sourceMappingURL=passcode.service.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_team_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_image_profile_image__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_config_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LeaderboardPage = (function () {
    function LeaderboardPage(teamService, navService, modalCtrl, locationService, configService) {
        var _this = this;
        this.teamService = teamService;
        this.navService = navService;
        this.modalCtrl = modalCtrl;
        this.locationService = locationService;
        this.configService = configService;
        this.teams = [];
        this.myteam = 0;
        this.myname = '';
        this.myteam = parseInt(localStorage.getItem('team'));
        this.myname = decodeURIComponent(localStorage.getItem('player')).replace(/\+/g, ' ');
        this.updateLeaderboard();
        teamService.teams.subscribe(function (teams) {
            _this.teams = _this.sort(teams);
        });
        this.locationService.userLocation.subscribe(function (pos) {
            _this.userLocation = pos;
        });
    }
    LeaderboardPage.prototype.teamColor = function (teamId) {
        if (teamId == this.myteam) {
            return '#00BD00';
        }
        else {
            return this.teamService.distinctColor(teamId);
        }
    };
    LeaderboardPage.prototype.sort = function (teams) {
        //sort descending
        return teams.sort(function (e1, e2) { return e2.score - e1.score; });
    };
    LeaderboardPage.prototype.updateLeaderboard = function () {
        this.teamService.updateTeams();
    };
    LeaderboardPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    LeaderboardPage.prototype.doRefresh = function (refresher) {
        this.teamService.updateTeams().then(function () {
            refresher.complete();
        }).catch(function () {
            refresher.complete();
        });
        this.configService.updateConfig();
    };
    LeaderboardPage.prototype.openProfileImageModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__profile_image_profile_image__["a" /* ProfileImagePage */]);
        modal.present();
    };
    return LeaderboardPage;
}());
LeaderboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-leaderboard',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/leaderboard/leaderboard.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Rangliste\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div padding *ngIf="!configService.getConfig().show_team_points">\n    <br>\n    <h4>Die Rangliste ist deaktiviert</h4>\n    <br>\n    Das Schlussresultat erfahrt ihr bei der Rangverkündigung.\n    <br><br><br><br><br><br><br>\n  </div>\n\n  <ion-list no-border *ngIf="configService.getConfig().show_team_points">\n    <ion-item *ngFor="let team of teams">\n      <ion-avatar item-left *ngIf="team.img_ID">\n        <img [src]="teamService.imageUrl(team.img_ID)">\n      </ion-avatar>\n      <ion-icon name=\'people\' item-left *ngIf="!team.img_ID"></ion-icon>\n      <span class="team-color" [style.background-color]="teamColor(team.t_ID)"></span>\n      <span *ngIf="team.t_ID == myteam"><b>{{team.name}}</b></span>\n      <span *ngIf="team.t_ID != myteam">{{team.name}}</span>\n      <ion-badge item-right>{{team.score}}</ion-badge>\n    </ion-item>\n  </ion-list>\n\n  <div padding>\n    <ion-icon name="person"></ion-icon> Angemeldet als {{myname}} <a (click)="openProfileImageModal()" *ngIf="myteam">Teambild ändern</a>\n  </div>\n\n  <div padding>\n    <ion-note>\n      Location: {{userLocation.lat}} / {{userLocation.lng}}<br>\n      Accuracy: {{userLocation.accuracy}} Updated: {{userLocation.timestamp | date:\'HH:mm:ss\'}}\n    </ion-note>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/leaderboard/leaderboard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_team_service__["a" /* TeamService */],
        __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__["a" /* NavigationService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_6__services_config_service__["a" /* ConfigService */]])
], LeaderboardPage);

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_config_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RulesPage = (function () {
    function RulesPage(navCtrl, configService, navService) {
        this.navCtrl = navCtrl;
        this.configService = configService;
        this.navService = navService;
    }
    RulesPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    return RulesPage;
}());
RulesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-rules',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/rules/rules.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Infos & Spielregeln\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div [innerHTML]="configService.getConfig().info_text"></div>\n  <div *ngIf="!configService.getConfig().info_text">\n    Wird geladen ...\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/rules/rules.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__services_config_service__["a" /* ConfigService */],
        __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__["a" /* NavigationService */]])
], RulesPage);

//# sourceMappingURL=rules.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RiddlesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_riddle_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__passcode_passcode__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RiddlesPage = (function () {
    function RiddlesPage(riddleService, navService, modalCtrl) {
        var _this = this;
        this.riddleService = riddleService;
        this.navService = navService;
        this.modalCtrl = modalCtrl;
        this.riddles = [];
        this.updateRiddles();
        riddleService.riddles.subscribe(function (riddles) {
            _this.riddles = riddles;
        });
    }
    RiddlesPage.prototype.updateRiddles = function () {
        this.riddleService.updateRiddles();
    };
    RiddlesPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    RiddlesPage.prototype.openPasscodeModal = function () {
        var passcodeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__passcode_passcode__["a" /* PasscodePage */]);
        passcodeModal.present();
    };
    RiddlesPage.prototype.doRefresh = function (refresher) {
        this.riddleService.updateRiddles().then(function () {
            refresher.complete();
        }).catch(function () {
            refresher.complete();
        });
    };
    return RiddlesPage;
}());
RiddlesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-riddles',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddles.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Rätsel\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()" >\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card>\n    <ion-card-content>\n      <button ion-button color="light" full (click)="openPasscodeModal()">Passcode einlösen</button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngFor="let riddle of riddles">\n    <page-riddle-detail [riddle]="riddle"></page-riddle-detail>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddles.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_riddle_service__["a" /* RiddleService */],
        __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__["a" /* NavigationService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* ModalController */]])
], RiddlesPage);

//# sourceMappingURL=riddles.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_notification_service__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsPage = (function () {
    function NotificationsPage(notificationService, navService) {
        this.notificationService = notificationService;
        this.navService = navService;
        this.notifications = [];
        this.currentSegment = 'notifications';
    }
    NotificationsPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    NotificationsPage.prototype.updateNotifications = function () {
        this.notificationService.updateNotifications();
    };
    NotificationsPage.prototype.ionViewWillLeave = function () {
        this.notificationService.notificationsRead();
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-notifications',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/notifications/notifications.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Nachrichten\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="currentSegment" color="primary">\n      <ion-segment-button value="notifications">\n        Nachrichten\n      </ion-segment-button>\n      <ion-segment-button value="stream">\n        Foto Stream\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <page-notifications-tab *ngIf="currentSegment == \'notifications\'"></page-notifications-tab>\n  <page-game_stream *ngIf="currentSegment == \'stream\'"></page-game_stream>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/notifications/notifications.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_notification_service__["a" /* NotificationService */],
        __WEBPACK_IMPORTED_MODULE_2__services_navigation_service__["a" /* NavigationService */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MrxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mrx_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_navigation_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MrxPage = (function () {
    function MrxPage(locationService, mrxService, loadingCtrl, navService) {
        var _this = this;
        this.locationService = locationService;
        this.mrxService = mrxService;
        this.loadingCtrl = loadingCtrl;
        this.navService = navService;
        this.myname = '';
        this.mrxid = 0;
        this.description = '';
        this.myname = decodeURIComponent(localStorage.getItem('player')).replace(/\+/g, ' ');
        this.mrxid = parseInt(localStorage.getItem('mrx'));
        this.locationService.userLocation.subscribe(function (pos) {
            _this.userLocationUpdated(pos);
        });
        this.mrxService.mrxs.subscribe(function (mrxs) {
            _this.mrxsUpdated(mrxs);
        });
    }
    MrxPage.prototype.presentActionSheet = function () {
        this.navService.presentActionSheet();
    };
    MrxPage.prototype.userLocationUpdated = function (position) {
        this.userLocation = position;
    };
    MrxPage.prototype.mrxsUpdated = function (mrxs) {
        if (JSON.stringify(this.mrxs) != JSON.stringify(mrxs)) {
            this.mrxs = mrxs;
        }
    };
    MrxPage.prototype.sendLocation = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Standort senden ...'
        });
        loading.present();
        this.mrxService.sendLocation(this.userLocation, this.description).then(function () {
            _this.description = '';
            loading.dismiss();
        }).catch(function () {
            loading.dismiss();
        });
    };
    return MrxPage;
}());
MrxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-mrx',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/mrx/mrx.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Standort senden\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentActionSheet()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div *ngIf="userLocation">\n    <agm-map\n          #gmap\n          [latitude]="userLocation.lat"\n          [longitude]="userLocation.lng"\n          [zoom]="16"\n          [streetViewControl]="false"\n          [mapTypeControl]="true"\n          [clickableIcons]="false"\n    >\n\n      <!-- Mrx Paths -->\n      <span *ngFor="let mrx of mrxs">\n        <agm-polyline\n                *ngIf="mrx.x_ID == mrxid"\n                [editable]="false"\n                [clickable]="false"\n                [polylineDraggable]="false"\n                strokeColor="#c1272d"\n                strokeWeight="3"\n                strokeOpacity="0.7"\n        >\n           <agm-polyline-point\n                   *ngFor="let location of mrx.locations"\n                   [latitude]="location.xpos_lat"\n                   [longitude]="location.xpos_long"\n           >\n           </agm-polyline-point>\n         </agm-polyline>\n      </span>\n\n      <!-- User Location Icon -->\n      <agm-marker\n              [latitude]="userLocation.lat"\n              [longitude]="userLocation.lng"\n              [iconUrl]="{\n                  url: \'assets/bluecircle.png\',\n                  anchor: {x: 8, y: 8},\n                  size: {width: 16, height: 16},\n                  scaledSize: {width: 16, height: 16}\n              }"\n      >\n      </agm-marker>\n\n    </agm-map>\n    <div padding>\n      <h2>Standort senden</h2>\n      <div>Gib hier einen kurzen Hinweis an, was du vorhast:</div>\n      <ion-item>\n        <ion-input type="text" [(ngModel)]="description" placeholder="Hinweis"></ion-input>\n      </ion-item>\n      <p>\n        <button ion-button full color="secondary" (click)="sendLocation()" [disabled]="!description">Standort senden</button>\n      </p>\n      <ion-note>{{userLocation.lat}} / {{userLocation.lng}}</ion-note>\n    </div>\n  </div>\n  <div *ngIf="!userLocation" padding>\n    Standort suchen ...\n  </div>\n  <div padding>\n    <ion-icon name="person"></ion-icon> Angemeldet als {{myname}}\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/mrx/mrx.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_3__services_mrx_service__["a" /* MrxService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__services_navigation_service__["a" /* NavigationService */]])
], MrxPage);

//# sourceMappingURL=mrx.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameStreamService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GameStreamService = (function () {
    function GameStreamService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._logs = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateStream();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    GameStreamService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 60sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(60 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateStream();
            });
        }
    };
    GameStreamService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(GameStreamService.prototype, "logs", {
        get: function () {
            return this._logs.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    GameStreamService.prototype.updateStream = function () {
        var _this = this;
        var promise = this.pioxApi.get('/log');
        promise.then(function (response) {
            _this._logs.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    GameStreamService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return GameStreamService;
}());
GameStreamService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], GameStreamService);

//# sourceMappingURL=game_stream.service.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



// dev mode only when served at port 8100 (ionic serve)
if (window.location.port != '8100') {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_map_map__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_leaderboard_leaderboard__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_riddles_riddles__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_rules_rules__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_capture_capture__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_riddles_riddlesSolveModal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_riddles_riddleDetail__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_notifications_game_stream__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notification_tab__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_passcode_passcode__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_image_profile_image__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_mrx_mrx__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_native_login_native_login__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_team_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_riddle_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_station_service__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_notification_service__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_mrx_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_config_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_navigation_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_game_stream_service__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_passcode_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__PioxErrorHandler__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_image_uploader_image_uploader__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng2_imageupload__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng2_imageupload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_ng2_imageupload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_intl__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_intl_locale_data_jsonp_de_CH__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_intl_locale_data_jsonp_de_CH___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_intl_locale_data_jsonp_de_CH__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__agm_core__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_http__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_camera__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_barcode_scanner__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_status_bar__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_riddles_riddles__["a" /* RiddlesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_rules_rules__["a" /* RulesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_capture_capture__["a" /* CaptureModal */],
            __WEBPACK_IMPORTED_MODULE_13__pages_riddles_riddlesSolveModal__["a" /* RiddlesSolveModalPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_riddles_riddleDetail__["a" /* RiddleDetailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_notifications_game_stream__["a" /* GameStreamPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notification_tab__["a" /* NotificationTabPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_passcode_passcode__["a" /* PasscodePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_mrx_mrx__["a" /* MrxPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_profile_image_profile_image__["a" /* ProfileImagePage */],
            __WEBPACK_IMPORTED_MODULE_33__components_image_uploader_image_uploader__["a" /* ImageUploader */],
            __WEBPACK_IMPORTED_MODULE_20__pages_native_login_native_login__["a" /* NativeLogin */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_38__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                driverOrder: ['indexeddb', 'localstorage', 'websql']
            }),
            __WEBPACK_IMPORTED_MODULE_37__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyBYAjZ-QKEPlDFLPsLcxR5fFRM2LckyZ6o'
            }),
            __WEBPACK_IMPORTED_MODULE_34_ng2_imageupload__["ImageUploadModule"],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_leaderboard_leaderboard__["a" /* LeaderboardPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_riddles_riddles__["a" /* RiddlesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_rules_rules__["a" /* RulesPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_capture_capture__["a" /* CaptureModal */],
            __WEBPACK_IMPORTED_MODULE_13__pages_riddles_riddlesSolveModal__["a" /* RiddlesSolveModalPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_riddles_riddleDetail__["a" /* RiddleDetailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_notifications_game_stream__["a" /* GameStreamPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notification_tab__["a" /* NotificationTabPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_passcode_passcode__["a" /* PasscodePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_profile_image_profile_image__["a" /* ProfileImagePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_mrx_mrx__["a" /* MrxPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_native_login_native_login__["a" /* NativeLogin */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_32__PioxErrorHandler__["a" /* PioxErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_22__services_team_service__["a" /* TeamService */],
            __WEBPACK_IMPORTED_MODULE_23__services_riddle_service__["a" /* RiddleService */],
            __WEBPACK_IMPORTED_MODULE_24__services_station_service__["a" /* StationService */],
            __WEBPACK_IMPORTED_MODULE_26__services_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_25__services_notification_service__["a" /* NotificationService */],
            __WEBPACK_IMPORTED_MODULE_21__services_pioxApi_service__["a" /* PioxApiService */],
            __WEBPACK_IMPORTED_MODULE_27__services_mrx_service__["a" /* MrxService */],
            __WEBPACK_IMPORTED_MODULE_28__services_config_service__["a" /* ConfigService */],
            __WEBPACK_IMPORTED_MODULE_29__services_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_30__services_game_stream_service__["a" /* GameStreamService */],
            __WEBPACK_IMPORTED_MODULE_31__services_passcode_service__["a" /* PasscodeService */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_40__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_41__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_42__ionic_native_status_bar__["a" /* StatusBar */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LocationService = (function () {
    function LocationService(platform) {
        var _this = this;
        this.platform = platform;
        this._userLocation = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](null);
        if (this.platform.is('cordova') && this.platform.is('android')) {
            platform.ready().then(function () {
                // Use position from a plugin on Android
                // See: https://github.com/louisbl/cordova-plugin-locationservices
                // W3C positioning API does not return GPS data, only inaccurate Wifi/Cell Locations :/
                var startWatch = function () {
                    _this.locationWatch = cordova.plugins.locationServices.geolocation.watchPosition(function (position) {
                        if (position.coords !== undefined) {
                            _this.userLocationUpdated(position);
                        }
                    }, function (error) {
                        console.log(error);
                    }, {
                        maximumAge: 3000,
                        timeout: 5000,
                        enableHighAccuracy: true,
                        priority: 100,
                        interval: 6000,
                        fastInterval: 1000
                    });
                };
                startWatch();
                // disable gps if app is in background
                _this.platform.pause.subscribe(function () {
                    console.log('[INFO] App paused');
                    if (_this.locationWatch) {
                        cordova.plugins.locationServices.geolocation.clearWatch(_this.locationWatch);
                        _this.locationWatch = null;
                    }
                });
                // resume gps watcher
                _this.platform.resume.subscribe(function () {
                    console.log('[INFO] App resumed');
                    if (!_this.locationWatch) {
                        startWatch();
                    }
                });
            });
        }
        else {
            // Try HTML5 geolocation
            if (navigator.geolocation) {
                this.locationWatch = navigator.geolocation.watchPosition(function (pos) { _this.userLocationUpdated(pos); }, function (error) {
                    if (error.code == error.PERMISSION_DENIED) {
                        alert("Du musst dieser App erlauben auf deinen Standort zuzugreifen.");
                    }
                    console.log('ERROR getting user location', error);
                }, this.locationWatchOptions);
            }
            else {
                // Browser doesn't support Geolocation
                alert('Keine GPS Position gefunden!');
            }
        }
    }
    LocationService.prototype.userLocationUpdated = function (position) {
        //console.log('location updated', position);
        this._userLocation.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: (position.coords.accuracy ? position.coords.accuracy : -1),
            timestamp: (position.timestamp ? new Date(position.timestamp) : new Date()),
        });
    };
    LocationService.prototype.getLocation = function () {
        return this._userLocation.getValue();
    };
    Object.defineProperty(LocationService.prototype, "userLocation", {
        get: function () {
            return this._userLocation.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    LocationService.prototype.getDistanceBetween = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000; // Distance in meters
        return Math.round(d);
    };
    LocationService.prototype.getDistanceToUser = function (lat, lng) {
        if (!this._userLocation.getValue()) {
            // if location is not available, return a huge number :P
            return Number.MAX_VALUE;
        }
        return this.getDistanceBetween(lat, lng, this._userLocation.getValue().lat, this._userLocation.getValue().lng);
    };
    LocationService.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    return LocationService;
}());
LocationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */]])
], LocationService);

//# sourceMappingURL=location.service.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, splashScreen, statusBar) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.backgroundColorByHexString('#c1272d');
            _this.splashScreen.hide();
            // In Mobile Browsern warnen wenn man Seite verlassen will (Back Button Problem)
            if (platform.is('mobileweb')) {
                window.onbeforeunload = function () {
                    return "Pio-x verlassen?";
                };
            }
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_passcode_passcode__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_profile_image_profile_image__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavigationService = (function () {
    function NavigationService(actionSheetCtrl, modalCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
    }
    NavigationService.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Passcode einlösen',
                    handler: function () {
                        _this.openPasscodeModal();
                    }
                },
                {
                    text: 'Teambild ändern',
                    handler: function () {
                        _this.openProfileImageModal();
                    }
                },
                {
                    text: 'Cache löschen',
                    handler: function () {
                        // according to stackoverflow this should force a reload from the server
                        window.location.reload(true);
                    }
                },
                {
                    text: 'Abmelden',
                    handler: function () {
                        localStorage.removeItem('mrx');
                        localStorage.removeItem('team');
                        localStorage.removeItem('hash');
                        localStorage.removeItem('player');
                        window.location.reload(true);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    NavigationService.prototype.openPasscodeModal = function () {
        var passcodeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_passcode_passcode__["a" /* PasscodePage */]);
        passcodeModal.present();
    };
    NavigationService.prototype.openProfileImageModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_profile_image_profile_image__["a" /* ProfileImagePage */]);
        modal.present();
    };
    return NavigationService;
}());
NavigationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], NavigationService);

//# sourceMappingURL=navigation.service.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigService = (function () {
    function ConfigService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._config = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateConfig();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    ConfigService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 10min
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(10 * 60 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateConfig();
            });
        }
    };
    ConfigService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(ConfigService.prototype, "config", {
        get: function () {
            return this._config.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ConfigService.prototype.getConfig = function () {
        return this._config.getValue();
    };
    ConfigService.prototype.updateConfig = function () {
        var _this = this;
        var promise = this.pioxApi.get('/config');
        promise.then(function (response) {
            _this._config.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    ConfigService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ConfigService;
}());
ConfigService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], ConfigService);

//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TeamService = (function () {
    function TeamService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._teams = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateTeams();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    TeamService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 60sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(60 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateTeams();
            });
        }
    };
    TeamService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(TeamService.prototype, "teams", {
        get: function () {
            return this._teams.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    TeamService.prototype.updateTeams = function () {
        var _this = this;
        var promise = this.pioxApi.get('/team');
        promise.then(function (response) {
            _this._teams.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    TeamService.prototype.updateProfileImage = function (imageData) {
        var teamId = localStorage.getItem('team');
        return this.pioxApi.put('/team/' + teamId + '/image', imageData);
    };
    TeamService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TeamService.prototype.distinctColor = function (id) {
        // 32 distinct colors
        var colors = ['#f23e22', '#d1c51d', '#77baad', '#1d1dd1', '#eb2172', '#f0a599', '#b0ac71', '#24fff0', '#9999f0', '#e391a7', '#c96f4f', '#bbeb5b', '#1b9ebf', '#7654d6', '#f2223e', '#ed7321', '#94c981', '#9ee6f7', '#9122f2', '#c74e5e', '#ebb896', '#1ed41e', '#23b2fa', '#a672b3', '#b28046', '#23f794', '#1d65d1', '#f563ff', '#f0ab22', '#18ad7c', '#a3c8ff', '#e359b5'];
        return colors[id % 32];
    };
    ;
    TeamService.prototype.imageUrl = function (img_ID) {
        var baseURL = localStorage.getItem('api');
        return baseURL + '/uploaded_images/' + img_ID + '.jpg';
    };
    return TeamService;
}());
TeamService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], TeamService);

//# sourceMappingURL=team.service.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RiddleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RiddleService = (function () {
    function RiddleService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._riddles = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateRiddles();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    RiddleService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 60sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(60 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateRiddles();
            });
        }
    };
    RiddleService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(RiddleService.prototype, "riddles", {
        get: function () {
            return this._riddles.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RiddleService.prototype.updateRiddles = function () {
        var _this = this;
        var promise = this.pioxApi.get('/riddle');
        promise.then(function (response) {
            _this._riddles.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    RiddleService.prototype.solveRiddle = function (riddleId, answer, imageData, tags) {
        var _this = this;
        var promise;
        if (imageData) {
            promise = this.pioxApi.post('/riddle/' + riddleId + '/solve', imageData);
        }
        else {
            promise = this.pioxApi.post('/riddle/' + riddleId + '/solve', { 'answer': answer });
        }
        promise.then(function (response) {
            _this.updateRiddles();
        });
        return promise;
    };
    RiddleService.prototype.unlockRiddle = function (riddleId) {
        var _this = this;
        var promise = this.pioxApi.post('/riddle/' + riddleId + '/unlock', []);
        promise.then(function (response) {
            _this.updateRiddles();
        });
        return promise;
    };
    RiddleService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return RiddleService;
}());
RiddleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], RiddleService);

//# sourceMappingURL=riddle.service.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RiddleDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__riddlesSolveModal__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_riddle_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_location_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_config_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RiddleDetailPage = (function () {
    function RiddleDetailPage(configService, riddleService, locationService, modalCtrl, cd) {
        this.configService = configService;
        this.riddleService = riddleService;
        this.locationService = locationService;
        this.modalCtrl = modalCtrl;
        this.cd = cd;
    }
    RiddleDetailPage.prototype.openSolveModal = function (riddleId) {
        var riddleModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__riddlesSolveModal__["a" /* RiddlesSolveModalPage */], { riddleId: riddleId });
        riddleModal.present();
    };
    RiddleDetailPage.prototype.unlockRiddle = function (riddleId) {
        var _this = this;
        this.riddleService.riddles.subscribe(function (riddles) {
            _this.cd.markForCheck();
        });
        this.riddleService.unlockRiddle(riddleId);
    };
    return RiddleDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], RiddleDetailPage.prototype, "riddle", void 0);
RiddleDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-riddle-detail',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddle-detail.html"*/'<div>\n\n  <ion-card-header>\n    {{riddle.title}}\n    <ion-note>\n      <span *ngIf="riddle.state == \'SOLVED\'" ion-text color="secondary">\n        <ion-icon name="checkmark-circle"></ion-icon> Gelöst\n      </span>\n      <span *ngIf="riddle.pos_lat && (!riddle.state || riddle.state == \'LOCKED\')">\n        <ion-icon name="lock"></ion-icon> Gesperrt\n      </span>\n    </ion-note>\n  </ion-card-header>\n\n  <ion-card-content>\n    <span *ngIf="riddle.question">\n      {{riddle.question}}\n      <button ion-button color="light" full (click)="openSolveModal(riddle.r_ID)" *ngIf="riddle.state != \'SOLVED\'">\n        <ion-icon name="camera" *ngIf="riddle.image_required"></ion-icon>&nbsp;\n        Lösen\n      </button>\n    </span>\n    <span *ngIf="!riddle.question">\n      <i>Frage versteckt.</i><br>\n      <i>Das Rätsel kann nur vor Ort entsperrt werden.</i>\n      <div *ngIf="riddle.pos_lat">\n        <ion-icon name="pin"></ion-icon>\n        {{locationService.getDistanceToUser(riddle.pos_lat, riddle.pos_long)}}m entfernt\n        <button ion-button color="secondary" full\n                (click)="unlockRiddle(riddle.r_ID)"\n                *ngIf="riddle.state != \'SOLVED\' && locationService.getDistanceToUser(riddle.pos_lat, riddle.pos_long) <= configService.getConfig().riddle_radius"\n        >\n          Freischalten\n        </button>\n      </div>\n    </span>\n  </ion-card-content>\n\n  <ion-row>\n    <ion-col>\n      <ion-note *ngIf="riddle.type == \'MULTI\'">\n        &nbsp;&nbsp;&nbsp;\n        <ion-icon name="fastforward"></ion-icon>\n        Rätselserie\n      </ion-note>\n    </ion-col>\n    <ion-col right text-right>\n      <ion-note>\n        {{riddle.points}} Punkte\n      </ion-note>\n    </ion-col>\n  </ion-row>\n\n</div>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/riddles/riddle-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_config_service__["a" /* ConfigService */],
        __WEBPACK_IMPORTED_MODULE_3__services_riddle_service__["a" /* RiddleService */],
        __WEBPACK_IMPORTED_MODULE_4__services_location_service__["a" /* LocationService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], RiddleDetailPage);

//# sourceMappingURL=riddleDetail.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameStreamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_game_stream_service__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_team_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mrx_service__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameStreamPage = (function () {
    function GameStreamPage(gameStreamService, teamService, mrxService) {
        var _this = this;
        this.gameStreamService = gameStreamService;
        this.teamService = teamService;
        this.mrxService = mrxService;
        this.logs = [];
        this.teams = {};
        this.mrxs = {};
        this.updateStream();
        gameStreamService.logs.subscribe(function (game_stream) {
            _this.logs = game_stream;
        });
        teamService.teams.subscribe(function (teams) {
            _this.teamsUpdated(teams);
        });
        mrxService.mrxs.subscribe(function (mrxs) {
            _this.mrxsUpdated(mrxs);
        });
    }
    GameStreamPage.prototype.updateStream = function () {
        this.gameStreamService.updateStream();
    };
    GameStreamPage.prototype.teamsUpdated = function (teams) {
        this.teams = {};
        for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
            var team = teams_1[_i];
            this.teams[team.t_ID] = team;
        }
    };
    GameStreamPage.prototype.mrxsUpdated = function (mrxs) {
        this.mrxs = {};
        for (var _i = 0, mrxs_1 = mrxs; _i < mrxs_1.length; _i++) {
            var mrx = mrxs_1[_i];
            this.mrxs[mrx.x_ID] = mrx;
        }
    };
    GameStreamPage.prototype.doRefresh = function (refresher) {
        this.gameStreamService.updateStream().then(function () {
            refresher.complete();
        }).catch(function () {
            refresher.complete();
        });
    };
    return GameStreamPage;
}());
GameStreamPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-game_stream',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/notifications/game_stream.html"*/'<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let log of logs">\n    <ion-item *ngIf="log.type != \'MRX\'">\n      <ion-avatar item-left *ngIf="teams[log.t_ID].img_ID">\n        <img [src]="teamService.imageUrl(teams[log.t_ID].img_ID)">\n      </ion-avatar>\n      <h2>{{teams[log.t_ID].name}}</h2>\n    </ion-item>\n    <ion-item *ngIf="log.type == \'MRX\'">\n      <ion-avatar item-left>\n        <img src="assets/mrx.png">\n      </ion-avatar>\n      <h2 *ngIf="mrxs[log.t_ID]">{{mrxs[log.t_ID].name}}</h2>\n    </ion-item>\n    <img *ngIf="log.img_ID" [src]="teamService.imageUrl(log.img_ID)">\n    <ion-card-content>\n      <p>\n        {{log.text}}\n      </p>\n      <ion-note>\n        {{log.timestamp | date:\'HH:mm\'}}\n      </ion-note>\n    </ion-card-content>\n  </ion-card>\n  <ion-card *ngIf="!logs.length">\n    <ion-card-content>\n      Beiträge werden geladen ...\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/notifications/game_stream.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_game_stream_service__["a" /* GameStreamService */], __WEBPACK_IMPORTED_MODULE_2__services_team_service__["a" /* TeamService */], __WEBPACK_IMPORTED_MODULE_3__services_mrx_service__["a" /* MrxService */]])
], GameStreamPage);

//# sourceMappingURL=game_stream.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notification_service__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationTabPage = (function () {
    function NotificationTabPage(notificationService) {
        var _this = this;
        this.notificationService = notificationService;
        this.notifications = [];
        this.updateNotifications();
        notificationService.notifications.subscribe(function (notifications) {
            _this.notifications = notifications;
        });
    }
    NotificationTabPage.prototype.updateNotifications = function () {
        this.notificationService.updateNotifications();
    };
    NotificationTabPage.prototype.ionViewWillLeave = function () {
        this.notificationService.notificationsRead();
    };
    NotificationTabPage.prototype.doRefresh = function (refresher) {
        this.notificationService.updateNotifications().then(function () {
            refresher.complete();
        }).catch(function () {
            refresher.complete();
        });
    };
    return NotificationTabPage;
}());
NotificationTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notifications-tab',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/notifications/notification_tab.html"*/'<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let notification of notifications">\n\n    <ion-card-header [innerHTML]="notification.title"></ion-card-header>\n\n    <ion-card-content>\n      <p [innerHTML]="notification.text"></p>\n      <p *ngIf="notification.t_ID !== null">\n        <i style="color: #c1272d">Nachricht an dein Team</i>\n      </p>\n      <ion-note>\n        {{notification.timestamp | date:\'HH:mm\'}}\n      </ion-note>\n    </ion-card-content>\n\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/notifications/notification_tab.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_notification_service__["a" /* NotificationService */]])
], NotificationTabPage);

//# sourceMappingURL=notification_tab.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NativeLogin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NativeLogin = (function () {
    function NativeLogin(barcodeScanner) {
        this.barcodeScanner = barcodeScanner;
        this.data = {};
        this.loginTeam = null;
        this.loginHash = null;
        this.loginPlayer = '';
        this.loginAPI = null;
    }
    NativeLogin.prototype.login = function () {
        localStorage.setItem('team', this.loginTeam);
        localStorage.setItem('hash', this.loginHash);
        localStorage.setItem('player', this.loginPlayer);
        localStorage.setItem('api', this.loginAPI);
        window.location.reload(true);
    };
    NativeLogin.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.text) {
                _this.data = _this.parseURL(barcodeData.text);
                if (_this.data['team']) {
                    // team: save data for later login when username is set
                    _this.loginTeam = _this.data['team'];
                    _this.loginHash = _this.data['hash'];
                    _this.loginAPI = _this.data['api'];
                }
                if (_this.data['mrx']) {
                    // mrx: direct login
                    localStorage.setItem('mrx', _this.data['mrx']);
                    localStorage.setItem('hash', _this.data['hash']);
                    localStorage.setItem('player', 'Mister X ' + _this.data['mrx']);
                    localStorage.setItem('api', _this.data['api']);
                    window.location.reload(true);
                }
            }
        }, function (err) {
            // An error occurred
            _this.barcodeError = err;
        });
    };
    NativeLogin.prototype.parseURL = function (url) {
        var splitAt = url.indexOf('?');
        var qstr = url.slice(splitAt + 1);
        var query = {};
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    };
    return NativeLogin;
}());
NativeLogin = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'native-login',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/pages/native-login/native-login.html"*/'<div>\n  <div *ngIf="barcodeError" ion-text color="danger">\n    QR-CODE FEHLER: {{barcodeError | json}}\n  </div>\n\n  <div *ngIf="!loginHash">\n    <ion-card-title>QR Code scannen</ion-card-title>\n    <button ion-button full color="secondary" (click)="scan()">Scan QR Code</button>\n  </div>\n\n  <div *ngIf="loginTeam">\n    <ion-card-title>Dein Pfadiname</ion-card-title>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Pfadiname eingeben</ion-label>\n        <ion-input type="text" [(ngModel)]="loginPlayer"></ion-input>\n      </ion-item>\n    </ion-list>\n    <br>\n    <p>\n      <button ion-button full color="secondary" (click)="login()" [disabled]="!loginPlayer">Los geht\'s!</button>\n    </p>\n  </div>\n\n</div>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/pages/native-login/native-login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
], NativeLogin);

//# sourceMappingURL=native-login.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PioxErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raven_js__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raven_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_raven_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


__WEBPACK_IMPORTED_MODULE_1_raven_js___default.a
    .config('https://3528ad7d573949958527bf5126feb1b3@sentry.io/153912')
    .install();
var PioxErrorHandler = (function (_super) {
    __extends(PioxErrorHandler, _super);
    function PioxErrorHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PioxErrorHandler.prototype.handleError = function (error) {
        _super.prototype.handleError.call(this, error);
        // show error to user on live app (do not show in dev mode)
        if (window.location.port != '8100') {
            //alert(error);
            document.getElementById('js-error').style.display = 'block';
            document.getElementById('js-error-text').innerHTML = 'Ein Fehler ist aufgetreten: ' + error;
            // Report Error to sentry.io
            try {
                var myteam = 'unknown';
                var myname = 'unknown';
                try {
                    myteam = localStorage.getItem('team');
                    myname = decodeURIComponent(localStorage.getItem('player')).replace(/\+/g, ' ');
                }
                catch (e) { }
                __WEBPACK_IMPORTED_MODULE_1_raven_js___default.a.setUserContext({
                    username: myteam + '-' + myname
                });
                __WEBPACK_IMPORTED_MODULE_1_raven_js___default.a.captureException(error.originalError || error);
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    return PioxErrorHandler;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* IonicErrorHandler */]));

//# sourceMappingURL=PioxErrorHandler.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageUploader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_exif_js__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_exif_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ImageUploader = (function () {
    function ImageUploader(element, loadingCtrl, platform, camera) {
        this.element = element;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.camera = camera;
        this.imageChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tagsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._image = null;
        this._tags = {};
        this.imageRaw = null;
        this.imageOrientation = 0;
        this.loading = null;
        this.resizeOptions = {
            resizeMaxHeight: 1024,
            resizeMaxWidth: 1024
        };
        // nothing
    }
    Object.defineProperty(ImageUploader.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
            this.imageChange.emit(this._image);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploader.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        set: function (value) {
            this._tags = value;
            this.tagsChange.emit(this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploader.prototype, "isCordova", {
        get: function () {
            return this.platform.is('cordova');
        },
        enumerable: true,
        configurable: true
    });
    ImageUploader.prototype.takePictureNative = function () {
        var _this = this;
        var options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetHeight: 1024,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.image = 'data:image/jpeg;base64,' + imageData;
            _this.element.nativeElement.querySelector('.uploaded-image').src = _this.image;
        }, function (err) {
            // Handle error
        });
    };
    ImageUploader.prototype.imageChanged = function (event) {
        // reset image if none was selected
        if (event.target.files.length == 0) {
            var image = this.element.nativeElement.querySelector('.uploaded-image');
            image.src = "";
            this.imageRaw = null;
            this.image = null;
        }
        else {
            // show image processing message (resize takes a while)
            this.loading = this.loadingCtrl.create({
                content: 'Bild wird geladen ...'
            });
            this.loading.present();
        }
    };
    ImageUploader.prototype.imageSelected = function (imageResult) {
        // hide image processing message
        this.loading.dismiss();
        var image = this.element.nativeElement.querySelector('.uploaded-image');
        this.image = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        image.src = imageResult.dataURL;
        this.imageRaw = imageResult.dataURL;
        this.readOrientation();
    };
    ImageUploader.prototype.readOrientation = function () {
        var img = document.getElementById("uploaded-image");
        // clear exif cache
        delete img.exifdata;
        var self = this;
        __WEBPACK_IMPORTED_MODULE_3_exif_js___default.a.getData(img, function () {
            self.tags = __WEBPACK_IMPORTED_MODULE_3_exif_js___default.a.getAllTags(this);
            self.imageOrientation = __WEBPACK_IMPORTED_MODULE_3_exif_js___default.a.getTag(this, "Orientation");
        });
    };
    return ImageUploader;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ImageUploader.prototype, "imageChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ImageUploader.prototype, "tagsChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ImageUploader.prototype, "image", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ImageUploader.prototype, "tags", null);
ImageUploader = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'image-uploader',template:/*ion-inline-start:"/Users/demian/projects/pio-x/app/src/components/image-uploader/image-uploader.html"*/'<div class="image-uploader">\n  <!-- Native Image upload -->\n  <div *ngIf="isCordova">\n    <div class="uploaded-image-holder">\n      <img class="uploaded-image" id="uploaded-image" [attr.data-orientation]="imageOrientation" [hidden]="!image"/>\n      <div class="uploaded-image-placeholder" *ngIf="!image" (click)="takePictureNative()">\n        <ion-icon name="camera"></ion-icon>\n      </div>\n      <button *ngIf="!image" ion-button full color="secondary" (click)="takePictureNative()">Foto aufnehmen</button>\n    </div>\n  </div>\n\n  <!-- HTML5 Image upload -->\n  <div *ngIf="!isCordova">\n    <input type="file"\n         accept="image/*"\n         imageUpload\n         (change)="imageChanged($event)"\n         (imageSelected)="imageSelected($event)"\n         [resizeOptions]="resizeOptions"\n         #imgupload\n    />\n    <br>\n    <div class="uploaded-image-holder">\n      <img class="uploaded-image" id="uploaded-image" [attr.data-orientation]="imageOrientation" [hidden]="!imageRaw"/>\n      <div class="uploaded-image-placeholder" *ngIf="!imageRaw" (click)="imgupload.click()">\n        <ion-icon name="camera"></ion-icon>\n      </div>\n      <button *ngIf="!imageRaw" ion-button full color="secondary" (click)="imgupload.click()">Foto aufnehmen</button>\n    </div>\n  </div>\n\n\n</div>\n'/*ion-inline-end:"/Users/demian/projects/pio-x/app/src/components/image-uploader/image-uploader.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
], ImageUploader);

//# sourceMappingURL=image-uploader.js.map

/***/ }),

/***/ 745:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MrxService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MrxService = (function () {
    function MrxService(pioxApi, platform) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this._mrxs = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this.intervalSubscription = null;
        this.updateMrxs();
        this.startSync();
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    MrxService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 15sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(15 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateMrxs();
            });
        }
    };
    MrxService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(MrxService.prototype, "mrxs", {
        get: function () {
            return this._mrxs.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    MrxService.prototype.updateMrxs = function () {
        var _this = this;
        var promise = this.pioxApi.get('/mrx');
        promise.then(function (response) {
            _this._mrxs.next(response);
        })
            .catch(this.handleError);
        return promise;
    };
    MrxService.prototype.sendLocation = function (location, description) {
        var _this = this;
        var myMrxId = parseInt(localStorage.getItem('mrx'));
        var promise = this.pioxApi.post('/mrx/' + myMrxId + '/location', { 'description': description, 'location': location });
        promise.then(function (response) {
            _this.updateMrxs();
        });
        return promise;
    };
    MrxService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return MrxService;
}());
MrxService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */]])
], MrxService);

//# sourceMappingURL=mrx.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pioxApi_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var NotificationService = (function () {
    function NotificationService(pioxApi, platform, alertController) {
        var _this = this;
        this.pioxApi = pioxApi;
        this.platform = platform;
        this.alertController = alertController;
        this._notifications = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]([]);
        this._unread = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](0);
        this.intervalSubscription = null;
        this.shownNotifications = [];
        this.updateNotifications();
        this.startSync();
        //subscribe to count unread notifications
        this.notifications.subscribe(function (notifications) {
            _this.countUnread();
        });
        // disable sync if app is in background
        this.platform.pause.subscribe(function () {
            _this.stopSync();
        });
        // resume sync
        this.platform.resume.subscribe(function () {
            _this.startSync();
        });
    }
    NotificationService.prototype.startSync = function () {
        var _this = this;
        // autoupdate every 60sec
        if (!this.intervalSubscription) {
            var timer = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_IntervalObservable__["IntervalObservable"].create(60 * 1000);
            this.intervalSubscription = timer.subscribe(function (n) {
                _this.updateNotifications();
            });
        }
    };
    NotificationService.prototype.stopSync = function () {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = null;
        }
    };
    Object.defineProperty(NotificationService.prototype, "_notificationsReadUntil", {
        get: function () {
            var val = localStorage.getItem('notificationsReadUntil');
            if (val && Date.parse(val)) {
                return new Date(val);
            }
            else {
                return new Date(0);
            }
        },
        set: function (date) {
            localStorage.setItem('notificationsReadUntil', date.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationService.prototype, "notifications", {
        get: function () {
            return this._notifications.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationService.prototype, "notificationsUnread", {
        get: function () {
            return this._unread.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NotificationService.prototype.updateNotifications = function () {
        var _this = this;
        var promise = this.pioxApi.get('/notification');
        promise.then(function (response) {
            _this._notifications.next(response);
            response.forEach(function (notification) {
                if (notification.timestamp > _this._notificationsReadUntil.getTime()) {
                    if (_this.shownNotifications.indexOf(notification.n_ID) < 0) {
                        _this.shownNotifications.push(notification.n_ID);
                        _this.presentNotification(notification);
                    }
                }
            });
        })
            .catch(function () {
            console.log('an error occured, but we ignore it because its probably a 401 Unauthorized');
        });
        return promise;
    };
    NotificationService.prototype.notificationsRead = function () {
        this._notificationsReadUntil = new Date();
        this.countUnread();
    };
    NotificationService.prototype.countUnread = function () {
        var count = 0;
        for (var _i = 0, _a = this._notifications.getValue(); _i < _a.length; _i++) {
            var n = _a[_i];
            var timestamp = new Date(n.timestamp).getTime();
            if (timestamp - this._notificationsReadUntil.getTime() > 0) {
                count += 1;
            }
        }
        this._unread.next(count);
    };
    NotificationService.prototype.presentNotification = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            title: notification.title,
                            message: notification.text,
                            buttons: [{
                                    text: 'Okay',
                                    handler: function () {
                                        _this.notificationsRead();
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NotificationService;
}());
NotificationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__pioxApi_service__["a" /* PioxApiService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */]])
], NotificationService);

//# sourceMappingURL=notification.service.js.map

/***/ })

},[391]);
//# sourceMappingURL=main.js.map