import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditInjury } from './edit-injury';

@NgModule({
  declarations: [
    EditInjury,
  ],
  imports: [
    IonicPageModule.forChild(EditInjury),
  ],
  exports: [
    EditInjury
  ]
})
export class EditInjuryModule {}
