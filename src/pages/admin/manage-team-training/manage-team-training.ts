import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'page-manage-team-training',
  template: `<navbar></navbar>
  <ion-content>
  <ion-card>
  <ion-card-header class="card-header">
  Team Training: {{ viewTitle }}
  </ion-card-header>
  <ion-card-content padding>
    
    <calendar [eventSource]="eventSource"
              [calendarMode]="calendar.mode"
              [currentDate]="calendar.currentDate"
              (onCurrentDateChanged)="onCurrentDateChanged($event)"
              (onEventSelected)="onEventSelected($event)"
              (onTitleChanged)="onViewTitleChanged($event)"
              (onTimeSelected)="onTimeSelected($event)"
              [noEventsLabel]="Test"
              step="30"
              allDayLabel="All Day"
    >
    </calendar>
    
    <div [hidden]="shouldHideTrainees">
      <h2>Clients for This Day</h2>

      <div *ngIf="teamTrainees.length; else noTrainees">
        <form [formGroup]="teamTraining">
          <ion-list radio-group  formControlName="clientId">
            <ion-item *ngFor="let trainee of teamTrainees" class="item item-radio">
              <ion-label>{{ trainee.firstName }} {{trainee.lastName}} ({{ trainee.email }})</ion-label>
              <ion-radio [value]="trainee.$key" color="dark"></ion-radio>
            </ion-item>
          </ion-list>
        </form>
      </div>
      <ng-template #noTrainees>
        <p>There are no clients for this date.</p>
      </ng-template>
    </div>

  </ion-card-content>

  </ion-card>

  </ion-content>`
})
export class TeamTrainingUsers extends FirebaseService {
  public shouldHideButton = true;
  public eventSource;
  viewTitle;
  isToday:boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  private shouldHideTrainees = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public fb: FormBuilder, public toastCtrl: ToastController, public app: App) {
    super(afAuth, afd, app);

    this.teamTraining = fb.group({
      clientId: [false]
    });
  }

  getButton(key) {
    return this.shouldHideButton = false;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    let date = ev.selectedTime.toISOString().slice(0,10);
    this.getTeamTrainingClients(date);

    this.shouldHideTrainees = false;
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
    let current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}

@IonicPage()
@Component({
  templateUrl: 'manage-team-training.html'
})
export class ManageTeamTraining {
  public users;

  constructor() {
    this.users = TeamTrainingUsers;
  }
}
