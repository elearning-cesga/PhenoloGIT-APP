import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the AddObservationStagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-observation-stages',
  templateUrl: 'add-observation-stages.html',
})
export class AddObservationStagesPage {

  private specie:any={};
  private specieid:any;
  private observation:any={};
  private stage_id:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi:PhenoApi,
    private nativeStorage:NativeStorage
  ) {

    this.specieid=this.navParams.get('id');
    this.getSpecieDetails(this.specieid);

  }

  loadFromStorage(){
    this.nativeStorage.getItem('observation')
      .then(
        data => {console.log('in storage: '+JSON.stringify(data)),this.observation=data},
        error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObservationStagesPage');
    this.loadFromStorage();
  }

  goNext(stage_id){
    //save to storage
    this.nativeStorage.setItem('observation',{specie:this.observation.specie,stage:stage_id});

    //go to next page
    this.navCtrl.push('AddObservationDetailsPage');
  }

  getSpecieDetails(id){ //get specie details from API
    console.log('going to check details for '+id);
      this.phenoApi.getSpecieDetails(id).subscribe(
        data => {
          this.specie=data[0],
          this.stage_id=this.specie.stages[0].stage_id;
        },
        err => {},
        () => console.log(this.specie)
      );
  }

  slideChanged(id){
    //upload the selected stage id when slide changes
    this.stage_id=id;
  }

}
