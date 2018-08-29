webpackJsonp([5],{

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservationPageModule", function() { return ObservationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observation__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ObservationPageModule = (function () {
    function ObservationPageModule() {
    }
    return ObservationPageModule;
}());
ObservationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__observation__["a" /* ObservationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__observation__["a" /* ObservationPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]]
                }
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__observation__["a" /* ObservationPage */]
        ]
    })
], ObservationPageModule);

//# sourceMappingURL=observation.module.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(214);
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
 * Generated class for the ObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ObservationPage = ObservationPage_1 = (function () {
    function ObservationPage(navCtrl, navParams, nativeStorage, phenoApi, translate, socialSharing, toastCtrl, actionSheetCtrl, alertCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.phenoApi = phenoApi;
        this.translate = translate;
        this.socialSharing = socialSharing;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.user = {
            type: 3
        };
        this.observationId = this.navParams.get('id'); //getting the observatin id parameter
        this.observation = {};
        this.isEditting = false;
        this.comments = [];
        this.lang = 'en';
        this.translate.setDefaultLang(this.lang);
        this.translate.get('ERROR').subscribe(function (value) {
            // value is our translated string
            console.log("wheather status " + value);
        });
    }
    ObservationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ObservationPage ' + this.observationId);
        this.getObservationDetails();
        this.getUserFromStorage();
        this.user.type = 3; //3 by default
    };
    ObservationPage.prototype.getUserFromStorage = function () {
        var _this = this;
        // console.log("getting user from storage");
        this.nativeStorage.getItem('user')
            .then(function (data) {
            console.log(data),
                _this.user = data;
        }, function (error) { return console.error(error); });
    };
    ObservationPage.prototype.getObservationDetails = function () {
        var _this = this;
        console.log("getting observation details from API!");
        this.phenoApi.getObservationDetails(this.observationId, 'null').subscribe(function (data) { _this.observation = data[0]; }, function (err) { return console.error(err); }, function () { _this.showObservationDetails(), _this.getObservationComments(); });
    };
    ObservationPage.prototype.showObservationDetails = function () {
        console.log(this.observation);
    };
    ObservationPage.prototype.getObservationComments = function () {
        var _this = this;
        console.log("getting observation comments from API!");
        this.phenoApi.getObservationComments(this.observationId).subscribe(function (data) { _this.comments = data.comments, _this.observation.comments = data.count; }, function (err) { return console.error(err); }, function () { return console.log(_this.comments); });
    };
    ObservationPage.prototype.openShareDialog = function (message, subject, file, url) {
        this.socialSharing.share(message, subject, file, url);
    };
    //view observation in map
    ObservationPage.prototype.viewInMap = function () {
        this.navCtrl.push('ObservationMapPage', { observation: this.navParams.get('id') });
    };
    //like observation
    ObservationPage.prototype.liked = function () {
        var _this = this;
        console.log("liked!");
        if (this.user.id == 'null' || this.user.id == undefined) {
            this.navCtrl.push('LoginPage', { destination: ObservationPage_1, id: this.navParams.get('id') });
        }
        else {
            var like = {
                iduser: parseInt(this.user.id),
                idobservation: this.navParams.get('id'),
            };
            this.phenoApi.postLike(like).subscribe(//post comment trought api
            function (//post comment trought api
                data) { _this.observation.likes = data.likes, _this.observation.userLikes = data.liked; }, function (err) { return console.error(err); }, function () { return _this.getObservationComments(); } //refresh the comments
            );
        }
    };
    ObservationPage.prototype.sendComment = function () {
        var _this = this;
        this.nativeStorage.getItem('user').then(function (user) {
            if (user.id == 'null' || user.id == undefined) {
                _this.navCtrl.push('LoginPage', { destination: ObservationPage_1, id: _this.navParams.get('id') });
            }
            else {
                if (_this.message != "") {
                    var sentcomment = {
                        iduser: parseInt(user.id),
                        idobservation: _this.navParams.get('id'),
                        comment: _this.message
                    };
                    _this.phenoApi.postComment(sentcomment).subscribe(//post comment trought api
                    function (//post comment trought api
                        data) { _this.response = data; }, function (err) { return console.error(err); }, function () { return _this.getObservationComments(); } //refresh the comments
                    );
                    _this.content.scrollToBottom(); //scroll to bottom
                    _this.message = null; //clears the input
                }
                var toast = _this.toastCtrl.create({
                    message: 'Comment was added successfully',
                    duration: 2000
                });
                toast.present();
            }
        });
    };
    ObservationPage.prototype.showActions = function () {
        switch (this.user.type) {
            case 1:
                this.showActionsForAdmins();
                break;
            case 2:
                this.showActionsForTeacher();
                break;
        }
    };
    ObservationPage.prototype.showActionsForTeacher = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Actions for teachers',
            buttons: [
                {
                    text: 'Validate',
                    icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
                    handler: function () {
                        console.log('Validate clicked');
                        _this.validateObservation(_this.observationId);
                    }
                },
                {
                    text: 'Best example',
                    icon: !this.platform.is('ios') ? 'ribbon' : null,
                    handler: function () {
                        console.log('best example clicked');
                        _this.bestExample(_this.observationId);
                    }
                },
                {
                    text: 'Remove',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('remove clicked');
                        _this.deleteObservation(_this.observationId, _this.userId);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ObservationPage.prototype.showActionsForAdmins = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Actions for Admins',
            buttons: [
                {
                    text: 'Validate',
                    icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
                    handler: function () {
                        console.log('Validate clicked');
                        _this.validateObservation(_this.observationId);
                    }
                },
                {
                    text: 'Best example',
                    icon: !this.platform.is('ios') ? 'ribbon' : null,
                    handler: function () {
                        console.log('Best example clicked');
                        _this.bestExample(_this.observationId);
                    }
                },
                {
                    text: 'Delete',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    role: 'destructive',
                    handler: function () {
                        _this.deleteObservation(_this.observationId, _this.userId);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ObservationPage.prototype.deleteObservation = function (id, iduser) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete observation',
            message: 'Are you sure to delete this observation?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        console.log('Delete clicked');
                        _this.phenoApi.deleteObservation(id, iduser).subscribe(function (data) { }, function (err) { return console.log(err); }, function () { return _this.navCtrl.setRoot('ObservationListPage'); });
                    }
                }
            ]
        });
        confirm.present();
    };
    //delete comment
    ObservationPage.prototype.deleteComment = function (id) {
        var _this = this;
        console.log("deleting comment " + id);
        this.phenoApi.deleteComment(id).subscribe(//post comment trought api
        function (//post comment trought api
            data) {
            _this.comments = data.comments,
                _this.observation.comments = data.count;
        }, function (err) { return console.log(err); }, function () { return _this.getObservationComments(); } //refresh the comments
        );
    };
    //mark as best example
    ObservationPage.prototype.bestExample = function (id) {
        var _this = this;
        if (this.user.id == 'null' || this.user.id == undefined) {
            this.navCtrl.push('LoginPage', { destination: ObservationPage_1, id: this.navParams.get('id') });
        }
        else {
            var best_example = {
                iduser: parseInt(this.user.id),
                idobservation: this.navParams.get('id'),
            };
            this.phenoApi.postBestExample(best_example).subscribe(function (data) { }, function (err) { return console.error(err); }, function () {
                _this.observation.bestexample = 1;
                var toast = _this.toastCtrl.create({
                    message: 'Observation marked as best example',
                    duration: 2000
                });
                toast.present();
            });
        }
    };
    //validate observation
    ObservationPage.prototype.validateObservation = function (id) {
        var _this = this;
        console.log("validated! " + id);
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data;
            console.log(data);
            if (_this.user.id == 'null' || _this.user.id == undefined) {
                console.log("not validated...");
                _this.navCtrl.push('LoginPage', { destination: ObservationPage_1, id: _this.navParams.get('id') });
            }
            else {
                console.log("validating...");
                var validation = {
                    iduser: parseInt(_this.user.id),
                    idobservation: _this.navParams.get('id'),
                };
                _this.phenoApi.postValidation(validation).subscribe(//post comment trought api
                function (//post comment trought api
                    data) {
                    _this.observation.validations = data.validations,
                        _this.observation.userValidates = data.userValidates;
                }, function (err) { return console.log(err); }, function () { return console.log(_this.observation); } //refresh the comments
                );
            }
        }, function (error) { return console.error(error); });
    };
    return ObservationPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], ObservationPage.prototype, "content", void 0);
ObservationPage = ObservationPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-observation',template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/pages/observation/observation.html"*/'<!--\n  Generated template for the ObservationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{observation.title}}</ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="showActions(observation.id)" *ngIf="user.type==1 || user.type==2" >\n            <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="observation-page">\n\n  <ion-card class="observationCard">\n\n    <ion-item>\n      <ion-avatar item-left>\n        <img src="http://web.phenologit.org/uploads/avatar/{{observation.user_picture}}">\n      </ion-avatar>\n      <h2>{{observation.user_name}}</h2>\n      <p>{{observation.time}}</p>\n      <ion-icon class="iconHeader" (click)="viewInMap(observation.id)" name="map" item-right></ion-icon>\n      <!-- only show actions for admins and teachers -->\n      \n    </ion-item>\n\n    <!--<img class="observationMedia" src="http://calpurnia.xaora.com/uploads/{{observation.media}}">-->\n    \n    <ion-slides #slider_ob pager class="observationMedia" (change)="onSlideChanged()">\n\n      <ion-slide *ngFor="let media of observation.media">\n        <img *ngIf="isEnd==false" class="swipeIcon" src="img/swipe.png" alt="">\n        <img *ngIf="isBeginning==false" class="swipeIconPrevious" src="img/swipePrevious.png" alt="">\n        <img *ngIf="media.media_type==\'picture\'" class="observationMedia" src="http://web.phenologit.org/uploads/{{media.media_url}}">\n        <video *ngIf="media.media_type==\'video\'" controls poster="img/videoPoster.jpg" onclick="this.play();">\n          <source src="http://web.phenologit.org/uploads/{{media.media_url}}" type="video/mp4">\n        </video>\n      </ion-slide>\n    \n      <ion-badge *ngIf="observation.validations>0" color="primary" item-right>{{observation.validations}} Validations</ion-badge>\n      <ion-badge *ngIf="!observation.validations>0" item-right class="notvalidated">Not validated</ion-badge>\n      <div *ngIf="observation.bestexample==1" class="bestexample" >\n        <img src="assets/img/best_example.png" alt="">\n      </div>\n\n    </ion-slides>\n\n    <ion-card-content>\n      <p>\n        <ion-badge *ngIf="lang==\'en\'">{{observation.specie_en}} > {{observation.stage_en}}</ion-badge>\n        <ion-badge *ngIf="lang==\'es\'">{{observation.specie_es}} > {{observation.stage_es}}</ion-badge>\n        <ion-badge *ngIf="lang==\'gl\'">{{observation.specie_gl}} > {{observation.stage_gl}}</ion-badge>\n        <ion-badge *ngIf="lang==\'dk\'">{{observation.specie_dk}} > {{observation.stage_dk}}</ion-badge>\n        <ion-badge *ngIf="lang==\'lt\'">{{observation.specie_lt}} > {{observation.stage_lt}}</ion-badge>\n      </p>\n      <br>  \n      <h4 *ngIf="isEditting==false" color="primary" focus>{{observation.title}}</h4>\n      <h4 *ngIf="isEditting==true" color="primary"><ion-input class="editInput" value="{{observation.title}}" [(ngModel)]="inputTitle" #editTitle (blur)="editObservation()"></ion-input></h4>\n    <p *ngIf="isEditting==false">{{observation.description}}</p>\n    <p *ngIf="isEditting==true"><ion-textarea class="editInput" [(ngModel)]="inputDescription" value="{{observation.description}}" (blur)="editObservation()" placeholder="Description"></ion-textarea></p>\n    <section class="observationInfo">\n\n      <h4>{{\'WEATHER_STATUS\'| translate}}</h4>\n\n      <ion-list >\n        \n        <ion-item>\n          <ion-icon *ngIf="observation.w_state == \'Clouds\'" name="cloudy" item-left></ion-icon>\n          <ion-icon *ngIf="observation.w_state == \'Mist\'" name="cloudy" item-left></ion-icon>\n          <ion-icon *ngIf="observation.w_state == \'Rain\'" name="rainy" item-left></ion-icon>\n          <ion-icon *ngIf="observation.w_state == \'Drizzle\'" name="cloudy" item-left></ion-icon>\n          <ion-icon *ngIf="observation.w_state == \'Clear\'" name="sunny" item-left></ion-icon>\n          <ion-icon *ngIf="observation.w_state == \'Fog\'" name="cloudy" item-left></ion-icon>  \n            {{\'SKY_STATUS\'| translate}}: <span>{{observation.w_state}}</span>\n        </ion-item>\n        <ion-item>\n          <ion-icon name="thermometer" item-left></ion-icon>\n            {{\'TEMPERATURE\'| translate}}: <span>{{observation.w_temperature}} ºC</span>\n        </ion-item>\n        <ion-item>\n          <ion-icon name="water" item-left></ion-icon>\n            {{\'HUMIDITY\'| translate}}: <span>{{observation.w_humidity}}%</span>\n        </ion-item>\n        <ion-item>\n          <ion-icon name="information-circle" item-left></ion-icon>\n            {{\'PRESSURE\'| translate}}: <span>{{observation.w_pressure}} Pa</span>\n        </ion-item>\n\n      </ion-list>\n\n    </section>\n   \n    </ion-card-content>\n\n    <ion-item>\n      <button ion-button *ngIf="observation.userLikes==0" dark clear item-left (click)="liked()">\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>{{observation.likes}} {{\'LIKES\'| translate}}</div>\n      </button>\n\n      <button ion-button *ngIf="observation.userLikes==1" clear item-left (click)="liked()">\n        <ion-icon name="thumbs-up"></ion-icon>\n        <div>{{observation.likes}} {{\'LIKES\'| translate}}</div>\n      </button>\n      \n      <button color="primary" ion-button clear item-left (click)="openShareDialog(observation.description, observation.title, null, \'http://web.phenologit.org/?id=\'+observation.id+\' @phenologitorg #phenoloGIT\' )">\n        <ion-icon name="share"></ion-icon>\n        <div>{{observation.share}} {{\'SHARE\'| translate}}</div>\n      </button>\n    \n    </ion-item>\n  </ion-card>\n\n  <ion-list padding class="comments" *ngIf="observation.comments != 0">\n    <ion-list-header>\n      {{observation.comments}} {{\'COMENTS\'| translate}}\n    </ion-list-header>\n    \n    <section *ngFor="let comment of comments">\n      <ion-item *ngIf="comment.comment" class="comment" >\n        <ion-avatar item-left>\n          <img src="http://web.phenologit.org/uploads/avatar/{{comment.userpicture}}">\n        </ion-avatar>\n        <h2>{{comment.username}}</h2>\n        <p>{{comment.comment}}</p>\n        <ion-icon *ngIf="user.type==1 || user.type==2"item-right color=\'danger\' name="remove-circle" (click)="deleteComment(comment.id)"></ion-icon>\n      </ion-item>\n    </section>\n    \n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  \n    <ion-toolbar position="bottom">\n      <ion-input type="text" placeholder="{{TYPE_COMMENT}}" [(ngModel)]="message"></ion-input>\n      <ion-buttons end>\n        <button ion-button (click)=\'sendComment()\'>\n          {{\'SEND\'| translate}}\n          <ion-icon name="send"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-toolbar>\n  \n  </ion-footer>\n'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/pages/observation/observation.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_5__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
], ObservationPage);

var ObservationPage_1;
//# sourceMappingURL=observation.js.map

/***/ })

});
//# sourceMappingURL=5.js.map