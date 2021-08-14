import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from 'src/app/models/transaction';
import { Account } from '../../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[];
  url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url + 'viewaccounts');
  }

  generateNewAccount(): Observable<Account> {
    return this.http.get<Account>(this.url + 'addaccount');
  }

  deposit(trans: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url + 'deposit', trans);
  }

  withdraw(trans: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url + 'withdraw', trans);
  }

  tranfer(trans: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url + 'transfer/', trans);
  }
}
