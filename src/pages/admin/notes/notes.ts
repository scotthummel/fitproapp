import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@Component({
  selector: 'page-new-notes',
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
          New Note
        </ion-card-header>

        <ion-card-content>


        </ion-card-content>

      </ion-card>
    </ion-content>
  `

})
export class NewNote {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello New Note Page');
  }

}
@Component({
  selector: 'page-notes-history',
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
          Note History
        </ion-card-header>

        <ion-card-content>


        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class NotesHistory {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Notes History Page');
  }

}

@IonicPage()
@Component({
  templateUrl: 'notes.html'
})
export class Notes {
  public newNote;
  public notes;

  constructor() {
    this.newNote = NewNote;
    this.notes = NotesHistory;
  }
}
