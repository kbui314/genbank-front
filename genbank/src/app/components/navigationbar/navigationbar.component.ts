import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { PersonService } from '../../services/personservice/person.service';
import { Router } from '@angular/router';

@Component({
  selector:  'app-navigationbar',
  templateUrl:  './navigationbar.component.html',
  styleUrls:  ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  isLogin = false;
  constructor(
    private loginService: LoginService,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/view'){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  logout(): void{
    this.personService.logout().subscribe(resp => {
      if (resp === null){
        this.personService.setLogin(false);
        sessionStorage.clear();
        this.router.navigateByUrl('');
      }
      sessionStorage.clear();
    });
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
