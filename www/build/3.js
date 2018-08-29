webpackJsonp([3],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = (function () {
    function ProfilePageModule() {
    }
    return ProfilePageModule;
}());
ProfilePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
        ],
    })
], ProfilePageModule);

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pheno_api_pheno_api__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(112);
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
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, nativeStorage, camera, phenoApi, transfer, events, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.camera = camera;
        this.phenoApi = phenoApi;
        this.transfer = transfer;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.user = {};
        this.imageToUpload = { media_url: '' };
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
        this.imageChanged = 0;
    };
    ProfilePage.prototype.ionViewWillLoad = function () {
        console.log("checking user login before entering...");
        this.getUserFromStorage();
    };
    ProfilePage.prototype.getUserFromStorage = function () {
        var _this = this;
        console.log("getting user from storage");
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data;
            console.log('got from storage: ' + JSON.stringify(data));
            if (_this.user.username == null || _this.user.username == undefined) {
                _this.navCtrl.push('LoginPage', { destination: 'ProfilePage' });
            }
        }, function (error) {
            _this.navCtrl.push('LoginPage', { destination: 'ProfilePage' });
            console.error(error);
        });
    };
    ProfilePage.prototype.changeProfilePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            mediaType: this.camera.MediaType.ALLMEDIA,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageToUpload.media_url = imageData;
            _this.imageToUpload.media_prefix = Date.now();
            _this.user.picture = _this.imageToUpload.media_url;
            _this.imageChanged = 1;
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.saveSettings = function () {
        var _this = this;
        console.log('saving settings');
        if (this.imageToUpload.media_url != '') {
            this.uploadProfilePicture(); //upload picture to /uploads/avatar/ in server
            var fileName = this.imageToUpload.media_url.split("/");
            this.user.picture = this.imageToUpload.media_prefix + '_' + fileName.pop(); //file path formatting 
        }
        else {
            console.log('not uploading image');
        }
        console.log(this.user);
        //call to API to update user settings
        this.phenoApi.updateUser(this.user).subscribe(function (data) { console.log("response-> " + data); }, function (err) { }, function () {
            _this.nativeStorage.setItem('user', {
                username: _this.user.username,
                name: _this.user.name,
                lang: _this.user.lang,
                picture: _this.user.picture,
                id: _this.user.id,
                school: _this.user.school,
                type: _this.user.type,
                email: _this.user.email
            }).then(function () {
                console.log('Stored item!');
                _this.events.publish('user:update'); //publish the login event
            }, function (error) { return console.error('Error storing item', error); });
            //present toast
            _this.presentToast('Profile updated successfully');
            //go to main page
            _this.navCtrl.setRoot('ObservationListPage');
        });
    };
    ProfilePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });
    };
    ProfilePage.prototype.uploadProfilePicture = function () {
        console.log('uploading picture...');
        var fileURL = this.imageToUpload.media_url;
        var prefix = this.imageToUpload.media_prefix;
        var uri = encodeURI("http://web.phenologit.org/uploadMedia.php"); //url of the server's php upload file
        var up_options = {
            fileKey: 'bill',
            fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
            headers: headers,
            mimeType: "text/plain",
            params: params
        };
        var params = {
            'prefix': prefix,
            'isAvatar': 'true'
        };
        up_options.params = params;
        var headers = { 'prefix': prefix, 'isAvatar': 'true' };
        up_options.headers = headers;
        var ft = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */]();
        var fileTransfer = this.transfer.create();
        var uri = encodeURI("http://web.phenologit.org/uploadMedia.php");
        fileTransfer.upload(fileURL, uri, up_options).then(function (data) {
            console.log(data);
        });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" ></ion-icon>\n    </button>\n  <ion-title>Profile</ion-title>\n</ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="profile">\n\n  <section class="profileSection">\n  \n  </section>\n\n  <div *ngIf="imageChanged==0" class="profilePicture" (click)="changeProfilePicture()" [ngStyle]="{\'background-image\':\'url(http://web.phenologit.org/uploads/avatar/\'+user.picture+\')\',\'background-position\':\'50%\',\n  \'background-size\':\'cover\'}">\n    <div></div>\n  </div>\n\n  <div *ngIf="imageChanged==1" class="profilePicture" (click)="changeProfilePicture()" [ngStyle]="{\'background-image\':\'url(\'+imageToUpload.media_url+\')\',\'background-position\':\'50%\',\n  \'background-size\':\'cover\'}">\n    <div></div>\n  </div>\n\n  <div class="profileName">{{user.name}}</div>\n  <div class="profileUsername">{{user.username}}</div>\n\n  <ion-card>\n\n    <ion-card-header>\n      Settings\n    </ion-card-header>\n\n    <ion-card-content>\n        <ion-item>\n        <ion-label>Language</ion-label>\n        <ion-select [(ngModel)]="user.lang">\n          <ion-option value="en" checked="true">English</ion-option>\n          <ion-option value="es">Español</ion-option>\n          <ion-option value="gl">Galego</ion-option>\n          <ion-option value="lt">Lietuvių</ion-option>\n          <ion-option value="dk">Dansk</ion-option>\n        </ion-select>\n        \n      </ion-item>\n      <ion-item>\n          <ion-label fixed>Name</ion-label>\n        <ion-input type="text" placeholder="{{user.name}}" [(ngModel)]="user.name"></ion-input>\n      </ion-item>\n       <ion-item>\n        <ion-label fixed>Password</ion-label>\n        <ion-input type="password" placeholder="******" [(ngModel)]="user.passwd"></ion-input>\n      </ion-item>\n\n      <button ion-button full color=\'primary\' (click)="saveSettings()">Save</button>\n    </ion-card-content>\n\n  </ion-card>\n  \n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/profile/profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_4__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=3.js.map