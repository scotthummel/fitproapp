import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { EditThirtyDayChallenge } from "../edit-thirty-day-challenge/edit-thirty-day-challenge";

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

  // challenges: FirebaseListObservable<any>;
  //
  // constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  //   this.challenges = this.af.database.list('/challenges');
  // }
  //
  // ionViewDidLoad() {
  // }
  //
  // addChallenge(name) {
  //   this.af.database.list('/challenges', {
  //     query: {
  //       orderByChild: 'name',
  //       equalTo: name
  //     }
  //   }).subscribe(challenges => {
  //     if (!challenges.length) {
  //       this.challenges.push({
  //         name: name
  //       });
  //     }
  //   });
  // }
  //
  // deleteChallenge(key) {
  //   this.challenges.remove(key);
  // }
  //
  // manageChallenge(key) {
  //   this.navCtrl.push(EditThirtyDayChallenge, {
  //     key: key
  //   });
  // }

}
