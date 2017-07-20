import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiftRecords } from './lift-records';

@NgModule({
  declarations: [
    LiftRecords,
  ],
  imports: [
    IonicPageModule.forChild(LiftRecords),
  ],
  exports: [
    LiftRecords
  ]
})
export class LiftRecordsModule {}
