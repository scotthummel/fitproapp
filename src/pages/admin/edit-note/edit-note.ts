import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the EditNote page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNote {

  public key;
  public note;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase, public toastCtrl: ToastController) {
    this.key = navParams.get('key');

    this.afd.object('/notes/' + this.key)
      .subscribe(note => this.note = note);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNote');
  }

  editNote(key, note) {
    const ref = this.afd.object('/notes/' + key);
    ref.update({
      note: note
    });

    let toast = this.toastCtrl.create({
      message: 'Note updated successfully',
      duration: 3000
    });
    toast.present();
  }

}
