// import { Component, ViewChild } from '@angular/core';
// import { Nav, Platform } from 'ionic-angular';
// import { Home } from '../pages/home/home';
// import { FitproApi } from "../shared/fitpro-api.service";
// import { HttpModule } from "@angular/http";
// import {Main} from "../pages/main/main";
// import {StatusBar} from "@ionic-native/status-bar";
//
// @Component({
//   templateUrl: 'app.html',
//   providers : [
//     FitproApi,
//     HttpModule
//   ]
// })
// export class MyApp {
//   @ViewChild(Nav) nav: Nav;
//
//   rootPage: any = Main;
//
//   pages: Array<{title: string, component: any}>;
//
//   constructor(public platform: Platform) {
//     this.initializeApp();
//   }
//
//   initializeApp() {
//     this.platform.ready().then(() => {
//       // Okay, so the platform is ready and our plugins are available.
//       // Here you can do any higher level native things you might need.
//       // StatusBar.styleDefault();
//       // Splashscreen.hide();
//     });
//   }
// }

import { FirebaseService } from '../providers/firebase-service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Main} from "../pages/main/main";
import {Login} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private firebaseService: FirebaseService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      firebaseService.authState.subscribe(user => {
        if (user) {
          this.rootPage = Main;
        } else {
          this.rootPage = Login;
        }
      });

      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    });
  }
}


