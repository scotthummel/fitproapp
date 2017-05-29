import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-new-injury',
  template: `
    <ion-header>
      <ion-navbar color="dark">
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>
          <img class="logo" src="assets/images/fitpro_menu_bar_icon.png"> FitPro Tracker
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header class="card-header">
          New Injury
        </ion-card-header>
        <ion-card-content>
          
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewInjury {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}
@Component({
  selector: 'page-injury-history',
  template: `
    <ion-header>

      <ion-navbar color="dark">
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>
          <img class="logo" src="assets/images/fitpro_menu_bar_icon.png"> FitPro Tracker
        </ion-title>
      </ion-navbar>

    </ion-header>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
          Injury History
        </ion-card-header>

        <ion-card-content>


        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class InjuryHistory {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}

@Component({
  selector: 'page-injury-tracker',
  templateUrl: 'injury-tracker.html'
})
export class InjuryTracker {
  public newInjury;
  public injuries;

  constructor(public navCtrl: NavController) {
    this.newInjury = NewInjury;
    this.injuries = InjuryHistory;
  }

  ionViewDidLoad() {
    console.log('Hello InjuryTrackerPage Page');
  }

}
