import { Component } from '@angular/core';
import {FirebaseService} from "../../providers/firebase-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {App} from "ionic-angular";

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class Navbar extends FirebaseService{
  constructor(public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);
  }
}
