import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';


const routes: Routes = [
  {path: '', redirectTo: 'account', pathMatch: 'full'},
  {path: 'account', component: AccountComponent, children: [
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  ]},
  {path: 'posts', component: PostsComponent,  canActivate: [AuthGuard]},
  {path: 'posts/:id', component: PostDetailsComponent,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
