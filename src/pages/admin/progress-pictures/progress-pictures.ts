import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-new-picture',
  template: `
    <ion-header>
      <ion-navbar color="dark">
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>
          <img class="logo" src="assets/images/fitpro_menu_bar_icon.png"> FitPro Tracker
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header class="card-header">
          New Picture
        </ion-card-header>
        <ion-card-content>
          <button ion-button (click)="takePicture()">Take Picture</button>
          <img id="camera-image" *ngIf="base64Image" />
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewPicture {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}
@Component({
  selector: 'page-picture-history',
  template: `
    <ion-header>

      <ion-navbar color="dark">
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>
          <img class="logo" src="assets/images/fitpro_menu_bar_icon.png"> FitPro Tracker
        </ion-title>
      </ion-navbar>

    </ion-header>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
         Picture History
        </ion-card-header>

        <ion-card-content>


        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class PictureHistory {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}

@Component({
  selector: 'page-progress-pictures',
  templateUrl: 'progress-pictures.html'
})
export class ProgressPictures {

  public newPicture;
  public pictures;

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64Image: string;

  constructor(private camera: Camera) {
    this.newPicture = NewPicture;
    this.pictures = PictureHistory;
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

      let ref = firebase.storage().ref('/progress-pictures').child('test.jpg');
      ref.putString(imageData, 'base64').then(snapshot => {
        console.log(snapshot);
      });
    }, (err) => {
      // Handle error
    });
  }



  ionViewDidLoad() {
    console.log('Hello ProgressPicturesPage Page');
  }

}
