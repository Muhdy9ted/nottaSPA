import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';


export function tokenGetter() {
  return (localStorage.getItem('notta_token'));
}

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent,
    ProfileComponent,
    PostsComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     whitelistedDomains: ['localhost:54781'],
    //     blacklistedRoutes: ['http://localhost:54781/api/auth/']
    //   }
    // }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['/api'],
        blacklistedRoutes: ['/api/auth/']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
