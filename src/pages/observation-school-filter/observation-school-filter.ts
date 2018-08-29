import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhenoApi} from '../../providers/pheno-api/pheno-api';

/**
 * Generated class for the ObservationSchoolFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observation-school-filter',
  templateUrl: 'observation-school-filter.html',
})
export class ObservationSchoolFilterPage {

  private schools:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public phenoApi:PhenoApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationSchoolFilterPage');
    this.getSchools();
  }

  getSchools(){
    this.phenoApi.getSchools().subscribe(
        data => {this.schools=data},
        err => console.log('error '+this.schools),
        () => console.log(this.schools)
      );
  }

  openListPage(school){
    console.log("filtering by school "+school);
    this.navCtrl.push('ObservationListPage',{school:school});
  }

}
