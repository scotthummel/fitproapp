import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ProgressPictures page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-progress-pictures',
  templateUrl: 'progress-pictures.html'
})
export class ProgressPictures {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ProgressPicturesPage Page');
  }

}
