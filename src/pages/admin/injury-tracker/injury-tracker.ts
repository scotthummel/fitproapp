import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";
import {EditInjury} from "../edit-injury/edit-injury";
import {AngularFireAuth} from "angularfire2/auth";
import {FormBuilder, Validators} from "@angular/forms";
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
            <hr />
            
            <br />
            
            <form [formGroup]="injuryForm">
              <ion-item>
                <ion-label>Body Part</ion-label>
                <ion-select formControlName="bodyPart">
                  <ion-option *ngFor="let part of bodyParts" value="{{ part.$key }}">{{ part.part}}</ion-option>
                </ion-select>
              </ion-item>
              <ion-item *ngIf="!injuryForm.controls.bodyPart.required && (injuryForm.controls.bodyPart.dirty || submitAttempt)">
                <div class="text-danger">Body part is required.</div>
              </ion-item>
              <ion-item>
                <ion-label stacked>Injury</ion-label>
                <ion-textarea formControlName="injury" placeholder="Describe injury"></ion-textarea>
              </ion-item>
              <ion-item *ngIf="!injuryForm.controls.injury.required && (injuryForm.controls.injury.dirty || submitAttempt)">
                <div class="text-danger">Injury is required.</div>
              </ion-item>
              <button ion-button (click)="addInjury(key)">Add Injury</button>
            </form>
          </div>

        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewInjury extends FirebaseService {

  public shouldHideButton = true;
  public bodyParts;
  public clients;
  public injuryForm;
  public submitAttempt;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public fb: FormBuilder) {
    super(afAuth, afd);

    this.injuryForm = fb.group({
      bodyPart: ['', Validators.required],
      injury: ['', Validators.required]
    });
  }

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

  getButton() {
    return this.shouldHideButton = false;
  }

  addBodyParts() {
   // this.firebaseService.addBodyParts();
  }

  addInjury(key) {
    this.submitAttempt = true;

    if (!this.injuryForm.valid) {
      return false;
    }

    this.addInjuryForUser(key, this.injuryForm.value.bodyPart, this.injuryForm.value.injury);

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
