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

import { firebaseConfig, environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from './register/register.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { LoginModule } from './login/login.module';

import {ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {reducer} from './state/store.reducer';
import { LibraryModule } from './libs.module';
import { LoaderComponent } from './layout/loader/loader.component';

@NgModule({
   declarations: [
      AppComponent,
      DashBoardComponent,
      LayoutComponent,
      HeaderComponent,
      FooterComponent,
      LoaderComponent,
      //RegisterComponent,
      ArticleComponent,
      ArticleDetailComponent,
      
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      LoginModule,
      MaterialModule,
      LibraryModule,
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      SweetAlert2Module.forRoot(),
      StoreModule.forRoot({reducer}),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
