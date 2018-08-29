import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';
import { Alert } from 'ionic-angular/components/alert/alert';

/**
 * Generated class for the ObservationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observation-list',
  templateUrl: 'observation-list.html',
})
export class ObservationListPage {

  private filter:any;
  private limit:any;
  private school: any;
  private userfilter:any;
  private observations:any;
  private loadMore:any;
  private loading:any;
  private user:any=null;
  private notifications:any=0;
  private refresher:any;
  private networkStatus:number;
  private order:any='bydate'; //bydate by default
  private bydate:any=true;
  private bylikes:any=false;
  private byvalidations:any=false;
  private bycomments:any=false;
  private offlineObservations=0;
  private uploadPath:any='[[YOUR_UPLOAD_FOLDER]]';

  private st_order_by:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi: PhenoApi,
    public alertCtrl: AlertController,
    public nativeStorage: NativeStorage,
    public loadingCtrl:LoadingController,
    public events:Events,
    public sqlite:SQLite,
    public network:Network,
    private translate: TranslateService

  
  
  ) {

      //showing alert when observation is created
      let created = navParams.get('created');
      if(created==true){
        this.presentAlert('Observation Created!','Your observation was created successfully!');
      }

      //get logged user details
      this.getUserFromStorage();

      //check notifications for user
      this.checkNotifications();

      //listen for user disconnection event
      events.subscribe('network:disconnected', (e) => {
        this.networkStatus=0;
      });

      //listen for user logout event
      events.subscribe('offline:observations', (e) => {
        this.checkForOfflineObservations();
      });

      //listen for user disconnection event
      events.subscribe('network:connected', (e) => {
        this.networkStatus=1;
        this.checkForOfflineObservations();
        if(this.navCtrl.getActive().name === 'ObservationListPage') this.getObservations(this.filter,this.limit,this.school,this.userfilter);
        
      });

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
      //if online check for pending observations
      this.checkForOfflineObservations();
    }
  }

  getTranslatedStrings(){
      //get translated strings
      this.translate.get('ORDER').subscribe(
        value => {this.st_order_by= value}
      )
  }


  //check if there are any pending observations stored in the device
  checkForOfflineObservations(){
    console.log("checking offline observations...")
    if(this.networkStatus==1){
      this.sqlite.create({
        name: 'phenologit.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM observations_offline', {})
        .then((data) => {
          this.offlineObservations=data.rows.length;
          console.log(this.offlineObservations)
        })
        .catch(e => console.log(e));
      });
    }else{
      console.log('no network')
    }
  }

  checkNotifications(){
    //listening for notification count event
    this.events.subscribe('notificationsCount',(count) => { 
      this.notifications=count;
    });
  }

  getUserFromStorage(){
    //console.log("getting user from storage");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data;
        console.log('user stored-> '+JSON.stringify(data));
        this.translate.setDefaultLang(data.lang);
      },
      error => {
        console.error(error),
        this.translate.setDefaultLang('en');
      }
    );
  }

  presentLoading(text) {
    //present loading function
    this.loading = this.loadingCtrl.create({
      content: text
    });
    this.loading.present();
  }

  presentAlert(msg,subTitle) {
    //present alert function
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationListPage');

    this.checkNetwork();

    //parameters by default
    this.filter=null;
    this.school=null;
    this.userfilter=null;

    //load this.limit observations each time
    this.limit=10;
    this.loadMore=1;

    //if specie is sent, filter by specie overriding default parameters
    if(this.navParams.get('filter')!==undefined){
      this.filter=this.navParams.get('filter');
      console.log("filter by: "+this.filter);
    }

    //if school is sent, filter by school overriding default parameters
    if(this.navParams.get('school')!==undefined){
      this.school=this.navParams.get('school');
      console.log("filter by: "+this.school);
    }

    //general getobservation
    this.getObservations(this.filter,this.limit,this.school,this.userfilter);
  }

  doRefresh(refresher){
    //refresh on swipe down
    this.refresher=refresher;
    this.getObservations(this.filter,this.limit,this.school,this.userfilter);
  }

  
  getObservations(filter,limit,school,userfilter){
    //get data from API

    //show loading while doing the operation
    this.presentLoading('loading...');

    //query the api
    this.phenoApi.getObservations(filter,limit,school,userfilter).subscribe(
      data => {
        this.observations=data
      },
      err => {
        this.loading.dismiss(),
        console.error(err),
        this.refresher.complete();
        this.presentAlert('Error!','Error getting observations')
      },
      () => {
        console.log(this.observations)
        //remove loading
        this.loading.dismiss();
        //allow to load more now
        this.loadMore=1;

        //if refresher exists then mark it as completed
        if (this.refresher != undefined) { 
          this.refresher.complete();
        }
      }
    );
  } 

  //open observation on tap
  openOfflineObservationsPage(){
    this.navCtrl.push('OfflineObservationsPage');
  }

  //open observation on tap
  openObservation(id){
    this.navCtrl.push('ObservationPage',{id:id});
  }

  //add new observation
  addObservation(){
    this.navCtrl.push('AddObservationPage');
  }
  
  //infinite scrolling
  doInfinite(infiniteScroll){
    //load 5 more observation 
    this.limit+=5;
    //avoid loadin more until the operation is completed
    this.loadMore=0;
 
    //timeout for avoiding problems
    setTimeout(() => {
      //query api for data
      this.getObservations(this.filter,this.limit,this.school,this.userfilter);
      //mark scroll as complete
      infiniteScroll.complete();
    }, 500);
  
  }

  //show orders alert
  showOrders(event){
    let alert = this.alertCtrl.create({
      title: this.st_order_by,
      inputs:
      [

          {
            label:'By date',
            type:'radio',
            value:'bydate',
            checked:this.bydate
          },
          {
            label:'By likes',
            value:'bylikes',
            type:'radio',
            checked:this.bylikes
          },
          {
            label:'By validations',
            value:'byvalidations',
            type:'radio',
            checked:this.byvalidations
          }
        ],
      buttons: [
      {
        text: 'Order',
        handler: data => {
          this.orderBy(data);
          console.log(data);

        }
      }
      ]
    });
    alert.present();
  }

  //filter by validated
  showFilters(event){
    let alert = this.alertCtrl.create({
      title: 'Filters',
      inputs:
      [
 
          {
            label:'Show only validated observations',
            type:'checkbox',
            value:'onlyvalidated',
          }
        ],
      buttons: [
      {
        text: 'Filter',
        handler: data => {
          //this.orderBy(data);
          console.log(data);

        }
      }
      ]
    });
    alert.present();
  }

  orderBy(option){
    switch (option) {
      case 'bylikes':
        console.log('Ordering by likes')
        this.getObservationsByLikes(this.filter,this.limit);
        break;
      case 'byvalidations':
        console.log('ordering by validations');
        this.getObservationsByValidations(this.filter,this.limit);
        break;
      case 'bydate':
        console.log('ordering by date');
        this.getObservations(this.filter,this.limit,this.school,this.userfilter);
        break;
    }
  }

    //get data from API
    getObservationsByLikes(filter,limit){
      this.order='bylikes';
      this.bydate=false;
      this.bylikes=true;
      this.byvalidations=false;
      this.bycomments=false;
  
      this.observations=this.phenoApi.getObservationsByLikes(filter,limit).subscribe(
          data => {this.observations=data},
          err => console.log(err),
        );
    }
  
    //get data from API
    getObservationsByValidations(filter,limit){
      this.order='byvalidations';
      this.bydate=false;
      this.bylikes=false;
      this.byvalidations=true;
      this.bycomments=false;
  
      this.observations=this.phenoApi.getObservationsByValidations(filter,limit).subscribe(
          data => {this.observations=data},
          err => console.log(err),
      );
    }

}
