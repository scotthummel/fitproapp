import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, Validators} from "@angular/forms";
import {CarbsValidator} from "../../../validators/food-log/carbs";
import {ProteinValidator} from "../../../validators/food-log/protein";
import {WaterValidator} from "../../../validators/food-log/water";
import {FiberValidator} from "../../../validators/food-log/fiber";
import {TimingValidator} from "../../../validators/food-log/timing";
import {FatValidator} from "../../../validators/food-log/fat";
@IonicPage()
@Component({
  selector: 'page-food-log',
  templateUrl: 'food-log.html',
})
export class FoodLog {
  public newFoodLog;
  public foodLogHistory;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newFoodLog = NewFoodLog;
    this.foodLogHistory = FoodLogHistory;
  }

  ionViewDidLoad() {
  }

}

@Component({
  selector: 'page-new-food-log',
  template: `<navbar></navbar>
  <ion-content>
    <ion-card>

      <ion-card-header class="card-header">
        New Food Log
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
          
          <h2>Macros</h2>
         
          <form [formGroup]="foodLogForm">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Timing</ion-label>
                    <ion-input placeholder="Timing in hours" formControlName="timing"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.timing.valid && (foodLogForm.controls.timing.dirty || submitAttempt) && foodLogForm.controls.timing.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.timing.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.timing.required && (foodLogForm.controls.timing.dirty || submitAttempt)">
                    <div class="text-danger">Timing is required.</div>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Supplements</ion-label>
                    <ion-textarea placeholder="List of supplements" formControlName="supplements"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Carbs</ion-label>
                    <ion-input placeholder="Carbohydrates in grams" formControlName="carbs"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.carbs.valid && (foodLogForm.controls.carbs.dirty || submitAttempt) && foodLogForm.controls.carbs.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.carbs.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.carbs.required && (foodLogForm.controls.carbs.dirty || submitAttempt)">
                    <div class="text-danger">Carbs are required.</div>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Protein</ion-label>
                    <ion-input placeholder="Protein in grams" formControlName="protein"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.protein.valid && (foodLogForm.controls.protein.dirty || submitAttempt) && foodLogForm.controls.protein.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.protein.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.protein.required && (foodLogForm.controls.protein.dirty || submitAttempt)">
                    <div class="text-danger">Protein is required.</div>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Fat</ion-label>
                    <ion-input placeholder="Fat in grams" formControlName="fat"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.fat.valid && (foodLogForm.controls.fat.dirty || submitAttempt) && foodLogForm.controls.fat.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.fat.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.fat.required && (foodLogForm.controls.fat.dirty || submitAttempt)">
                    <div class="text-danger">Fat is required.</div>
                  </ion-item>
                </ion-col>
              </ion-row>

              <h2>Other</h2>

              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Water</ion-label>
                    <ion-input placeholder="Water in ounces" formControlName="water"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.water.valid && (foodLogForm.controls.water.dirty || submitAttempt) && foodLogForm.controls.water.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.water.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.water.required && (foodLogForm.controls.water.dirty || submitAttempt)">
                    <div class="text-danger">Water is required.</div>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Fiber</ion-label>
                    <ion-input placeholder="Fiber in grams" formControlName="fiber"></ion-input>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.fiber.valid && (foodLogForm.controls.fiber.dirty || submitAttempt) && foodLogForm.controls.fiber.hasError('error_text')">
                    <div class="text-danger">{{ foodLogForm.controls.fiber.errors.error_text }}</div>
                  </ion-item>
                  <ion-item *ngIf="!foodLogForm.controls.fiber.required && (foodLogForm.controls.fiber.dirty || submitAttempt)">
                    <div class="text-danger">Fiber is required.</div>
                  </ion-item>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label stacked>Notes</ion-label>
                    <ion-textarea placeholder="Notes for food log" formControlName="notes"></ion-textarea>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
            <button ion-button (click)="addLog(key)">Add Log</button>
          </form>
        </div>
      </ion-card-content>

    </ion-card>
  </ion-content>`
})
export class NewFoodLog extends FirebaseService {

  public clients;
  public shouldHideButton = true;
  public log = {};
  public foodLogForm;
  public submitAttempt = false;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public fb: FormBuilder, public app: App) {
    super(afAuth, afd, app);

    this.foodLogForm = fb.group({
      timing: ['', Validators.compose([Validators.required, TimingValidator.isValid])],
      supplements: [''],
      carbs: ['', Validators.compose([Validators.required, CarbsValidator.isValid])],
      protein: ['', Validators.compose([Validators.required, ProteinValidator.isValid])],
      fat: ['', Validators.compose([Validators.required, FatValidator.isValid])],
      water: ['', Validators.compose([Validators.required, WaterValidator.isValid])],
      fiber: ['', Validators.compose([Validators.required, FiberValidator.isValid])],
      notes: ['']
    })
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  addLog(key) {
    this.submitAttempt = true;

    if (!this.foodLogForm.valid) {
      return false;
    }

    this.addFoodLog(this.foodLogForm.value, key);
  }

}
@Component({
  selector: 'page-food-log-history',
  template: `<navbar></navbar>
  <ion-content>
    <ion-card>

      <ion-card-header class="card-header">
        Food Log History
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
          <button ion-button (click)="getHistory(key)">Get History</button>
        </div>

        <div *ngIf="notes">
          <hr />
          <h2>Notes</h2>
          <ion-list>
            <ion-item-sliding *ngFor="let text of notes">
              <ion-item>
                <blockquote>
                  {{ text.note }}<br />
                  <cite>&mdash; {{ text.datestamp }}</cite>
                </blockquote>
              </ion-item>
              <ion-item-options side="right">
                <button ion-button color="danger" (click)="deleteNote(text.$key)">Delete</button>
                <button ion-button (click)="manageNote(text.$key)">Manage</button>
              </ion-item-options>
            </ion-item-sliding>
          </ion-list>
        </div>
      </ion-card-content>

    </ion-card>
  </ion-content>`
})
export class FoodLogHistory extends FirebaseService {
  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);
  }

  getButton() {
    return this.shouldHideButton = false;
  }
}
