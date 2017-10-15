import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamTraining } from './team-training';

@NgModule({
  declarations: [
    TeamTraining,
  ],
  imports: [
    IonicPageModule.forChild(TeamTraining),
  ],
  exports: [
    TeamTraining
  ]
})
export class TeamTrainingModule {}
