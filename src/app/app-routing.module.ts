import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  // { path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/:id', component: ArticleDetailComponent },

   // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
