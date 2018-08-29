webpackJsonp([9],{

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationsPageModule = (function () {
    function NotificationsPageModule() {
    }
    return NotificationsPageModule;
}());
NotificationsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */]),
        ],
    })
], NotificationsPageModule);

//# sourceMappingURL=notifications.module.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
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
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams, phenoApi, alertCtrl, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phenoApi = phenoApi;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.notifications = [];
        this.notifications.error = '1';
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad NotificationsPage');
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data;
            console.log('user stored-> ' + JSON.stringify(data));
            _this.getNotifications(_this.user.id);
        }, function (error) { return console.error(error); });
    };
    NotificationsPage.prototype.getNotifications = function (iduser) {
        var _this = this;
        this.phenoApi.getNotifications(iduser).subscribe(function (data) { _this.notifications = data; }, function (err) { return console.log(err); }, function () { return console.log(_this.notifications); });
    };
    NotificationsPage.prototype.openObservationPage = function (notification) {
        this.markAsRead(notification);
        this.navCtrl.push('ObservationPage', { id: notification.idobservation });
    };
    NotificationsPage.prototype.markAsRead = function (notification) {
        var _this = this;
        console.log('marking:');
        console.log(notification);
        this.phenoApi.markNotificationAsRead(notification).subscribe(function (data) { _this.notifications = data; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
    };
    NotificationsPage.prototype.markAllAsRead = function () {
        var _this = this;
        console.log('marking all for user ' + this.user.id);
        var alert = this.alertCtrl.create({
            title: 'Mark all as read',
            buttons: [
                {
                    text: 'yes',
                    handler: function () {
                        _this.phenoApi.markAllAsRead(_this.user.id).subscribe(function (data) { _this.notifications = data; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
                    }
                },
                {
                    text: 'no',
                    handler: function () {
                        console.log('cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    return NotificationsPage;
}());
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-notifications',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/notifications/notifications.html"*/'<!--\n  Generated template for the NotificationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color=primary>\n    <ion-title>Notifications</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="markAllAsRead()">\n        <ion-icon name="trash"></ion-icon>\n      </button>\n    </ion-buttons>\n     </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="noresults" *ngIf="notifications.error==\'1\'">\n    <ion-badge light>You have no notifications.</ion-badge>\n  </div>\n\n  <ion-list *ngIf="!notifications.error==\'1\'">\n    <ion-item-sliding *ngFor="let notification of notifications">\n      \n      <ion-item (click)="openObservationPage(notification)">\n        <ion-avatar item-left>\n          <img src="http://web.phenologit.org/uploads/avatar/{{notification.userfrompicture}}">\n        </ion-avatar>\n        <p class=\'userfrom\'>{{notification.userfromname}}</p>\n        <p>{{notification.text}}</p>\n        <ion-note class="date" item-right>\n        {{notification.date}}\n        </ion-note>\n      </ion-item>\n  \n      <ion-item-options side="left">\n        <button primary (click)="markAsRead(notification)">\n          <ion-icon name="delete"></ion-icon>\n          {{MARK_AS_READ}}\n        </button>\n      </ion-item-options>\n  \n    </ion-item-sliding>\n  </ion-list>\n    \n</ion-content>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/notifications/notifications.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ })

});
//# sourceMappingURL=9.js.map