webpackJsonp([6],{

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservationSpecieFilterPageModule", function() { return ObservationSpecieFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observation_specie_filter__ = __webpack_require__(334);
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
var ObservationSpecieFilterPageModule = (function () {
    function ObservationSpecieFilterPageModule() {
    }
    return ObservationSpecieFilterPageModule;
}());
ObservationSpecieFilterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__observation_specie_filter__["a" /* ObservationSpecieFilterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__observation_specie_filter__["a" /* ObservationSpecieFilterPage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], ObservationSpecieFilterPageModule);

//# sourceMappingURL=observation-specie-filter.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationSpecieFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pheno_api_pheno_api__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(214);
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
 * Generated class for the ObservationSpecieFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ObservationSpecieFilterPage = (function () {
    function ObservationSpecieFilterPage(navCtrl, navParams, phenoApi, translate, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
    }
    ObservationSpecieFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ObservationSpecieFilterPage');
        this.getSpecies();
    };
    ObservationSpecieFilterPage.prototype.getSpecies = function () {
        var _this = this;
        this.presentLoading();
        this.phenoApi.getSpecies().subscribe(function (data) { _this.species = data; }, function (err) {
            console.error('error'),
                _this.loading.dismiss();
        }, function () {
            console.log(_this.species),
                _this.loading.dismiss();
        });
    };
    ObservationSpecieFilterPage.prototype.presentLoading = function () {
        //present loading function
        this.loading = this.loadingCtrl.create({});
        this.loading.present();
    };
    ObservationSpecieFilterPage.prototype.openListPage = function (id) {
        console.log("filtering by id " + id);
        this.navCtrl.push('ObservationListPage', { filter: id });
    };
    return ObservationSpecieFilterPage;
}());
ObservationSpecieFilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-observation-specie-filter',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/observation-specie-filter/observation-specie-filter.html"*/'<!--\n  Generated template for the ObservationSpecieFilterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>Filter by specie</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="observation-filter">\n\n  <ion-list>\n    <ion-item *ngFor="let specie of species" (click)="openListPage(specie.id)">\n      <ion-thumbnail item-left>\n        <img src="http://web.phenologit.org/uploads/species/thumbnails/{{specie.thumbnail}}">\n      </ion-thumbnail>\n      <h2 *ngIf="translate.defaultLang==\'en\'">{{specie.name_en}}</h2>\n      <h2 *ngIf="translate.defaultLang==\'lt\'">{{specie.name_li}}</h2>\n      <h2 *ngIf="translate.defaultLang==\'es\'">{{specie.name_es}}</h2>\n      <h2 *ngIf="translate.defaultLang==\'gl\'">{{specie.name_gl}}</h2>\n      <h2 *ngIf="translate.defaultLang==\'dk\'">{{specie.name_de}}</h2>\n      <p>{{specie.name}}</p>\n      <button ion-button clear item-right>{{\'FILTER\'|translate}}</button>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/observation-specie-filter/observation-specie-filter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
], ObservationSpecieFilterPage);

//# sourceMappingURL=observation-specie-filter.js.map

/***/ })

});
//# sourceMappingURL=6.js.map