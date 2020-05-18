import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { firebaseConfig } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 3. Initialize
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule // storage
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
