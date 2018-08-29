webpackJsonp([14],{

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddObservationMediaPageModule", function() { return AddObservationMediaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_observation_media__ = __webpack_require__(325);
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
var AddObservationMediaPageModule = (function () {
    function AddObservationMediaPageModule() {
    }
    return AddObservationMediaPageModule;
}());
AddObservationMediaPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_observation_media__["a" /* AddObservationMediaPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_observation_media__["a" /* AddObservationMediaPage */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
    })
], AddObservationMediaPageModule);

//# sourceMappingURL=add-observation-media.module.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddObservationMediaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(111);
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
 * Generated class for the AddObservationMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddObservationMediaPage = (function () {
    function AddObservationMediaPage(navCtrl, navParams, translate, camera, nativeStorage, crop, el, alertCtrl, network, events, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.camera = camera;
        this.nativeStorage = nativeStorage;
        this.crop = crop;
        this.el = el;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.events = events;
        this.file = file;
        this.mediaToUpload = 0;
        this.showActions = 'none';
        this.mediaToUpload = [];
        this.observation = {};
        this.observation.title = null;
        this.observation.description = null;
        this.showDefault = true;
    }
    AddObservationMediaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddObservationMediaPage');
        this.loadFromStorage();
        this.checkNetwork();
        this.getTranslatedStrings();
    };
    //check current network status and subscribe to events
    AddObservationMediaPage.prototype.checkNetwork = function () {
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
    AddObservationMediaPage.prototype.getTranslatedStrings = function () {
        var _this = this;
        //get translated strings
        this.translate.get('ADD_MEDIA_ERROR').subscribe(function (value) { _this.str_add_media_error = value; });
        this.translate.get('ADD_MEDIA_ERROR_2').subscribe(function (value) { _this.str_add_media_error_subtitle = value; });
        this.translate.get('CANCEL').subscribe(function (value) { _this.str_cancel = value; });
        this.translate.get('DELETE').subscribe(function (value) { _this.str_delete = value; });
        this.translate.get('DELETE_MEDIA').subscribe(function (value) { _this.str_confirm_deletion = value; });
        this.translate.get('DELETE_MEDIA_SUB').subscribe(function (value) { _this.str_confirm_deletion_subtitle = value; });
    };
    AddObservationMediaPage.prototype.loadFromStorage = function () {
        var _this = this;
        this.nativeStorage.getItem('observation')
            .then(function (data) { console.log('in storage: ' + JSON.stringify(data)), _this.observation = data; }, function (error) { return console.error(error); });
    };
    AddObservationMediaPage.prototype.takePicture = function () {
        var _this = this;
        var self = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
            targetHeight: 1024,
            targetWidth: 1024,
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData + ' é imaxe, so cropping...');
            //crop the image and store in the mediaToUpload array
            _this.crop.crop(imageData).then(function (newImage) { console.log('newImage: ' + newImage), _this.mediaToUpload.push({ id: _this.mediaToUpload.length, media_url: newImage, media_type: 'picture', media_prefix: Date.now() }); }, function (error) { return console.error('Error cropping image', error); });
            //timeout to wait until the slide is created by the system
            var self = _this;
            _this.showDefault = false;
        }, function (err) {
            console.log(err);
            // Handle error
        });
    };
    AddObservationMediaPage.prototype.takePictureFromGallery = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            targetHeight: 1024,
            targetWidth: 1024,
            mediaType: this.camera.MediaType.ALLMEDIA,
        }).then(function (imageData) {
            var ext = imageData.split('.').pop(); //get the extension of the file
            if (ext == 'mp4') {
                _this.mediaToUpload.push({ media_url: imageData, media_type: 'video', media_prefix: Date.now() });
            }
            else {
                //crop the image and store in the mediaToUpload array
                console.log(imageData + ' é imaxe, so cropping...');
                _this.file.resolveLocalFilesystemUrl(imageData).then(function (entry) {
                    _this.crop.crop(entry.toURL()).then(function (newImage) { console.log('newImage: ' + newImage), _this.mediaToUpload.push({ id: _this.mediaToUpload.length, media_url: newImage, media_type: 'picture', media_prefix: Date.now() }); }, function (error) { return console.error('Error cropping image', error); });
                });
            }
            //timeout to wait until the slide is created by the system
            var self = _this;
            _this.showDefault = false;
        }, function (err) {
            console.log(err);
        });
    };
    AddObservationMediaPage.prototype.presentAlert = function (msg, subTitle) {
        var alert = this.alertCtrl.create({
            title: msg,
            subTitle: subTitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    AddObservationMediaPage.prototype.presentDeleteConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.str_confirm_deletion,
            message: this.str_confirm_deletion_subtitle,
            buttons: [
                {
                    text: this.str_cancel,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.str_delete,
                    handler: function () {
                        console.log('Buy clicked');
                        _this.deletePicture();
                    }
                }
            ]
        });
        alert.present();
    };
    AddObservationMediaPage.prototype.selectPicture = function (event) {
        this.showActions = 'inline-block';
        var img = document.getElementsByClassName('imgp');
        for (var i = 0; i < img.length; i++) {
            img[i].classList.remove('selected');
        }
        event.currentTarget.classList.add('selected');
        this.selectedPictureId = event.currentTarget.getAttribute('id');
    };
    AddObservationMediaPage.prototype.setAsCover = function () {
        this.cover = this.mediaToUpload[this.selectedPictureId].media_prefix + '_' + this.mediaToUpload[this.selectedPictureId].media_url.substr(this.mediaToUpload[this.selectedPictureId].media_url.lastIndexOf('/') + 1);
        console.log('change cover to: ' + this.cover);
        //hide all stars
        var star = document.getElementsByClassName('imgstar');
        for (var i = 0; i < star.length; i++) {
            star[i].classList.remove('visible');
            star[i].classList.add('hidden');
        }
        //make visible this
        var img = document.getElementById('star_' + this.selectedPictureId);
        console.log('showing ' + img);
        img.classList.remove('hidden');
        img.classList.add('visible');
    };
    AddObservationMediaPage.prototype.deletePicture = function () {
        var _this = this;
        //searches in the array and return position
        var index = this.mediaToUpload.findIndex(function (obj) { return obj.id == _this.selectedPictureId; });
        //delete the item in this position
        this.mediaToUpload.splice(index, 1);
    };
    AddObservationMediaPage.prototype.openMapPage = function () {
        var _this = this;
        //check that there is at least one image
        if (this.mediaToUpload.length == 0) {
            this.presentAlert(this.str_add_media_error, this.str_add_media_error_subtitle);
        }
        else {
            //get observation storage
            this.nativeStorage.getItem('observation')
                .then(function (data) { return _this.saveData(data); }, function (error) { return console.error(error); });
        }
    };
    AddObservationMediaPage.prototype.showAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    AddObservationMediaPage.prototype.saveData = function (data) {
        //check that at least one image
        if (this.mediaToUpload.length != 0) {
            console.log('saving media...');
            //if no cover is set, the first image will be used as cover
            if (this.cover == '' || this.cover == undefined) {
                this.cover = this.mediaToUpload[0].media_prefix + '_' + this.mediaToUpload[0].media_url.substr(this.mediaToUpload[0].media_url.lastIndexOf('/') + 1);
            }
            this.nativeStorage.setItem('observation', { specie: data.specie, stage: data.stage, title: this.observation.title, description: this.observation.description, mediaToUpload: this.mediaToUpload, cover: this.cover });
            this.navCtrl.push('AddObservationMapPage');
        }
        else {
            this.showAlert('No media added!', 'Need at least one image for your observation');
        }
    };
    return AddObservationMediaPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
], AddObservationMediaPage.prototype, "slider", void 0);
AddObservationMediaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-observation-media',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/add-observation-media/add-observation-media.html"*/'<!--\n  Generated template for the AddObservationMediaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>{{\'ADD_MEDIA_TITLE\'| translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="add-observation">\n\n  <ion-item *ngIf="networkStatus==0" class="noConnection">\n    {{\'OFFLINE_MODE\'| translate}}\n  </ion-item>\n\n  <section class="no-picture" *ngIf="mediaToUpload.length==0">\n    <p>{{\'ADD_MEDIA_SUBTITLE\'| translate}}</p> \n    <img src="assets/img/icon.png" alt="">\n  </section>\n\n    <ion-grid>\n        <ion-row wrap>\n          <ion-col *ngFor="let media of mediaToUpload" col-6>\n            <div>\n              <img id="{{media.id}}" class="imgp" (click)="selectPicture($event)" src="{{media.media_url}}" alt="">\n              <ion-icon name="star" id="star_{{media.id}}" class="imgstar hidden"></ion-icon>\n            </div>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-fab top right edge>\n        <button ion-fab color=secondary><ion-icon name="add"></ion-icon></button>\n        <ion-fab-list side="bottom">\n          <button ion-fab color=secondary (click)="takePicture()"><ion-icon name="camera"></ion-icon></button>\n          <button ion-fab color=secondary (click)="takePictureFromGallery()"><ion-icon name="images"></ion-icon></button>\n        </ion-fab-list>\n    </ion-fab>\n\n    <ion-footer fixed>\n      <ion-toolbar position="bottom">\n        <ion-buttons end>\n          <button ion-button color=primary (click)="openMapPage()">{{\'NEXT\' |translate}}</button>\n        </ion-buttons>\n        <ion-buttons begin class="actionButtons">\n            <button [style.display]=\'showActions\' ion-button icon-start color=danger (click)="presentDeleteConfirm()"><ion-icon name="trash"></ion-icon>  </button>\n            <button [style.display]=\'showActions\' ion-button icon-start color=primary (click)="setAsCover()"><ion-icon name="star"></ion-icon>  </button>\n          </ion-buttons>\n      </ion-toolbar>\n    </ion-footer>\n \n</ion-content>'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/add-observation-media/add-observation-media.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__["a" /* Crop */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
], AddObservationMediaPage);

//# sourceMappingURL=add-observation-media.js.map

/***/ })

});
//# sourceMappingURL=14.js.map