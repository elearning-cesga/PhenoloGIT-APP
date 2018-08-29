import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObservationMapPage } from './observation-map';

@NgModule({
  declarations: [
    ObservationMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ObservationMapPage),
  ],
})
export class ObservationMapPageModule {}
