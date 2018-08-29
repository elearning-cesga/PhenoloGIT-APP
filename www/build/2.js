webpackJsonp([2],{

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RememberPasswordPageModule", function() { return RememberPasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__remember_password__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RememberPasswordPageModule = (function () {
    function RememberPasswordPageModule() {
    }
    return RememberPasswordPageModule;
}());
RememberPasswordPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__remember_password__["a" /* RememberPasswordPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__remember_password__["a" /* RememberPasswordPage */]),
        ],
    })
], RememberPasswordPageModule);

//# sourceMappingURL=remember-password.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RememberPasswordPage; });
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
 * Generated class for the RememberPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RememberPasswordPage = (function () {
    function RememberPasswordPage(navCtrl, alertCtrl, navParams, phenoApi) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
    }
    RememberPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RememberPasswordPage');
    };
    RememberPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.phenoApi.resetPassword(this.recoveryEmail).subscribe(function (data) { _this.data = data; }, function (err) { return console.error(err); }, function () {
            if (_this.data.errors != 'null') {
                switch (_this.data.errors) {
                    case '1':
                        _this.presentAlert('Error!', 'This email does not exists in our database!');
                        break;
                    case '2':
                        _this.presentAlert('Error!', 'This email was used to register a group account. Please contact with your teacher in order to change the password');
                        break;
                }
            }
            else {
                _this.presentAlert('Password reset', 'Your password was reset succesfully. Please check your email to view the new details of your account.');
                console.log('password changed for ' + _this.recoveryEmail + ' to ' + _this.data.newPassword);
                _this.navCtrl.push('LoginPage');
            }
        });
    };
    RememberPasswordPage.prototype.presentAlert = function (msg, subTitle) {
        var alert = this.alertCtrl.create({
            title: msg,
            subTitle: subTitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    return RememberPasswordPage;
}());
RememberPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-remember-password',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/remember-password/remember-password.html"*/'<!--\n  Generated template for the RememberPasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color=primary>\n    <ion-title>Password recovery</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <p>Insert your email address in the field below to receive the details of your account</p>\n\n  <section id=\'form\'>\n      <ion-item>\n          <ion-label stacked>Email</ion-label>\n          <ion-input type="email" value="" [(ngModel)]="recoveryEmail"></ion-input>\n      </ion-item>\n    \n      <button ion-button color=\'primary\' (click)="resetPassword()">Reset password</button>\n  \n    </section>\n  \n    <section id="signup">\n      <p>If you are interested in participating in this project, please contact us in <b>e-learning@cesga.es</b></p>\n    </section>\n\n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/remember-password/remember-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_pheno_api_pheno_api__["a" /* PhenoApi */]])
], RememberPasswordPage);

//# sourceMappingURL=remember-password.js.map

/***/ })

});
//# sourceMappingURL=2.js.map