webpackJsonp([4],{

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfflineObservationsPageModule", function() { return OfflineObservationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offline_observations__ = __webpack_require__(335);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OfflineObservationsPageModule = (function () {
    function OfflineObservationsPageModule() {
    }
    return OfflineObservationsPageModule;
}());
OfflineObservationsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__offline_observations__["a" /* OfflineObservationsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__offline_observations__["a" /* OfflineObservationsPage */]),
        ],
    })
], OfflineObservationsPageModule);

//# sourceMappingURL=offline-observations.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfflineObservationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_pheno_api_pheno_api__ = __webpack_require__(107);
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
 * Generated class for the OfflineObservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OfflineObservationsPage = (function () {
    function OfflineObservationsPage(navCtrl, navParams, sqlite, file, alertCtrl, transfer, ngZone, loadingCtrl, phenoApi, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.transfer = transfer;
        this.ngZone = ngZone;
        this.loadingCtrl = loadingCtrl;
        this.phenoApi = phenoApi;
        this.events = events;
        this.offlineObservations = [];
    }
    OfflineObservationsPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad OfflineObservationsPage');
        //this.getOfflineObservations();
    };
    OfflineObservationsPage.prototype.ionViewWillEnter = function () {
        this.getOfflineObservations();
    };
    //check if there are any pending observations stored in the device
    OfflineObservationsPage.prototype.getOfflineObservations = function () {
        var _this = this;
        if (true) {
            this.sqlite.create({
                name: 'phenologit.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('SELECT * FROM observations_offline', {})
                    .then(function (data) {
                    var _loop_1 = function () {
                        observation = {};
                        var observationMedia = [];
                        db.executeSql('SELECT * FROM observations_offline_media WHERE idobservation=' + data.rows.item(i).id + ' ', {})
                            .then(function (media) {
                            for (var y = 0; y < media.rows.length; y++) {
                                observationMedia.push(media.rows.item(y));
                            }
                        });
                        observation = {
                            id: data.rows.item(i).id,
                            title: data.rows.item(i).title,
                            description: data.rows.item(i).description,
                            specie: data.rows.item(i).idspecie,
                            stage: data.rows.item(i).idstage,
                            cover: data.rows.item(i).cover,
                            coords: data.rows.item(i).lat + ',' + data.rows.item(i).lng,
                            userid: data.rows.item(i).iduser,
                            temperature: 0,
                            humidity: 0,
                            weatherstate: 'null',
                            media2upload: observationMedia,
                            media: []
                        };
                        _this.offlineObservations.push(observation);
                    };
                    var observation;
                    for (var i = 0; i < data.rows.length; i++) {
                        _loop_1();
                    }
                    console.log(_this.offlineObservations);
                });
            });
        }
    };
    OfflineObservationsPage.prototype.removeOfflineObservation = function (id) {
        var _this = this;
        console.log("removing offline observation");
        var confirm = this.alertCtrl.create({
            title: 'Remove this observation?',
            message: 'Do you want to remove this pending observation?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Remove',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'phenologit.db',
                            location: 'default'
                        })
                            .then(function (db) {
                            db.executeSql('DELETE FROM observations_offline WHERE id="' + id + '"', {})
                                .then(function (data) {
                                console.log("deleted!");
                            });
                            db.executeSql('DELETE FROM observations_offline_media WHERE idobservation="' + id + '"', {})
                                .then(function (data) {
                                console.log("deleted!");
                            });
                            //reload offline observations
                            _this.offlineObservations = [];
                            //publish event
                            _this.events.publish('offline:observations');
                            _this.getOfflineObservations();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    OfflineObservationsPage.prototype.uploadObservation = function (id) {
        this.uploadFiles(id);
    };
    OfflineObservationsPage.prototype.showLoading = function (msg) {
        this.ld = this.loadingCtrl.create({
            content: msg,
            spinner: 'dots'
        });
        this.ld.present();
    };
    OfflineObservationsPage.prototype.uploadFiles = function (id) {
        //uploads file/s and resize in server
        var _this = this;
        this.showLoading('uploading');
        //seach in the array for observation
        var observation;
        for (var i = 0, len = this.offlineObservations.length; i < len; i++) {
            if (this.offlineObservations[i].id === id) {
                observation = this.offlineObservations[i];
                console.log(observation);
                break;
            }
        }
        var fileTransfer = this.transfer.create();
        var self = this;
        var count = 0;
        for (var _i = 0, _a = observation.media2upload; _i < _a.length; _i++) {
            var image = _a[_i];
            var fileURL = image.media_url;
            var prefix = image.media_prefix;
            var headers = { 'prefix': prefix };
            var params = { 'prefix': prefix };
            var up_options = {
                fileKey: 'bill',
                fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
                headers: headers,
                mimeType: "text/plain",
                params: params
            };
            var uri = encodeURI("http://web.phenologit.org/uploadMedia.php");
            fileTransfer.upload(fileURL, uri, up_options)
                .then(function (data) {
                console.log("uploaded: " + observation.media2upload[count].media_url);
                _this.ld.dismiss();
                observation.media.push(observation.media2upload[count].media_prefix + '_' + observation.media2upload[count].media_url.substr(observation.media2upload[count].media_url.lastIndexOf('/') + 1));
                count++;
                if (count == observation.media2upload.length) {
                    _this.saveDB(observation);
                    console.log('subo to api en count: ' + count);
                }
            }, function (err) {
                console.log(err);
            });
            var onProgress = function (progressEvent) {
                _this.ngZone.run(function () {
                    _this.ld.setContent('uploading picture: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + ' %');
                });
            };
            fileTransfer.onProgress(onProgress);
        }
    };
    //saves to api and return to the main page
    OfflineObservationsPage.prototype.saveDB = function (observation) {
        var _this = this;
        console.log(JSON.stringify(observation));
        this.phenoApi.postObservation(observation).subscribe(function (data) { console.log(JSON.stringify(data)); }, function (err) { return console.log(JSON.stringify(err)); }, function () {
            console.log('observation created successfully!');
            _this.sqlite.create({
                name: 'phenologit.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('DELETE FROM observations_offline WHERE id="' + observation.id + '"', {})
                    .then(function (data) {
                    console.log("observation deleted!");
                    _this.offlineObservations = [];
                    _this.getOfflineObservations();
                });
                db.executeSql('DELETE FROM observations_offline_media WHERE idobservation="' + observation.id + '"', {})
                    .then(function (data) {
                    console.log("observation media deleted!");
                    _this.offlineObservations = [];
                    _this.getOfflineObservations();
                });
            });
            _this.navCtrl.setRoot('ObservationListPage', { created: true });
        });
    };
    return OfflineObservationsPage;
}());
OfflineObservationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-offline-observations',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/offline-observations/offline-observations.html"*/'<!--\n  Generated template for the OfflineObservationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>Offline Observations</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="offline-list">\n    <ion-list>\n\n        <ion-item *ngFor="let observation of offlineObservations">\n          <ion-thumbnail item-left>\n            <img src="{{observation.media2upload[0].media_url}}">\n          </ion-thumbnail>\n          <h2>{{observation.title}}</h2>\n          <p>{{observation.description}}</p>\n          <p>pic: {{observation.cover}}</p>\n          <button ion-button clear item-right (click)="uploadObservation(observation.id)"><ion-icon name="cloud-upload"></ion-icon></button>\n          <button ion-button clear item-right (click)="removeOfflineObservation(observation.id)"><ion-icon name="remove-circle"></ion-icon></button>\n        </ion-item>\n    \n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/offline-observations/offline-observations.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], OfflineObservationsPage);

//# sourceMappingURL=offline-observations.js.map

/***/ })

});
//# sourceMappingURL=4.js.map