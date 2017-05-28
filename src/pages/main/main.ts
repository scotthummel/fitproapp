import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {YouTube} from "../youtube/youtube";
import {Notes} from "../notes/notes";
import {ThirtyDayChallenge} from "../30-day-challenge/30-day-challenge";
import {ProgressPictures} from "../progress-pictures/progress-pictures";
import {InjuryTracker} from "../injury-tracker/injury-tracker";
import {LiftTracker} from "../lift-tracker/lift-tracker";
import {Intake} from "../intake/intake";
import { CalendarPage } from "../calendar/calendar";
import {Home} from "../home/home";
import { AssignWorkout}  from "../admin/assign-workout/assign-workout";
import { ManageThirtyDayChallenge } from "../admin/manage-thirty-day-challenge/manage-thirty-day-challenge";
import {FirebaseService} from "../../providers/firebase-service";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class Main {

  public pages;
  public adminPages;
  public isAdmin;
  public root: any = Home;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {}

  navigate(page){
    this.root = page;
  }

  logout() {
    this.firebaseService.logoutUser();
  }

  ionViewDidLoad() {
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Calendar', component: CalendarPage },
      { title: 'Intake', component: Intake },
      { title: 'Lift Tracker', component: LiftTracker },
      { title: 'Injury Tracker', component: InjuryTracker },
      { title: 'Progress Pictures', component: ProgressPictures },
      { title: '30-day Challenge', component: ThirtyDayChallenge },
      { title: 'Notes', component: Notes },
      { title: 'YouTube', component: YouTube }
    ];
    this.adminPages = [
      { title: 'Assign Workout', component: AssignWorkout },
      { title: '30-Day Challenge', component: ManageThirtyDayChallenge }
    ];

    this.isAdmin = true;
  }

}
