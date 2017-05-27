import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Intake page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intake',
  templateUrl: 'intake.html'
})
export class Intake{

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello IntakePage Page');
  }

}
