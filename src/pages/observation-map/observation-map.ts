import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {PhenoApi} from '../../providers/pheno-api/pheno-api';
import * as L from 'leaflet';

/**
 * Generated class for the ObservationMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observation-map',
  templateUrl: 'observation-map.html',
})
export class ObservationMapPage {

  private map: any;
  private observations:any;
  private roadLayer:any;
  private satelliteLayer:any;
  private youAreHere:any;
  private youAreHereMarker: any;
  private observationMarker:any;
  private ld: any;

  //strings
  private str_geolocating:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation,
    public phenoApi: PhenoApi,
    private loading: LoadingController
  ) {
    
  }

  ionViewWillEnter(){
    console.log('vou entrar na páxina');
    //map setup
  }

  ionViewDidEnter() {

    console.log('entrei na páxina')

    //layers
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {});
    this.roadLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {});
    
    //map setup
    this.map = L.map('map',{attributionControl: false,zoomControl:false}); 

    //observation markers
    this.observationMarker = L.icon({
      iconUrl: 'assets/img/observationMarker.png',
      iconSize:     [32, 50], // size of the icon
    });

     //adding satellite layer by default
     this.map.addLayer(this.satelliteLayer);
    
    //if no observation is sent as parameter, check the observations
    if(this.navParams.get('observation')){
      console.log('observation id '+this.navParams.get('observation'));
      this.getObservation(this.navParams.get('observation'));
    }else{
      this.loadMapAndGeolocate();
      this.getObservations();
    }
 

    this.str_geolocating='Looking for your position...'
  }

  ionViewWillLeave(){
    console.log('vou sair, destrúo mapa')
  
  }

  //show loading message
  showLoading(msg){
    this.ld = this.loading.create({
      content: msg,
      spinner: 'dots'
    });
    this.ld.present();
  }


  //hides actual loading message
  hideLoading(){
    this.ld.dismiss();
  }

  loadMapAndGeolocate(){
    let self=this;

    //show loading
    this.showLoading('Loading ...');

    //user position marker design
    this.youAreHere = L.icon({
      iconUrl: 'assets/img/youarehere.png',
      iconSize:     [32, 45], // size of the icon
    });

    //getting position
    this.geolocation.getCurrentPosition({enableHighAccuracy:true,timeout: 10000}).then((resp) => {
      //this.hideLoading();
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
      this.youAreHereMarker = L.marker([resp.coords.latitude, resp.coords.longitude],{icon:this.youAreHere}).addTo(this.map);
     }).catch((error) => {
       this.hideLoading();
       console.log('Error getting location', error);
     });
    
  }

  loadMapForSingleObservation(observation){
    console.log("loading map for single observation")
    let coords=observation[0].coords.split(',');
    this.map.setView([coords[1], coords[0]], 16);
    console.log(this.map);
    //add the marker
    L.marker([coords[1],coords[0]],{icon:this.observationMarker}).addTo(this.map);
  }

  //Load layers over map    
  loadLayer(layer){

    switch(layer){
      case 'satellite':
        this.map.removeLayer(this.roadLayer);
        this.map.addLayer(this.satelliteLayer);
        break;

      case 'road':
        this.map.removeLayer(this.satelliteLayer);
        this.map.addLayer(this.roadLayer);
        break;
    }
    
  }

  //load observations from API
  getObservations(){

    this.phenoApi.getAllObservations().subscribe(
      data => {this.observations=data},
      err => console.error(err),
      () => {
        console.log('done loading api')
        this.createMarkers()
      }
    );
  }

   //get one observation given as parameter
   getObservation(id){
     console.log("getting observation "+id)
    this.phenoApi.getObservationDetails(id,'null').subscribe(
      data => {
        this.observations=data
      },
      err => console.error(err),
      () => {
        this.loadMapForSingleObservation(this.observations)
        console.log(this.observations)
      }
    );
    
  }

 
  //create markers on map
  createMarkers(){
    var self=this;
 
    for(var i = 0; i<this.observations.length; i++){
      let divObservation = document.createElement('div');
      divObservation.innerHTML = "<div><p>"+this.observations[i].title+"</p><div style='text-align:center;width:100%;height:100px;background:url([[YOUR_UPLOAD_FOLDER]]"+this.observations[i].media.media_url+");background-size:cover;background-position:50%' (click)='openObservationPage("+this.observations[i].id+")'></div></div>";
  
      let id=this.observations[i].id

      divObservation.onclick = function() {
        self.openObservation(id)
      };

      let coords=this.observations[i].coords.split(",");
      L.marker([coords[0],coords[1]],{icon:this.observationMarker}).bindPopup(divObservation).openPopup().addTo(this.map);
    }
    console.log('done creating markers');
    this.hideLoading();
    }

  //opens the observation page
  openObservation(id){
    this.navCtrl.push('ObservationPage',{id:id});
  }
  
}
