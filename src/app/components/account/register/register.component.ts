import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';
import { UserForRegisterDto } from 'src/app/_shared/models/user-for-register-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailError: string;
  spin = false;
  user: UserForRegisterDto;
  userName;


  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2),  Validators.maxLength(30)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formData: FormGroup) {
    return formData.get('Password').value === formData.get('confirmPassword').value ? null : {mismatch: true};
  }

  getUserName(event) {
    const userEmail = event.target.value;
    const pos = userEmail.indexOf('@');
    this.userName = userEmail.substring(0, pos );
    this.registerForm.controls.Name.setValue(this.userName);
  }

  login() {
    this.router.navigate(['/account/login']);
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.spin = true;
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe((response) => {
        this.alertify.success('Registration Successful');
        this.spin = false;
      }, (error) => {
        this.emailError = error.error;
        this.alertify.error('Registration failed, please retry!');
        this.spin = false;
      }, () => {
        this.emailError = '';
        this.router.navigate(['/account/login']);
      });
    }
  }

}
