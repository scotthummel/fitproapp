import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AngularFire } from "angularfire2";
import { EditDay } from "../edit-day/edit-day";

@Component({
  selector: 'page-edit-thirty-day-challenge',
  templateUrl: 'edit-thirty-day-challenge.html'
})
export class EditThirtyDayChallenge {
  challenge;
  days;
  key = null;
  ckEditorContent;
  ckEditorContent2;
  ckEditorContent3;

  // constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  //   this.key = navParams.get('key');
  //   this.af.database.object('/challenges/' + this.key)
  //     .subscribe(challenge => this.challenge = challenge);
  //
  //   this.days = this.af.database.list('/challenges/' + this.key + '/days/');
  // }
  //
  // ionViewDidLoad() {
  // }
  //
  // updateName(name) {
  //   this.af.database.object('/challenges/' + this.key).update({
  //     name: name,
  //   });
  // }
  //
  // addDay(theme, onePt, twoPts, threePts) {
  //   this.af.database.list('challenges/' + this.key + '/days', {
  //     query: {
  //       orderByChild: 'theme',
  //       equalTo: theme
  //     }}).subscribe(day => {
  //     if (!day.length) {
  //       this.af.database.list('/challenges/' + this.key + '/days').push({
  //         theme: theme,
  //         onePoint: onePt,
  //         twoPoints: twoPts,
  //         threePoints: threePts
  //       });
  //     } else {
  //       const ref = this.af.database.object('/challenges/' + this.key + '/days/' + day[0].$key);
  //       ref.update({
  //         theme: theme,
  //         onePoint: onePt,
  //         twoPoints: twoPts,
  //         threePoints: threePts
  //       });
  //     }
  //   });
  // }

  // deleteDay(key) {
  //   this.days.remove(key);
  // }
  //
  // manageDay(challengeKey, dayKey) {
  //   this.navCtrl.push(EditDay, {
  //     challengeKey: challengeKey,
  //     dayKey: dayKey
  //   });
  // }

}
