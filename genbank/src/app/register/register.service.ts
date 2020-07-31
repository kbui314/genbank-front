import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Person } from "../model/user";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url:String = "http://localhost:8080/";
  constructor(private http:HttpClient) { }

  register(person:Person): Observable<Person>{
    return this.http.post<Person>(this.url+"register",person);
  }

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
