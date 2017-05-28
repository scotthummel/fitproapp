import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { EditThirtyDayChallenge } from "../edit-thirty-day-challenge/edit-thirty-day-challenge";
import {FirebaseService} from "../../../providers/firebase-service";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the AssignThirtyDayChallenge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'manage-thirty-day-challenge',
  templateUrl: 'manage-thirty-day-challenge.html'
})
export class ManageThirtyDayChallenge {

  challenges: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {

  }

  ionViewDidLoad() {
    this.challenges = this.firebaseService.getChallenges();
  }

  addChallenge(name) {
    this.firebaseService.addChallenge(name);
  }

  deleteChallenge(key) {
    this.firebaseService.removeChallenge(key);
  }

  manageChallenge(key) {
    this.navCtrl.push(EditThirtyDayChallenge, {
      key: key
    });
  }

}
