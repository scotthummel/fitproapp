import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingView } from './training-view';

@NgModule({
  declarations: [
    TrainingView,
  ],
  imports: [
    IonicPageModule.forChild(TrainingView),
  ],
  exports: [
    TrainingView
  ]
})
export class TrainingViewModule {}
