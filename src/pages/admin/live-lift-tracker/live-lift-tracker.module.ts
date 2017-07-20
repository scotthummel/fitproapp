import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveLiftTracker } from './live-lift-tracker';

@NgModule({
  declarations: [
    LiveLiftTracker,
  ],
  imports: [
    IonicPageModule.forChild(LiveLiftTracker),
  ],
  exports: [
    LiveLiftTracker
  ]
})
export class LiveLiftTrackerModule {}
