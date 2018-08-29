import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  private notifications:any=[];
  private user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi: PhenoApi,
    public alertCtrl: AlertController,
    private nativeStorage:NativeStorage
  ) {

    this.notifications.error='1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data;
        console.log('user stored-> '+JSON.stringify(data))
        this.getNotifications(this.user.id);
      },
      error => console.error(error)
    );
    
  }

  getNotifications(iduser){
    this.phenoApi.getNotifications(iduser).subscribe(
        data => {this.notifications=data},
        err => console.log(err),
        () => console.log(this.notifications)
      );
  }

  openObservationPage(notification){
    this.markAsRead(notification);
    this.navCtrl.push('ObservationPage',{id:notification.idobservation});
  }

  markAsRead(notification){
    console.log('marking:');
    console.log(notification);

    this.phenoApi.markNotificationAsRead(notification).subscribe(
          data => {this.notifications=data},
          err => console.log(err),
          () => console.log('done')
        );

  }

  markAllAsRead(){
    console.log('marking all for user '+this.user.id);
    
    let alert = this.alertCtrl.create({
      title: 'Mark all as read',
      buttons: [
        {
          text: 'yes',
          handler: () => {
             this.phenoApi.markAllAsRead(this.user.id).subscribe(
              data => {this.notifications=data},
              err => console.log(err),
              () => console.log('done')
            );
          }
        },
        {
          text: 'no',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
        
    alert.present();
    
  }
  

}
