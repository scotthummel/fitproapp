import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseService} from "../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-client-records',
  templateUrl: 'client-records.html',
})
export class ClientRecords {

  public consultation;
  public injuries;
  public notes;
  public foodLog;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.consultation = ClientConsultation;
    this.injuries = ClientInjuries;
    this.notes = ClientNotes;
    this.foodLog = ClientFood;
  }
}

@IonicPage()
@Component({
  selector: 'page-client-consultation',
  template: `<navbar></navbar>

  <ion-content>

    <ion-card>

      <ion-card-header class="card-header">
        Client Consultation
      </ion-card-header>

      <ion-card-content>


      </ion-card-content>

    </ion-card>

  </ion-content>`,
})
export class ClientConsultation {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}

@IonicPage()
@Component({
  selector: 'page-client-injuries',
  template: `<navbar></navbar>

  <ion-content>

    <ion-card>

      <ion-card-header class="card-header">
        Client Injuries
      </ion-card-header>

      <ion-card-content>


      </ion-card-content>

    </ion-card>

  </ion-content>`,
})
export class ClientInjuries {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}

@IonicPage()
@Component({
  selector: 'page-client-notes',
  template: `<navbar></navbar>

  <ion-content>

    <ion-card>

      <ion-card-header class="card-header">
        Client Notes
      </ion-card-header>

      <ion-card-content>


      </ion-card-content>

    </ion-card>

  </ion-content>`,
})
export class ClientNotes {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}

@IonicPage()
@Component({
  selector: 'page-client-food',
  template: `<navbar></navbar>

  <ion-content>

    <ion-card>

      <ion-card-header class="card-header">
        Client Food Log
      </ion-card-header>

      <ion-card-content padding>
        <div *ngIf="foodLogs">
          <div *ngFor="let data of foodLogs">
            <h2>Food Log for {{ data.datestamp }}</h2>

            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-label stacked>Carbs</ion-label>
                  {{ data.carbs }}
                </ion-col>
                <ion-col>
                  <ion-label stacked>Protein</ion-label>
                  {{ data.protein }}
                </ion-col>
                <ion-col>
                  <ion-label stacked>Fat</ion-label>
                  {{ data.fat }}
                </ion-col>
                <ion-col>
                  <ion-label stacked>Calories</ion-label>
                  {{ data.calories }}
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-label stacked>Timing</ion-label>
                  {{ data.timing }}
                </ion-col>
                <ion-col>
                  <ion-label stacked>Supplements</ion-label>
                  {{ data.supplements }}
                </ion-col>
              </ion-row>
            </ion-grid>

            <h2>Other</h2>

            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-label stacked>Water</ion-label>
                  {{ data.water }}
                </ion-col>
                <ion-col>
                  <ion-label stacked>Fiber</ion-label>
                  {{ data.fiber }}
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-label stacked>Notes</ion-label>
                  {{ data.notes }}
                </ion-col>
              </ion-row>
            </ion-grid>

            <hr />
          </div>
        </div>
        <div *ngIf="foodLogs?.length === 0">
          <h2>Food Log</h2>
          <p>You have no food logs.</p>
        </div>
          
      </ion-card-content>

    </ion-card>

  </ion-content>`,
})
export class ClientFood extends FirebaseService {
  public foodLogs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    super(afAuth, afd);

    this.getFoodLogForUser().subscribe(logs => {
      let foodLogs = [];
      logs.forEach(food => {
        food.foodLog.log.datestamp = food.foodLog.datestamp;

        food.foodLog.log.calories = (food.foodLog.log.protein * 4) + (food.foodLog.log.fat * 9) + (food.foodLog.log.carbs * 4);

        foodLogs.push(food.foodLog.log);
      });

      this.foodLogs = foodLogs;
    });
  }

}


