webpackJsonp([11],{

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddObservationPageModule", function() { return AddObservationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_observation__ = __webpack_require__(322);
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
var AddObservationPageModule = (function () {
    function AddObservationPageModule() {
    }
    return AddObservationPageModule;
}());
AddObservationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_observation__["a" /* AddObservationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_observation__["a" /* AddObservationPage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], AddObservationPageModule);

//# sourceMappingURL=add-observation.module.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddObservationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_pheno_api_pheno_api__ = __webpack_require__(107);
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
 * Generated class for the AddObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddObservationPage = (function () {
    function AddObservationPage(navCtrl, navParams, translate, phenoApi, nativeStorage, network, events, sqlite, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.phenoApi = phenoApi;
        this.nativeStorage = nativeStorage;
        this.network = network;
        this.events = events;
        this.sqlite = sqlite;
        this.file = file;
        this.networkStatus = 0;
        this.offlineSpecies = [];
        this.offlineFileDirectory = this.file.dataDirectory;
    }
    AddObservationPage.prototype.ionViewWillEnter = function () {
        this.getUserFromStorage();
        this.checkNetwork();
    };
    AddObservationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddObservationPage');
    };
    //check current network status and subscribe to events
    AddObservationPage.prototype.checkNetwork = function () {
        var _this = this;
        if (this.network.type === 'none') {
            console.log('we have no connection!');
            this.networkStatus = 0;
            this.getOfflineSpecies();
        }
        else {
            this.networkStatus = 1;
            this.getSpecies();
        }
        //listen for user disconnection event
        this.events.subscribe('network:disconnected', function (e) {
            _this.networkStatus = 0;
            _this.getOfflineSpecies();
        });
        //listen for user disconnection event
        this.events.subscribe('network:connected', function (e) {
            _this.networkStatus = 1;
            _this.getSpecies();
            //this.getObservations(this.filter,this.limit,this.school,this.userfilter);
        });
    };
    AddObservationPage.prototype.getSpecies = function () {
        var _this = this;
        if (this.networkStatus == 1) {
            this.phenoApi.getSpecies().subscribe(function (data) { _this.species = data; }, function (err) { return console.error(err); }, function () { console.log(_this.species); });
        }
        else {
            console.log("No network! " + this.networkStatus);
        }
    };
    //getting the offline stored data
    AddObservationPage.prototype.getOfflineSpecies = function () {
        var _this = this;
        this.sqlite.create({
            name: 'phenologit.db',
            location: 'default'
        })
            .then(function (db) {
            db.executeSql('SELECT * FROM species_offline', {})
                .then(function (data) {
                console.log("full offline species got");
                for (var i = 0; i < data.rows.length; i++) {
                    _this.offlineSpecies.push({
                        "id": data.rows.item(i).id,
                        "name": data.rows.item(i).name,
                        "name_en": data.rows.item(i).name_en,
                        "name_gl": data.rows.item(i).name_gl,
                        "name_dk": data.rows.item(i).name_dk,
                        "name_lt": data.rows.item(i).name_lt,
                        "name_es": data.rows.item(i).name_es,
                        "thumbnail": data.rows.item(i).thumbnail,
                        "picture": data.rows.item(i).pictures,
                        "stages": data.rows.item(i).stages,
                    });
                }
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    AddObservationPage.prototype.openSpeciePage = function (id) {
        console.log('opening specie ' + id);
        this.nativeStorage.setItem('observation', { specie: id });
        this.navCtrl.push('SpeciePage', { id: id });
    };
    AddObservationPage.prototype.getUserFromStorage = function () {
        var _this = this;
        console.log("getting user from storage");
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data;
            console.log('got from storage: ' + JSON.stringify(data));
            if (_this.user.username == null || _this.user.username == undefined) {
                _this.navCtrl.push('LoginPage', { destination: 'AddObservationPage' });
            }
        }, function (error) {
            _this.navCtrl.push('LoginPage', { destination: 'AddObservationPage' });
            console.error(error);
        });
    };
    return AddObservationPage;
}());
AddObservationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-observation',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/add-observation/add-observation.html"*/'<!--\n  Generated template for the AddObservationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>{{\'ADD_NEW_OBSERVATION\'| translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-item *ngIf="networkStatus==0" class="noConnection">\n    Your are in OFFLINE mode!\n  </ion-item>\n\n    <ion-grid text-center>\n      <ion-row wrap *ngIf="networkStatus==1">\n        <ion-col (click)="openSpeciePage(specie.id)" col-6 *ngFor="let specie of species"  >\n          <div *ngIf="translate.defaultLang==\'en\'" class="card-title" [ngStyle]="{\'background-image\': \'url(http://web.phenologit.org/uploads/species/\'+specie.picture+\')\'}" ><span>{{specie.name_en}}</span></div>\n          <div *ngIf="translate.defaultLang==\'es\'" class="card-title" [ngStyle]="{\'background-image\': \'url(http://web.phenologit.org/uploads/species/\'+specie.picture+\')\'}"><span>{{specie.name_es}}</span></div>\n          <div *ngIf="translate.defaultLang==\'gl\'" class="card-title" [ngStyle]="{\'background-image\': \'url(http://web.phenologit.org/uploads/species/\'+specie.picture+\')\'}"><span>{{specie.name_gl}}</span></div>\n          <div *ngIf="translate.defaultLang==\'lt\'" class="card-title" [ngStyle]="{\'background-image\': \'url(http://web.phenologit.org/uploads/species/\'+specie.picture+\')\'}"><span>{{specie.name_li}}</span></div>\n          <div *ngIf="translate.defaultLang==\'dk\'" class="card-title" [ngStyle]="{\'background-image\': \'url(http://web.phenologit.org/uploads/species/\'+specie.picture+\')\'}"><span>{{specie.name_de}}</span></div>\n        </ion-col>\n      </ion-row>\n\n      <!-- For offline mode -->\n      <ion-row wrap *ngIf="networkStatus==0">\n        <ion-col (click)="openSpeciePage(specie.id)" col-6 *ngFor="let specie of offlineSpecies"  >\n          <div *ngIf="translate.defaultLang==\'en\'" class="card-title" [ngStyle]="{\'background-image\': \'url(\'+offlineFileDirectory+\'/\'+specie.picture+\')\'}" ><span>{{specie.name_en}}</span></div>\n          <div *ngIf="translate.defaultLang==\'es\'" class="card-title" [ngStyle]="{\'background-image\': \'url(\'+offlineFileDirectory+\'/\'+specie.picture+\')\'}"><span>{{specie.name_es}}</span></div>\n          <div *ngIf="translate.defaultLang==\'gl\'" class="card-title" [ngStyle]="{\'background-image\': \'url(\'+offlineFileDirectory+\'/\'+specie.picture+\')\'}"><span>{{specie.name_gl}}</span></div>\n          <div *ngIf="translate.defaultLang==\'lt\'" class="card-title" [ngStyle]="{\'background-image\': \'url(\'+offlineFileDirectory+\'/\'+specie.picture+\')\'}"><span>{{specie.name_li}}</span></div>\n          <div *ngIf="translate.defaultLang==\'dk\'" class="card-title" [ngStyle]="{\'background-image\': \'url(\'+offlineFileDirectory+\'/\'+specie.picture+\')\'}"><span>{{specie.name_de}}</span></div>\n        </ion-col>\n      </ion-row>\n      <!-- -->\n\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/add-observation/add-observation.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_7__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
], AddObservationPage);

//# sourceMappingURL=add-observation.js.map

/***/ })

});
//# sourceMappingURL=11.js.map