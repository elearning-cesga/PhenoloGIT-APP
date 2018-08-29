import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';
import { PhenoApi } from '../../providers/pheno-api/pheno-api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user:any={};
  private imageChanged:any;
  private imageToUpload:any={media_url:''};
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage,
    private camera: Camera,
    private phenoApi: PhenoApi,
    private transfer: FileTransfer,
    private events:Events,
    private toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.imageChanged=0;
  }

  ionViewWillLoad(){
    console.log("checking user login before entering...");
    this.getUserFromStorage();
  }

  getUserFromStorage(){
    console.log("getting user from storage");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data;
        console.log('got from storage: '+JSON.stringify(data));
        if(this.user.username==null || this.user.username==undefined){
          this.navCtrl.push('LoginPage',{destination:'ProfilePage'});
        }
      },
      error => {
        this.navCtrl.push('LoginPage',{destination:'ProfilePage'});
        console.error(error)}
    );
  }

  changeProfilePicture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
        mediaType: this.camera.MediaType.ALLMEDIA, //only pictures by now
    }

    this.camera.getPicture(options).then((imageData) => {

      this.imageToUpload.media_url=imageData;
      this.imageToUpload.media_prefix=Date.now();

      this.user.picture=this.imageToUpload.media_url;
      this.imageChanged=1;

    }, (err) => {
        console.log(err);
    });

  }

  saveSettings(){
   
    console.log('saving settings');

    if(this.imageToUpload.media_url!=''){
      this.uploadProfilePicture(); //upload picture to /uploads/avatar/ in server
      let fileName = this.imageToUpload.media_url.split("/");
      this.user.picture=this.imageToUpload.media_prefix+'_'+fileName.pop(); //file path formatting 
    }else{
      console.log('not uploading image');
    }

    console.log(this.user);

    //call to API to update user settings
    this.phenoApi.updateUser(this.user).subscribe(
        data => {console.log("response-> "+data)},
        err => {},
        () => {
          this.nativeStorage.setItem('user',{
            username:this.user.username,
            name:this.user.name,
            lang:this.user.lang,
            picture:this.user.picture,
            id:this.user.id,
            school:this.user.school,
            type:this.user.type,
            email:this.user.email
          }).then(
            () => {
              console.log('Stored item!')
              this.events.publish('user:update') //publish the login event
            },
            error => console.error('Error storing item', error)
          );
    
          //present toast
          this.presentToast('Profile updated successfully');
          
          //go to main page
          this.navCtrl.setRoot('ObservationListPage');
    
        }
      );

      
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
  }

   uploadProfilePicture() { //uploads file/s and resize in server

     console.log('uploading picture...');

      var fileURL = this.imageToUpload.media_url;
      var prefix = this.imageToUpload.media_prefix;

      var uri = encodeURI("[[YOUR_UPLOADER_FILE]]"); //url of the server's php upload file
      
      var up_options : FileUploadOptions={
        fileKey: 'bill',
        fileName: fileURL.substr(fileURL.lastIndexOf('/')+1),
        headers: headers,
        mimeType : "text/plain",
        params:params
      };
      
      var params = {
        'prefix':prefix,
        'isAvatar':'true'
      };
   
      up_options.params = params;

      var headers = {'prefix':prefix,'isAvatar':'true'};
      up_options.headers = headers;

      var ft = new FileTransfer();
      const fileTransfer: FileTransferObject = this.transfer.create();

      var uri = encodeURI("[[YOUR_UPLOADER_FILE]]");
 
         fileTransfer.upload(fileURL, uri, up_options).then((data)=>{
        console.log(data)
      });

      
}

}
