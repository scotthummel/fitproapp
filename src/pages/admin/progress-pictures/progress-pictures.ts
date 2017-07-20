import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-new-picture',
  template: `
    <navbar></navbar>
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

  public newPicture;
  public pictures;

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64Image: string;

  constructor(private camera: Camera, private alertCtrl: AlertController) {
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      let cameraImageSelector = document.getElementById('camera-image');
      cameraImageSelector.setAttribute('src', this.base64Image);

      let ref = firebase.storage().ref('/progressPictures').child('test.jpg');
      ref.putString(imageData, 'base64').then(snapshot => {
        console.log(snapshot);
      }).catch(err => {
        this.showBasicAlert('Snapshot Error', err.message);
      });
    }, (err) => {
      this.showBasicAlert('Error', err.message);
    });
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
@Component({
  selector: 'page-picture-history',
  template: `
    <navbar></navbar>
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

  public newPicture;
  public pictures;
  constructor(private camera: Camera) {
    this.newPicture = NewPicture;
    this.pictures = PictureHistory;
  }
  public base64Image: string;


  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  ionViewDidLoad() {
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

}

@Component({
  selector: 'page-progress-pictures',
  templateUrl: 'progress-pictures.html'
})
export class ProgressPictures {

  public newPicture;
  public pictures;

  constructor() {
    this.newPicture = NewPicture;
    this.pictures = PictureHistory;
  }

  ionViewDidLoad() {
  }

}
