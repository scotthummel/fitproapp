import { FirebaseService } from './../../providers/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email-validator';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login.html',
})
export class Login {
  public loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.firebaseService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot('Main');
          });
        }, error => {
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

  goToSignup() {
    this.navCtrl.push('Register');
  }

  resetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Enter your email below',
      inputs: [
        {
          name: 'email',
          placeholder: 'My Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Reset',
          handler: data => {
            this.firebaseService.resetPassword(data.email).then(data => {
              console.log('reset: ', data);
              this.showBasicAlert('Success', 'Check your email for further instructions.');
            })
              .catch(err => {
                this.showBasicAlert('Error', err.message);
              })
          }
        }
      ]
    });
    prompt.present();
  }

  showBasicAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
