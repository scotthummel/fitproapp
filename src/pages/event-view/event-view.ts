import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventView {
  pageTitle;
  date;
  months = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November','December'];
  eventId;
  workouts;
  noWorkouts;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.pageTitle = navParams.get('pageTitle');

    let date = new Date(navParams.get('date'));
    this.date = this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

    this.eventId = navParams.get('eventId');
  }

  getWorkout(index) {
    console.log(index);
    let observable = this.afd.list('/challenges/' + this.eventId + '/days', {
      query: {
        orderByChild: 'index',
        equalTo: index.toString()
      }
    });

    observable.subscribe(items => {
      if (items.length) {
        this.workouts = Observable.of(items);
      } else {
        this.noWorkouts = true;
      }
    })
  }

  ionViewDidLoad() {
    this.getWorkout(this.navParams.get('index'));
  }

}
