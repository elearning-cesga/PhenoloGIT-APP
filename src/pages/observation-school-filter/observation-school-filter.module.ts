import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObservationSchoolFilterPage } from './observation-school-filter';

@NgModule({
  declarations: [
    ObservationSchoolFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ObservationSchoolFilterPage),
  ],
})
export class ObservationSchoolFilterPageModule {}
