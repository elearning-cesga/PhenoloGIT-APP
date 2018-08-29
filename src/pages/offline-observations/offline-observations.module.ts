import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineObservationsPage } from './offline-observations';

@NgModule({
  declarations: [
    OfflineObservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineObservationsPage),
  ],
})
export class OfflineObservationsPageModule {}
