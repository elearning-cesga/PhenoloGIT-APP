webpackJsonp([12],{

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddObservationStagesPageModule", function() { return AddObservationStagesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_observation_stages__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddObservationStagesPageModule = (function () {
    function AddObservationStagesPageModule() {
    }
    return AddObservationStagesPageModule;
}());
AddObservationStagesPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_observation_stages__["a" /* AddObservationStagesPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_observation_stages__["a" /* AddObservationStagesPage */]),
        ],
    })
], AddObservationStagesPageModule);

//# sourceMappingURL=add-observation-stages.module.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddObservationStagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_pheno_api_pheno_api__ = __webpack_require__(107);
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
 * Generated class for the AddObservationStagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddObservationStagesPage = (function () {
    function AddObservationStagesPage(navCtrl, navParams, phenoApi, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.nativeStorage = nativeStorage;
        this.specie = {};
        this.observation = {};
        this.specieid = this.navParams.get('id');
        this.getSpecieDetails(this.specieid);
    }
    AddObservationStagesPage.prototype.loadFromStorage = function () {
        var _this = this;
        this.nativeStorage.getItem('observation')
            .then(function (data) { console.log('in storage: ' + JSON.stringify(data)), _this.observation = data; }, function (error) { return console.error(error); });
    };
    AddObservationStagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddObservationStagesPage');
        this.loadFromStorage();
    };
    AddObservationStagesPage.prototype.goNext = function (stage_id) {
        //save to storage
        this.nativeStorage.setItem('observation', { specie: this.observation.specie, stage: stage_id });
        //go to next page
        this.navCtrl.push('AddObservationDetailsPage');
    };
    AddObservationStagesPage.prototype.getSpecieDetails = function (id) {
        var _this = this;
        console.log('going to check details for ' + id);
        this.phenoApi.getSpecieDetails(id).subscribe(function (data) {
            _this.specie = data[0],
                _this.stage_id = _this.specie.stages[0].stage_id;
        }, function (err) { }, function () { return console.log(_this.specie); });
    };
    AddObservationStagesPage.prototype.slideChanged = function (id) {
        //upload the selected stage id when slide changes
        this.stage_id = id;
    };
    return AddObservationStagesPage;
}());
AddObservationStagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-observation-stages',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/add-observation-stages/add-observation-stages.html"*/'<!--\n  Generated template for the AddObservationStagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>What are you observing?</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n\n      <ion-card-header>\n          <h1>Select a stage</h1>\n      </ion-card-header>\n      \n    <ion-slides pager=\'true\' (ionSlideDidChange)="slideChanged(stage.stage_id)">\n      <ion-slide *ngFor="let stage of specie.stages">\n        <img src="{{stage.stage_picture}}" alt="">\n        <h3>Stage: stage name</h3>\n        <p>{{stage.desc_en}}</p>\n      </ion-slide>\n    </ion-slides>\n        \n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar position="bottom">\n        <ion-buttons end>\n          <button ion-button color=primary (click)="goNext(stage_id)">Select and continue</button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n\n\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/add-observation-stages/add-observation-stages.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */]])
], AddObservationStagesPage);

//# sourceMappingURL=add-observation-stages.js.map

/***/ })

});
//# sourceMappingURL=12.js.map