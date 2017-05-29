import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";

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
          <ion-searchbar (ionInput)="getClients($event)"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}}</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}}</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <ion-textarea #note placeholder="Note"></ion-textarea>
            <button ion-button (click)="addNote(key, note.value)">Add Note</button>
          </div>  
        </ion-card-content>

      </ion-card>
    </ion-content>
  `

})
export class NewNote {

  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {}

  ionViewDidLoad() {
  }

  getClients(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.firebaseService.getClients().subscribe(data => {
        this.clients = data.filter((item) => {
          if (item.hasOwnProperty('firstName')) {
            return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
          } else {
            return item.username.includes(val) || item.email.includes(val);
          }
        })
      });
    }
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  addNote(key, note) {
    this.firebaseService.addNote(key, note);
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
          <ion-searchbar (ionInput)="getClients($event)"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}}</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}}</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <button ion-button (click)="getNotes(key)">Get Notes</button>
          </div>
          
          <div *ngIf="notes">
            <ion-list>
              <ion-item *ngFor="let text of notes">
                <blockquote>
                  {{ text.note }}<br />
                  <cite>&mdash; {{ text.datestamp }}</cite>
                </blockquote>
              </ion-item>
            </ion-list>
          </div>
        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class NotesHistory {

  public shouldHideButton = true;
  public notes;
  public clients;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public afd: AngularFireDatabase) {}

  ionViewDidLoad() {
  }

  getClients(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.firebaseService.getClients().subscribe(data => {
        this.clients = data.filter((item) => {
          if (item.hasOwnProperty('firstName')) {
            return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
          } else {
            return item.username.includes(val) || item.email.includes(val);
          }
        })
      });
    }
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  getNotes(key) {
    this.afd.list('/notes', {
      query: {
        orderByChild: 'userId',
        equalTo: key
      }
    }).subscribe(items => {
      let notes = [];
      items.forEach(item => {
        notes.push(item);
      });
      this.notes = notes;
    });
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
