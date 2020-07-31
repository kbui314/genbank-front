import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  isLogin:boolean = false;
  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.router.url == "/view"){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  logout(){
    this.loginService.logout().subscribe(resp =>{
      if(resp == null){
        this.loginService.setLogin(false);
        this.router.navigateByUrl('');
      }
    });
  }

}
