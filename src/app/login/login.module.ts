import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '' , component: LoginComponent }
];

@NgModule({
  declarations: [
     LoginComponent,
     RegisterComponent
  ],
  imports: [
     CommonModule,
     RouterModule.forChild(authRoutes),
     FormsModule,
     ReactiveFormsModule,
     ],
  exports: [],
  providers: [],
}) 
export class LoginModule {}