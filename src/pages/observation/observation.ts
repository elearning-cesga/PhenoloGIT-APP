import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from '@ngx-translate/core';
import { Content } from 'ionic-angular';

import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the ObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observation',
  templateUrl: 'observation.html',
})
export class ObservationPage {

  @ViewChild(Content) content: Content;

  private observationId:Number;
  private userId:any; //logged in user id
  private observation:any;
  private isEditting: any; 
  private comments: any;
  private lang: any;
  private user:any={
    type:3
  };
  private message:any;
  private response:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private nativeStorage: NativeStorage,
    private phenoApi: PhenoApi,
    private translate: TranslateService,
    private socialSharing: SocialSharing,
    private toastCtrl:ToastController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl:AlertController,
    private platform: Platform
  
  ) {

    this.observationId = this.navParams.get('id'); //getting the observatin id parameter
    this.observation={};
    this.isEditting=false;
    this.comments=[];

    this.lang='en';

    this.translate.setDefaultLang(this.lang);

    this.translate.get('ERROR').subscribe(
      value => {
        // value is our translated string
        console.log("wheather status "+value);
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationPage '+this.observationId);
    this.getObservationDetails();
    this.getUserFromStorage();
    this.user.type=3; //3 by default
  }

  getUserFromStorage(){
    // console.log("getting user from storage");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        console.log(data),
        this.user=data},
      error => console.error(error)
    );
  }

  getObservationDetails(){ //getting observation's details from API
  
    console.log("getting observation details from API!");

    this.phenoApi.getObservationDetails(this.observationId,'null').subscribe(
      data => {this.observation=data[0]},
      err => console.error(err),
      () => {this.showObservationDetails(),this.getObservationComments()}
    );
  }

  showObservationDetails(){ //something to do when observations is retrieved? stats?
    
    console.log(this.observation)
    
  }

  getObservationComments(){
    console.log("getting observation comments from API!");
    this.phenoApi.getObservationComments(this.observationId).subscribe(
      data => {this.comments=data.comments,this.observation.comments=data.count},
      err => console.error(err),
      () => console.log(this.comments)
    );
  } 

  openShareDialog(message, subject, file, url){
    this.socialSharing.share(message, subject, file, url)
  }

  //view observation in map
  viewInMap(){
    this.navCtrl.push('ObservationMapPage',{observation:this.navParams.get('id')})
  }

  //like observation
  liked(){
    console.log("liked!");
        if(this.user.id=='null' || this.user.id==undefined){
          this.navCtrl.push('LoginPage',{destination:ObservationPage,id:this.navParams.get('id')});
        }else{
            let like={
              iduser:parseInt(this.user.id),
              idobservation:this.navParams.get('id'),
            }

            this.phenoApi.postLike(like).subscribe( //post comment trought api
              data => {this.observation.likes=data.likes,this.observation.userLikes=data.liked},
              err => console.error(err),
              () => this.getObservationComments()  //refresh the comments
            );

        }
  }

  sendComment(){ //send comment function

    this.nativeStorage.getItem('user').then((user) => { //check if user is logged
        if(user.id=='null' || user.id==undefined){
          this.navCtrl.push('LoginPage',{destination:ObservationPage,id:this.navParams.get('id')});
        }else{

          if(this.message!=""){

            let sentcomment={
              iduser:parseInt(user.id),
              idobservation:this.navParams.get('id'),
              comment:this.message
            }

            this.phenoApi.postComment(sentcomment).subscribe( //post comment trought api
              data => {this.response=data},
              err => console.error(err),
              () => this.getObservationComments()  //refresh the comments
            );
            
            this.content.scrollToBottom(); //scroll to bottom
            
            this.message = null; //clears the input
            
          }   

          let toast = this.toastCtrl.create({
            message: 'Comment was added successfully',
            duration: 2000
          });

          toast.present();
        }
    });
  }
  
  showActions(){
    switch(this.user.type){
      case 1:
        this.showActionsForAdmins();
        break;
      
      case 2:
        this.showActionsForTeacher();
        break;
    }
  }
  
  showActionsForTeacher(){
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Actions for teachers',
     buttons: [
       {
         text: 'Validate',
         icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
         handler: () => {
           console.log('Validate clicked');
           this.validateObservation(this.observationId);
         }
       },
       {
        text: 'Best example',
        icon: !this.platform.is('ios') ? 'ribbon' : null,
        handler: () => {
          console.log('best example clicked');
          this.bestExample(this.observationId);
        }
      },
       {
         text: 'Remove',
         role: 'destructive',
         icon: !this.platform.is('ios') ? 'trash' : null,
         handler: () => {
           console.log('remove clicked');
           this.deleteObservation(this.observationId,this.userId)
         }
       }
     ]
   });
   
   actionSheet.present();
  }
  
  showActionsForAdmins(){
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Actions for Admins',
     buttons: [
       {
         text: 'Validate',
         icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
         handler: () => {
           console.log('Validate clicked');
           this.validateObservation(this.observationId);
         }
       },
       {
        text: 'Best example',
        icon: !this.platform.is('ios') ? 'ribbon' : null,
        handler: () => {
          console.log('Best example clicked');
          this.bestExample(this.observationId);
        }
      },
       {
         text: 'Delete',
         icon: !this.platform.is('ios') ? 'trash' : null,
         role: 'destructive',
         handler: () => {
           this.deleteObservation(this.observationId,this.userId)
         }
       },
       {
        text: 'Cancel',
        handler: () => {
        }
      }
     ]
   });
   
   actionSheet.present();
  }

  deleteObservation(id,iduser){

    let confirm = this.alertCtrl.create({
      title: 'Delete observation',
      message: 'Are you sure to delete this observation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this.phenoApi.deleteObservation(id,iduser).subscribe(
              data => {},
              err => console.log(err),
              () => this.navCtrl.setRoot('ObservationListPage')
            );
          }
        }
      ]
    });

    confirm.present()
  }

  //delete comment
  deleteComment(id){
    console.log("deleting comment "+id);

    this.phenoApi.deleteComment(id).subscribe( //post comment trought api
      data => {
        this.comments=data.comments,
        this.observation.comments=data.count
      },
      err => console.log(err),
      () => this.getObservationComments()  //refresh the comments
    );

  }

  //mark as best example
  bestExample(id){

    if(this.user.id=='null' || this.user.id==undefined){
      this.navCtrl.push('LoginPage',{destination:ObservationPage,id:this.navParams.get('id')});
    }else{

        let best_example={
          iduser:parseInt(this.user.id),
          idobservation:this.navParams.get('id'),
        }

        this.phenoApi.postBestExample(best_example).subscribe( 
          data => {},
          err => console.error(err),
          () => {
            this.observation.bestexample=1;
            let toast = this.toastCtrl.create({
              message: 'Observation marked as best example',
              duration: 2000
            });
        
            toast.present();
          }
        );

    }

    
  }

  //validate observation
  validateObservation(id){

    console.log("validated! "+id);

    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data;
        console.log(data);
        if(this.user.id=='null' || this.user.id==undefined){
          console.log("not validated...");
          this.navCtrl.push('LoginPage',{destination:ObservationPage,id:this.navParams.get('id')});
        }else{
          console.log("validating...");

            let validation={
              iduser:parseInt(this.user.id),
              idobservation:this.navParams.get('id'),
            }

            this.phenoApi.postValidation(validation).subscribe( //post comment trought api
              data => {
                this.observation.validations=data.validations,
                this.observation.userValidates=data.userValidates
              },
              err => console.log(err),
              () => console.log(this.observation)  //refresh the comments
            );
          }
      },
      error => console.error(error)
    );
    
         }

}
