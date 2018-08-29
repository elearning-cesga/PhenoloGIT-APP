import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
import { PhenoApi } from '../providers/pheno-api/pheno-api';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ObservationListPage';

  pages: Array<{icon:string,title: string, component: any, parameters:any}>;
  public user:any={};
  public notifications:any=0;
  public notificationsPage:any;
  public profilePage:any;
  public networkStatus:number=1;
  private species:any;
  private stages:any;
  private notificationInterval:any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public nativeStorage: NativeStorage,
    public events:Events,
    private phenoApi:PhenoApi,
    private network: Network,
    private sqlite: SQLite,
    private transfer: FileTransfer, 
    private file: File
  ) {
    this.initializeApp();

  }

  checkNotifications(){ //check for notifications
    this.phenoApi.getNotifications(this.user.id).subscribe(
        data => {this.notifications=data},
        err => console.log(err),
        () => {
          this.events.publish('notificationsCount',this.notifications.length)
        }
      );
      //console.log('checking notifications...')
  }

  getUserFromStorage(){
    console.log("getting user from storage");
    this.nativeStorage.getItem('user')
    .then(
      data => {
        this.user=data,
        console.log(data)
      },
      error => console.error(error)
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#689F38');
      this.splashScreen.hide();

      // watch network for a disconnection and throw event
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.events.publish('network:disconnected');
      this.networkStatus=0;
    });

    // watch network for a reconnection and throw event
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.events.publish('network:connected');
      this.networkStatus=1;
    });

    //page notifications
    this.notificationsPage = {
      component:'NotificationsPage',
      openmethod: 'push'
    }

    //page profile
    this.profilePage = {
      component:'ProfilePage',
      openmethod: 'push'
    }

    //saves data in the device for using the app in offline mode
    this.getDataToStoreOffline();

    //checks if there are any observations pending
    this.checkForOfflineObservations();

    // used for an example of ngFor and navigation
    this.pages = [
      {icon: 'list-box', title: 'List Observation', component: 'ObservationListPage', parameters:'null'},
      {icon: 'map', title: 'Map of observations', component: 'ObservationMapPage', parameters:'null'},
      {icon: 'pricetags', title: 'Observations by specie', component: 'ObservationSpecieFilterPage', parameters:'null'},
      {icon: 'school', title: 'Observations by school', component: 'ObservationSchoolFilterPage', parameters:'null'},
      {icon: 'add-circle', title: 'Add new observation', component: 'AddObservationPage', parameters:'null'},
      {icon: 'contact', title: 'Profile - Settings', component: 'ProfilePage', parameters:'null'},
      {icon: 'notifications', title: 'Notifications', component: 'NotificationsPage', parameters:'null'}
    ];

    //get the details of the logged user
    this.getUserFromStorage();

    //check notifications for current user
    this.checkNotifications();

    //Listen for notifications every 5 secs.
    var self=this;
    this.notificationInterval=setInterval(function(){
       self.checkNotifications()
    }, 5000);
    
    //listen for user logout event
    this.events.subscribe('user:logout', (e) => {
      this.user.name=null;
      console.log('clearing interval...')
      //cancel checking for notification if log out
      clearInterval(this.notificationInterval);
    });

    //listen for user logout event
    this.events.subscribe('offline:observations', (e) => {
      this.checkForOfflineObservations();
      //cancel checking for notifications if offline
      clearInterval(this.notificationInterval);
    });

    //listen for user logout event
    this.events.subscribe('user:login', (e) => {
      console.log('login event fired!');
      this.getUserFromStorage();
      this.notificationInterval=setInterval(function(){
        self.checkNotifications()
     }, 5000);
    });

     //listen for user logout event
     this.events.subscribe('user:update', (e) => {
      console.log('update event fired!');
      this.getUserFromStorage()
    });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  //do logout
  logout(){
    this.user.name=null;
    this.nav.push('LoginPage',{logout:true});
  }

  login(){
    this.nav.push('LoginPage',{destination:'ObservationListPage'});
  }

  clearOfflineObservations(){
    this.sqlite.create({
      name: 'phenologit.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('DROP TABLE observations_offline', {})
      .then((data) => {
        console.log('DROP TABLE observations_offline');
      })
      .catch(e => console.log(e));

      db.executeSql('DROP TABLE observations_offline_media', {})
      .then((data) => {
        console.log('DROP TABLE observations_offline_media');
      })
      .catch(e => console.log(e));
    });

  }

  //check if there are any pending observations stored in the device
  checkForOfflineObservations(){

    if(this.networkStatus==1){
      this.sqlite.create({
        name: 'phenologit.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM observations_offline', {})
        .then((data) => {
          //publish event
          this.events.publish('observations:offline',data.rows.length);
        })
        .catch(e => console.log(e));

        
      });
  }
}

  //save species to sql storage in order to use it when no connection
  saveOfflineData(){ 

    let self=this;
    
    console.log("saving offline data-...")
    
    if(this.networkStatus==1){
        this.sqlite.create({
        name: 'phenologit.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        //Drop and re-create the tables for instance
        db.executeSql('DROP TABLE species_offline', {})
            .then(() => console.log('DROP TABLE species_offline'))
            .catch(e => console.log(e));

        db.executeSql('DROP TABLE stages_offline', {})
            .then(() => console.log('DROP TABLE stages_offline'))
            .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS species_offline (id INTEGER PRIMARY KEY, name TEXT, name_en TEXT, name_es TEXT, name_gl TEXT, name_lt TEXT, name_dk TEXT, desc_en TEXT , desc_es TEXT , desc_gl TEXT ,desc_lt TEXT , desc_dk TEXT, thumbnail VARCHAR(254), pictures TEXT, stages TEXT)', {})
            .then(() => console.log('CREATE TABLE IF NOT EXISTS species_offline'))
            .catch(e => console.log(e));

        db.executeSql('CREATE TABLE IF NOT EXISTS stages_offline (id INTEGER PRIMARY KEY, stage_id INTEGER, idspecie INTEGER, stage_en TEXT, stage_es TEXT,stage_gl TEXT, stage_lt TEXT, stage_dk TEXT)', {})
            .then(() => console.log('CREATE TABLE IF NOT EXISTS stages_offline'))
            .catch(e => console.log(e));

        db.executeSql('DROP TABLE u_specie_stage_offline', {})
            .then(() => console.log('DROP TABLE u_specie_stage_offline'))
            .catch(e => console.log(e)); 

        db.executeSql('CREATE TABLE IF NOT EXISTS u_specie_stage_offline (id INTEGER PRIMARY KEY AUTOINCREMENT, idstage INTEGER, idspecie INTEGER, stage_sc TEXT, stage_en TEXT,stage_es TEXT,stage_lt TEXT,stage_dk TEXT,stage_gl TEXT, desc_en TEXT, desc_es TEXT, desc_lt TEXT, desc_dk TEXT, stage_picture TEXT)', {})
            .then(() => console.log('CREATE TABLE IF NOT EXISTS u_specie_stage_offline'))
            .catch(e => console.log(e));

        //insert species in table
        this.species.forEach(function(specie) {
          
          //console.log(JSON.stringify(specie))
          self.phenoApi.getSpecieDetails(specie.id).subscribe(
            data => {
              //aqui o insert
              data[0].stages.forEach(function(stage) {
                //console.log("stage-> "+JSON.stringify(stage.stage_en));
                let sql="INSERT INTO u_specie_stage_offline (idstage, idspecie, stage_sc , stage_en ,stage_es ,stage_lt ,stage_dk ,stage_gl, desc_en, desc_es, desc_lt, desc_dk,stage_picture) VALUES ('"+stage.stage_id+"','"+specie.id+"','"+stage.stage_sc+"','"+stage.stage_en+"','"+stage.stage_es+"','"+stage.stage_lt+"','"+stage.stage_dk+"','"+stage.stage_gl+"','"+stage.desc_en+"','"+stage.desc_es+"','"+stage.desc_lt+"','"+stage.desc_dk+"','"+stage.stage_picture+"')";
                db.executeSql(sql, {})
                  .then(() => {})
                  .catch(e => console.error('error inserting in db '+JSON.stringify(e)));
              });
            },
            err => {},
            () => {}
          );
          
          let sql="INSERT INTO species_offline (id,name, name_en,name_es, name_gl, name_lt,name_dk,desc_en,desc_es,desc_gl,desc_lt,desc_dk,thumbnail,pictures,stages) VALUES ('"+specie.id+"','"+specie.name+"','"+specie.name_en+"','"+specie.name_es+"','"+specie.name_gl+"','"+specie.name_li+"','"+specie.name_de+"','"+specie.desc_en+"','"+specie.desc_es+"','"+specie.desc_gl+"','"+specie.desc_li+"','"+specie.desc_de+"','"+specie.thumbnail+"','"+specie.picture+"','"+specie.stages+"')";
          db.executeSql(sql, {})
            .then(() => {})
            .catch(e => console.error(e));
        })

        //insert stages in table
        this.stages.forEach(function(stage) {
          let sql2="INSERT INTO stages_offline (stage_id, idspecie, stage_en,stage_es,stage_gl,stage_lt,stage_dk) VALUES ('"+stage.id+"','"+stage.idspecie+"','"+stage.name_en+"','"+stage.name_es+"','"+stage.name_gl+"','"+stage.name_lt+"','"+stage.name_dk+"')";
          db.executeSql(sql2, {})
            .then(() => {})
            .catch(e => console.error(e));
        })
      })
      .catch(e => console.log(e));

      //download files to store offline
      this.downloadPictures();
     }
  }

  //download pictures for offline use
  downloadPictures(){
    var self=this;
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.species.forEach(function(specie) {
   
      let url="[[YOUR_UPLOAD_FOLDER]]species/"+specie.picture;
      let thisSpecie;

      fileTransfer.download(url, self.file.dataDirectory + specie.picture).then((entry) => {
        //console.log('download specie complete: ' + entry.toURL());

        self.phenoApi.getSpecieDetails(specie.id).subscribe(
          data => {thisSpecie=data[0]},
          err => {},
          () => {
            thisSpecie.stages.forEach(stage => {
              let url="[[YOUR_UPLOAD_FOLDER]]stages/"+stage.stage_picture;
              fileTransfer.download(url, self.file.dataDirectory+"/stages/"+stage.stage_picture).then((entry) => {
                //console.log('    - download stage complete: ' + entry.toURL());
              }, (error) => {
                console.error('Error downloading stage '+stage.stage_picture+' '+JSON.stringify(error))
              });
            });
          }
        );
      }, (error) => {
        console.error('Error downloading specie'+specie.picture)
      });
    })
    
  }
   
  //get data to store offline
  getDataToStoreOffline(){
    //save species list
    this.phenoApi.getSpecies().subscribe(
        data => {
          this.species=data
        },
        err => console.log(err),
        () => {
          //save stages list
          this.phenoApi.getStages().subscribe(
              data => {
                this.stages=data
              },
              err => console.log(err),
              () =>  this.saveOfflineData()
            );
          }
      );
      
    
    
  }
}