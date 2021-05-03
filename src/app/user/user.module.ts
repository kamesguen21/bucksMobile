import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {EntryModule} from '../entry/entry.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
    EntryModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
