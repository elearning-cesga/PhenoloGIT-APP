webpackJsonp([7],{

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservationSchoolFilterPageModule", function() { return ObservationSchoolFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observation_school_filter__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ObservationSchoolFilterPageModule = (function () {
    function ObservationSchoolFilterPageModule() {
    }
    return ObservationSchoolFilterPageModule;
}());
ObservationSchoolFilterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__observation_school_filter__["a" /* ObservationSchoolFilterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__observation_school_filter__["a" /* ObservationSchoolFilterPage */]),
        ],
    })
], ObservationSchoolFilterPageModule);

//# sourceMappingURL=observation-school-filter.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationSchoolFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pheno_api_pheno_api__ = __webpack_require__(107);
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
 * Generated class for the ObservationSchoolFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ObservationSchoolFilterPage = (function () {
    function ObservationSchoolFilterPage(navCtrl, navParams, phenoApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
    }
    ObservationSchoolFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ObservationSchoolFilterPage');
        this.getSchools();
    };
    ObservationSchoolFilterPage.prototype.getSchools = function () {
        var _this = this;
        this.phenoApi.getSchools().subscribe(function (data) { _this.schools = data; }, function (err) { return console.log('error ' + _this.schools); }, function () { return console.log(_this.schools); });
    };
    ObservationSchoolFilterPage.prototype.openListPage = function (school) {
        console.log("filtering by school " + school);
        this.navCtrl.push('ObservationListPage', { school: school });
    };
    return ObservationSchoolFilterPage;
}());
ObservationSchoolFilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-observation-school-filter',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/observation-school-filter/observation-school-filter.html"*/'<!--\n  Generated template for the ObservationSchoolFilterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>Filter by school</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="observation-filter">\n\n  <ion-list>\n    <ion-item *ngFor="let school of schools" (click)="openListPage(school.id)">\n      <ion-thumbnail item-left>\n        <img src="assets/img/icon-school.png" style="padding:20%">\n      </ion-thumbnail>\n     \n      <h2>\n        <span style="margin-right:5px">\n          <img *ngIf="school.cod_iso==\'UK\'" src="assets/img/uk_flag.png" style="width: 18px;">\n          <img *ngIf="school.cod_iso==\'ES\'" src="assets/img/gl_flag.png" style="width: 18px;">\n          <img *ngIf="school.cod_iso==\'DK\'" src="assets/img/dk_flag.png" style="width: 18px;">\n          <img *ngIf="school.cod_iso==\'LT\'" src="assets/img/lt_flag.png" style="width: 18px;">\n        </span>{{school.name}}</h2>\n      <ion-icon name="arrow-forward" item-right></ion-icon>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/observation-school-filter/observation-school-filter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_pheno_api_pheno_api__["a" /* PhenoApi */]])
], ObservationSchoolFilterPage);

//# sourceMappingURL=observation-school-filter.js.map

/***/ })

});
//# sourceMappingURL=7.js.map