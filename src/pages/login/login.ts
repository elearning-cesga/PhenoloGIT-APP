import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginUser:any={};
  private loginData:any;
  private logout:any;
  private destination:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi:PhenoApi,
    private nativeStorage:NativeStorage,
    public events:Events,
    private alertCtrl:AlertController
  ) {

    this.logout=this.navParams.get('logout');
    if(this.logout==true){
      this.logoutUser();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.destination=this.navParams.get('destination');
  }

  login(){
    this.phenoApi.login(this.loginUser).subscribe(
      data => {this.loginData=data},
      err => console.error(err),
      () => {
        if(this.loginData.token!='null'){
          this.saveUserAndRedirect(this.loginData[0])
        }else{
          this.presentAlert('Error!','Username or password incorrect!');
        }
        
      }
    );
  }

  presentAlert(msg,subTitle) {
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  saveUserAndRedirect(data){
    console.log(data);
    this.nativeStorage.setItem('user',{
      username:data.username,
      name:data.name,
      lang:data.lang,
      picture:data.picture,
      id:data.userid,
      school:data.school,
      type:data.type,
      email:data.email
    }).then(
      () => {
        console.log('Stored item!'),
        this.events.publish('user:login') //publish the login event
      },
      error => console.error('Error storing item', error)
    );
     
     console.log("sending to "+this.destination)
     if(this.destination==undefined){
        this.navCtrl.setRoot('ObservationListPage');
     }else{
        this.navCtrl.setRoot(this.destination);
     }
    
  }

  //do the logout
  logoutUser(){
    this.nativeStorage.setItem('user',{
      username:null,
      name:null,
      lang:'en',
      picture:null,
      id:null,
      school:null,
      type:null,
      email:null,
    }).then(
      () => {
        console.log('deleted item!'),    
        this.events.publish('user:logout') //publish the logout event
      },
      error => console.error('Error storing item', error)
    );

  }

  rememberPassword(){
    this.navCtrl.push('RememberPasswordPage');
  }

}
