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
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Pipe, PipeTransform} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import {Home} from "../pages/home/home";
import {CalendarPage } from "../pages/calendar/calendar";
import {Intake, IntakeHistory, NewIntake} from "../pages/admin/intake/intake";
import {LiftTracker} from "../pages/lift-tracker/lift-tracker";
import {InjuryHistory, InjuryTracker, NewInjury} from "../pages/admin/injury-tracker/injury-tracker";
import {ProgressPictures, NewPicture, PictureHistory} from "../pages/admin/progress-pictures/progress-pictures";
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
import {EditInjury} from "../pages/admin/edit-injury/edit-injury";
import {EditNote} from "../pages/admin/edit-note/edit-note";
import {Challenges, Clients, Users} from "../pages/admin/users/users";
import {Register} from "../pages/register/register";
import {About} from "../pages/about/about";
import {FoodLog, FoodLogHistory, NewFoodLog} from "../pages/admin/food-log/food-log";
import {Navbar} from "../components/navbar/navbar";
import {ClientPictures} from "../pages/client-pictures/client-pictures";
import {LiveLiftTracker} from "../pages/admin/live-lift-tracker/live-lift-tracker";
import {LiftRecordHistory, LiftRecords, NewLiftRecord} from "../pages/admin/lift-records/lift-records";
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {
  ClientConsultation, ClientFood, ClientInjuries, ClientNotes,
  ClientRecords
} from "../pages/client-records/client-records";
import { BodyHTML } from "../pipes/body";
import { PipeModule } from "../pipes/pipe.module";
import {BlogArticle} from "../pages/blog-article/blog-article";
import {PlayerService} from "../providers/player-service";
import {YoutubeService} from "../providers/youtube-service";
import {EventView} from "../pages/event-view/event-view";
import { ENV } from '@app/env'

export const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGE_ID
};


@NgModule({
  declarations: [
    Navbar,
    MyApp,
    Main,
    About,
    Login,
    Register,
    Home,
    CalendarPage,
    Intake,
    NewIntake,
    IntakeHistory,
    LiftTracker,
    InjuryTracker,
    NewInjury,
    InjuryHistory,
    EditInjury,
    ProgressPictures,
    NewPicture,
    PictureHistory,
    ThirtyDayChallenge,
    Notes,
    NewNote,
    NotesHistory,
    EditNote,
    YouTube,
    ClientPictures,
    ClientRecords,
    ClientConsultation,
    ClientInjuries,
    ClientNotes,
    ClientFood,
    AssignWorkout,
    FoodLog,
    NewFoodLog,
    FoodLogHistory,
    ManageThirtyDayChallenge,
    EditThirtyDayChallenge,
    EditDay,
    LiveLiftTracker,
    LiftRecords,
    NewLiftRecord,
    LiftRecordHistory,
    BlogArticle,
    EventView,
    Clients,
    Users,
    Challenges
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgCalendarModule,
    PipeModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: Home, segment: 'home'},
        {component: About, segment: 'about'},
        {component: CalendarPage, segment: 'calendar'},
        {component: NewIntake, segment: ''},
        {component: IntakeHistory, segment: ''},
        {component: LiftTracker, segment: 'lift-tracker'},
        {component: LiftRecords, segment: 'lift-records'},
        {component: NewLiftRecord, segment: ''},
        {component: LiftRecordHistory, segment: ''},
        {component: NewInjury, segment: ''},
        {component: InjuryHistory, segment: ''},
        {component: ThirtyDayChallenge, segment: 'thirty-day-challenge'},
        {component: ClientPictures, segment: 'client-pictures'},
        {component: ClientRecords, segment: 'client-records'},
        {component: ClientConsultation, segment: ''},
        {component: ClientInjuries, segment: ''},
        {component: ClientNotes, segment: ''},
        {component: ClientFood, segment: ''},
        {component: FoodLog, segment: 'food-log'},
        {component: NewFoodLog, segment: ''},
        {component: FoodLogHistory, segment: ''},
        {component: NewNote, segment: ''},
        {component: NotesHistory, segment: ''},
        {component: YouTube, segment: 'youtube'},
        {component: AssignWorkout, segment: 'assign-workout'},
        {component: ManageThirtyDayChallenge, segment: 'manage-thirty-day-challenge'},
        {component: Register, segment: 'register'},
        {component: Clients, segment: 'clients'},
        {component: Users, segment: 'users'},
        {component: Challenges, segment: 'challenges'},
        {component: LiveLiftTracker, segment: 'live-lift-tracker'},
        {component: NewPicture, segment: ''},
        {component: PictureHistory, segment: ''},
      ]
    }),
    CKEditorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Main,
    Login,
    Register,
    Home,
    About,
    CalendarPage,
    Intake,
    NewIntake,
    IntakeHistory,
    LiftTracker,
    InjuryTracker,
    NewInjury,
    InjuryHistory,
    EditInjury,
    ProgressPictures,
    NewPicture,
    PictureHistory,
    ThirtyDayChallenge,
    Notes,
    NewNote,
    EditNote,
    NotesHistory,
    YouTube,
    ClientPictures,
    ClientRecords,
    ClientConsultation,
    ClientInjuries,
    ClientNotes,
    ClientFood,
    AssignWorkout,
    FoodLog,
    NewFoodLog,
    FoodLogHistory,
    ManageThirtyDayChallenge,
    EditThirtyDayChallenge,
    EditDay,
    LiveLiftTracker,
    LiftRecords,
    NewLiftRecord,
    LiftRecordHistory,
    BlogArticle,
    EventView,
    Clients,
    Users,
    Challenges
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Window, useValue: window},
    FirebaseService,
    File,
    Transfer,
    Camera,
    FilePath,
    PlayerService,
    YoutubeService
  ]
})
export class AppModule {}

