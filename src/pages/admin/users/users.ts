import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import "rxjs/add/observable/of";

@Component({
  selector: 'page-challenges',
  template: `<navbar></navbar>
  <ion-content>
  <ion-card>
  <ion-card-header class="card-header">
  Challenge Clients
  </ion-card-header>
  <ion-card-content>
  <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
  <ion-list radio-group [(ngModel)]="key">
  <ion-item *ngFor="let client of clients" class="item item-radio">
  <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
  <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username }} ({{ client.email }})</ion-label>
  <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
  </ion-item>
  </ion-list>

  <div [hidden]="shouldHideButton">
    <hr />
    
    <ion-list>
      <ion-item *ngFor="let challenge of challenges" class="item item-radio">
        <ion-label>{{ challenge.name }}</ion-label>
        <ion-radio [value]="challenge.$key" color="dark" (click)="chooseChallenge(challenge.$key)"></ion-radio>
      </ion-item>
    </ion-list>
  </div>

  </ion-card-content>

  </ion-card>

  </ion-content>`
})
export class Challenges extends FirebaseService {

  public clients;
  public challenges;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    super(afAuth, afd);

    this.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
    });
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  chooseChallenge(key) {
    this.addChallengeForUser(key);
  }

}

@Component({
  selector: 'page-users',
  template: `<navbar></navbar>
  <ion-content>
  <ion-card>
  <ion-card-header class="card-header">
  Trainers/Clients
  </ion-card-header>
  <ion-card-content>
  <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
  <ion-list radio-group [(ngModel)]="key">
  <ion-item *ngFor="let client of clients" class="item item-radio">
  <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}}</ion-label>
<ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}}</ion-label>
<ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
</ion-item>
</ion-list>

<div [hidden]="shouldHideButton">
  <hr />
  </div>

  </ion-card-content>

  </ion-card>

  </ion-content>`
})
export class Users {

  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
  }

  getButton() {
    return this.shouldHideButton = false;
  }

}

@IonicPage()
@Component({
  templateUrl: 'users.html'
})
export class Clients {
  public users;
  public challenges;

  constructor() {
    this.users = Users;
    this.challenges = Challenges;
  }
}
