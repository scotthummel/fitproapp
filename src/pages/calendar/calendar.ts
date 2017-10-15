import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import { EventView } from "../event-view/event-view";
import { FirebaseService } from "../../providers/firebase-service";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {TrainingView} from "../training-view/training-view";

@Component({
  templateUrl: "calendar.html",
  selector: 'page-calendar'
})
export class CalendarPage extends FirebaseService {
  eventSource;
  viewTitle;
  user: firebase.User;
  authState: Observable<firebase.User>;

  isToday:boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date:Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function(date:Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function(date:Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function(date:Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function(date:Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function(date:Date) {
        return 'testDH';
      },
      formatDayViewTitle: function(date:Date) {
        return 'testDT';
      }
    }
  };

  constructor(public navCtrl:NavController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);

    this.getEvents();
  }

  getEvents() {
    this.getChallengesForCalendar();
    //this.getTeamTrainingForCalendar(this.calendar.currentDate);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    if (event.type == 'challenges') {
      this.navCtrl.push(EventView, {
        eventId: event.id,
        index: event.index,
        date: event.date,
        type: event.type,
        pageTitle: event.title
      });
    } else if (event.type == 'team-training') {
      this.navCtrl.push(TrainingView, {
        eventId: event.id,
        index: event.index,
        date: event.date,
        type: event.type,
        pageTitle: event.title
      });
    }
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
    //  (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
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

