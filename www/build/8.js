webpackJsonp([8],{

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservationListPageModule", function() { return ObservationListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observation_list__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ObservationListPageModule = (function () {
    function ObservationListPageModule() {
    }
    return ObservationListPageModule;
}());
ObservationListPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__observation_list__["a" /* ObservationListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__observation_list__["a" /* ObservationListPage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], ObservationListPageModule);

//# sourceMappingURL=observation-list.module.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_pheno_api_pheno_api__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ObservationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ObservationListPage = (function () {
    function ObservationListPage(navCtrl, navParams, phenoApi, alertCtrl, nativeStorage, loadingCtrl, events, sqlite, network, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.sqlite = sqlite;
        this.network = network;
        this.translate = translate;
        this.user = null;
        this.notifications = 0;
        this.order = 'bydate'; //bydate by default
        this.bydate = true;
        this.bylikes = false;
        this.byvalidations = false;
        this.bycomments = false;
        this.offlineObservations = 0;
        this.uploadPath = 'http://web.phenologit.org/uploads/';
        //showing alert when observation is created
        var created = navParams.get('created');
        if (created == true) {
            this.presentAlert('Observation Created!', 'Your observation was created successfully!');
        }
        //get logged user details
        this.getUserFromStorage();
        //check notifications for user
        this.checkNotifications();
        //listen for user disconnection event
        events.subscribe('network:disconnected', function (e) {
            _this.networkStatus = 0;
        });
        //listen for user logout event
        events.subscribe('offline:observations', function (e) {
            _this.checkForOfflineObservations();
        });
        //listen for user disconnection event
        events.subscribe('network:connected', function (e) {
            _this.networkStatus = 1;
            _this.checkForOfflineObservations();
            if (_this.navCtrl.getActive().name === 'ObservationListPage')
                _this.getObservations(_this.filter, _this.limit, _this.school, _this.userfilter);
        });
        this.checkNetwork();
        this.getTranslatedStrings();
    }
    //check current network status and subscribe to events
    ObservationListPage.prototype.checkNetwork = function () {
        if (this.network.type === 'none') {
            console.log('we have no connection!');
            this.networkStatus = 0;
        }
        else {
            this.networkStatus = 1;
            //if online check for pending observations
            this.checkForOfflineObservations();
        }
    };
    ObservationListPage.prototype.getTranslatedStrings = function () {
        var _this = this;
        //get translated strings
        this.translate.get('ORDER').subscribe(function (value) { _this.st_order_by = value; });
    };
    //check if there are any pending observations stored in the device
    ObservationListPage.prototype.checkForOfflineObservations = function () {
        var _this = this;
        console.log("checking offline observations...");
        if (this.networkStatus == 1) {
            this.sqlite.create({
                name: 'phenologit.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('SELECT * FROM observations_offline', {})
                    .then(function (data) {
                    _this.offlineObservations = data.rows.length;
                    console.log(_this.offlineObservations);
                })
                    .catch(function (e) { return console.log(e); });
            });
        }
        else {
            console.log('no network');
        }
    };
    ObservationListPage.prototype.checkNotifications = function () {
        var _this = this;
        //listening for notification count event
        this.events.subscribe('notificationsCount', function (count) {
            _this.notifications = count;
        });
    };
    ObservationListPage.prototype.getUserFromStorage = function () {
        var _this = this;
        //console.log("getting user from storage");
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data;
            console.log('user stored-> ' + JSON.stringify(data));
            _this.translate.setDefaultLang(data.lang);
        }, function (error) {
            console.error(error),
                _this.translate.setDefaultLang('en');
        });
    };
    ObservationListPage.prototype.presentLoading = function (text) {
        //present loading function
        this.loading = this.loadingCtrl.create({
            content: text
        });
        this.loading.present();
    };
    ObservationListPage.prototype.presentAlert = function (msg, subTitle) {
        //present alert function
        var alert = this.alertCtrl.create({
            title: msg,
            subTitle: subTitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    ObservationListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ObservationListPage');
        this.checkNetwork();
        //parameters by default
        this.filter = null;
        this.school = null;
        this.userfilter = null;
        //load this.limit observations each time
        this.limit = 10;
        this.loadMore = 1;
        //if specie is sent, filter by specie overriding default parameters
        if (this.navParams.get('filter') !== undefined) {
            this.filter = this.navParams.get('filter');
            console.log("filter by: " + this.filter);
        }
        //if school is sent, filter by school overriding default parameters
        if (this.navParams.get('school') !== undefined) {
            this.school = this.navParams.get('school');
            console.log("filter by: " + this.school);
        }
        //general getobservation
        this.getObservations(this.filter, this.limit, this.school, this.userfilter);
    };
    ObservationListPage.prototype.doRefresh = function (refresher) {
        //refresh on swipe down
        this.refresher = refresher;
        this.getObservations(this.filter, this.limit, this.school, this.userfilter);
    };
    ObservationListPage.prototype.getObservations = function (filter, limit, school, userfilter) {
        //get data from API
        var _this = this;
        //show loading while doing the operation
        this.presentLoading('loading...');
        //query the api
        this.phenoApi.getObservations(filter, limit, school, userfilter).subscribe(function (data) {
            _this.observations = data;
        }, function (err) {
            _this.loading.dismiss(),
                console.error(err),
                _this.refresher.complete();
            _this.presentAlert('Error!', 'Error getting observations');
        }, function () {
            console.log(_this.observations);
            //remove loading
            _this.loading.dismiss();
            //allow to load more now
            _this.loadMore = 1;
            //if refresher exists then mark it as completed
            if (_this.refresher != undefined) {
                _this.refresher.complete();
            }
        });
    };
    //open observation on tap
    ObservationListPage.prototype.openOfflineObservationsPage = function () {
        this.navCtrl.push('OfflineObservationsPage');
    };
    //open observation on tap
    ObservationListPage.prototype.openObservation = function (id) {
        this.navCtrl.push('ObservationPage', { id: id });
    };
    //add new observation
    ObservationListPage.prototype.addObservation = function () {
        this.navCtrl.push('AddObservationPage');
    };
    //infinite scrolling
    ObservationListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        //load 5 more observation 
        this.limit += 5;
        //avoid loadin more until the operation is completed
        this.loadMore = 0;
        //timeout for avoiding problems
        setTimeout(function () {
            //query api for data
            _this.getObservations(_this.filter, _this.limit, _this.school, _this.userfilter);
            //mark scroll as complete
            infiniteScroll.complete();
        }, 500);
    };
    //show orders alert
    ObservationListPage.prototype.showOrders = function (event) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.st_order_by,
            inputs: [
                {
                    label: 'By date',
                    type: 'radio',
                    value: 'bydate',
                    checked: this.bydate
                },
                {
                    label: 'By likes',
                    value: 'bylikes',
                    type: 'radio',
                    checked: this.bylikes
                },
                {
                    label: 'By validations',
                    value: 'byvalidations',
                    type: 'radio',
                    checked: this.byvalidations
                }
            ],
            buttons: [
                {
                    text: 'Order',
                    handler: function (data) {
                        _this.orderBy(data);
                        console.log(data);
                    }
                }
            ]
        });
        alert.present();
    };
    //filter by validated
    ObservationListPage.prototype.showFilters = function (event) {
        var alert = this.alertCtrl.create({
            title: 'Filters',
            inputs: [
                {
                    label: 'Show only validated observations',
                    type: 'checkbox',
                    value: 'onlyvalidated',
                }
            ],
            buttons: [
                {
                    text: 'Filter',
                    handler: function (data) {
                        //this.orderBy(data);
                        console.log(data);
                    }
                }
            ]
        });
        alert.present();
    };
    ObservationListPage.prototype.orderBy = function (option) {
        switch (option) {
            case 'bylikes':
                console.log('Ordering by likes');
                this.getObservationsByLikes(this.filter, this.limit);
                break;
            case 'byvalidations':
                console.log('ordering by validations');
                this.getObservationsByValidations(this.filter, this.limit);
                break;
            case 'bydate':
                console.log('ordering by date');
                this.getObservations(this.filter, this.limit, this.school, this.userfilter);
                break;
        }
    };
    //get data from API
    ObservationListPage.prototype.getObservationsByLikes = function (filter, limit) {
        var _this = this;
        this.order = 'bylikes';
        this.bydate = false;
        this.bylikes = true;
        this.byvalidations = false;
        this.bycomments = false;
        this.observations = this.phenoApi.getObservationsByLikes(filter, limit).subscribe(function (data) { _this.observations = data; }, function (err) { return console.log(err); });
    };
    //get data from API
    ObservationListPage.prototype.getObservationsByValidations = function (filter, limit) {
        var _this = this;
        this.order = 'byvalidations';
        this.bydate = false;
        this.bylikes = false;
        this.byvalidations = true;
        this.bycomments = false;
        this.observations = this.phenoApi.getObservationsByValidations(filter, limit).subscribe(function (data) { _this.observations = data; }, function (err) { return console.log(err); });
    };
    return ObservationListPage;
}());
ObservationListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-observation-list',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/observation-list/observation-list.html"*/'<!--\n  Generated template for the ObservationListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n          <span *ngIf="notifications>0" class="notifications">{{notifications}}</span>\n        </button>\n      <ion-title>{{\'OBSERVATION_LIST_TITLE\'| translate}}</ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="showOrders($event)">\n          <ion-icon name="options"></ion-icon>\n        </button>\n        <button ion-button (click)="showFilters($event)">\n          <ion-icon name="checkbox-outline"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-item *ngIf="networkStatus==0" class="noConnection">\n    Your are in OFFLINE mode!\n  </ion-item>\n\n  <ion-item (click)="openOfflineObservationsPage()" *ngIf="networkStatus==1 && offlineObservations>0" class="noConnection">\n    {{offlineObservations}} observations ready to publish!\n  </ion-item>\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-fab bottom right>\n    <button ion-fab (click)=\'addObservation()\'><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n      <ion-card class="observationCard" *ngFor="let observation of observations">\n          \n        <ion-item>\n          <ion-avatar item-left (click)=\'openListPage(observation.user_id)\'>\n            <img src="http://web.phenologit.org/uploads/avatar/{{observation.user_picture}}">\n          </ion-avatar>\n          <h2 (click)=\'openListPage(observation.user_id)\'>{{observation.user_name}}</h2>\n          <p>{{observation.time}}</p>\n          <ion-icon *ngIf="userType==\'1\'" (click)="showActions(observation.id)" name="more" item-right></ion-icon>\n        </ion-item>\n      \n        <div class="mediaDiv" (click)=\'openObservation(observation.id)\'>\n\n          <div *ngIf="observation.bestexample==1" class="bestexample" >\n            <img src="assets/img/best_example.png" alt="">\n          </div>\n            \n          <img *ngIf="observation.media.media_type==\'picture\'" class="observationMedia" src="http://web.phenologit.org/uploads/{{observation.media.media_url}}">\n          <img *ngIf="observation.media.media_type==\'video\'" class="observationMedia" src="img/videoPoster.jpg">\n            \n          <!-- <span *ngIf="observation.validations>0" class="validatedIcon"></span> -->\n                \n          <ion-badge item-left class="multipleMedia">\n            <ion-icon light name="images"><span>{{observation.countImages}}</span></ion-icon>\n          </ion-badge>\n            \n          <ion-badge item-left class="specieStage">{{observation.specie_en}} > {{observation.stage_en}}</ion-badge>\n            \n        </div>\n\n        <ion-card-content (click)=\'openObservation(observation.id)\'>\n          <h4 color=primary>{{observation.title}}</h4>\n          <p>{{observation.description}}</p>\n        </ion-card-content>\n\n        <ion-item (click)=\'openObservation(observation.id)\'>\n            \n          <ion-badge light item-left>{{observation.likes}} Likes</ion-badge>\n          <ion-badge light item-left>{{observation.comments}} {{\'COMMENTS\'| translate}}</ion-badge>\n              \n          <ion-badge *ngIf="observation.validations>0" color=primary item-right>{{observation.validations}} {{\'VALIDATIONS\'| translate}}</ion-badge>\n          <ion-badge *ngIf="!observation.validations>0" item-right class="notvalidated">{{\'NOT_VALIDATED\'| translate}}</ion-badge>\n        \n        </ion-item>\n        \n      </ion-card>\n\n  <ion-infinite-scroll *ngIf="loadMore==1" (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/observation-list/observation-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
], ObservationListPage);

//# sourceMappingURL=observation-list.js.map

/***/ })

});
//# sourceMappingURL=8.js.map