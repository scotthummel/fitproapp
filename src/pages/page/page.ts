import { MenuController, AlertController } from "ionic-angular/index";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page',
  templateUrl: 'page.html'
})
export class Page {

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        // private common: CommonService,
        // public fitpro: FitproApi,
        public alert: AlertController
    ) { }

    ionViewDidLoad() {
      // this.subscription = this.common.notifyObservable$.subscribe((res) => {
      //    //this.navCtrl.setRoot(res.page);
      // });
    }

}
