import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PhenoApi } from '../../providers/pheno-api/pheno-api';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ObservationSpecieFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observation-specie-filter',
  templateUrl: 'observation-specie-filter.html',
})
export class ObservationSpecieFilterPage {

  private species:any;
  private loading:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi: PhenoApi,
    public translate: TranslateService,
    public loadingCtrl:LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationSpecieFilterPage');
    this.getSpecies();
  }

  getSpecies(){

    this.presentLoading();

    this.phenoApi.getSpecies().subscribe(
        data => {this.species=data},
        err => {
          console.error('error'),
          this.loading.dismiss()
        },
        () => {
          console.log(this.species),
          this.loading.dismiss()
        }
      );
  }

  presentLoading() {
    //present loading function
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
  }

  openListPage(id){
    console.log("filtering by id "+id);
    this.navCtrl.push('ObservationListPage',{filter:id});
  }

}
