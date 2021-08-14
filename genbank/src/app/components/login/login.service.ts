import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8080/';
  isLogin: boolean;
  constructor(private http: HttpClient) {}

  loginUser(person: Person): Observable<string> {
    return this.http.post(
      this.url + 'login',
      { username: person.username, password: person.password },
      { responseType: 'text' }
    );
  }

  logout(): Observable<any> {
    return this.http.get(this.url + 'logout');
  }

  setLogin(bool: boolean): void {
    this.isLogin = bool;
  }
}
