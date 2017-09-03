import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-client-records',
  templateUrl: 'client-records.html',
})
export class ClientRecords {

  public consultation;
  public injuries;
  public notes;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.consultation = ClientConsultation;
    this.injuries = ClientInjuries;
    this.notes = ClientNotes;
  }

  ionViewDidLoad() {
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

  ionViewDidLoad() {
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


