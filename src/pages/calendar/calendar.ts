import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

/*
  Generated class for the Calendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class Calendar {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CalendarPage Page');
  }

}
