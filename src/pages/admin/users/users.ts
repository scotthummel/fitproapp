import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import "rxjs/add/observable/of";
import {FormBuilder} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);

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
  <ion-card-content padding>
  <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
  <ion-list radio-group [(ngModel)]="key">
  <ion-item *ngFor="let client of clients" class="item item-radio">
  <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
<ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{ client.email }})</ion-label>
<ion-radio [value]="client.$key" color="dark" (click)="getButton(key)"></ion-radio>
</ion-item>
</ion-list>

<div [hidden]="shouldHideButton">
  <hr />

  <ion-list>

    <form [formGroup]="assignRoles">
      <ion-item>
        <ion-label>Client</ion-label>
        <ion-checkbox formControlName="client" [(ngModel)]="client"></ion-checkbox>
      </ion-item>

      <ion-item>
        <ion-label>Trainer</ion-label>
        <ion-checkbox formControlName="trainer" [(ngModel)]="trainer"></ion-checkbox>
      </ion-item>

      <ion-item>
        <ion-label>Admin</ion-label>
        <ion-checkbox formControlName="admin" [(ngModel)]="admin"></ion-checkbox>
      </ion-item>

      <button ion-button (click)="modifyRole(key)">Modify Role</button>
    </form>

  </ion-list>
  
  </div>

  </ion-card-content>

  </ion-card>

  </ion-content>`
})
export class Users extends FirebaseService {

  public clients;
  public shouldHideButton = true;
  private assignRoles;
  public roles;
  private client: boolean;
  private trainer: boolean;
  private admin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public fb: FormBuilder, public toastCtrl: ToastController, public app: App) {
    super(afAuth, afd, app);

    this.assignRoles = fb.group({
      client: [false],
      trainer: [false],
      admin: [false]
    });
  }

  getButton(key) {
    this.getRolesForUser(key).subscribe(roles => {
      let permissions = [];
      roles.forEach(role => {
        if (role.$value) {
          permissions.push(role.$key);
        }
      });

      if (permissions.indexOf('client') !== -1) {
        this.client = true;
      }

      if (permissions.indexOf('trainer') !== -1) {
        this.trainer = true;
      }

      if (permissions.indexOf('admin') !== -1) {
        this.admin = true;
      }

    });
    return this.shouldHideButton = false;
  }

  modifyRole(key) {
    this.assignRolesToUser(key, this.assignRoles.value);

    let toast = this.toastCtrl.create({
      message: 'Roles assigned successfully',
      duration: 3000
    });
    toast.present();
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
