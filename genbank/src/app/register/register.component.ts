import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import {RegisterService} from './register.service';
import { Person } from '../model/user';
import { UrlSegmentGroup, Router } from '@angular/router';

@Component({
  selector:  'app-register',
  templateUrl:  './register.component.html',
  styleUrls:  ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Person;
  registerForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname:  ['', Validators.required],
      lastname:  ['', Validators.required],
      username:  ['', Validators.required],
      password:  ['', Validators.required],
      email:  ['', Validators.required, Validators.email],
      phonenumber:  ['', Validators.required]
    });
  }

  get f(): FormGroup['controls']{
    return this.registerForm.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    const newUser = new Person(0, this.f.firstname.value, this.f.lastname.value,
      this.f.username.value, this.f.password.value, this.f.email.value, this.f.phonenumber.value.toString());
    this.registerService.register(newUser).subscribe(resp => {
      this.user = resp;
      if (resp.firstname !== ''){
        alert('Registration Sucess');
        this.router.navigateByUrl('/');
      }else{
        alert('Registration Failed. Please try again.');
      }
    });
  }
}
