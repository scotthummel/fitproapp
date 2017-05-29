import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-lift-tracker',
  templateUrl: 'lift-tracker.html'
})
export class LiftTracker {

  public exercises = [];

  constructor(
      public navCtrl: NavController,
      public loadingController: LoadingController,
      // public fitpro: FitproApi,
      // public storage: Storage
  ) {}

  ionViewDidLoad() {
    // this.storage.get('exercise-categories').then((data) => {
    //   if (!data) {
    //     let loader = this.loadingController.create({
    //       content: 'Loading...'
    //     });
    //
    //     loader.present().then(() => {
    //       this.fitpro.getExerciseCategories().subscribe(data => {
    //         this.storage.set('exercise-categories', JSON.stringify(data));
    //         loader.dismiss();
    //       });
    //     });
    //   } else {
    //     this.exercises = JSON.parse(data);
    //   }
    // });
  }

}
