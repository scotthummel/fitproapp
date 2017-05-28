import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AngularFire } from "angularfire2";
import { EditDay } from "../edit-day/edit-day";
import {FirebaseService} from "../../../providers/firebase-service";
import {Observable} from "rxjs/Observable";
import {
  AngularFireDatabase, AngularFireDatabaseModule, FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";

@Component({
  selector: 'page-edit-thirty-day-challenge',
  templateUrl: 'edit-thirty-day-challenge.html'
})
export class EditThirtyDayChallenge {
  challenge;
  days: {};
  key = null;
  ckEditorContent;
  ckEditorContent2;
  ckEditorContent3;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, public afd: AngularFireDatabase) {
    this.key = navParams.get('key');
    this.firebaseService.authState.subscribe(user => {
      if (user) {
        this.afd.list('/challenges/' + this.key + '/days').subscribe(days => {
          this.days = days;
          // this.ckEditorContent = days[0].onePoint;
          // this.ckEditorContent2 = days[0].twoPoints;
          // this.ckEditorContent3 = days[0].threePoints;
        });
        this.afd.object('/challenges/' + this.key).subscribe(challenge => {
          this.challenge = challenge;
        });
      } else {
        this.days = null;
        this.challenge = null;
      }
    });
  }

  updateName(name) {
    this.afd.object('/challenges/' + this.key).update({
      name: name,
    });
  }

  addDay(theme, onePt, twoPts, threePts) {
    this.afd.list('challenges/' + this.key + '/days', {
      query: {
        orderByChild: 'theme',
        equalTo: theme
      }}).subscribe(day => {
      if (!day.length) {
        this.afd.list('/challenges/' + this.key + '/days').push({
          theme: theme,
          onePoint: onePt,
          twoPoints: twoPts,
          threePoints: threePts
        });
      } else {
        const ref = this.afd.object('/challenges/' + this.key + '/days/' + day[0].$key);
        ref.update({
          theme: theme,
          onePoint: onePt,
          twoPoints: twoPts,
          threePoints: threePts
        });
      }
    });
  }

  deleteDay(key) {
    //this.days.remove(key);
  }

  manageDay(challengeKey, dayKey) {
    this.navCtrl.push(EditDay, {
      challengeKey: challengeKey,
      dayKey: dayKey
    });
  }

}
