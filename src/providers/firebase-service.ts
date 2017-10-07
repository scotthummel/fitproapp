import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
  user: firebase.User;
  authState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, public afd: AngularFireDatabase) {
    this.authState = afAuth.authState;

    this.authState.subscribe(user => {
      this.user = user;
    });
  }

  signUp(email, password, firstName, lastName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      this.afd.list('/users').update(newUser.uid, {email: email, firstName: firstName, lastName: lastName});
    });
  }

  loginUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  saveIntake(user, values) {
    return this.afd.list('/users/' + user.uid + '/profile/').push(values);
  }

  getChallenges(){
    return this.afd.list('/challenges/');
  }

  getChallengesForCalendar() {
    return this.afd.list('/challenges/');
  }

  addChallenge(name, startDate) {
    //return this.afd.list('/challenges').push({name: name});
    let start = new Date(startDate);
    let end = new Date(start.setDate(start.getDate() + 30));

    return this.afd.list('/challenges', {
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }).subscribe(challenges => {
      if (!challenges.length) {
        // console.log(challenges);
        this.afd.list('/challenges').push({
          name: name,
          start: startDate,
          end: end.toISOString().slice(0,10)
        });
      }
    });
  }

  removeChallenge(key) {
    this.afd.list('/challenges').remove(key);
  }



  getClients() {
    return this.afd.list('/users');
  }

  addNote(key, note, category) {
    return this.afd.list('/notes').push({userId: key, note: note, category: category, datestamp: new Date().toLocaleString() });
  }

  addInjury(key, bodyPartId, injury) {
    this.afd.object('/bodyParts/' + bodyPartId).subscribe(bodyPart => {
      return this.afd.list('/injuries').push({userId: key, bodyPartId: bodyPartId, bodyPart: bodyPart.part, injury: injury, datestamp: new Date().toLocaleString() });
    });
  }

  deleteInjury(key) {
    this.afd.list('/injuries').remove(key);
  }

  deleteNote(key) {
    this.afd.list('/notes').remove(key);
  }

  addBodyParts() {
    let parts = [
      {
        part: 'Shoulder'
      },
      {
        part: 'Neck'
      },
      {
        part: 'Hand'
      },
      {
        part: 'Foot'
      },
      {
        part: 'Core/Abs'
      },
      {
        part: 'Upper Back'
      },
      {
        part: 'Chest'
      },
      {
        part: 'Lower Back/Hamstrings'
      },
      {
        part: 'Quads/Glutes'
      },
      {
        part: 'Bicep'
      },
      {
        part: 'Tricep'
      },
      {
        part: 'Calf'
      },
      {
        part: 'Miscellaneous'
      },
    ];

    parts.forEach(part => {
      this.afd.list('/bodyParts').push({ part : part.part });
    })
  }

  // createNewList(name) {
  //   return this.afd.list('/shoppingLists').push({name: name, creator: this.user.email});
  // }
  //
  // getUserLists() {
  //   return this.afd.list('/shoppingLists', {
  //     query: {
  //       orderByChild: 'creator',
  //       equalTo: this.user.email
  //     },
  //
  //   })
  //   .map(lists => {
  //     return lists.map(oneList => {
  //       oneList.shoppingItems = this.afd.list('/shoppingLists/' + oneList.$key + '/items');
  //       return oneList;
  //     });
  //   });
  // }

  // removeList(id) {
  //   this.afd.list('/shoppingLists/').remove(id);
  // }
  //
  // addListItem(listId, item) {
  //   return this.afd.list('/shoppingLists/' + listId + '/items').push({name: item});
  // }
  //
  // removeShoppingItem(listId, itemId) {
  //   this.afd.list('/shoppingLists/' + listId + '/items').remove(itemId);
  // }
  //
  // shareList(listId, listName, shareWith) {
  //   return this.afd.list('/invitations').push({listId: listId, listName: listName, toEmail: shareWith, fromEmail: this.user.email});
  // }
  //
  // getUserInvitations() {
  //   return this.afd.list('/invitations', {
  //     query: {
  //       orderByChild: 'toEmail',
  //       equalTo: this.user.email
  //     }
  //   })
  // }
  //
  // acceptInvitation(invitation) {
  //   // Remove the notification
  //   this.discardInvitation(invitation.$key);
  //   let data = {
  //     [this.user.uid]: true
  //   }
  //   return this.afd.object('/shoppingLists/' + invitation.listId).update(data);
  // }
  //
  // discardInvitation(invitationId) {
  //   this.afd.list('/invitations').remove(invitationId);
  // }
  //
  // getSharedLists() {
  //   return this.afd.list('/shoppingLists', {
  //     query: {
  //       orderByChild: this.user.uid,
  //       equalTo: true
  //     },
  //   })
  //   .map(lists => {
  //     return lists.map(oneList => {
  //       oneList.shoppingItems = this.afd.list('/shoppingLists/' + oneList.$key + '/items');
  //       return oneList;
  //     });
  //   });
  // }

  addExercises() {
    this.afd.list('/bodyParts').subscribe(parts => {
      parts.forEach(part => {
        if (part.part == 'Shoulder') {
          let exercises =  ['Handstand/Pike Push-ups', 'Seated Dumbbell Press', 'Standing Dumbbell press', 'Seated Barbell Press', 'Standing Barbell Press', 'Push Press', 'Arnold Press'];
          this.afd.list('/exercises').push({ partId : part.$key}).then(exercise => {
            exercises.forEach(ex => {
              this.afd.list('/exercises/' + exercise.key + '/exerciseList').push({exercise: ex});
            });
          });
        }
        // if (part.part == 'Core/Abs') {
        //   this.afd.list('/exercises').push({ partId: part.$key, exercises: ['Landmine Abs', 'Plank', 'Hanging Leg Raises', 'Ab Rollouts', 'Crunches', 'Obstacle Leg Raises', 'Bicycle Abs']});
        // }
        // if (part.part == 'Calf') {
        //   this.afd.list('/exercises').push({ partId: part.$key, exercises: ['Body Weight Standing Calf Raise', 'Weighted Standing Calf Raise', 'Seated Calf Raise', 'Machine Calf Raise', 'Donkey Calf Raise', 'Single Leg Calf Raise']});
        // }
        // if (part.part == 'Tricep') {
        //   this.afd.list('/exercises').push({ partId: part.$key, exercises: ['Dumbbell Skull Crushers', 'Barbell Skull Crushers', 'Single Dumbbell Overhead Extension', 'Double Dumbbell Overhead Extension', 'Rope Cable Extension', 'Rope Overhead Cable Extension', 'Bar Cable Extension', 'Single Arm Cable Extension', 'Dumbbell Kickbacks', 'Chatarunga (Close Grip) Push-ups', 'Diamond Push-ups', 'Floor Press']});
        // }
        // if (part.part == 'Bicep') {
        //   this.afd.list('/exercises').push({ partId: part.$key, exercises: ['Single Arm Preacher Curls', 'Bilateral Preacher Curls', 'Seated Incline Dumbbell Curl', 'Hammer Curl', 'Dumbbell Curl, Regular', 'Rope Cable Curls', 'Terry Pulls', 'EZ Bar Curl', 'Rainbow Curl', 'Spider Curl', 'Reverse Curl', '21\'s']});
        // }
        if (part.part == 'Chest') {
          let exercises = [{group: 'Benches', groupExercises: ['Flat Dumbbell Bench', 'Incline Dumbbell Bench', 'Decline Dumbbell Bench', 'Flat Barbell Bench', 'Incline Barbell Bench', 'Decline Barbell Bench', 'Push-ups – All Variations']}, {group: 'Flyes', groupExercises: ['FitPro Flyes', 'Down Cable Flyes', 'Up Cable Flyes', 'Flat Bench Dumbbell Flyes', 'Incline Bench Dumbbell Flyes', 'Decline Bench Dumbbell Flyes']}, {group: 'Dips', groupExercises: ['Full Dips', 'Half Dips', 'Bench Dips']}, {group: 'Other', groupExercises: ['Corner Throw']}];
          this.afd.list('/exercises').push({ partId: part.$key}).then(exercise => {
            exercises.forEach(ex => {
              this.afd.list('/exercises/' + exercise.key + '/exerciseList/').push({group: ex.group}).then(group => {
                ex.groupExercises.forEach(e => {
                  this.afd.list('/exercises/' + exercise.key + '/exerciseList/' + group.key + '/groupExercises').push({exercise: e});
                });
              });
            });
          });
        }
      });
    });
  }
}
