import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { YoutubeService } from "../../providers/youtube-service";
import {PlayerService} from "../../providers/player-service";

/*
  Generated class for the Youtube page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html'
})
export class YouTube {
  vPlayer = true;
  videos = {};
  search = {
    params:''
  };
  hidePlayer = true;

  constructor(public navCtrl: NavController,public player: PlayerService,public youtubeService: YoutubeService,public loadingCtrl:LoadingController) {
    //player.setupPlayer();
  }
  findVideos($event){
    let loading = this.loadingCtrl.create({
    });
    loading.present();

    this.youtubeService.getVideos(this.search.params).subscribe(
      videos => {
        this.videos=videos;
        loading.dismiss();
      },
      err=>{
        console.log(err);
      }
    );
  }
  baseUrl:string = 'https://www.youtube.com/embed/';

  playVideo(id){
    this.hidePlayer = false;
    this.player.launchPlayer(id)
    this.vPlayer = true;
  }

  ionViewDidLoad() {
    this.player.setupPlayer();
  }

}
