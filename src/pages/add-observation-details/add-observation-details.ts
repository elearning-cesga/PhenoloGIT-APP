import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddObservationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-observation-details',
  templateUrl: 'add-observation-details.html',
})
export class AddObservationDetailsPage {

  private observation:any={};
  private title:any;
  private description:any;
  private networkStatus:any;

  //string variables
  private str_no_title_text:any;
  private str_no_title:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    private alertCtrl:AlertController,
    private network: Network,
    private events: Events,
    private translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObservationDetailsPage');
    this.loadFromStorage();
    this.checkNetwork();

    this.getTranslatedStrings();
  }

  //check current network status and subscribe to events
  checkNetwork(){
    if (this.network.type === 'none') {
      console.log('we have no connection!');
      this.networkStatus=0;
    }else{
      this.networkStatus=1;
    }

    //listen for user disconnection event
     this.events.subscribe('network:disconnected', (e) => {
      this.networkStatus=0;
    });

    //listen for user disconnection event
    this.events.subscribe('network:connected', (e) => {
      this.networkStatus=1;
    });
  }

  getTranslatedStrings(){
    //get translated strings
    this.translate.get('ADD_MEDIA_ERROR').subscribe(
      value => {this.str_no_title= value}
    )

    this.translate.get('ADD_MEDIA_ERROR_2').subscribe(
      value => {this.str_no_title_text= value}
    )
  }

  loadFromStorage(){
    this.nativeStorage.getItem('observation')
      .then(
        data => {console.log('in storage: '+JSON.stringify(data)),this.observation=data},
        error => console.error(error)
    );
  }

  showAlert(title,subtitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  goNext(stage_id){
    //validate title field
    if(this.observation.title!='' && this.observation.title!=undefined){
      if(this.observation.description=='' || this.observation.description==undefined) this.observation.description=' ';

      //save to storage
      this.nativeStorage.setItem('observation',{specie:this.observation.specie,stage:this.observation.stage,title:this.observation.title,description:this.observation.description});
      //go to next page
      this.navCtrl.push('AddObservationMediaPage');
    }else{
      this.showAlert(this.str_no_title,this.str_no_title_text);
    }
  }

}