import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";
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
          <ion-searchbar (ionInput)="getClients($event)"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}}</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}}</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <ion-list radio-group [(ngModel)]="bodyPart">
              <ion-item *ngFor="let part of bodyParts" class="item item-radio">
                <ion-label>{{ part.part }}</ion-label>
                <ion-radio [value]="part.$key" color="dark"></ion-radio>
              </ion-item>
            </ion-list>
            <ion-textarea #injury placeholder="Describe injury"></ion-textarea>
            <button ion-button (click)="addInjury(key, bodyPart, injury.value)">Add Injury</button>
          </div>

        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewInjury {

  public shouldHideButton = true;
  public bodyParts;
  public clients;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public afd: AngularFireDatabase) {}

  ionViewDidLoad() {
    this.afd.list('/bodyParts')
      .subscribe(items => {
        let bodyParts = [];
        items.forEach(item => {
          bodyParts.push(item);
        });
        this.bodyParts = bodyParts;
      });
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

  addBodyParts() {
   // this.firebaseService.addBodyParts();
  }

  addInjury(key, bodyPart, injury) {
    this.firebaseService.addInjury(key, bodyPart, injury);
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
          <ion-searchbar (ionInput)="getClients($event)"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}}</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}}</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <button ion-button (click)="getInjuries(key)">Get Injuries</button>
          </div>

          <div *ngIf="injuries">
            <ion-list>
              <ion-item *ngFor="let injury of injuries">
                <blockquote>
                  {{ injury.bodyPart }}: {{ injury.injury }}<br />
                  <cite>&mdash; {{ injury.datestamp }}</cite>
                </blockquote>
              </ion-item>
            </ion-list>
          </div>

        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class InjuryHistory {

  public clients;
  public injuries;
  public shouldHideButton = true;

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

  getInjuries(key) {
    this.afd.list('/injuries', {
      query: {
        orderByChild: 'userId',
        equalTo: key
      }
    }).subscribe(items => {
      let injuries = [];
      items.forEach(item => {
        injuries.push(item);
      });
      this.injuries = injuries;
    });
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
  }
}
