import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Main } from './main';

@NgModule({
  declarations: [
    Main,
  ],
  entryComponents: [

  ],
  imports: [
    IonicPageModule.forChild(Main)
  ],
  exports: [
    Main
  ]
})
export class MainModule {}
