import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';



/**
 * Generated class for the SpeciePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specie',
  templateUrl: 'specie.html',
})
export class SpeciePage {

  @ViewChild('myslider') slider:  Slides;

  private specie: any;
  private stage_id:any=0;
  public stageIndex:any=0;
  private networkStatus;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private phenoApi: PhenoApi,
    private translate: TranslateService,
    private nativeStorage: NativeStorage,
    private network: Network,
    private events:Events,
    private sqlite: SQLite,
    private file:File
  ) {
    console.log('constructor');
    this.specie=[];
    this.specie.picture=null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeciePage');
    this.checkNetwork();
  }

  //check current network status and subscribe to events
  checkNetwork(){
    if (this.network.type === 'none') {
      console.log('we have no connection!');
      this.networkStatus=0;
      this.getOfflineSpecieDetails();
    }else{
      this.networkStatus=1;
      this.getSpecieDetails(this.navParams.get('id'));
    }

    //listen for user disconnection event
     this.events.subscribe('network:disconnected', (e) => {
      this.networkStatus=0;
      this.getOfflineSpecieDetails();
    });

    //listen for user disconnection event
    this.events.subscribe('network:connected', (e) => {
      this.networkStatus=1;
      this.getSpecieDetails(this.navParams.get('id'));

    });
  }

  getSpecieDetails(id){ //get specie details from API
    console.log('going to check details for '+id);
      this.phenoApi.getSpecieDetails(id).subscribe(
        data => {this.specie=data[0]},
        err => {},
        () => console.log(this.specie)
      );
  }

  getOfflineSpecieDetails(){ //get specie details from sqlite storage
    let self=this;
    console.log('going to check OFFLINE details for '+this.navParams.get('id'));
    this.sqlite.create({
      name: 'phenologit.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM species_offline WHERE id='+this.navParams.get('id')+'', {})
          .then((data) => {
            console.log("offline specie got "+JSON.stringify(data.rows.item(0).name));
              this.specie={
                "id": data.rows.item(0).id,
                "name": data.rows.item(0).name,
                "name_en": data.rows.item(0).name_en,
                "name_gl": data.rows.item(0).name_gl,
                "name_dk": data.rows.item(0).name_dk,
                "name_lt": data.rows.item(0).name_lt,
                "name_es": data.rows.item(0).name_es,
                "desc_en": data.rows.item(0).desc_en,
                "desc_gl": data.rows.item(0).desc_gl,
                "desc_dk": data.rows.item(0).desc_dk,
                "desc_lt": data.rows.item(0).desc_lt,
                "desc_es": data.rows.item(0).desc_es,
                "thumbnail": data.rows.item(0).thumbnail,
                "picture": data.rows.item(0).pictures,
                "stages":[]
              };

            //get the stages
            db.executeSql('SELECT * FROM u_specie_stage_offline WHERE idspecie='+this.navParams.get('id')+'', {})
            .then((data) => {
              for(let i = 0; i < data.rows.length; i++) {
                this.specie.stages.push({
                  "stage_id": data.rows.item(i).idstage,
                  "stage_en": data.rows.item(i).stage_en,
                  "stage_es": data.rows.item(i).stage_es,
                  "stage_dk": data.rows.item(i).stage_dk,
                  "stage_lt": data.rows.item(i).stage_lt,
                  "desc_en": data.rows.item(i).desc_en,
                  "desc_es": data.rows.item(i).desc_es,
                  "desc_dk": data.rows.item(i).desc_dk,
                  "desc_lt": data.rows.item(i).desc_lt,
                  "stage_picture": self.file.dataDirectory+"/stages/"+data.rows.item(i).stage_picture,
                });
              }
            
            })
            .catch(e => console.log(e));
          
          })
          .catch(e => console.log(e));
      });
  }

  //uploads the selected stage id when slide changes
  slideChanged(){

    //check if this is the last slide to prevent swiping left
    if(!this.slider.isEnd()){ 
      this.slider.lockSwipeToNext(false)
      this.stageIndex = this.slider.getActiveIndex();
    }else{
      this.slider.lockSwipeToNext(true)
      this.stageIndex = this.slider.getActiveIndex();
    }

    //check if this is the first slide to prevent swiping right
    if(!this.slider.isBeginning()){ 
      this.slider.lockSwipeToPrev(false)
      this.stageIndex = this.slider.getActiveIndex();
    }else{
      this.slider.lockSwipeToPrev(true)
      this.stageIndex = this.slider.getActiveIndex();
    }

    console.log('#active slide index: '+this.stageIndex);
    
  }

  openObservationMedia(stage){
    console.log('stage-> '+ stage);
    //get observation storage
    this.nativeStorage.getItem('observation')
      .then(
        data => {
          this.saveData(data,stage),
          this.navCtrl.push('AddObservationDetailsPage',{id:this.navParams.get('id')})
        },
        error => console.error(error)
    );
    
  }

  saveData(data,stage){
    this.nativeStorage.setItem('observation',{specie:data.specie,stage:stage});
  }

}
