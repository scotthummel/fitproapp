import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Navbar } from './navbar';

@NgModule({
  declarations: [
    Navbar,
  ],
  imports: [
    IonicPageModule.forChild(Navbar),
  ],
  exports: [
    Navbar
  ]
})
export class NavbarModule {}
