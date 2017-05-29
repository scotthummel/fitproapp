import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-progress-pictures',
  templateUrl: 'progress-pictures.html'
})
export class ProgressPictures {

  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64Image: string;

  constructor(private camera: Camera) { }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }



  ionViewDidLoad() {
    console.log('Hello ProgressPicturesPage Page');
  }

}
