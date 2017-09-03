import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ENV } from "@app/env";

@Injectable()
export class YoutubeService {
  googleToken = ENV.GOOGLE_TOKEN;
  channelId = ENV.YOUTUBE_CHANNEL_ID;
  maxResults = 5;
  url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelId + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

  constructor(public http: Http) {}

  public getVideos(query:any){
    return this.http.get(this.url + '&q=' +  query)
      .map(res => res.json());
  }
}
