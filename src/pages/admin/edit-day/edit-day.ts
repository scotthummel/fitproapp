import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule } from "angularfire2/database";

@Component({
  selector: 'page-edit-day',
  templateUrl: 'edit-day.html'
})
export class EditDay {
  challengeKey;
  dayKey;
  day;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabaseModule) {
    this.challengeKey = navParams.get('challengeKey');
    this.dayKey = navParams.get('dayKey');

    // this.afd.object('/challenges/' + this.challengeKey + '/days/' + this.dayKey)
    //   .subscribe(day => this.day = day);


  }

  ionViewDidLoad() {
  }

  editDay(theme, onePoint, twoPoints, threePoints) {
    // const ref = this.afd.list('/challenges/' + this.challengeKey + '/days/' + this.dayKey);
    // ref.update({
    //   theme: theme,
    //   onePoint: onePoint,
    //   twoPoints: twoPoints,
    //   threePoints: threePoints
    // });
  }

}
