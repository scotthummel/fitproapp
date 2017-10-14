import { Component } from '@angular/core';
import {App, NavController, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-new-intake',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>
        <ion-card-header class="card-header">
          New Consultation
        </ion-card-header>  
        <ion-card-content padding>
          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email}})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{client.email}})</ion-label>
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
                    <ion-label floating>Birthday</ion-label>
                    <ion-datetime displayFormat="M/D/YYYY" pickerFormat="M D YYYY" formControlName="birthday"></ion-datetime>
                  </ion-item>
                </ion-col>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Height</ion-label>
                    <ion-input type="text" formControlName="height"></ion-input>
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
                    <ion-label floating>Massage Experience</ion-label>
                    <ion-textarea formControlName="massageExperience"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Yoga Experience</ion-label>
                    <ion-textarea formControlName="yogaExperience"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Miscellaneous/Notes</ion-label>
                    <ion-textarea formControlName="miscNotes"></ion-textarea>
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
export class NewIntake extends FirebaseService {

  public clients;
  public shouldHideButton = true;
  public intake;

  constructor(public navCtrl: NavController, private fb: FormBuilder, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);

    this.intake = this.fb.group({
      birthday: new FormControl('', Validators.required),
      height: new FormControl('',  Validators.required),
      weight: new FormControl('',  Validators.required),
      injuries: new FormControl(''),
      currentRoutine: new FormControl(''),
      pastRoutine: new FormControl(''),
      dietExperience: new FormControl(''),
      massageExperience: new FormControl(''),
      yogaExperience: new FormControl(''),
      miscNotes: new FormControl(''),
      goals: new FormControl('')
    })
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  completeIntake(values) {
    this.afAuth.authState.subscribe(user => {
      this.saveIntake(user, values);
    });

    let toast = this.toastCtrl.create({
      message: 'Consultation completed successfully',
      duration: 3000
    });
    toast.present();
  }

}
@Component({
  selector: 'page-intake-history',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
          Consultation History
        </ion-card-header>

        <ion-card-content padding>

          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email}})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{client.email}})</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <button ion-button (click)="getIntake(key)">Get Consultation</button>
            
            <hr [hidden]="shouldHideIntake" />
            <ion-list [hidden]="shouldHideIntake">
              <ion-row>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Age</ion-label>
                    <ion-input type="number" value="{{ intake?.age }}"></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Height</ion-label>
                    <ion-input type="text" value="{{ intake?.height }}"></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col col-4>
                  <ion-item>
                    <ion-label floating>Weight</ion-label>
                    <ion-input type="number" value="{{ intake?.weight }}"></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Injuries/Conditions/Medications</ion-label>
                    <ion-textarea value="{{ intake?.injuries }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Current Fitness Routine</ion-label>
                    <ion-textarea value="{{ intake?.currentRoutine }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Past Fitness Routine</ion-label>
                    <ion-textarea value="{{ intake?.pastRoutine }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Diet Experience</ion-label>
                    <ion-textarea value="{{ intake?.dietExperience }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Massage Experience</ion-label>
                    <ion-textarea value="{{ intake?.massageExperience }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Yoga Experience</ion-label>
                    <ion-textarea value="{{ intake?.yogaExperience }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Miscellaneous/Notes</ion-label>
                    <ion-textarea value="{{ intake?.miscNotes }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col col-12>
                  <ion-item>
                    <ion-label floating>Goals</ion-label>
                    <ion-textarea value="{{ intake?.goals }}"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-list>
          </div>

        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class IntakeHistory extends FirebaseService {

  public clients;
  public shouldHideButton = true;
  public shouldHideIntake = true;
  public intake;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);
  }

  ionViewDidLoad() {
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  getIntake(key) {
    this.shouldHideIntake = false;
    return this.afd.list('/users/' + key + '/profile').subscribe(intake => {
      this.intake = intake[0];
    });
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
