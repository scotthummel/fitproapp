import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {YouTube} from "../youtube/youtube";
import {Notes} from "../admin/notes/notes";
import {ThirtyDayChallenge} from "../30-day-challenge/30-day-challenge";
import {ProgressPictures} from "../admin/progress-pictures/progress-pictures";
import {InjuryTracker} from "../admin/injury-tracker/injury-tracker";
import {LiftTracker} from "../lift-tracker/lift-tracker";
import {Intake} from "../admin/intake/intake";
import { CalendarPage } from "../calendar/calendar";
import {Home} from "../home/home";
import { AssignWorkout}  from "../admin/assign-workout/assign-workout";
import { ManageThirtyDayChallenge } from "../admin/manage-thirty-day-challenge/manage-thirty-day-challenge";
import {FirebaseService} from "../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Users} from "../admin/users/users";

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
  public user;
  public client;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, private afAuth: AngularFireAuth, private afd: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.afd.object('users/' + user.uid).subscribe(client => {
        this.client = client;
        this.isAdmin = client.hasOwnProperty('isAdmin');
      });
    });
  }

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
      { title: 'Lift Tracker', component: LiftTracker },
      { title: '30-day Challenge', component: ThirtyDayChallenge },
      { title: 'YouTube', component: YouTube }
    ];
    this.adminPages = [
      { title: 'Intake', component: Intake },
      { title: 'Assign Workout', component: AssignWorkout },
      { title: '30-Day Challenge', component: ManageThirtyDayChallenge },
      { title: 'Injury Tracker', component: InjuryTracker },
      { title: 'Progress Pictures', component: ProgressPictures },
      { title: 'Notes', component: Notes },
      { title: 'Trainers/Clients', component: Users },
    ];
  }

}
