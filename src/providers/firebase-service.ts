import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
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

  getChallenges(){
    return this.afd.list('/challenges/');
  }

  addChallenge(name) {
    //return this.afd.list('/challenges').push({name: name});
    return this.afd.list('/challenges', {
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }).subscribe(challenges => {
      if (!challenges.length) {
        console.log(challenges);
        this.afd.list('/challenges').push({
          name: name
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

  addNote(key, note) {
    return this.afd.list('/notes').push({userId: key, note: note, datestamp: new Date().toLocaleString() });
  }

  addInjury(key, bodyPartId, injury) {
    this.afd.object('/bodyParts/' + bodyPartId).subscribe(bodyPart => {
      return this.afd.list('/injuries').push({userId: key, bodyPartId: bodyPartId, bodyPart: bodyPart.part, injury: injury, datestamp: new Date().toLocaleString() });
    });
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

  getUserData() {
    return this.afd.object('/userProfile/' + this.user.uid);
  }

  updateUserName(newName) {
    return this.afd.object('/userProfile/' + this.user.uid).update({name: newName});
  }

}
