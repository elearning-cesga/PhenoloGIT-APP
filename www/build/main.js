webpackJsonp([16],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhenoApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the PhenoApi provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PhenoApi = (function () {
    function PhenoApi(http) {
        this.http = http;
        this.http = http;
        this.data = null;
        this.token = null;
        //API Calls
        this.API = {
            //'getObservations':'http://api.phenologit.org/index.php/observation', deprecated!!
            'getObservations': 'http://api.phenologit.org/index.php/observation',
            'getObservationsFiltered': 'http://api.phenologit.org/index.php/observation/filter/',
            'getAllObservations': 'http://api.phenologit.org/index.php/observation',
            'getUsers': 'http://api.phenologit.org/index.php/user',
            'updateUser': 'http://api.phenologit.org/index.php/user',
            'login': 'http://api.phenologit.org/index.php/user/login',
            'logout': 'http://api.phenologit.org/index.php/user/logout',
            'getUserDetails': 'http://api.phenologit.org/index.php/user/',
            'getObservationDetails': 'http://api.phenologit.org/index.php/observation/',
            'postObservation': 'http://api.phenologit.org/index.php/observation',
            'deleteObservation': 'http://api.phenologit.org/index.php/observation/',
            'getObservationComments': 'http://api.phenologit.org/index.php/comment/',
            'postComment': 'http://api.phenologit.org/index.php/comment',
            'postLike': 'http://api.phenologit.org/index.php/like',
            'postBestExample': 'http://api.phenologit.org/index.php/bestexample',
            'postValidation': 'http://api.phenologit.org/index.php/validation',
            'deleteComment': 'http://api.phenologit.org/index.php/comment/',
            'getSpecies': 'http://api.phenologit.org/index.php/specie',
            'postLog': 'http://api.phenologit.org/index.php/log',
            'getNotifications': 'http://api.phenologit.org/index.php/notification/',
            'markNotificationAsRead': 'http://api.phenologit.org/index.php/notification/read',
            'markAllAsRead': 'http://api.phenologit.org/index.php/notification/read/all',
            'postWatsonMessage': 'http://api.phenologit.org/index.php/watson',
            'getStages': 'http://api.phenologit.org/index.php/stage',
            'getSchools': 'http://api.phenologit.org/index.php/school',
            'resetPassword': 'http://api.phenologit.org/index.php/user/password',
        };
    }
    PhenoApi.prototype.getObservations = function (filter, limit, school, user) {
        console.log("recibo " + filter + " - " + limit);
        return this.data = this.http.get(this.API.getObservations + "/filter/" + filter + "/school/" + school + "/user/" + user + "/limit/" + limit)
            .timeout(10000)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getAllObservations = function () {
        return this.data = this.http.get(this.API.getAllObservations).map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getObservationsByLikes = function (filter, limit) {
        console.log("recibo likes " + filter + " - " + limit);
        return this.data = this.http.get(this.API.getObservations + "/filter/" + filter + "/limit/" + limit + "/likes")
            .map(function (res) { return res.json(); });
    };
    // getObservationsByLikes(filter,limit){
    //   return this.data=this.http.get(this.API.getObservations+'/likes')
    //   .map(res => res.json());
    // }
    PhenoApi.prototype.getObservationsByValidations = function (filter, limit) {
        return this.data = this.http.get(this.API.getObservations + "/filter/" + filter + "/limit/" + limit + "/validations")
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getObservationsByComments = function (filter, limit) {
        return this.data = this.http.get(this.API.getObservations + "/filter/" + filter + "/limit/" + limit + "/comments")
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postObservation = function (observation) {
        return this.data = this.http.post(this.API.postObservation, JSON.stringify(observation))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.editObservation = function (observation, userid) {
        return this.data = this.http.put(this.API.postObservation + "/" + parseInt(userid) + "/" + observation.id, JSON.stringify(observation))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.login = function (user) {
        console.log(user);
        return this.data = this.http.post(this.API.login, JSON.stringify(user))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.logout = function (iduser, idtoken) {
        var logoutUser;
        logoutUser.iduser = iduser;
        logoutUser.idtoken = idtoken;
        return this.data = this.http.post(this.API.logout, JSON.stringify(logoutUser))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getUsers = function () {
        return this.data = this.http.get(this.API.getUsers)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getUserDetails = function (id) {
        return this.data = this.http.get(this.API.getUserDetails + id)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.updateUser = function (user) {
        return this.data = this.http.put(this.API.updateUser, JSON.stringify(user))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getObservationDetails = function (id, currentUser) {
        return this.data = this.http.get(this.API.getObservationDetails + id + '/' + currentUser)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.deleteObservation = function (id, iduser) {
        return this.data = this.http.delete(this.API.deleteObservation + id + '/' + iduser)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getObservationComments = function (id) {
        return this.data = this.http.get(this.API.getObservationComments + id)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postComment = function (comment) {
        return this.data = this.http.post(this.API.postComment, JSON.stringify(comment))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.deleteComment = function (id) {
        return this.data = this.http.delete(this.API.deleteComment + id)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postLike = function (like) {
        return this.data = this.http.post(this.API.postLike, JSON.stringify(like))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postBestExample = function (bestexample) {
        return this.data = this.http.post(this.API.postBestExample, JSON.stringify(bestexample))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postValidation = function (validation) {
        return this.data = this.http.post(this.API.postValidation, JSON.stringify(validation))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getSpecies = function () {
        return this.data = this.http.get(this.API.getSpecies)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getSpecieDetails = function (id) {
        return this.data = this.http.get(this.API.getSpecies + '/' + id)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getStageDetails = function (specie, stage) {
        return this.data = this.http.get(this.API.getStage + '/' + specie + '/' + stage)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.postLog = function (log) {
        return this.data = this.http.post(this.API.postLog, JSON.stringify(log))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getNotifications = function (iduser) {
        return this.data = this.http.get(this.API.getNotifications + iduser)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.markNotificationAsRead = function (id) {
        return this.data = this.http.put(this.API.markNotificationAsRead, JSON.stringify(id))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.markAllAsRead = function (iduser) {
        var user = { iduser: iduser };
        console.log("vou");
        return this.data = this.http.put(this.API.markAllAsRead, JSON.stringify(user))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.sendWatsonMessage = function (message) {
        console.log(JSON.stringify(message));
        return this.data = this.http.post(this.API.postWatsonMessage, JSON.stringify(message))
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getStages = function () {
        return this.data = this.http.get(this.API.getStages)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.getSchools = function () {
        return this.data = this.http.get(this.API.getSchools)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.checkConnection = function () {
        return this.data = this.http.get(this.API.getSchools)
            .map(function (res) { return res.json(); });
    };
    PhenoApi.prototype.resetPassword = function (user) {
        var data = {
            'email': user
        };
        return this.data = this.http.put(this.API.resetPassword, JSON.stringify(data))
            .map(function (res) { return res.json(); });
    };
    return PhenoApi;
}());
PhenoApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], PhenoApi);

//# sourceMappingURL=pheno-api.js.map

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 124;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-observation-details/add-observation-details.module": [
		306,
		15
	],
	"../pages/add-observation-map/add-observation-map.module": [
		307,
		1
	],
	"../pages/add-observation-media/add-observation-media.module": [
		308,
		14
	],
	"../pages/add-observation-specie/specie.module": [
		309,
		13
	],
	"../pages/add-observation-stages/add-observation-stages.module": [
		310,
		12
	],
	"../pages/add-observation/add-observation.module": [
		305,
		11
	],
	"../pages/login/login.module": [
		311,
		10
	],
	"../pages/notifications/notifications.module": [
		312,
		9
	],
	"../pages/observation-list/observation-list.module": [
		314,
		8
	],
	"../pages/observation-map/observation-map.module": [
		315,
		0
	],
	"../pages/observation-school-filter/observation-school-filter.module": [
		316,
		7
	],
	"../pages/observation-specie-filter/observation-specie-filter.module": [
		317,
		6
	],
	"../pages/observation/observation.module": [
		313,
		5
	],
	"../pages/offline-observations/offline-observations.module": [
		318,
		4
	],
	"../pages/profile/profile.module": [
		319,
		3
	],
	"../pages/remember-password/remember-password.module": [
		320,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 166;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpenWeatherProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the OpenWeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var OpenWeatherProvider = (function () {
    function OpenWeatherProvider(http) {
        this.http = http;
        console.log('Hello OpenWeatherProvider Provider');
    }
    OpenWeatherProvider.prototype.getWeatherForLocation = function (lat, lng) {
        return this.data = this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=ff05ae539e40bdadc39b25ca78e11419&units=metric&type=accuracy')
            .map(function (res) { return res.json(); });
    };
    return OpenWeatherProvider;
}());
OpenWeatherProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], OpenWeatherProvider);

//# sourceMappingURL=open-weather.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_pheno_api_pheno_api__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_open_weather_open_weather__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-observation/add-observation.module#AddObservationPageModule', name: 'AddObservationPage', segment: 'add-observation', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/add-observation-details/add-observation-details.module#AddObservationDetailsPageModule', name: 'AddObservationDetailsPage', segment: 'add-observation-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/add-observation-map/add-observation-map.module#AddObservationMapPageModule', name: 'AddObservationMapPage', segment: 'add-observation-map', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/add-observation-media/add-observation-media.module#AddObservationMediaPageModule', name: 'AddObservationMediaPage', segment: 'add-observation-media', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/add-observation-specie/specie.module#SpeciePageModule', name: 'SpeciePage', segment: 'specie', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/add-observation-stages/add-observation-stages.module#AddObservationStagesPageModule', name: 'AddObservationStagesPage', segment: 'add-observation-stages', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/observation/observation.module#ObservationPageModule', name: 'ObservationPage', segment: 'observation', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/observation-list/observation-list.module#ObservationListPageModule', name: 'ObservationListPage', segment: 'observation-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/observation-map/observation-map.module#ObservationMapPageModule', name: 'ObservationMapPage', segment: 'observation-map', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/observation-school-filter/observation-school-filter.module#ObservationSchoolFilterPageModule', name: 'ObservationSchoolFilterPage', segment: 'observation-school-filter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/observation-specie-filter/observation-specie-filter.module#ObservationSpecieFilterPageModule', name: 'ObservationSpecieFilterPage', segment: 'observation-specie-filter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/offline-observations/offline-observations.module#OfflineObservationsPageModule', name: 'OfflineObservationsPage', segment: 'offline-observations', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/remember-password/remember-password.module#RememberPasswordPageModule', name: 'RememberPasswordPage', segment: 'remember-password', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_18__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_19__providers_open_weather_open_weather__["a" /* OpenWeatherProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__["a" /* SQLite */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_pheno_api_pheno_api__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, nativeStorage, events, phenoApi, network, sqlite, transfer, file) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.nativeStorage = nativeStorage;
        this.events = events;
        this.phenoApi = phenoApi;
        this.network = network;
        this.sqlite = sqlite;
        this.transfer = transfer;
        this.file = file;
        this.rootPage = 'ObservationListPage';
        this.user = {};
        this.notifications = 0;
        this.networkStatus = 1;
        this.initializeApp();
    }
    MyApp.prototype.checkNotifications = function () {
        var _this = this;
        this.phenoApi.getNotifications(this.user.id).subscribe(function (data) { _this.notifications = data; }, function (err) { return console.log(err); }, function () {
            _this.events.publish('notificationsCount', _this.notifications.length);
        });
        //console.log('checking notifications...')
    };
    MyApp.prototype.getUserFromStorage = function () {
        var _this = this;
        console.log("getting user from storage");
        this.nativeStorage.getItem('user')
            .then(function (data) {
            _this.user = data,
                console.log(data);
        }, function (error) { return console.error(error); });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.backgroundColorByHexString('#689F38');
            _this.splashScreen.hide();
            // watch network for a disconnection and throw event
            var disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                _this.events.publish('network:disconnected');
                _this.networkStatus = 0;
            });
            // watch network for a reconnection and throw event
            var connectSubscription = _this.network.onConnect().subscribe(function () {
                _this.events.publish('network:connected');
                _this.networkStatus = 1;
            });
            //page notifications
            _this.notificationsPage = {
                component: 'NotificationsPage',
                openmethod: 'push'
            };
            //page profile
            _this.profilePage = {
                component: 'ProfilePage',
                openmethod: 'push'
            };
            //saves data in the device for using the app in offline mode
            _this.getDataToStoreOffline();
            //checks if there are any observations pending
            _this.checkForOfflineObservations();
            // used for an example of ngFor and navigation
            _this.pages = [
                { icon: 'list-box', title: 'List Observation', component: 'ObservationListPage', parameters: 'null' },
                { icon: 'map', title: 'Map of observations', component: 'ObservationMapPage', parameters: 'null' },
                { icon: 'pricetags', title: 'Observations by specie', component: 'ObservationSpecieFilterPage', parameters: 'null' },
                { icon: 'school', title: 'Observations by school', component: 'ObservationSchoolFilterPage', parameters: 'null' },
                { icon: 'add-circle', title: 'Add new observation', component: 'AddObservationPage', parameters: 'null' },
                { icon: 'contact', title: 'Profile - Settings', component: 'ProfilePage', parameters: 'null' },
                { icon: 'notifications', title: 'Notifications', component: 'NotificationsPage', parameters: 'null' }
            ];
            //get the details of the logged user
            _this.getUserFromStorage();
            //check notifications for current user
            _this.checkNotifications();
            //Listen for notifications every 5 secs.
            var self = _this;
            _this.notificationInterval = setInterval(function () {
                self.checkNotifications();
            }, 5000);
            //listen for user logout event
            _this.events.subscribe('user:logout', function (e) {
                _this.user.name = null;
                console.log('clearing interval...');
                //cancel checking for notification if log out
                clearInterval(_this.notificationInterval);
            });
            //listen for user logout event
            _this.events.subscribe('offline:observations', function (e) {
                _this.checkForOfflineObservations();
                //cancel checking for notifications if offline
                clearInterval(_this.notificationInterval);
            });
            //listen for user logout event
            _this.events.subscribe('user:login', function (e) {
                console.log('login event fired!');
                _this.getUserFromStorage();
                _this.notificationInterval = setInterval(function () {
                    self.checkNotifications();
                }, 5000);
            });
            //listen for user logout event
            _this.events.subscribe('user:update', function (e) {
                console.log('update event fired!');
                _this.getUserFromStorage();
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    };
    //do logout
    MyApp.prototype.logout = function () {
        this.user.name = null;
        this.nav.push('LoginPage', { logout: true });
    };
    MyApp.prototype.login = function () {
        this.nav.push('LoginPage', { destination: 'ObservationListPage' });
    };
    MyApp.prototype.clearOfflineObservations = function () {
        this.sqlite.create({
            name: 'phenologit.db',
            location: 'default'
        })
            .then(function (db) {
            db.executeSql('DROP TABLE observations_offline', {})
                .then(function (data) {
                console.log('DROP TABLE observations_offline');
            })
                .catch(function (e) { return console.log(e); });
            db.executeSql('DROP TABLE observations_offline_media', {})
                .then(function (data) {
                console.log('DROP TABLE observations_offline_media');
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    //check if there are any pending observations stored in the device
    MyApp.prototype.checkForOfflineObservations = function () {
        var _this = this;
        if (this.networkStatus == 1) {
            this.sqlite.create({
                name: 'phenologit.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('SELECT * FROM observations_offline', {})
                    .then(function (data) {
                    //publish event
                    _this.events.publish('observations:offline', data.rows.length);
                })
                    .catch(function (e) { return console.log(e); });
            });
        }
    };
    //save species to sql storage in order to use it when no connection
    MyApp.prototype.saveOfflineData = function () {
        var _this = this;
        var self = this;
        console.log("saving offline data-...");
        if (this.networkStatus == 1) {
            this.sqlite.create({
                name: 'phenologit.db',
                location: 'default'
            })
                .then(function (db) {
                //Drop and re-create the tables for instance
                db.executeSql('DROP TABLE species_offline', {})
                    .then(function () { return console.log('DROP TABLE species_offline'); })
                    .catch(function (e) { return console.log(e); });
                db.executeSql('DROP TABLE stages_offline', {})
                    .then(function () { return console.log('DROP TABLE stages_offline'); })
                    .catch(function (e) { return console.log(e); });
                db.executeSql('CREATE TABLE IF NOT EXISTS species_offline (id INTEGER PRIMARY KEY, name TEXT, name_en TEXT, name_es TEXT, name_gl TEXT, name_lt TEXT, name_dk TEXT, desc_en TEXT , desc_es TEXT , desc_gl TEXT ,desc_lt TEXT , desc_dk TEXT, thumbnail VARCHAR(254), pictures TEXT, stages TEXT)', {})
                    .then(function () { return console.log('CREATE TABLE IF NOT EXISTS species_offline'); })
                    .catch(function (e) { return console.log(e); });
                db.executeSql('CREATE TABLE IF NOT EXISTS stages_offline (id INTEGER PRIMARY KEY, stage_id INTEGER, idspecie INTEGER, stage_en TEXT, stage_es TEXT,stage_gl TEXT, stage_lt TEXT, stage_dk TEXT)', {})
                    .then(function () { return console.log('CREATE TABLE IF NOT EXISTS stages_offline'); })
                    .catch(function (e) { return console.log(e); });
                db.executeSql('DROP TABLE u_specie_stage_offline', {})
                    .then(function () { return console.log('DROP TABLE u_specie_stage_offline'); })
                    .catch(function (e) { return console.log(e); });
                db.executeSql('CREATE TABLE IF NOT EXISTS u_specie_stage_offline (id INTEGER PRIMARY KEY AUTOINCREMENT, idstage INTEGER, idspecie INTEGER, stage_sc TEXT, stage_en TEXT,stage_es TEXT,stage_lt TEXT,stage_dk TEXT,stage_gl TEXT, desc_en TEXT, desc_es TEXT, desc_lt TEXT, desc_dk TEXT, stage_picture TEXT)', {})
                    .then(function () { return console.log('CREATE TABLE IF NOT EXISTS u_specie_stage_offline'); })
                    .catch(function (e) { return console.log(e); });
                //insert species in table
                _this.species.forEach(function (specie) {
                    //console.log(JSON.stringify(specie))
                    self.phenoApi.getSpecieDetails(specie.id).subscribe(function (data) {
                        //aqui o insert
                        data[0].stages.forEach(function (stage) {
                            //console.log("stage-> "+JSON.stringify(stage.stage_en));
                            var sql = "INSERT INTO u_specie_stage_offline (idstage, idspecie, stage_sc , stage_en ,stage_es ,stage_lt ,stage_dk ,stage_gl, desc_en, desc_es, desc_lt, desc_dk,stage_picture) VALUES ('" + stage.stage_id + "','" + specie.id + "','" + stage.stage_sc + "','" + stage.stage_en + "','" + stage.stage_es + "','" + stage.stage_lt + "','" + stage.stage_dk + "','" + stage.stage_gl + "','" + stage.desc_en + "','" + stage.desc_es + "','" + stage.desc_lt + "','" + stage.desc_dk + "','" + stage.stage_picture + "')";
                            db.executeSql(sql, {})
                                .then(function () { })
                                .catch(function (e) { return console.error('error inserting in db ' + JSON.stringify(e)); });
                        });
                    }, function (err) { }, function () { });
                    var sql = "INSERT INTO species_offline (id,name, name_en,name_es, name_gl, name_lt,name_dk,desc_en,desc_es,desc_gl,desc_lt,desc_dk,thumbnail,pictures,stages) VALUES ('" + specie.id + "','" + specie.name + "','" + specie.name_en + "','" + specie.name_es + "','" + specie.name_gl + "','" + specie.name_li + "','" + specie.name_de + "','" + specie.desc_en + "','" + specie.desc_es + "','" + specie.desc_gl + "','" + specie.desc_li + "','" + specie.desc_de + "','" + specie.thumbnail + "','" + specie.picture + "','" + specie.stages + "')";
                    db.executeSql(sql, {})
                        .then(function () { })
                        .catch(function (e) { return console.error(e); });
                });
                //insert stages in table
                _this.stages.forEach(function (stage) {
                    var sql2 = "INSERT INTO stages_offline (stage_id, idspecie, stage_en,stage_es,stage_gl,stage_lt,stage_dk) VALUES ('" + stage.id + "','" + stage.idspecie + "','" + stage.name_en + "','" + stage.name_es + "','" + stage.name_gl + "','" + stage.name_lt + "','" + stage.name_dk + "')";
                    db.executeSql(sql2, {})
                        .then(function () { })
                        .catch(function (e) { return console.error(e); });
                });
            })
                .catch(function (e) { return console.log(e); });
            //download files to store offline
            this.downloadPictures();
        }
    };
    //download pictures for offline use
    MyApp.prototype.downloadPictures = function () {
        var self = this;
        var fileTransfer = this.transfer.create();
        this.species.forEach(function (specie) {
            var url = "http://web.phenologit.org/uploads/species/" + specie.picture;
            var thisSpecie;
            fileTransfer.download(url, self.file.dataDirectory + specie.picture).then(function (entry) {
                //console.log('download specie complete: ' + entry.toURL());
                self.phenoApi.getSpecieDetails(specie.id).subscribe(function (data) { thisSpecie = data[0]; }, function (err) { }, function () {
                    thisSpecie.stages.forEach(function (stage) {
                        var url = "http://web.phenologit.org/uploads/stages/" + stage.stage_picture;
                        fileTransfer.download(url, self.file.dataDirectory + "/stages/" + stage.stage_picture).then(function (entry) {
                            //console.log('    - download stage complete: ' + entry.toURL());
                        }, function (error) {
                            console.error('Error downloading stage ' + stage.stage_picture + ' ' + JSON.stringify(error));
                        });
                    });
                });
            }, function (error) {
                console.error('Error downloading specie' + specie.picture);
            });
        });
    };
    //get data to store offline
    MyApp.prototype.getDataToStoreOffline = function () {
        var _this = this;
        //save species list
        this.phenoApi.getSpecies().subscribe(function (data) {
            _this.species = data;
        }, function (err) { return console.log(err); }, function () {
            //save stages list
            _this.phenoApi.getStages().subscribe(function (data) {
                _this.stages = data;
            }, function (err) { return console.log(err); }, function () { return _this.saveOfflineData(); });
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/abraham/www/phenologit/app2/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-content>\n\n    <section class="menuUserProfile">\n\n      <div menuClose (click)="login()" *ngIf="user.name==null" class="menuUserProfilePicture" [ngStyle]="{\'background\':\'url(assets/img/notLogged.png) no-repeat\'}"></div>\n      <div *ngIf="user.name!=null" class="menuUserProfilePicture" [ngStyle]="{\'background\':\'url(http://web.phenologit.org/uploads/avatar/\'+user.picture+\') no-repeat\'}"></div>\n      <div *ngIf="user.name!=null" class="menuUserProfileName">{{user.name}}</div>\n      \n      <!--<profile-buttons padding></profile-buttons>-->\n      <ion-row class="menuIcons">\n        <ion-col width-33 padding>\n            \n              <ion-icon menuClose *ngIf="user.name!=null" name="exit" (click)="logout()"></ion-icon>\n              <ion-icon menuClose *ngIf="user.name==null" name="person" (click)="login()"></ion-icon>\n        \n          </ion-col>\n        <ion-col width-33 padding>\n            \n              <ion-icon menuClose name="settings" (click)="openPage(profilePage)"></ion-icon>\n            \n          </ion-col>\n\n          <ion-col width-33 padding>\n            \n               <ion-icon menuClose class="notificationsIcon" name="notifications" (click)="openPage(notificationsPage)">\n                <span *ngIf="notifications.length>0" class="notificationsInMenu">{{notifications.length}}</span>\n              </ion-icon> \n              \n\n          </ion-col>\n          \n    </ion-row>\n    <!--<button *ngIf="user.name!=null" ion-button small (click)="openListPage(userId)">{{MY_OBSERVATIONS}}</button>-->\n    \n    </section>\n\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n       <ion-icon name="{{p.icon}}" item-left></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/abraham/www/phenologit/app2/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_5__providers_pheno_api_pheno_api__["a" /* PhenoApi */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["a" /* FileTransfer */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[221]);
//# sourceMappingURL=main.js.map