import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the EditInjury page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-injury',
  templateUrl: 'edit-injury.html',
})
export class EditInjury {
  public key;
  public injury;
  public bodyPart = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase, public toastCtrl: ToastController) {
    this.key = navParams.get('key');

    this.afd.object('/injuries/' + this.key)
      .subscribe(injury => {
        this.injury = injury;
      });
  }

  ionViewDidLoad() {
  }

  editInjury(key, injury) {
    const ref = this.afd.object('/injuries/' + key);
    ref.update({
      injury: injury
    });

    let toast = this.toastCtrl.create({
      message: 'Injury updated successfully',
      duration: 3000
    });
    toast.present();
  }

}
