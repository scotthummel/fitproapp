import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {TrainingView} from "../training-view/training-view";

@IonicPage()
@Component({
  selector: 'page-team-training',
  templateUrl: 'team-training.html',
})
export class TeamTraining extends FirebaseService {

  eventSource;
  viewTitle;
  user: firebase.User;
  authState: Observable<firebase.User>;

  isToday:boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  private trainees: any[];
  public shouldHideCount = true;
  public count;
  private trainingDate: string;
  public slots;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App, public toastCtrl: ToastController) {
    super(afAuth, afd, app);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    this.navCtrl.push(TrainingView, {
      eventId: event.id,
      index: event.index,
      date: event.date,
      type: event.type,
      pageTitle: event.title
    });
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    let date = ev.selectedTime.toISOString().slice(0,10);
    this.checkTeamTrainingAvailability(date).subscribe(trainees => {
      this.trainees = trainees;
      this.shouldHideCount = false;
      this.slots = (trainees.length == 1) ? 'slot' : 'slots';
      this.count = 4 - trainees.length;
      this.trainingDate = date;
    });
  }

  bookTraining(date) {
    return this.afd.list('/teamTraining/' + date, ref => ref.orderByChild('userId').equalTo(this.user.uid)).subscribe(trainee => {
      if (!trainee.length) {
        this.afd.list('/teamTraining/' + date).push({userId: this.user.uid});

        let toast = this.toastCtrl.create({
          message: 'Team training booked successfully',
          duration: 3000
        });
        toast.present();
      } else {
        let toast = this.toastCtrl.create({
          message: 'You\'ve already booked this date.',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
    let current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

}
