import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class Users {

  public clients;
  public shouldHideButton = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
  }

  getClients(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.firebaseService.getClients().subscribe(data => {
        this.clients = data.filter((item) => {
          if (item.hasOwnProperty('firstName')) {
            return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
          } else {
            return item.username.includes(val) || item.email.includes(val);
          }
        })
      });
    }
  }

  getButton() {
    return this.shouldHideButton = false;
  }

}
