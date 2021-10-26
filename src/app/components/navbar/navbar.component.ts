import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isCollapsed = false;
  userId: any;
  jwtHelper = new JwtHelperService();

  constructor(public authService: AuthService, private route: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    const token = localStorage.getItem('notta_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken.nameid;
    }
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    this.authService.loggedOut();
    this.route.navigate(['/']);
    this.alertify.success('logged out successfully');

  }
}
