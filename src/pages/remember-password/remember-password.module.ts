import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RememberPasswordPage } from './remember-password';

@NgModule({
  declarations: [
    RememberPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RememberPasswordPage),
  ],
})
export class RememberPasswordPageModule {}
