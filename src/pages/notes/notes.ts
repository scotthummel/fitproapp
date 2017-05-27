import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Notes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class Notes {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NotesPage Page');
  }

}
