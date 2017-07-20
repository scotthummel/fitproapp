import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodLog } from './food-log';
import { HeaderModule } from "../../../shared/header/header.module";

@NgModule({
  declarations: [
    FoodLog,
  ],
  imports: [
    HeaderModule,
    IonicPageModule.forChild(FoodLog),
  ],
  exports: [
    FoodLog
  ]
})
export class FoodLogModule {}
