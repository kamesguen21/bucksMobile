import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {GoalsRoutingModule} from './goals-routing.module';
import {GoalsComponent} from './goals.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoalsRoutingModule
  ],
  declarations: [GoalsComponent]
})
export class GoalsModule { }
