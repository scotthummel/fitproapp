import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {App} from 'ionic-angular';
import { NotClient } from "../pages/not-client/not-client";


export default class BaseClass {
  user: firebase.User;
  authState: Observable<firebase.User>;
  clients;

  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    this.authState = afAuth.authState;

    this.authState.subscribe(user => {
      if (user) {
        this.afd.object('users/' + user.uid).subscribe(user => {
          if (!user.roles.client) {
            let nav = this.app.getActiveNav();
            nav.push(NotClient);
          }
        });
        this.user = user;
      }
    });
  }
  signUp(email, password, firstName, lastName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this.afd.list('/users').update(newUser.uid, {email: email, firstName: firstName, lastName: lastName, roles: {client: true}});
      });
  }

  loginUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
