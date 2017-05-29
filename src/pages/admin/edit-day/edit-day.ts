import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-edit-day',
  templateUrl: 'edit-day.html'
})
export class EditDay {
  challengeKey;
  dayKey;
  day;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase, public toastCtrl: ToastController) {
    this.challengeKey = navParams.get('challengeKey');
    this.dayKey = navParams.get('dayKey');

    this.afd.object('/challenges/' + this.challengeKey + '/days/' + this.dayKey)
      .subscribe(day => this.day = day);
  }

  ionViewDidLoad() {
  }

  editDay(theme, onePoint, twoPoints, threePoints) {
    const ref = this.afd.object('/challenges/' + this.challengeKey + '/days/' + this.dayKey);
    ref.update({
      theme: theme,
      onePoint: onePoint,
      twoPoints: twoPoints,
      threePoints: threePoints
    });

    let toast = this.toastCtrl.create({
      message: 'Day updated successfully',
      duration: 3000
    });
    toast.present();
  }

}
