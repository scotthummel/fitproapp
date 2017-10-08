import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController} from 'ionic-angular';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { EditThirtyDayChallenge } from "../edit-thirty-day-challenge/edit-thirty-day-challenge";
import {FirebaseService} from "../../../providers/firebase-service";
import {Observable} from "rxjs/Observable";
import { DatePicker } from '@ionic-native/date-picker';

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
  startDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    //this.challenges = this.firebaseService.getChallenges();
  }

  addChallenge(name) {
    this.firebaseService.addChallenge(name, this.startDate);

    let toast = this.toastCtrl.create({
      message: 'Challenge added successfully',
      duration: 3000
    });
    toast.present();
  }

  deleteChallenge(key) {
    this.firebaseService.removeChallenge(key);
  }

  manageChallenge(key) {
    this.navCtrl.push(EditThirtyDayChallenge, {
      key: key
    }).then(res => {

    }).catch(err => {
      console.log(err);
    });
  }
}
