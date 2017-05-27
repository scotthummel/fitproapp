import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the InjuryTracker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-injury-tracker',
  templateUrl: 'injury-tracker.html'
})
export class InjuryTracker {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello InjuryTrackerPage Page');
  }

}
