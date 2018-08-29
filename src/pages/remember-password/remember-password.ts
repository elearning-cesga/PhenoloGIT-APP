import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the RememberPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remember-password',
  templateUrl: 'remember-password.html',
})
export class RememberPasswordPage {

  private recoveryEmail:any;
  private data:any;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public phenoApi: PhenoApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberPasswordPage');
  }

  resetPassword(){

    this.phenoApi.resetPassword(this.recoveryEmail).subscribe(
      data => {this.data=data},
      err => console.error(err),
      () => {
        if(this.data.errors!='null'){
          switch (this.data.errors){
            case '1':
              this.presentAlert('Error!','This email does not exists in our database!');
              break;
            case '2':
              this.presentAlert('Error!','This email was used to register a group account. Please contact with your teacher in order to change the password');
              break;
          }
        }else{
          this.presentAlert('Password reset','Your password was reset succesfully. Please check your email to view the new details of your account.');
          console.log('password changed for '+this.recoveryEmail+' to '+this.data.newPassword)
          this.navCtrl.push('LoginPage');
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

}
