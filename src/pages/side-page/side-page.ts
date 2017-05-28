import {YouTube} from "../youtube/youtube";
import {Notes} from "../notes/notes";
import {ThirtyDayChallenge} from "../30-day-challenge/30-day-challenge";
import {ProgressPictures} from "../progress-pictures/progress-pictures";
import {InjuryTracker} from "../injury-tracker/injury-tracker";
import {LiftTracker} from "../lift-tracker/lift-tracker";
import {Intake} from "../intake/intake";
import {CalendarPage} from "../calendar/calendar";
import {Home} from "../home/home";
import {CommonService} from "../../shared/common.service";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AssignWorkout}  from "../admin/assign-workout/assign-workout";
import { ManageThirtyDayChallenge } from "../admin/manage-thirty-day-challenge/manage-thirty-day-challenge";

@Component({
  selector: 'page-side-page',
  templateUrl: 'side-page.html'
})
export class SidePage {

    // private subscription: Subscription;
    public pages;
    public adminPages;
    public user;
    public isAdmin;
    //public root: any = Calendar;

    constructor(public navCtrl: NavController) {

    }
    push() {
      this.navCtrl.push(SidePage);
    }

    navigate(page){
      console.log(page);
      //this.common.notifyOther({page: page});
      switch(page) {
        case 'calendar':
          //this.root = Calendar;
          break;
      }
    }

    ionViewDidLoad() {
        // this.pages = [
        //   { title: 'Home', component: Home },
        //   { title: 'Calendar', component: Calendar },
        //   { title: 'Intake', component: Intake },
        //   { title: 'Lift Tracker', component: LiftTracker },
        //   { title: 'Injury Tracker', component: InjuryTracker },
        //   { title: 'Progress Pictures', component: ProgressPictures },
        //   { title: '30-day Challenge', component: ThirtyDayChallenge },
        //   { title: 'Notes', component: Notes },
        //   { title: 'YouTube', component: YouTube }
        // ];
        // this.adminPages = [
        //   { title: 'Assign Workout', component: AssignWorkout },
        //   { title: '30-Day Challenge', component: ManageThirtyDayChallenge }
        // ];
        //
        // this.isAdmin = true;
    }

}
