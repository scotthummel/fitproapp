import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import {AlertController} from "ionic-angular";
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

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
          <button ion-button (click)="presentActionSheet()">Take Picture</button>
          <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">
          <h3 [hidden]="lastImage !== null">Please Select Image!</h3>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class NewPicture {

  public newPicture;
  public pictures;
  public lastImage: string = null;
  public loading: Loading;

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64Image: string;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            //this.takePicture(this.camera.PictureSourceType.CAMERA);
            this.snapPicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  snapPicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);

      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);

      imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        // Do something here when the data is succesfully uploaded!
      });
    }, (err) => {
      this.showBasicAlert('Error', err);
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
