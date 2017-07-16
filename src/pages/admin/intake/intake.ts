import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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
            <form [formGroup]="intake">
              <ion-list>
              <ion-row>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Age</ion-label>
                    <ion-input type="number" formControlName="age"></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Height</ion-label>
                    <ion-input type="number" formControlName="height"></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Weight</ion-label>
                    <ion-input type="number" formControlName="weight"></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Injuries/Conditions/Medications</ion-label>
                    <ion-textarea formControlName="injuries"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Current Fitness Routine</ion-label>
                    <ion-textarea formControlName="currentRoutine"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Past Fitness Routine</ion-label>
                    <ion-textarea formControlName="pastRoutine"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Diet Experience</ion-label>
                    <ion-textarea formControlName="dietExperience"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Goals</ion-label>
                    <ion-textarea formControlName="goals"></ion-textarea>
                  </ion-item>
                  <button ion-button (click)="completeIntake(intake.value)" block [disabled]="!intake.valid">Complete Intake</button>
                </ion-col>
              </ion-row>
              </ion-list>
            </form>  
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewIntake {

  public clients;
  public shouldHideButton = true;
  public intake;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, private fb: FormBuilder,) {
    this.intake = this.fb.group({
      age: new FormControl('', Validators.required),
      height: new FormControl('',  Validators.required),
      weight: new FormControl('',  Validators.required),
      injuries: new FormControl(''),
      currentRoutine: new FormControl(''),
      pastRoutine: new FormControl(''),
      dietExperience: new FormControl(''),
      goals: new FormControl('')
    })
  }

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

  completeIntake(values) {

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
    </ion-content>
  `
})
export class IntakeHistory {

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
  }

}
