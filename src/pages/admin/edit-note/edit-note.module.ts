import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNote } from './edit-note';

@NgModule({
  declarations: [
    EditNote,
  ],
  imports: [
    IonicPageModule.forChild(EditNote),
  ],
  exports: [
    EditNote
  ]
})
export class EditNoteModule {}
