import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
//import { AngularFire } from "angularfire2";
import { EditDay } from "../edit-day/edit-day";
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";

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

  ckEditorConfig = {
    "toolbarGroups": [
      { name: "basicstyles", groups: ['Bold', 'Italic', 'Strike']},
      { name: "paragraph", groups: ['NumberedList', 'BulletedList']},
      { name: "links", groups: ['Link', 'Unlink']},
      { name: "styles" }
      ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, public afd: AngularFireDatabase, public toastCtrl: ToastController) {
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

    let toast = this.toastCtrl.create({
      message: 'Name updated successfully',
      duration: 3000
    });
    toast.present();
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

    let toast = this.toastCtrl.create({
      message: 'Day added successfully',
      duration: 3000
    });
    toast.present();
  }

  deleteDay(key) {
    //this.days.remove(key);
  }

  manageDay(challengeKey, dayKey) {
    this.navCtrl.push(EditDay, {
      challengeKey: challengeKey,
      dayKey: dayKey
    }).then(res => {

    }).catch(err => {
      console.log(err);
    });
  }

}
