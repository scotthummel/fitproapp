import { Subscription } from "rxjs/Subscription";
import { FitproApi } from "../../shared/fitpro-api.service";
import { CommonService } from "../../shared/common.service";
import { MenuController, AlertController } from "ionic-angular";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-page',
  templateUrl: 'page.html'
})
export class Page {

    private subscription: Subscription;

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
