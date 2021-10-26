import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDto } from '../models/login-dto.model';
import { UserForRegisterDto } from '../models/user-for-register-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginDto: LoginDto = new LoginDto();
  userToken: any;
  decodedToken: any;
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  userName: string;
  userId: any;



  constructor(public http: HttpClient) { }

  register(user: UserForRegisterDto) {
    const {Name, Email, Password} = user;
    return this.http.post(this.baseURL + 'register', {Name, Email, Password});
  }

  login() {
    return  this.http.post(this.baseURL + 'login', this.loginDto).pipe(map((response: any) => {
      const tokenResponse = response.token;
      if (tokenResponse) {
        localStorage.setItem('notta_token', tokenResponse);
        this.decodedToken = this.jwtHelper.decodeToken(tokenResponse);
        this.userName = this.decodedToken.unique_name;
        this.userId = this.decodedToken.nameid;
        this.userToken = tokenResponse;
        return this.userToken;
      }
    }));
  }

  loggedIn() {
    const token = localStorage.getItem('notta_token');
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }

  loggedOut() {
    localStorage.removeItem('notta_token');
  }



}
