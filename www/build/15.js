webpackJsonp([15],{

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddObservationDetailsPageModule", function() { return AddObservationDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_observation_details__ = __webpack_require__(323);
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
var AddObservationDetailsPageModule = (function () {
    function AddObservationDetailsPageModule() {
    }
    return AddObservationDetailsPageModule;
}());
AddObservationDetailsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_observation_details__["a" /* AddObservationDetailsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_observation_details__["a" /* AddObservationDetailsPage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], AddObservationDetailsPageModule);

//# sourceMappingURL=add-observation-details.module.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddObservationDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(214);
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
 * Generated class for the AddObservationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddObservationDetailsPage = (function () {
    function AddObservationDetailsPage(navCtrl, navParams, nativeStorage, alertCtrl, network, events, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.events = events;
        this.translate = translate;
        this.observation = {};
    }
    AddObservationDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddObservationDetailsPage');
        this.loadFromStorage();
        this.checkNetwork();
        this.getTranslatedStrings();
    };
    //check current network status and subscribe to events
    AddObservationDetailsPage.prototype.checkNetwork = function () {
        var _this = this;
        if (this.network.type === 'none') {
            console.log('we have no connection!');
            this.networkStatus = 0;
        }
        else {
            this.networkStatus = 1;
        }
        //listen for user disconnection event
        this.events.subscribe('network:disconnected', function (e) {
            _this.networkStatus = 0;
        });
        //listen for user disconnection event
        this.events.subscribe('network:connected', function (e) {
            _this.networkStatus = 1;
        });
    };
    AddObservationDetailsPage.prototype.getTranslatedStrings = function () {
        var _this = this;
        //get translated strings
        this.translate.get('ADD_MEDIA_ERROR').subscribe(function (value) { _this.str_no_title = value; });
        this.translate.get('ADD_MEDIA_ERROR_2').subscribe(function (value) { _this.str_no_title_text = value; });
    };
    AddObservationDetailsPage.prototype.loadFromStorage = function () {
        var _this = this;
        this.nativeStorage.getItem('observation')
            .then(function (data) { console.log('in storage: ' + JSON.stringify(data)), _this.observation = data; }, function (error) { return console.error(error); });
    };
    AddObservationDetailsPage.prototype.showAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    AddObservationDetailsPage.prototype.goNext = function (stage_id) {
        //validate title field
        if (this.observation.title != '' && this.observation.title != undefined) {
            if (this.observation.description == '' || this.observation.description == undefined)
                this.observation.description = ' ';
            //save to storage
            this.nativeStorage.setItem('observation', { specie: this.observation.specie, stage: this.observation.stage, title: this.observation.title, description: this.observation.description });
            //go to next page
            this.navCtrl.push('AddObservationMediaPage');
        }
        else {
            this.showAlert(this.str_no_title, this.str_no_title_text);
        }
    };
    return AddObservationDetailsPage;
}());
AddObservationDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-observation-details',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/add-observation-details/add-observation-details.html"*/'<!--\n  Generated template for the AddObservationDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>{{\'ADD_DETAILS_TITLE\'|translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-item *ngIf="networkStatus==0" class="noConnection">\n    {{\'OFFLINE_MODE\'|translate}}\n  </ion-item>\n\n  <ion-card>\n\n    <ion-card-header>\n          <h1>{{\'DESCRIBE YOUR OBSERVATION\'|translate}}</h1>\n    </ion-card-header>\n\n    <ion-card-content>\n      <ion-item>\n        <ion-label color="primary" stacked>{{\'ADD_DETAILS_OBSERVATION_TITLE\'|translate}}</ion-label>\n        <ion-input required class="inputTitle" type="text" [(ngModel)]="observation.title" placeholder="{{\'ADD_DETAILS_OBSERVATION_TITLE\' | translate}}"></ion-input>\n      </ion-item>\n      \n      <ion-item>\n        <ion-label color="primary" stacked>{{\'ADD_DETAILS_DESCRIPTION\'|translate}}</ion-label>\n        <ion-textarea class="inputDescription" value="" placeholder="{{\'ADD_DETAILS_DESCRIPTION\'|translate}}" [(ngModel)]="observation.description"></ion-textarea>\n       </ion-item>\n    </ion-card-content>\n  </ion-card>\n    \n</ion-content>\n\n<ion-footer>\n    <ion-toolbar position="bottom">\n        <ion-buttons end>\n          <button ion-button color=primary (click)="goNext()">{{\'NEXT\'|translate}}</button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/add-observation-details/add-observation-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
], AddObservationDetailsPage);

//# sourceMappingURL=add-observation-details.js.map

/***/ })

});
//# sourceMappingURL=15.js.map