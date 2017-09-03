import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogArticle } from './blog-article';

@NgModule({
  declarations: [
    BlogArticle,
  ],
  imports: [
    IonicPageModule.forChild(BlogArticle),
  ],
  exports: [
    BlogArticle
  ]
})
export class BlogArticleModule {}
