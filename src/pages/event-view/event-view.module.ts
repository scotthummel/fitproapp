import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventView } from './event-view';

@NgModule({
  declarations: [
    EventView,
  ],
  imports: [
    IonicPageModule.forChild(EventView),
  ],
  exports: [
    EventView
  ]
})
export class EventViewModule {}
