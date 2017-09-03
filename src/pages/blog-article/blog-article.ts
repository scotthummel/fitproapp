import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as tumblr from 'tumblr.js'
import { ENV } from '@app/env'

/**
 * Generated class for the BlogArticle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-blog-article',
  templateUrl: 'blog-article.html',
})
export class BlogArticle {
  public client;
  public post: Promise<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = this.getClient();
    this.post = this.getArticle(navParams.get('postId'));
    console.log(this.post);
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

  getArticle(postId) {
    return this.client.blogPosts('fitprollc')
      .then(function (res) {
        let posts = res.posts;
        let post = posts.filter(post => post.id === postId);
        return post[0];
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
