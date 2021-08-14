import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from './../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Person;
  hide = true;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): FormGroup['controls']{
    return this.loginForm.controls;
  }

  onSubmit(): void{
    const loginUser = new Person(0, '', '', this.f.username.value, this.f.password.value, '', '');
    this.loginService.loginUser(loginUser).subscribe( resp => {
      console.log(resp);
      sessionStorage.setItem('access_token', resp);
      this.loginService.setLogin(true);
      this.router.navigateByUrl('/view');
    });
  }
}
