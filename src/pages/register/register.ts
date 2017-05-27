import { FirebaseService } from './../../providers/firebase-service';
import { EmailValidator } from './../../validators/email-validator';
import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register-page',
  templateUrl: 'register.html',
})
export class Register {
  public signupForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      firstName: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });
  }

  signupUser() {
    if (this.signupForm.valid) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.firebaseService.signUp(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('Login');
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              title: 'Error',
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
    }
  }
}
