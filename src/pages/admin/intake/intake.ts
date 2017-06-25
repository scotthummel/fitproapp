import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-new-intake',
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
          New Intake
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-row>
              <ion-col col-4>
                <ion-item>
                  <ion-label floating>Age</ion-label>
                  <ion-input type="number"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col col-4>
                <ion-item>
                  <ion-label floating>Height</ion-label>
                  <ion-input type="number"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col col-4>
                <ion-item>
                  <ion-label floating>Weight</ion-label>
                  <ion-input type="number"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-12>
                <ion-item>
                  <ion-label floating>Injuries/Conditions/Medications</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-12>
                <ion-item>
                  <ion-label floating>Current Fitness Routine</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-12>
                <ion-item>
                  <ion-label floating>Past Fitness Routine</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-12>
                <ion-item>
                  <ion-label floating>Diet Experience</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col col-12>
                <ion-item>
                  <ion-label floating>Goals</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewIntake {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}
@Component({
  selector: 'page-intake-history',
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
          Intake History
        </ion-card-header>

        <ion-card-content>
          

        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class IntakeHistory {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}

@Component({
  selector: 'page-intake',
  templateUrl: 'intake.html'
})
export class Intake{
  public newIntake;
  public intakes;

  constructor(public navCtrl: NavController) {
    this.newIntake = NewIntake;
    this.intakes = IntakeHistory;
  }

  ionViewDidLoad() {
    console.log('Hello IntakePage Page');
  }

}
