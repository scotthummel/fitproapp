import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder} from "@angular/forms";
import {EmailValidator} from "../../validators/email-validator";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings extends FirebaseService{

  public settingsForm;
  public firstName;
  public lastName;
  public email;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App, public fb: FormBuilder, public toastCtrl: ToastController) {
    super(afAuth, afd, app);

    this.settingsForm = fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', EmailValidator.isValid]
    });

    this.afd.object('users/' + this.user.uid).subscribe(client => {
      this.firstName = client.firstName;
      this.lastName = client.lastName;
      this.email = client.email;
    });
  }

  updateInfo() {
    this.updateUserInfo(this.settingsForm.value);

    let toast = this.toastCtrl.create({
      message: 'User information updated successfully',
      duration: 3000
    });
    toast.present();
  }
}
