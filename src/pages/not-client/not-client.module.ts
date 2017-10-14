import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotClient } from './not-client';

@NgModule({
  declarations: [
    NotClient,
  ],
  imports: [
    IonicPageModule.forChild(NotClient),
  ],
  exports: [
    NotClient
  ]
})
export class NotClientModule {}
