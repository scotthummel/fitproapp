import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  // items: FirebaseListObservable<any[]>;
  //
  // constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
  //   this.items = af.database.list('/items');
  // }
  //
  // signInWithFacebook(): void {
  //   this._auth.signInWithFacebook()
  //     .then(() => this.onSignInSuccess());
  // }
  //
  // private onSignInSuccess(): void {
  //   console.log("Facebook display name ",this._auth.displayName());
  // }

}
