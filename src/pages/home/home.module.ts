import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home } from './home';
import {PipeModule} from "../../pipes/pipe.module";

@NgModule({
  declarations: [
    Home
  ],
  imports: [
    IonicPageModule.forChild(Home),
    PipeModule
  ],
  exports: [
    Home
  ]
})
export class HomeModule {}
