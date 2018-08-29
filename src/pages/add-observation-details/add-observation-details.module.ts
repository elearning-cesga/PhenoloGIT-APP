import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddObservationDetailsPage } from './add-observation-details';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule,Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AddObservationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddObservationDetailsPage),
    TranslateModule.forChild({
      loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
              }
    })
  ],
})
export class AddObservationDetailsPageModule {}
