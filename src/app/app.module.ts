import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EntryModule} from './entry/entry.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, EntryModule],
  providers: [
    SQLite,
    SQLitePorter,
    DatePipe,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
