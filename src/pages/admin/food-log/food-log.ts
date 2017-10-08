import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
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
          <ion-item>
            <ion-label>Category</ion-label>
            <ion-select [(ngModel)]="category">
              <ion-option value="Massage">Massage</ion-option>
              <ion-option value="Chiropractic">Chiropractic</ion-option>
              <ion-option value="Lift">Lift</ion-option>
              <ion-option value="Cardio">Cardio</ion-option>
              <ion-option value="Body Measurements">Body Measurements</ion-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Note</ion-label>
            <ion-textarea #note placeholder="Note"></ion-textarea>
          </ion-item>
          <button ion-button (click)="addNote(key, note.value, category)">Add Note</button>
        </div>
      </ion-card-content>

    </ion-card>
  </ion-content>`
})
export class NewFoodLog {

  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public toastCtrl: ToastController) {}

  getButton() {
    return this.shouldHideButton = false;
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
export class FoodLogHistory {
  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public toastCtrl: ToastController) {}

  getButton() {
    return this.shouldHideButton = false;
  }
}
