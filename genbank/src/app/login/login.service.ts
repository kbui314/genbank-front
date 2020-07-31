import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Person } from './../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:String = "http://localhost:8080/";
  isLogin:boolean;
  constructor(private http:HttpClient) { }

  loginUser(person:Person): Observable<Person>{
    return this.http.post<Person>(this.url+"login",person);
  }
  
  logout():Observable<any>{
    return this.http.get(this.url+"logout");
  }

  setLogin(bool:boolean){
    this.isLogin = bool;
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};