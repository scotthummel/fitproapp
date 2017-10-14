import { Component } from '@angular/core';
import {App, IonicPage, NavController, ToastController} from 'ionic-angular';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";
import {EditNote} from "../edit-note/edit-note";
import {AngularFireAuth} from "angularfire2/auth";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'page-new-notes',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
          New Note
        </ion-card-header>

        <ion-card-content>
          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{ client.email }})</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <hr />
            <br />
            <form [formGroup]="notesForm">
              <ion-item>
                <ion-label>Category</ion-label>
                <ion-select formControlName="category">
                  <ion-option value="Massage">Massage</ion-option>
                  <ion-option value="Chiropractic">Chiropractic</ion-option>
                  <ion-option value="Lift">Lift</ion-option>
                  <ion-option value="Cardio">Cardio</ion-option>
                  <ion-option value="Body Measurements">Body Measurements</ion-option>
                </ion-select>
              </ion-item>
              <ion-item *ngIf="!notesForm.controls.category.required && (notesForm.controls.category.dirty || submitAttempt)">
                <div class="text-danger">Category is required.</div>
              </ion-item>
              <ion-item>
                <ion-label stacked>Note</ion-label>
                <ion-textarea formControlName="note" placeholder="Note"></ion-textarea>
              </ion-item>
              <ion-item *ngIf="!notesForm.controls.note.required && (notesForm.controls.note.dirty || submitAttempt)">
                <div class="text-danger">Note is required.</div>
              </ion-item>
              <button ion-button (click)="addNote(key)">Add Note</button>
            </form>
          </div>  
        </ion-card-content>
      </ion-card>
    </ion-content>
  `

})
export class NewNote extends FirebaseService {

  public clients;
  public shouldHideButton = true;
  public notesForm;
  public submitAttempt;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public fb: FormBuilder, public afAuth: AngularFireAuth, public afd: AngularFireDatabase, public app: App) {
    super(afAuth, afd, app);

    this.notesForm = fb.group({
      category: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  addNote(key) {
    this.submitAttempt = true;

    if (!this.notesForm.valid) {
      return false;
    }

    this.addNoteForUser(key, this.notesForm.value.note, this.notesForm.value.category);

    let toast = this.toastCtrl.create({
      message: 'Note added successfully',
      duration: 3000
    });
    toast.present();
  }

}
@Component({
  selector: 'page-notes-history',
  template: `
    <navbar></navbar>
    <ion-content>
      <ion-card>

        <ion-card-header class="card-header">
          Note History
        </ion-card-header>

        <ion-card-content>
          <ion-searchbar (ionInput)="getClients($event)" placeholder="Search for client"></ion-searchbar>
          <ion-list radio-group [(ngModel)]="key">
            <ion-item *ngFor="let client of clients" class="item item-radio">
              <ion-label *ngIf="client.hasOwnProperty('firstName')">{{ client.firstName }} {{client.lastName}} ({{ client.email }})</ion-label>
              <ion-label *ngIf="client.hasOwnProperty('username')">{{ client.username}} ({{ client.email }})</ion-label>
              <ion-radio [value]="client.$key" color="dark" (click)="getButton()"></ion-radio>
            </ion-item>
          </ion-list>

          <div [hidden]="shouldHideButton">
            <button ion-button (click)="getNotes(key)">Get Notes</button>
          </div>
          
          <div *ngIf="notes">
            <hr />
            <h2>Notes</h2>
            <ion-list>
              <ion-item-sliding *ngFor="let text of notes">
                <ion-item>
                  <blockquote>
                    {{ text.note }}<br />
                    <cite>&mdash; {{ text.datestamp }}</cite>
                  </blockquote>
                </ion-item>
                <ion-item-options side="right">
                  <button ion-button color="danger" (click)="deleteNote(text.$key)">Delete</button>
                  <button ion-button (click)="manageNote(text.$key)">Manage</button>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>
          </div>
        </ion-card-content>

      </ion-card>
    </ion-content>
  `
})
export class NotesHistory {

  public shouldHideButton = true;
  public notes;
  public clients;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, public afd: AngularFireDatabase) {}

  ionViewDidLoad() {
  }

  getButton() {
    return this.shouldHideButton = false;
  }

  getNotes(key) {
    this.afd.list('/notes', ref => ref.orderByChild('userId').equalTo(key)).subscribe(items => {
      let notes = [];
      items.forEach(item => {
        notes.push(item);
      });
      this.notes = notes;
    });
  }

  deleteNote(key) {
    this.firebaseService.deleteNote(key);
  }

  manageNote(key) {
    this.navCtrl.push(EditNote, {
      key: key
    }).then(res => {

    }).catch(err => {
      console.log(err);
    });
  }
}

@IonicPage()
@Component({
  templateUrl: 'notes.html'
})
export class Notes {
  public newNote;
  public notes;

  constructor() {
    this.newNote = NewNote;
    this.notes = NotesHistory;
  }
}
