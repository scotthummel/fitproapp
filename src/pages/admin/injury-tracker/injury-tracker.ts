import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";
import {EditInjury} from "../edit-injury/edit-injury";
@Component({
  selector: 'page-new-injury',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>
        <ion-card-header class="card-header">
          New Injury
        </ion-card-header>
        <ion-card-content>
          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{ client.email }})</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
              <ion-item>
                <ion-label>Body Part</ion-label>
                <ion-select [(ngModel)]="bodyPart">
                  <ion-option *ngFor="let part of bodyParts" value="{{ part.$key }}">{{ part.part}}</ion-option>
                </ion-select>
              </ion-item>
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

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public afd: AngularFireDatabase, public toastCtrl: ToastController) {}

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
        // this.clients = data.filter((item) => {
        //   if (item.hasOwnProperty('firstName')) {
        //     return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
        //   } else {
        //     return item.username.includes(val) || item.email.includes(val);
        //   }
        // })
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
    console.log(key, bodyPart, injury);
    this.firebaseService.addInjury(key, bodyPart, injury);

    let toast = this.toastCtrl.create({
      message: 'Injury added successfully',
      duration: 3000
    });
    toast.present();
  }

}
@Component({
  selector: 'page-injury-history',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
          Injury History
        </ion-card-header>

        <ion-card-content>
          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{ client.email }})</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <button ion-button (click)="getInjuries(key)">Get Injuries</button>
          </div>
          
          <div *ngIf="injuries">
            <hr />
            <h2>Injuries</h2>
            <ion-list>
              <ion-item-sliding *ngFor="let injury of injuries">
                <ion-item>
                  <blockquote>
                    {{ injury.injury }}<br />
                    <cite>&mdash; {{ injury.datestamp }}</cite>
                  </blockquote>
                </ion-item>
                <ion-item-options side="right">
                  <button ion-button color="danger" (click)="deleteInjury(injury.$key)">Delete</button>
                  <button ion-button (click)="manageInjury(injury.$key)">Manage</button>
                </ion-item-options>
              </ion-item-sliding>
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

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public afd: AngularFireDatabase, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
  }

  getClients(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.firebaseService.getClients().subscribe(data => {
        this.clients = data.filter((item) => {
          // if (item.hasOwnProperty('firstName')) {
          //   return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
          // } else {
          //   return item.username.includes(val) || item.email.includes(val);
          // }
        })
      });
    }
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  getInjuries(key) {
    this.afd.list('/injuries', ref => ref.orderByChild('userId').equalTo(key)).subscribe(items => {
      let injuries = [];
      items.forEach(item => {
        injuries.push(item);
      });
      this.injuries = injuries;
    });
  }

  deleteInjury(key) {
    this.firebaseService.deleteInjury(key);
  }

  manageInjury(key) {
    this.navCtrl.push(EditInjury, {
      key: key
    }).then(res => {

    }).catch(err => {
      console.log(err);
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
