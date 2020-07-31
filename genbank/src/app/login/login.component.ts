import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Person } from './../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user:Person;
  hide = true;
  constructor(
    private loginService:LoginService,
    private formBuilder:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    let loginUser = new Person(0,'','',this.f.username.value,this.f.password.value,'','');
    let response:any = this.loginService.loginUser(loginUser).subscribe( resp =>{
      this.user = resp;
      if(this.user.username == this.f.username.value){
        this.loginService.setLogin(true);
        this.router.navigateByUrl('/view');
      }else{
        alert("Username or password is invalid. Please try again.");
      }
    });
  }
}
