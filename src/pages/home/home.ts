import {Component, Pipe, PipeTransform} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import * as tumblr from 'tumblr.js'
import { ENV } from '@app/env'
import { HomeModule} from "./home.module";
import {DomSanitizer} from "@angular/platform-browser";
import {BlogArticle} from "../blog-article/blog-article";
//import { AngularFire, FirebaseListObservable } from 'angularfire2';


@IonicPage({
  name: 'home',
  segment: 'home',
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  // items: FirebaseListObservable<any[]>;
  //
  // constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
  //   this.items = af.database.list('/items');
  // }
  //
  // signInWithFacebook(): void {
  //   this._auth.signInWithFacebook()
  //     .then(() => this.onSignInSuccess());
  // }
  //
  // private onSignInSuccess(): void {
  //   console.log("Facebook display name ",this._auth.displayName());
  // }

  public client;
  public posts;

  constructor(public navCtrl: NavController) {
    this.client = this.getClient();
    this.posts = this.getBlog();
  }

  getClient() {
    return tumblr.createClient({
      credentials: {
        consumer_key: ENV.TUMBLR_CONSUMER_KEY,
        consumer_secret: ENV.TUMBLR_CONSUMER_SECRET,
        token: ENV.TUMBLR_TOKEN,
        token_secret: ENV.TUMBLR_TOKEN_SECRET
      },
      returnPromises: true
    });
  }

  getBlog() {
    return this.client.blogPosts('fitprollc', {limit: 3})
      .then(function(res) {
        return res.posts;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  readBlogArticle(postId) {
    this.navCtrl.push(BlogArticle, {
      postId : postId
    }).then(res => {

    }).catch(err => {
      console.log(err);
    });
  }
}
