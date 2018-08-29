webpackJsonp([10],{

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
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
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, phenoApi, nativeStorage, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.nativeStorage = nativeStorage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.loginUser = {};
        this.logout = this.navParams.get('logout');
        if (this.logout == true) {
            this.logoutUser();
        }
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        this.destination = this.navParams.get('destination');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.phenoApi.login(this.loginUser).subscribe(function (data) { _this.loginData = data; }, function (err) { return console.error(err); }, function () {
            if (_this.loginData.token != 'null') {
                _this.saveUserAndRedirect(_this.loginData[0]);
            }
            else {
                _this.presentAlert('Error!', 'Username or password incorrect!');
            }
        });
    };
    LoginPage.prototype.presentAlert = function (msg, subTitle) {
        var alert = this.alertCtrl.create({
            title: msg,
            subTitle: subTitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage.prototype.saveUserAndRedirect = function (data) {
        var _this = this;
        console.log(data);
        this.nativeStorage.setItem('user', {
            username: data.username,
            name: data.name,
            lang: data.lang,
            picture: data.picture,
            id: data.userid,
            school: data.school,
            type: data.type,
            email: data.email
        }).then(function () {
            console.log('Stored item!'),
                _this.events.publish('user:login'); //publish the login event
        }, function (error) { return console.error('Error storing item', error); });
        console.log("sending to " + this.destination);
        if (this.destination == undefined) {
            this.navCtrl.setRoot('ObservationListPage');
        }
        else {
            this.navCtrl.setRoot(this.destination);
        }
    };
    //do the logout
    LoginPage.prototype.logoutUser = function () {
        var _this = this;
        this.nativeStorage.setItem('user', {
            username: null,
            name: null,
            lang: 'en',
            picture: null,
            id: null,
            school: null,
            type: null,
            email: null,
        }).then(function () {
            console.log('deleted item!'),
                _this.events.publish('user:logout'); //publish the logout event
        }, function (error) { return console.error('Error storing item', error); });
    };
    LoginPage.prototype.rememberPassword = function () {
        this.navCtrl.push('RememberPasswordPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <p>Insert your details below to log in our platform.</p>\n  \n    <form id=\'form\' (ngSubmit)="login()">\n        \n          <ion-item>\n            <ion-label stacked>Username</ion-label>\n            <ion-input type="text" autocapitalize="off" [(ngModel)]="loginUser.username" name="username"></ion-input>\n          </ion-item>\n        \n          <ion-item>\n            <ion-label stacked>Password</ion-label>\n            <ion-input type="password" [(ngModel)]="loginUser.passwd" name="password"></ion-input>\n          </ion-item>\n        \n          <button ion-button color=\'primary\' (click)="login()">Login</button>\n        \n        </form>\n\n  <p class="rememberPassword" (click)="rememberPassword()">Remember password</p>\n\n  <section id="signup">\n    <p>If you are interested in participating in this project, please contact us in <b>e-learning@cesga.es</b></p>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=10.js.map