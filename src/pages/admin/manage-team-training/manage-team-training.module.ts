import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTeamTraining } from './manage-team-training';

@NgModule({
  declarations: [
    ManageTeamTraining,
  ],
  imports: [
    IonicPageModule.forChild(ManageTeamTraining),
  ],
  exports: [
    ManageTeamTraining
  ]
})
export class ManageTeamTrainingModule {}
