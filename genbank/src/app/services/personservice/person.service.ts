import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Person } from '../../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  url = 'http://localhost:8080/';
  isLogin: boolean;

  constructor(private httpClient: HttpClient) { }

  register(person: Person): Observable<Person>{
    return this.httpClient.post<Person>(this.url + 'register', person);
  }

  loginUser(person: Person): Observable<string> {
    return this.httpClient.post(
      this.url + 'login',
      { username: person.username, password: person.password },
      { responseType: 'text' }
    );
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.url + 'logout');
  }

  setLogin(bool: boolean): void {
    this.isLogin = bool;
  }

}
