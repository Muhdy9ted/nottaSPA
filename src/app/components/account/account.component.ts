import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/posts']);
    } else {
      this.router.navigate(['/account/login']);
    }
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }
}
