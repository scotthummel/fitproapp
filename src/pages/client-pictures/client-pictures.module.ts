import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPictures } from './client-pictures';

@NgModule({
  declarations: [
    ClientPictures,
  ],
  imports: [
    IonicPageModule.forChild(ClientPictures),
  ],
  exports: [
    ClientPictures
  ]
})
export class ClientPicturesModule {}
