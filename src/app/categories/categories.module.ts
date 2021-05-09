import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CategoriesComponent} from './categories.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoryViewComponent} from './category-view/category-view.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {EntryModule} from '../entry/entry.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    EntryModule
  ],
  declarations: [CategoriesComponent, CategoryAddComponent, CategoryViewComponent, CategoryDetailsComponent]
})
export class CategoriesModule {
}
