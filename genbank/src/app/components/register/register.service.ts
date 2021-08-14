import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Person } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  register(person: Person): Observable<Person>{
    return this.http.post<Person>(this.url + 'register', person);
  }

}
