import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {FirebaseService} from "../../../providers/firebase-service";
import {AngularFireDatabase} from "angularfire2/database";
//import * as _ from 'lodash';

@Component({
  selector: 'assign-workout',
  templateUrl: 'assign-workout.html'
})
export class AssignWorkout {

  public users;
  public exercises;
  public user;
  private workout : FormGroup;
  public parts;
  public shouldHideParts = true;
  public shouldHideExercises = true;
  public shouldHideRepSchemeSelector = true;
  public shouldHideReps = true;
  public shouldHideDropSet = true;
  public shouldHidePartial = true;
  public shouldHideCountdown = true;
  public shouldHidePyramid = true;
  public shouldHideCluster = true;
  public shouldHideLadders = true;
  public shouldHideEccentric = true;
  public shouldHidePeak = true;
  public bodyPart;
  public exercise;
  public sets;
  public reps;
  public dropSetReps;
  public dropSetWeight;
  public clusterReps;
  public clusterWeight;
  public partialReps;
  public partialWeight;
  public countdown;
  public pyramid;
  public ladders;
  public eccentric;
  public peakContraction;
  public scheme
  public repScheme;
  public dueAt;
  public formChanges;
  public repSchemeGroup;
  public clients;

  constructor(
      public navCtrl: NavController,
      public loadingController: LoadingController,
      // public fitpro: FitproApi,
      // public storage: Storage,
      private fb: FormBuilder,
      private firebaseService: FirebaseService,
      private afd: AngularFireDatabase
  ) {
    this.workout = this.fb.group({
      key: new FormControl(''),
      user_id: new FormControl('', Validators.required),
      part: new FormControl('', Validators.required),
      ex: new FormControl('', Validators.required),
      due_at: new FormControl('', Validators.required),
      rep_scheme: this.fb.group({
          scheme: new FormControl('', Validators.required),
          sets: new FormControl(''),
          reps: new FormControl(''),
          drop_reps: new FormControl(''),
          drop_weight: new FormControl(''),
          cluster_reps: new FormControl(''),
          cluster_weight: new FormControl(''),
          partial_reps: new FormControl(''),
          partial_weight: new FormControl(''),
          countdown: new FormControl(''),
          pyramid: new FormControl(''),
          ladders: new FormControl(''),
          eccentric: new FormControl(''),
          peak_contraction: new FormControl('')
      })
      //}, {validator: this.validateRepScheme})
    });

  //   this.formChanges = this.workout.valueChanges;
  //   this.formChanges.debounceTime(400).subscribe(data => {
  //       //console.log(data);
  //   });
   }
  //
  validateRepScheme(group) {
      let scheme = group.controls.scheme.value;
      let cluster_reps = group.controls.cluster_reps.value;
      let cluster_weight = group.controls.cluster_weight.value;
      let dropset_reps = group.controls.dropset_reps.value;
      let dropset_weight = group.controls.dropset_weight.value;
      let countdown = group.controls.countdown.value;
      let eccentric = group.controls.eccentric.value;
      let ladders = group.controls.ladders.value;
      let peak = group.controls.peak_contraction.value;
      let pyramid = group.controls.pyramid.value;
      let reps = group.controls.reps.value;
      let weight = group.controls.weight.value;

      if (scheme == 'chose_cluster_reps' && cluster_reps !== '' && cluster_reps !== undefined && cluster_weight !== '' && cluster_weight !== undefined) {
          return null;
      }

      if (scheme == 'chose_countdown' && countdown !== '' && countdown !== undefined) {
          return null;
      }

      if (scheme == 'chose_drop_set' && dropset_reps !== '' && dropset_reps !== undefined && dropset_weight !== '' && dropset_weight !== undefined) {
          return null;
      }

      if (scheme == 'chose_eccentric' && eccentric !== '' && eccentric !== undefined) {
        return null;
      }

      if (scheme == 'chose_ladders' && ladders !== '' && ladders !== undefined) {
          return null;
      }

      if (scheme == 'chose_peak' && peak !== '' && peak !== undefined) {
          return null;
      }

      if (scheme == 'chose_pyramid' && pyramid !== '' && pyramid !== undefined) {
          return null;
      }

      if (scheme == 'chose_sets' && reps !== '' && reps !== undefined && weight !== '' && weight !== undefined) {
          return null;
      }

      return {
        isValid: false
      };
  }

  ionViewDidLoad() {
    // this.firebaseService.addExercises();
    this.getBodyParts();
  }

  formFilled() {
      return true;
  }

  getClients(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.firebaseService.getClients().subscribe(data => {
        this.clients = data.filter((item) => {
          if (item.hasOwnProperty('firstName')) {
            //return item.firstName.includes(val) || item.lastName.includes(val) || item.email.includes(val);
          } else {
            //return item.username.includes(val) || item.email.includes(val);
          }
        })
      });
    }
  }

  getExercises(bodyPartId) {
    this.afd.list('/exercises', ref => ref.orderByChild('partId').equalTo(bodyPartId)).subscribe(exercises => {
      let exs = [];
      // for (let ex in exercises[0].exerciseList){
      //   exs.push(exercises[0].exerciseList[ex]);
      // }
      // this.exercises = exs;
    });
  }

  assignWorkout(values) {

  }

  getBodyParts() {
    this.afd.list('/bodyParts').subscribe(parts => {
      this.parts = parts;
    });
  }

  getParts() {
    return this.shouldHideParts = false;
  }

  getExerciseSelect() {
    this.getExercises(this.bodyPart);
    return this.shouldHideExercises = false;
  }

  getRepSchemeSelector() {
    return this.shouldHideRepSchemeSelector = false;
  }

  getRepScheme() {
      switch(this.repScheme) {
          case 'chose_sets':
            this.resetSchemes();
            this.shouldHideReps = false;
            break;
          case 'chose_drop_set':
            this.resetSchemes();
            this.shouldHideDropSet = false;
            break;
          case 'chose_countdown':
            this.resetSchemes();
            this.shouldHideCountdown = false;
            break;
          case 'chose_pyramid':
            this.resetSchemes();
            this.shouldHidePyramid = false;
            break;
          case 'chose_cluster_reps':
            this.resetSchemes();
            this.shouldHideCluster = false;
            break;
          case 'chose_ladders':
            this.resetSchemes();
            this.shouldHideLadders = false;
            break;
          case 'chose_eccentric':
            this.resetSchemes();
            this.shouldHideEccentric = false;
            break;
          case 'chose_peak':
            this.resetSchemes();
            this.shouldHidePeak = false;
            break;
      }
  }

  resetSchemes() {
      this.shouldHideReps = true;
      this.shouldHideDropSet = true;
      this.shouldHidePartial = true;
      this.shouldHideCountdown = true;
      this.shouldHidePyramid = true;
      this.shouldHideCluster = true;
      this.shouldHideLadders = true;
      this.shouldHideEccentric = true;
      this.shouldHidePeak = true;
  }

  getReps() {
    return this.shouldHideReps = false;
  }

  formErrors = {
    'scheme': [],
    'cluster_reps': [],
  };

  validationMessages = {
    'cluster_reps':  {
        'required': 'Required'
    },
    'scheme': {
        'required': 'Required'
    },
    'username': {
      'required':      'Username is required.',
      'minlength':     'Username must be at least 5 characters long.',
      'maxlength':     'Username cannot be more than 25 characters long.',
      'pattern':       'Your username must contain only numbers and letters.',
      'validUsername': 'Your username has already been taken.'
    },
    'name': {
      'required':      'Name is required.'
    },
    'lastname': {
      'required':      'Last name is required'
    },
    'email': {
      'required':      'Email is required',
      'pattern':       'Enter a valid email.'
    },
    'phone': {
      'required':      'Phone is required',
      'pattern':       'Enter only numbers',
      'validatePhone': 'Phone incorrect for the country selected'
    },
    'password': {
      'required':      'Password is required',
      'minlength':     'Password must be at least 5 characters long.',
      'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.'
    },
    'confirmPassword':{
      'required':      'Confirm password is required',
      'minlength':     'Confirm password must be at least 5 characters long.',
      'pattern':       'Your password must contain at least one uppercase, one lowercase, and one number.',
      'validateEqual': 'Password mismatch'
    }
  };

  onValueChanged(data?: any) {
      if (!this.workout) { return; }
      const form = this.workout;
      for (const field in this.formErrors) {
        // clear previous error message
        this.formErrors[field] = [];
        this.workout[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field].push(messages[key]);
          }
        }
      }
    }


}
