import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the OfflineObservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline-observations',
  templateUrl: 'offline-observations.html',
})
export class OfflineObservationsPage {

  private networkStatus:any;
  private offlineObservations:any=[];
  private ld;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlite: SQLite,
    public file: File,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private ngZone: NgZone,
    private loadingCtrl: LoadingController,
    private phenoApi: PhenoApi,
    private events: Events
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad OfflineObservationsPage');
    //this.getOfflineObservations();
  }

  ionViewWillEnter(){
    this.getOfflineObservations();
  }

  //check if there are any pending observations stored in the device
  getOfflineObservations(){

    if(true){
      this.sqlite.create({
        name: 'phenologit.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM observations_offline', {})
        .then((data) => {
          
          for(var i = 0; i < data.rows.length; i++) {
            var observation={};
            let observationMedia=[]
            
            db.executeSql('SELECT * FROM observations_offline_media WHERE idobservation='+data.rows.item(i).id+' ', {})
            .then((media) => {
              
              for(let y = 0; y < media.rows.length; y++) {
                observationMedia.push(media.rows.item(y))
                
              }
            });
            observation={
              id:data.rows.item(i).id,
              title:data.rows.item(i).title,
              description:data.rows.item(i).description,
              specie:data.rows.item(i).idspecie,
              stage:data.rows.item(i).idstage,
              cover:data.rows.item(i).cover,
              coords:data.rows.item(i).lat+','+data.rows.item(i).lng,
              userid:data.rows.item(i).iduser,
              temperature:0,
              humidity:0,
              weatherstate:'null',
              media2upload:observationMedia,
              media:[]
            }
            this.offlineObservations.push(observation);
          }
          console.log(this.offlineObservations);
        })
      });
      
  }
}

  removeOfflineObservation(id){

    console.log("removing offline observation");

    let confirm = this.alertCtrl.create({
      title: 'Remove this observation?',
      message: 'Do you want to remove this pending observation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.sqlite.create({
              name: 'phenologit.db',
              location: 'default'
            })
            .then((db: SQLiteObject) => {
              db.executeSql('DELETE FROM observations_offline WHERE id="'+id+'"', {})
              .then((data) => {
                console.log("deleted!");
              });
              db.executeSql('DELETE FROM observations_offline_media WHERE idobservation="'+id+'"', {})
              .then((data) => {
                console.log("deleted!");
              });
              
              //reload offline observations
              this.offlineObservations=[];
              //publish event
              this.events.publish('offline:observations');
              
              this.getOfflineObservations();
            });
          }
        }
      ]
    });

    confirm.present();
    
  }

  uploadObservation(id){
    this.uploadFiles(id);
  }

  showLoading(msg){
    this.ld = this.loadingCtrl.create({
      content: msg,
      spinner: 'dots'
    });
  
    this.ld.present();
  }

  uploadFiles(id) {
    //uploads file/s and resize in server

    this.showLoading('uploading');

    //seach in the array for observation
    var observation;
    for( var i = 0, len = this.offlineObservations.length; i < len; i++ ) {
        if( this.offlineObservations[i].id === id ) {
            observation = this.offlineObservations[i];
            console.log(observation);
            break;
        }
    }   

    const fileTransfer: FileTransferObject = this.transfer.create();
    var self=this;

    var count=0;
  
    for(var image of observation.media2upload){

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
        console.log("uploaded: "+observation.media2upload[count].media_url);
        this.ld.dismiss();
        observation.media.push(observation.media2upload[count].media_prefix+'_'+observation.media2upload[count].media_url.substr(observation.media2upload[count].media_url.lastIndexOf('/')+1));
        count ++;

        if(count==observation.media2upload.length){ //save it to database when all the images are uploaded
          this.saveDB(observation);
          console.log('subo to api en count: '+count);
        }
        
      }, (err) => {
        console.log(err);
      })

      let onProgress =  (progressEvent: ProgressEvent) : void => {
        this.ngZone.run(() => {
          this.ld.setContent('uploading picture: '+Math.round((progressEvent.loaded / progressEvent.total) * 100)+' %');
        });
      }
      
      fileTransfer.onProgress(onProgress);

    }
  } 

  //saves to api and return to the main page
  saveDB(observation){

    console.log(JSON.stringify(observation));

    this.phenoApi.postObservation(observation).subscribe(
      data => {console.log(JSON.stringify(data))},
      err => console.log(JSON.stringify(err)),
      () => {
        console.log('observation created successfully!');
      
        this.sqlite.create({
          name: 'phenologit.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM observations_offline WHERE id="'+observation.id+'"', {})
          .then((data) => {
            console.log("observation deleted!");
            this.offlineObservations=[];
            this.getOfflineObservations();
          });
          db.executeSql('DELETE FROM observations_offline_media WHERE idobservation="'+observation.id+'"', {})
              .then((data) => {
                console.log("observation media deleted!");
                this.offlineObservations=[];
                this.getOfflineObservations();
              });
        });

        this.navCtrl.setRoot('ObservationListPage',{created:true});
      }
    );

  }

}
