import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spin = false;
  error;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/account/register']);
  }

  onSubmit(form: NgForm) {
    this.spin = true;
    this.authService.login().subscribe((response) => {
      this.spin = false;
      form.reset();
    }, error => {
      this.spin = false;
      this.alertify.error(`Login Failed, please retry`);
      this.error = 'User Account does not exist';
    }, () => {
      this.error = '';
      this.alertify.success(`welcome back ${this.authService.userName}`);
      this.router.navigate(['/posts']);
    });
  }

}
