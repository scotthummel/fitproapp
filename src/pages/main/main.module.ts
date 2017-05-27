import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Main } from './main';
import {Home} from "../home/home";
import {Calendar} from "../calendar/calendar";
import {Intake} from "../intake/intake";
import {LiftTracker} from "../lift-tracker/lift-tracker";
import {InjuryTracker} from "../injury-tracker/injury-tracker";
import {ProgressPictures} from "../progress-pictures/progress-pictures";
import {ThirtyDayChallenge} from "../30-day-challenge/30-day-challenge";
import {Notes} from "../notes/notes";
import {YouTube} from "../youtube/youtube";
import {AssignWorkout} from "../admin/assign-workout/assign-workout";
import {ManageThirtyDayChallenge} from "../admin/manage-thirty-day-challenge/manage-thirty-day-challenge";
import {EditThirtyDayChallenge} from "../admin/edit-thirty-day-challenge/edit-thirty-day-challenge";
import {EditDay} from "../admin/edit-day/edit-day";


@NgModule({
  declarations: [
    Main,
  ],
  entryComponents: [

  ],
  imports: [
    IonicPageModule.forChild(Main)
  ],
  exports: [
    Main
  ]
})
export class MainModule {}
