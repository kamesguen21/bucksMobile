import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {EntryComponent} from './entry.component';
import {EntryViewComponent} from './entry-view/entry-view.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    EntryViewComponent
  ],
  declarations: [EntryComponent, EntryViewComponent]
})
export class EntryModule {
}
