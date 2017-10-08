import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventView } from "../event-view/event-view";
import { FirebaseService } from "../../providers/firebase-service";

@Component({
  templateUrl: "calendar.html",
  selector: 'page-calendar'
})
export class CalendarPage {
  eventSource;
  viewTitle;

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

  constructor(private navCtrl:NavController, public firebaseService: FirebaseService) {
    this.getEvents();
  }

  getEvents() {
      this.firebaseService.getChallengesForCalendar().subscribe(challenges => {
        let events = [];

        challenges.forEach(challenge => {
            if (challenge.start) {
              for (let i = 0; i < 30; i++) {
                let start = new Date(challenge.start + '  GMT-0700');
                let startDate = new Date(start.setDate(start.getDate() + i)).toISOString().slice(0,10);
                let end = new Date(startDate);
                let endDate = end.setDate(end.getDate() +1);

                events.push({
                  id: challenge.$key,
                  index: i + 1,
                  date: start,
                  title: challenge.name,
                  type: 'challenges',
                  startTime: new Date(startDate),
                  endTime: new Date(endDate),
                  allDay: true
                });
              }
            }
        });

        this.eventSource = events;
      });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    this.navCtrl.push(EventView, {
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
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}

