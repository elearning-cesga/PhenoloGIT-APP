import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';
import {OpenWeatherProvider} from '../../providers/open-weather/open-weather';

import * as L from 'leaflet';

/**
 * Generated class for the AddObservationMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-observation-map',
  templateUrl: 'add-observation-map.html',
})
export class AddObservationMapPage {

  private lang:any;
  private map: any;
  private roadLayer:any;
  private satelliteLayer:any;
  private youAreHere:any;
  private youAreHereMarker: any;
  private ld: any;
  private observationCoords:any;
  private pictures: any;
  private weather:any;
  private observation: any;
  private networkStatus:any=1;
  private foundLocation:boolean=false;
  private offlineCoords:any={
    lat:null,
    lng:null
  };
  private offlineObservations:any=[];

  //strings
  private str_geolocating:any;
  private str_geolocating_subtitle:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    private geolocation: Geolocation,
    public phenoApi: PhenoApi,
    public openWeather:OpenWeatherProvider,
    private loading: LoadingController,
    private nativeStorage: NativeStorage,
    private transfer: FileTransfer,
    private ngZone: NgZone,
    private file:File,
    private alertCtrl: AlertController,
    private network: Network,
    private events:Events,
    private sqlite:SQLite
  ) {

    this.lang='en';
    this.translate.setDefaultLang(this.lang);

    this.weather={}

    //set the map layer from provider
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {});
    this.roadLayer = L.tileLayer('https://api.mapbox.com/styles/v1/abrahammg/cj4ds06rj1oy42rmska5r0cye/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJyYWhhbW1nIiwiYSI6ImNpaHZ3OXd1YjAwNmd1dW01M3VkaTF2b2QifQ.xWJE6FJFeRIymwg6NfOpSg', {});

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AddObservationMapPage');
    this.nativeStorage.getItem('observation')
    .then(
      data => {
        console.log(JSON.stringify(data)),
        this.pictures=data.media,
        this.observation=data,
        console.log("Observation got: "+JSON.stringify(this.observation))
      },
      error => console.error(error)
    );

    //check network status
    this.checkNetwork();

    //get translated strings
    this.getTranslatedStrings();
  }

  //check current network status and subscribe to events
  checkNetwork(){
    if (this.network.type === 'none') {
      console.log('we have no connection!');
      this.networkStatus=0;
      this.getOfflineLocation();
    }else{
      this.networkStatus=1;
      this.loadMap();
    }

    //listen for user disconnection event
     this.events.subscribe('network:disconnected', (e) => {
      this.networkStatus=0;
      if(this.navCtrl.getActive().name === 'AddObservationMapPage') this.getOfflineLocation();
    });

    //listen for user disconnection event
    this.events.subscribe('network:connected', (e) => {
      this.networkStatus=1;
      if(this.navCtrl.getActive().name === 'AddObservationMapPage') this.loadMap();
    });
  }

  getTranslatedStrings(){
    //get translated strings
    this.translate.get('MAP_ERROR_LOCATING').subscribe(
      value => {this.str_geolocating= value}
    )
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.str_geolocating,
      subTitle: this.str_geolocating_subtitle,
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            this.reGeolocate();
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  presentAlertOffline() {
    let alert = this.alertCtrl.create({
      title: 'Error getting your position',
      subTitle: 'We can\'t get your actual position, please enable your GPS location and try again, or click in the map to set yor position manually',
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showLoading(msg){
    this.ld = this.loading.create({
      content: msg,
      spinner: 'dots'
    });
  
    this.ld.present();
  }

  getOfflineLocation(){
    this.showLoading('Getting your location offline...');
    this.geolocation.getCurrentPosition({timeout: 15000, enableHighAccuracy:true}).then((resp) => {
      console.log("offline location "+resp.coords.latitude,resp.coords.longitude);
      this.offlineCoords.lat=resp.coords.latitude;
      this.offlineCoords.lng=resp.coords.longitude;
      this.foundLocation=true;
      this.ld.dismiss();
     }).catch((error) => {
       console.log('Error getting location', error);
       this.ld.dismiss();
       this.presentAlertOffline();
     });
  }

  reGeolocate(){
    this.showLoading('Getting your location...');
    this.geolocation.getCurrentPosition({timeout: 15000, enableHighAccuracy:true}).then((resp) => {
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
      this.youAreHereMarker.setLatLng([resp.coords.latitude, resp.coords.longitude]);
      this.observationCoords=resp.coords.latitude+','+resp.coords.longitude;
      this.ld.dismiss();
      this.getWeatherForLocation(resp.coords.latitude,resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.showDefaultLocation();
       this.ld.dismiss();
       this.presentAlert();
     });
  }

  loadMap(){

        this.showLoading('Getting your location...');
    
        let self=this;
        
        this.map = L.map('addMap',{attributionControl: false,zoomControl:false});
        this.map.addLayer(this.satelliteLayer);
    
        this.youAreHere = L.icon({
          iconUrl: 'assets/img/observationMarker.png',
          iconSize:     [32, 50], // size of the icon
        });
    
        //try to geolocate user
        this.geolocation.getCurrentPosition({timeout: 15000, enableHighAccuracy:true}).then((resp) => {
          this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
          this.youAreHereMarker = L.marker([resp.coords.latitude, resp.coords.longitude],{icon:this.youAreHere}).addTo(this.map);
          this.observationCoords=resp.coords.latitude+','+resp.coords.longitude;
          this.ld.dismiss();
          this.getWeatherForLocation(resp.coords.latitude,resp.coords.longitude);
         }).catch((error) => {
           this.ld.dismiss();
           console.log('Error getting location', error);
           this.showDefaultLocation();
           this.presentAlert();
         });
         

        this.map.on('click', function(e) {        
          console.log(e.latlng.lat);
          self.youAreHereMarker.setLatLng(e.latlng);
          this.panTo(e.latlng);
          self.observationCoords=e.latlng.lat+','+e.latlng.lng;
          self.getWeatherForLocation(e.latlng.lat,e.latlng.lng);
        });
    
      }
  showDefaultLocation(){
    this.map.setView([42.8793059,-8.5517165], 17);
    this.youAreHereMarker = L.marker([42.8793059,-8.5517165],{icon:this.youAreHere}).addTo(this.map);
    this.observationCoords=42.8793059+','+-8.5517165;
  }
     
  publishObservation(){
    this.showLoading('uploading');
    //get observation storage
    this.publish(this.observation)
  }
    
  publish(data){
    this.uploadFiles(this.observation)
  }

  uploadFiles(observation) {
    //uploads file/s and resize in server

    this.observation.media=[];

    const fileTransfer: FileTransferObject = this.transfer.create();
    var self=this;

    var count=0;
  
    for(var key in observation.mediaToUpload){

      var image=observation.mediaToUpload[key];
      var fileURL = image.media_url;

      var prefix = image.media_prefix;
  
      var headers = {'prefix':prefix};

      var params = {'prefix':prefix};
  
      let up_options: FileUploadOptions = {
        fileKey: 'bill',
        fileName: fileURL.substr(fileURL.lastIndexOf('/')+1),
        headers: headers,
        mimeType : "text/plain",
        params:params
     }
  
     var uri = encodeURI("[[YOUR_UPLOADER_FILE]]");
   
     fileTransfer.upload(fileURL, uri, up_options)
      .then((data) => {
        console.log("uploaded: "+prefix+fileURL);
        this.ld.dismiss();
        this.observation.media.push(observation.mediaToUpload[count].media_prefix+'_'+observation.mediaToUpload[count].media_url.substr(observation.mediaToUpload[count].media_url.lastIndexOf('/')+1));
        count ++;

        if(count==observation.mediaToUpload.length){ //save it to database when all the images are uploaded
          this.saveDB();
          console.log('subo en count: '+count);
        }
        
      }, (err) => {
        console.log(err);
      })

      let onProgress =  (progressEvent: ProgressEvent) : void => {
        this.ngZone.run(() => {
          this.ld.setContent('uploading picture: '+Math.round((progressEvent.loaded / progressEvent.total) * 100)+' %');
        });
          //console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          
      }
      
      fileTransfer.onProgress(onProgress);

    }
  } 

  getWeatherForLocation(lat,lon){
    console.log('checking weather..');
    this.openWeather.getWeatherForLocation(lat,lon).subscribe(
      data => {
        this.weather=data,
        console.log(JSON.stringify(this.weather)),
        this.observation.temperature=Math.round(data.main.temp),
        this.observation.humidity=data.main.humidity,
        this.observation.pressure=data.main.pressure,
        this.observation.weatherstate=data.weather[0].main
      },
      err => this.weatherOffline(),
      () => this.updateWeather()
    );
  }

  weatherOffline(){}

  updateWeather(){}

  //saves to api and return to the main page
  saveDB(){

    this.observation.userid=1;
    this.observation.coords=this.observationCoords;

    console.log(JSON.stringify(this.observation));

    this.phenoApi.postObservation(this.observation).subscribe(
      data => {console.log(JSON.stringify(data))},
      err => console.log(JSON.stringify(err)),
      () => {
        console.log('observation created successfully!')
        
        this.navCtrl.setRoot('ObservationListPage',{created:true});
      }
    );

  }

  //save the observation in the database for later upload
  saveOfflineObservation(){
    this.observation.userid=1;
    this.observation.coords=this.offlineCoords;

    this.sqlite.create({
      name: 'phenologit.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS observations_offline (id INTEGER PRIMARY KEY AUTOINCREMENT, idspecie INTEGER, idstage INTEGER, title TEXT, description TEXT, lat TEXT, lng TEXT , iduser TEXT, cover TEXT)', {})
          .then(() => console.log('CREATE TABLE IF NOT EXISTS observations_offline'))
          .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS observations_offline_media (id INTEGER PRIMARY KEY AUTOINCREMENT, idobservation INTEGER, media_prefix TEXT, media_type TEXT, media_url TEXT)', {})
          .then(() => console.log('CREATE TABLE IF NOT EXISTS observations_offline_media'))
          .catch(e => console.log(e));

        let sql="INSERT INTO observations_offline (idspecie, idstage, title, description, lat, lng, iduser, cover) VALUES ('"+this.observation.specie+"','"+this.observation.stage+"','"+this.observation.title+"','"+this.observation.description+"','"+this.observation.coords.lat+"','"+this.observation.coords.lng+"','"+this.observation.userid+"','"+this.observation.cover+"')";
        db.executeSql(sql, {})
            .then((data) => {
              //insert offline media
              for(let i = 0; i < this.observation.mediaToUpload.length; i++) {
                let sql_media="INSERT INTO observations_offline_media (idobservation, media_prefix, media_type, media_url) VALUES ('"+data.insertId+"','"+this.observation.mediaToUpload[i].media_prefix+"','"+this.observation.mediaToUpload[i].media_type+"','"+this.observation.mediaToUpload[i].media_url+"')";
                db.executeSql(sql_media, {}).then(()=>{});
              }
              //
              this.showConfirmation();
              this.navCtrl.setRoot('ObservationListPage');
            })
            .catch(e => console.error('error inserting in db '+JSON.stringify(e)));
    });
        
  }

  showConfirmation(){
    let alert = this.alertCtrl.create({
      title: 'Observations saved',
      subTitle: 'The observation was saved in your device. You will be able to publish it when network is available again.',
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }

}