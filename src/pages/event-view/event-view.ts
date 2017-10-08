import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import "rxjs/add/operator/map";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.pageTitle = navParams.get('pageTitle');

    let date = new Date(navParams.get('date'));
    this.date = this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

    this.eventId = navParams.get('eventId');
  }

  getWorkout(index) {
    this.workouts = this.afd.list('/challenges/' + this.eventId + '/days', ref => ref.orderByChild('index').equalTo(index.toString()));
  }

  ionViewDidLoad() {
    this.getWorkout(this.navParams.get('index'));
  }

}
