import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { Crop } from '@ionic-native/crop';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import * as L from 'leaflet';


/**
 * Generated class for the AddObservationMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-observation-media',
  templateUrl: 'add-observation-media.html',
})
export class AddObservationMediaPage {

  @ViewChild(Slides) slider: Slides;

  private mediaToUpload:any = 0;
  private observation:any;
  private showDefault:any;
  private showActions:any='none';
  private selectedPictureId:any;
  private cover:any;
  private networkStatus:any;

  //strings
  private str_add_media_error:any;
  private str_add_media_error_subtitle:any;
  private str_cancel:any;
  private str_delete:any;
  private str_confirm_deletion:any;
  private str_confirm_deletion_subtitle:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private translate: TranslateService,
    private camera:Camera,
    private nativeStorage: NativeStorage,
    private crop: Crop,
    private el:ElementRef,
    private alertCtrl: AlertController,
    private network: Network,
    private events:Events,
    private file:File
  ) {
    this.mediaToUpload=[];
    this.observation={};
    this.observation.title=null;
    this.observation.description=null;
    this.showDefault=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddObservationMediaPage');
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
      value => {this.str_add_media_error= value}
    )

    this.translate.get('ADD_MEDIA_ERROR_2').subscribe(
      value => {this.str_add_media_error_subtitle= value}
    )

    this.translate.get('CANCEL').subscribe(
      value => {this.str_cancel= value}
    )

    this.translate.get('DELETE').subscribe(
      value => {this.str_delete= value}
    )

    this.translate.get('DELETE_MEDIA').subscribe(
      value => {this.str_confirm_deletion= value}
    )

    this.translate.get('DELETE_MEDIA_SUB').subscribe(
      value => {this.str_confirm_deletion_subtitle= value}
    )
  }

  loadFromStorage(){
    this.nativeStorage.getItem('observation')
      .then(
        data => {console.log('in storage: '+JSON.stringify(data)),this.observation=data},
        error => console.error(error)
    );
  }

  takePicture(){
    var self=this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      targetHeight:1024,
      targetWidth:1024,
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData+' é imaxe, so cropping...');
      //crop the image and store in the mediaToUpload array
      this.crop.crop(imageData).then(
        newImage =>  {console.log('newImage: '+newImage),this.mediaToUpload.push({id:this.mediaToUpload.length,media_url:newImage,media_type:'picture',media_prefix:Date.now()})},
        error => console.error('Error cropping image', error)
      )
     
      //timeout to wait until the slide is created by the system
      var self=this;
     
      this.showDefault=false;
     }, (err) => {
      console.log(err);
      // Handle error
     });
  }

  takePictureFromGallery(){ //takes picture from gallery
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
        targetHeight:1024,
        targetWidth:1024,
        mediaType: this.camera.MediaType.ALLMEDIA, //only pictures by now
    }).then((imageData) => {

        let ext = imageData.split('.').pop(); //get the extension of the file

        if(ext=='mp4'){ //is a video?
          this.mediaToUpload.push({media_url:imageData,media_type:'video',media_prefix:Date.now()});
          
        }else{ //or a image??
          //crop the image and store in the mediaToUpload array
          console.log(imageData+' é imaxe, so cropping...');
          this.file.resolveLocalFilesystemUrl(imageData).then(entry => { //resolve url needed for ios
            this.crop.crop(entry.toURL()).then(
            newImage =>  {console.log('newImage: '+newImage),this.mediaToUpload.push({id:this.mediaToUpload.length,media_url:newImage,media_type:'picture',media_prefix:Date.now()})},
            error => console.error('Error cropping image', error)
          )
          })
          
        }

        //timeout to wait until the slide is created by the system
        var self=this;
               
        this.showDefault=false;

    }, (err) => {
        console.log(err);
    });
  }
  
  presentAlert(msg,subTitle) {
    let alert = this.alertCtrl.create({
      title: msg,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present();
  }
  
  presentDeleteConfirm() {
  let alert = this.alertCtrl.create({
    title: this.str_confirm_deletion,
    message: this.str_confirm_deletion_subtitle,
    buttons: [
      {
        text: this.str_cancel,
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: this.str_delete,
        handler: () => {
          console.log('Buy clicked');
          this.deletePicture();
        }
      }
    ]
  });
  alert.present();
}

  selectPicture(event){
    this.showActions='inline-block';
    var img=document.getElementsByClassName('imgp');
    for(let i=0;i<img.length;i++){
      img[i].classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
    this.selectedPictureId=event.currentTarget.getAttribute('id'); 
  }

  setAsCover(){
    this.cover=this.mediaToUpload[this.selectedPictureId].media_prefix+'_'+this.mediaToUpload[this.selectedPictureId].media_url.substr(this.mediaToUpload[this.selectedPictureId].media_url.lastIndexOf('/')+1);
    console.log('change cover to: '+this.cover);
    //hide all stars
    var star=document.getElementsByClassName('imgstar');
    for(let i=0;i<star.length;i++){
      star[i].classList.remove('visible');
      star[i].classList.add('hidden');
    }

    //make visible this
    let img=document.getElementById('star_'+this.selectedPictureId);
    console.log('showing '+img);
    img.classList.remove('hidden');
    img.classList.add('visible');
  }

  deletePicture(){
    //searches in the array and return position
    var index = this.mediaToUpload.findIndex(obj => obj.id==this.selectedPictureId);
    //delete the item in this position
    this.mediaToUpload.splice(index,1);
  }

  openMapPage(){
    //check that there is at least one image
    if(this.mediaToUpload.length==0){
      this.presentAlert(this.str_add_media_error,this.str_add_media_error_subtitle)
    }else{
      //get observation storage
      this.nativeStorage.getItem('observation')
        .then(
          data => this.saveData(data),
          error => console.error(error)
      );
    }
  }

  showAlert(title,subtitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  saveData(data){

    //check that at least one image
    if (this.mediaToUpload.length!=0){
      
      console.log('saving media...');
      //if no cover is set, the first image will be used as cover
      if(this.cover=='' || this.cover==undefined){
        this.cover=this.mediaToUpload[0].media_prefix+'_'+this.mediaToUpload[0].media_url.substr(this.mediaToUpload[0].media_url.lastIndexOf('/')+1);
      }
      
      this.nativeStorage.setItem('observation',{specie:data.specie,stage:data.stage,title:this.observation.title,description:this.observation.description,mediaToUpload:this.mediaToUpload,cover:this.cover});
      this.navCtrl.push('AddObservationMapPage');

    }else{
      this.showAlert('No media added!','Need at least one image for your observation')
    }
    
  }

}
