import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientRecords } from './client-records';

@NgModule({
  declarations: [
    ClientRecords,
  ],
  imports: [
    IonicPageModule.forChild(ClientRecords),
  ],
  exports: [
    ClientRecords
  ]
})
export class ClientRecordsModule {}
