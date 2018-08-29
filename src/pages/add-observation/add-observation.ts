import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';


import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the AddObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-observation',
  templateUrl: 'add-observation.html',
})
export class AddObservationPage {

  public species:any;
  private user:any;
  private networkStatus:any=0;
  private offlineSpecies:any=[];
  private offlineFileDirectory:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    private translate: TranslateService,
    private phenoApi:PhenoApi,
    private nativeStorage: NativeStorage,
    private network: Network, 
    private events:Events,
    private sqlite: SQLite,
    private file:File
  
  ) {
    
    this.offlineFileDirectory=this.file.dataDirectory;

 }
  
  ionViewWillEnter(){
    this.getUserFromStorage();
    this.checkNetwork();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObservationPage');
  }

  //check current network status and subscribe to events
  checkNetwork(){
    if (this.network.type === 'none') {
      console.log('we have no connection!');
      this.networkStatus=0;
      this.getOfflineSpecies();
    }else{
      this.networkStatus=1;
      this.getSpecies();
    }

    //listen for user disconnection event
     this.events.subscribe('network:disconnected', (e) => {
      this.networkStatus=0;
      this.getOfflineSpecies();
    });

    //listen for user disconnection event
    this.events.subscribe('network:connected', (e) => {
      this.networkStatus=1;
      this.getSpecies();
      //this.getObservations(this.filter,this.limit,this.school,this.userfilter);
    });
  }

  getSpecies(){
    if(this.networkStatus==1){
      this.phenoApi.getSpecies().subscribe(
        data => {this.species=data},
        err => console.error(err),
        () => {console.log(this.species)}
      );
    }else{
      console.log("No network! "+this.networkStatus);
    }
  }

  //getting the offline stored data
  getOfflineSpecies(){
      this.sqlite.create({
      name: 'phenologit.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM species_offline', {})
          .then((data) => {
            console.log("full offline species got");
            for(let i = 0; i < data.rows.length; i++) {
              this.offlineSpecies.push({
                "id": data.rows.item(i).id,
                "name": data.rows.item(i).name,
                "name_en": data.rows.item(i).name_en,
                "name_gl": data.rows.item(i).name_gl,
                "name_dk": data.rows.item(i).name_dk,
                "name_lt": data.rows.item(i).name_lt,
                "name_es": data.rows.item(i).name_es,
                "thumbnail": data.rows.item(i).thumbnail,
                "picture": data.rows.item(i).pictures,
                "stages": data.rows.item(i).stages,
              });
            }
          })
          .catch(e => console.log(e));
      });
  }

  openSpeciePage(id){
    console.log('opening specie '+id);
    this.nativeStorage.setItem('observation',{specie:id});
    this.navCtrl.push('SpeciePage',{id:id});
  }
  
  getUserFromStorage(){
    console.log("getting user from storage");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data;
        console.log('got from storage: '+JSON.stringify(data));
        if(this.user.username==null || this.user.username==undefined){
          this.navCtrl.push('LoginPage',{destination:'AddObservationPage'});
        }
      },
      error => {
        this.navCtrl.push('LoginPage',{destination:'AddObservationPage'});
        console.error(error)}
    );
  }

}
