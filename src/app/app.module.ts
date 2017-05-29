// import { MyApp } from './app.component';
// import { EmailValidator } from "../validators/email-validator";
// import { Component, NgModule, ErrorHandler } from '@angular/core';
// import { IonicApp, IonicModule, AlertController, IonicErrorHandler } from 'ionic-angular';
// import { InjuryTracker} from "../pages/injury-tracker/injury-tracker";
// import { Subscription } from 'rxjs/Subscription';
// import { CommonService } from '../shared/common.service';
// import { Home } from "../pages/home/home";
// import { Calendar } from "../pages/calendar/calendar";
// import { Intake } from "../pages/intake/intake";
// import { LiftTracker } from "../pages/lift-tracker/lift-tracker";
// import { ProgressPictures } from "../pages/progress-pictures/progress-pictures";
// import { ThirtyDayChallenge } from "../pages/30-day-challenge/30-day-challenge";
// import { Notes } from "../pages/notes/notes";
// import { YouTube } from "../pages/youtube/youtube";
// import { AssignWorkout } from "../pages/admin/assign-workout/assign-workout"
// import { ManageThirtyDayChallenge } from "../pages/admin/manage-thirty-day-challenge/manage-thirty-day-challenge"
// import { EditThirtyDayChallenge } from "../pages/admin/edit-thirty-day-challenge/edit-thirty-day-challenge";
// import { EditDay } from "../pages/admin/edit-day/edit-day";
// import { FitproApi } from "../shared/fitpro-api.service";
// import { IonicStorageModule } from '@ionic/storage'
// import { Storage } from '@ionic/storage';
// import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { Page } from "../pages/page/page";
// import { SidePage } from "../pages/side-page/side-page";
// import { AuthService } from '../providers/auth-service';
// import { CKEditorModule } from 'ng2-ckeditor';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
// import {AngularFireDatabaseModule} from "angularfire2/database";
// import {AngularFireAuthModule} from "angularfire2/auth";
// import {AngularFireModule} from "angularfire2"
//
//
// export const firebaseConfig = {
//   apiKey: "AIzaSyAwkgJMA5sVengiVvHFKW-t7J8HAjAMYuY",
//   authDomain: "fitpro-c361e.firebaseapp.com",
//   databaseURL: "https://fitpro-c361e.firebaseio.com",
//   projectId: "fitpro-c361e",
//   storageBucket: "fitpro-c361e.appspot.com",
//   messagingSenderId: "1014754908163"
// };
//
//
// // Component({
// //  templateUrl: 'app.html',
// // })
// // export class FitPro {
// //     root = Page;
// //     sideRoot = SidePage;
// //
// //     isLoggedIn: boolean;
// //     user: {};
// //
// //     email : string;
// //     password : string;
// //     message: { error: string };
// //
// //     // private authenticate : FormGroup;
// //
// //     //users: FirebaseListObservable<any>;
// //
// //     constructor(
// //         // public navCtrl: NavController,
// //         //public menuCtrl: MenuController,
// //         //private common: CommonService,
// //         public fitpro: FitproApi,
// //         public storage: Storage,
// //         public alert: AlertController,
// //        // private _auth: AuthService,
// //         //private fb: FormBuilder
// //     ) {
// //       //   this.authenticate = this.fb.group({
// //       //     email: new FormControl('', EmailValidator.isValid),
// //       //     password: new FormControl('', Validators.required),
// //       //   });
// //       //
// //       // storage.ready().then(() => {
// //       //   storage.get('token').then((token) => {
// //       //     this.isLoggedIn = token;
// //       //   });
// //       // });
// //
// //       //this.users = this.af.database.list('/users');
// //     }
// //
// //     // login(values) {
// //     //    this.fitpro.login(values.email, values.password).subscribe(data => {
// //     //      this.common.notifyOther({
// //     //          user: data.user,
// //     //          page: Home
// //     //      });
// //     //      this.isLoggedIn = true;
// //     //    }, error => {
// //     //      this.message = JSON.parse(error._body);
// //     //      this.showAlert(this.message.error);
// //     //    });
// //     // }
// //     //
// //     // showAlert(error) {
// //     //   let alert = this.alert.create({
// //     //     title: 'Login Error',
// //     //     subTitle: error,
// //     //     buttons: ['OK']
// //     //   });
// //     //   alert.present();
// //     // }
// //
// //   // signInWithFacebook(): void {
// //   //   this._auth.signInWithFacebook()
// //   //     .then(() => this.onSignInSuccess());
// //   // }
// //   //
// //   // private onSignInSuccess(): void {
// //   //   this.isLoggedIn = true;
// //   //   this.saveUser(this._auth.uid(), this._auth.displayName(), this._auth.email());
// //   // }
// //   //
// //   // saveUser(uid, username, email) {
// //   //   this.af.database.list('/users', {
// //   //     query: {
// //   //       orderByChild: 'email',
// //   //       equalTo: email
// //   //     }
// //   //   }).subscribe(users => {
// //   //     if (!users.length) {
// //   //       this.users.push({
// //   //         id: uid,
// //   //         username: username,
// //   //         email: email
// //   //       });
// //   //     }
// //   //   });
// //   // }
// // }
//
//
// @NgModule({
//   declarations: [
//     // FitPro,
//     // Page,
//     // SidePage,
//     Home,
//     Calendar,
//     Intake,
//     LiftTracker,
//     InjuryTracker,
//     ProgressPictures,
//     ThirtyDayChallenge,
//     Notes,
//     YouTube,
//     AssignWorkout,
//     ManageThirtyDayChallenge,
//     EditThirtyDayChallenge,
//     EditDay
//   ],
//   imports: [
//     BrowserModule,
//     HttpModule,
//     AngularFireDatabaseModule,
//     AngularFireAuthModule,
//     IonicModule.forRoot(MyApp),
//     IonicStorageModule.forRoot(),
//     AngularFireModule.initializeApp(firebaseConfig),
//     CKEditorModule
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     // FitPro,
//     // Page,
//     // SidePage,
//     Home,
//     Calendar,
//     Intake,
//     LiftTracker,
//     InjuryTracker,
//     ProgressPictures,
//     ThirtyDayChallenge,
//     Notes,
//     YouTube,
//     AssignWorkout,
//     ManageThirtyDayChallenge,
//     EditThirtyDayChallenge,
//     EditDay
//   ],
//   providers: [CommonService, FitproApi, {provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
// })
// export class AppModule {}

import { FirebaseService } from '../providers/firebase-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { HttpModule } from '@angular/http';
import { Page } from "../pages/page/page";
import { SidePage } from "../pages/side-page/side-page";
import { CommonService } from "../shared/common.service";
import { FitproApi } from "../shared/fitpro-api.service";
import {Home} from "../pages/home/home";
import {CalendarPage } from "../pages/calendar/calendar";
import {Intake, IntakeHistory, NewIntake} from "../pages/admin/intake/intake";
import {LiftTracker} from "../pages/lift-tracker/lift-tracker";
import {InjuryHistory, InjuryTracker, NewInjury} from "../pages/admin/injury-tracker/injury-tracker";
import {ProgressPictures, NewPicture, PictureHistory} from "../pages/progress-pictures/progress-pictures";
import {ThirtyDayChallenge} from "../pages/30-day-challenge/30-day-challenge";
import {NewNote, Notes, NotesHistory} from "../pages/admin/notes/notes";
import {YouTube} from "../pages/youtube/youtube";
import {AssignWorkout} from "../pages/admin/assign-workout/assign-workout";
import {ManageThirtyDayChallenge} from "../pages/admin/manage-thirty-day-challenge/manage-thirty-day-challenge";
import {EditThirtyDayChallenge} from "../pages/admin/edit-thirty-day-challenge/edit-thirty-day-challenge";
import {EditDay} from "../pages/admin/edit-day/edit-day";
import { CKEditorModule } from 'ng2-ckeditor';
import {Main} from "../pages/main/main";
import {Login} from "../pages/login/login";
import { NgCalendarModule } from 'ionic2-calendar';
import { Camera } from '@ionic-native/camera';



export const firebaseConfig = {
  apiKey: "AIzaSyAwkgJMA5sVengiVvHFKW-t7J8HAjAMYuY",
  authDomain: "fitpro-c361e.firebaseapp.com",
  databaseURL: "https://fitpro-c361e.firebaseio.com",
  projectId: "fitpro-c361e",
  storageBucket: "fitpro-c361e.appspot.com",
  messagingSenderId: "1014754908163"
};

@NgModule({
  declarations: [
    MyApp,
    Main,
    Login,
    Home,
    CalendarPage,
    Intake,
    NewIntake,
    IntakeHistory,
    LiftTracker,
    InjuryTracker,
    NewInjury,
    InjuryHistory,
    ProgressPictures,
    NewPicture,
    PictureHistory,
    ThirtyDayChallenge,
    Notes,
    NewNote,
    NotesHistory,
    YouTube,
    AssignWorkout,
    ManageThirtyDayChallenge,
    EditThirtyDayChallenge,
    EditDay
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgCalendarModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: Home, segment: 'home'},
       // {component: CalendarComponent, segment: 'calendar'},
        {component: Intake, segment: 'intake'},
        {component: LiftTracker, segment: 'lift-tracker'},
        {component: InjuryTracker, segment: 'injury-tracker'},
        {component: ProgressPictures, segment: 'progress-pictures'},
        {component: ThirtyDayChallenge, segment: 'thirty-day-challenge'},
        {component: Notes, segment: 'notes'},
        {component: YouTube, segment: 'youtube'},
        {component: AssignWorkout, segment: 'assign-workout'},
        {component: ManageThirtyDayChallenge, segment: 'manage-thirty-day-challenge'}
      ]
    }),
    CKEditorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Main,
    Login,
    Home,
    CalendarPage,
    Intake,
    NewIntake,
    IntakeHistory,
    LiftTracker,
    InjuryTracker,
    NewInjury,
    InjuryHistory,
    ProgressPictures,
    NewPicture,
    PictureHistory,
    ThirtyDayChallenge,
    Notes,
    NewNote,
    NotesHistory,
    YouTube,
    AssignWorkout,
    ManageThirtyDayChallenge,
    EditThirtyDayChallenge,
    EditDay
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService,
    Camera
    // FitproApi,
  ]
})
export class AppModule {}

