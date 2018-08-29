webpackJsonp([13],{

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeciePageModule", function() { return SpeciePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specie__ = __webpack_require__(326);
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
var SpeciePageModule = (function () {
    function SpeciePageModule() {
    }
    return SpeciePageModule;
}());
SpeciePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__specie__["a" /* SpeciePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__specie__["a" /* SpeciePage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], SpeciePageModule);

//# sourceMappingURL=specie.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeciePage; });
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
 * Generated class for the SpeciePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SpeciePage = (function () {
    function SpeciePage(navCtrl, navParams, phenoApi, translate, nativeStorage, network, events, sqlite, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.translate = translate;
        this.nativeStorage = nativeStorage;
        this.network = network;
        this.events = events;
        this.sqlite = sqlite;
        this.file = file;
        this.stage_id = 0;
        this.stageIndex = 0;
        console.log('constructor');
        this.specie = [];
        this.specie.picture = null;
    }
    SpeciePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SpeciePage');
        this.checkNetwork();
    };
    //check current network status and subscribe to events
    SpeciePage.prototype.checkNetwork = function () {
        var _this = this;
        if (this.network.type === 'none') {
            console.log('we have no connection!');
            this.networkStatus = 0;
            this.getOfflineSpecieDetails();
        }
        else {
            this.networkStatus = 1;
            this.getSpecieDetails(this.navParams.get('id'));
        }
        //listen for user disconnection event
        this.events.subscribe('network:disconnected', function (e) {
            _this.networkStatus = 0;
            _this.getOfflineSpecieDetails();
        });
        //listen for user disconnection event
        this.events.subscribe('network:connected', function (e) {
            _this.networkStatus = 1;
            _this.getSpecieDetails(_this.navParams.get('id'));
        });
    };
    SpeciePage.prototype.getSpecieDetails = function (id) {
        var _this = this;
        console.log('going to check details for ' + id);
        this.phenoApi.getSpecieDetails(id).subscribe(function (data) { _this.specie = data[0]; }, function (err) { }, function () { return console.log(_this.specie); });
    };
    SpeciePage.prototype.getOfflineSpecieDetails = function () {
        var _this = this;
        var self = this;
        console.log('going to check OFFLINE details for ' + this.navParams.get('id'));
        this.sqlite.create({
            name: 'phenologit.db',
            location: 'default'
        })
            .then(function (db) {
            db.executeSql('SELECT * FROM species_offline WHERE id=' + _this.navParams.get('id') + '', {})
                .then(function (data) {
                console.log("offline specie got " + JSON.stringify(data.rows.item(0).name));
                _this.specie = {
                    "id": data.rows.item(0).id,
                    "name": data.rows.item(0).name,
                    "name_en": data.rows.item(0).name_en,
                    "name_gl": data.rows.item(0).name_gl,
                    "name_dk": data.rows.item(0).name_dk,
                    "name_lt": data.rows.item(0).name_lt,
                    "name_es": data.rows.item(0).name_es,
                    "desc_en": data.rows.item(0).desc_en,
                    "desc_gl": data.rows.item(0).desc_gl,
                    "desc_dk": data.rows.item(0).desc_dk,
                    "desc_lt": data.rows.item(0).desc_lt,
                    "desc_es": data.rows.item(0).desc_es,
                    "thumbnail": data.rows.item(0).thumbnail,
                    "picture": data.rows.item(0).pictures,
                    "stages": []
                };
                //get the stages
                db.executeSql('SELECT * FROM u_specie_stage_offline WHERE idspecie=' + _this.navParams.get('id') + '', {})
                    .then(function (data) {
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.specie.stages.push({
                            "stage_id": data.rows.item(i).idstage,
                            "stage_en": data.rows.item(i).stage_en,
                            "stage_es": data.rows.item(i).stage_es,
                            "stage_dk": data.rows.item(i).stage_dk,
                            "stage_lt": data.rows.item(i).stage_lt,
                            "desc_en": data.rows.item(i).desc_en,
                            "desc_es": data.rows.item(i).desc_es,
                            "desc_dk": data.rows.item(i).desc_dk,
                            "desc_lt": data.rows.item(i).desc_lt,
                            "stage_picture": self.file.dataDirectory + "/stages/" + data.rows.item(i).stage_picture,
                        });
                    }
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    //uploads the selected stage id when slide changes
    SpeciePage.prototype.slideChanged = function () {
        //check if this is the last slide to prevent swiping left
        if (!this.slider.isEnd()) {
            this.slider.lockSwipeToNext(false);
            this.stageIndex = this.slider.getActiveIndex();
        }
        else {
            this.slider.lockSwipeToNext(true);
            this.stageIndex = this.slider.getActiveIndex();
        }
        //check if this is the first slide to prevent swiping right
        if (!this.slider.isBeginning()) {
            this.slider.lockSwipeToPrev(false);
            this.stageIndex = this.slider.getActiveIndex();
        }
        else {
            this.slider.lockSwipeToPrev(true);
            this.stageIndex = this.slider.getActiveIndex();
        }
        console.log('#active slide index: ' + this.stageIndex);
    };
    SpeciePage.prototype.openObservationMedia = function (stage) {
        var _this = this;
        console.log('stage-> ' + stage);
        //get observation storage
        this.nativeStorage.getItem('observation')
            .then(function (data) {
            _this.saveData(data, stage),
                _this.navCtrl.push('AddObservationDetailsPage', { id: _this.navParams.get('id') });
        }, function (error) { return console.error(error); });
    };
    SpeciePage.prototype.saveData = function (data, stage) {
        this.nativeStorage.setItem('observation', { specie: data.specie, stage: stage });
    };
    return SpeciePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myslider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
], SpeciePage.prototype, "slider", void 0);
SpeciePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-specie',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/add-observation-specie/specie.html"*/'<!--\n  Generated template for the SpeciePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>{{\'ADD_SPECIE_PAGE_TITLE\'| translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="add-specie-page">\n\n  <ion-item *ngIf="networkStatus==0" class="noConnection">\n    {{\'OFFLINE_MODE\'| translate}}\n  </ion-item>\n  \n  <ion-card>\n\n    <ion-card-content class="card-content">\n\n      <section class="specie">\n\n          <ion-card-title>\n              <span *ngIf="translate.defaultLang==\'en\'">{{specie.name_en}}</span>\n              <span *ngIf="translate.defaultLang==\'es\'">{{specie.name_es}}</span>\n              <span *ngIf="translate.defaultLang==\'gl\'">{{specie.name_gl}}</span>\n              <span *ngIf="translate.defaultLang==\'lt\'">{{specie.name_li}}</span>\n              <span *ngIf="translate.defaultLang==\'dk\'">{{specie.name_de}}</span>\n              <span class="latin_name">{{specie.name}}</span>\n            </ion-card-title>\n          \n            <section class="description">\n              <span *ngIf="translate.defaultLang==\'en\'">{{specie.desc_en}}</span>\n              <span *ngIf="translate.defaultLang==\'es\'">{{specie.desc_es}}</span>\n              <span *ngIf="translate.defaultLang==\'gl\'">{{specie.desc_gl}}</span>\n              <span *ngIf="translate.defaultLang==\'lt\'">{{specie.desc_li}}</span>\n              <span *ngIf="translate.defaultLang==\'dk\'">{{specie.desc_de}}</span>\n            </section>\n      \n            <h5>Select stage:</h5>\n\n      </section>\n\n      <section class="stage">\n\n          <ion-slides #myslider *ngIf="specie.stages!=undefined" pager="true" autoplay="3000" (ionSlideDidChange)="slideChanged()">\n              <ion-slide *ngFor="let stage of specie.stages">\n                <img src="http://web.phenologit.org/uploads/stages/{{stage.stage_picture}}" alt="" *ngIf="networkStatus==1">\n                <img src="{{stage.stage_picture}}" alt="" *ngIf="networkStatus==0">\n                <section class="slide_content">\n                    <h1 *ngIf="translate.defaultLang==\'en\'">{{stage.stage_en}}</h1>\n                    <p *ngIf="translate.defaultLang==\'en\'">{{stage.desc_en}}</p>\n                    <h1 *ngIf="translate.defaultLang==\'es\'">{{stage.stage_es}}</h1>\n                    <p *ngIf="translate.defaultLang==\'es\'">{{stage.desc_es}}</p>\n                    <h1 *ngIf="translate.defaultLang==\'gl\'">{{stage.stage_gl}}</h1>\n                    <p *ngIf="translate.defaultLang==\'gl\'">{{stage.desc_gl}}</p>\n                    <h1 *ngIf="translate.defaultLang==\'dk\'">{{stage.stage_dk}}</h1>\n                    <p *ngIf="translate.defaultLang==\'dk\'">{{stage.desc_dk}}</p>\n                    <h1 *ngIf="translate.defaultLang==\'lt\'">{{stage.stage_lt}}</h1>\n                    <p *ngIf="translate.defaultLang==\'lt\'">{{stage.desc_lt}}</p>\n                </section>\n                \n              </ion-slide>\n            </ion-slides>\n            \n      </section>\n\n    </ion-card-content>\n\n</ion-card>\n\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar position="bottom">\n              <ion-buttons end>\n                <button *ngIf="translate.defaultLang==\'en\' && specie.stages!=undefined" (click)="openObservationMedia(specie.stages[stageIndex].stage_id)" ion-button color=primary>{{"I\'M OBSERVING"| translate}} {{specie.stages[stageIndex].stage_en}}</button>\n                <button *ngIf="translate.defaultLang==\'es\' && specie.stages!=undefined" (click)="openObservationMedia(specie.stages[stageIndex].stage_id)" ion-button color=primary>{{"I\'M OBSERVING"| translate}} {{specie.stages[stageIndex].stage_es}}</button>\n                <button *ngIf="translate.defaultLang==\'gl\' && specie.stages!=undefined" (click)="openObservationMedia(specie.stages[stageIndex].stage_id)" ion-button color=primary>{{"I\'M OBSERVING"| translate}} {{specie.stages[stageIndex].stage_gl}}</button>\n                <button *ngIf="translate.defaultLang==\'dk\' && specie.stages!=undefined" (click)="openObservationMedia(specie.stages[stageIndex].stage_id)" ion-button color=primary>{{"I\'M OBSERVING"| translate}} {{specie.stages[stageIndex].stage_dk}}</button>\n                <button *ngIf="translate.defaultLang==\'lt\' && specie.stages!=undefined" (click)="openObservationMedia(specie.stages[stageIndex].stage_id)" ion-button color=primary>{{"I\'M OBSERVING"| translate}} {{specie.stages[stageIndex].stage_lt}}</button>\n              </ion-buttons>\n          </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/add-observation-specie/specie.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
], SpeciePage);

//# sourceMappingURL=specie.js.map

/***/ })

});
//# sourceMappingURL=13.js.map