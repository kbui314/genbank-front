import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../models/account';
import { AccountService } from '../../services/accountservice/account.service';
import { Transaction } from '../../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css'],
})
export class AccountlistComponent implements OnInit {
  accounts: Account[];
  displayedColumns: string[] = [
    'date',
    'accountfrom',
    'transtype',
    'amount',
    'accountto',
    'balance',
  ];
  newAccount: Account;
  isTransfer = false;
  transAcc: string;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((resp) => {
      const compare = (a: Account, b: Account): number => {
        const idA = a.accountid;
        const idB = b.accountid;
        if (idA > idB) {
          return 1;
        } else if (idA < idB) {
          return -1;
        } else {
          return 0;
        }
      };
      resp.sort(compare);
      this.accounts = resp;
    },
    (error) => {
      if (error.status === 403){
        this.router.navigateByUrl('');
      }
    });
    this.isTransfer = false;
    this.transAcc = '';
  }

  addNewAccount(): void {
    this.accountService.generateNewAccount().subscribe((resp) => {
      this.newAccount = resp;
      if (this.newAccount.accountnumber === '') {
        alert('Unable to create a new account. Please try again later.');
      } else {
        this.ngOnInit();
      }
    });
  }

  deposit(accountnumber: string, amount: number): void {
    if (amount <= 0) {
      alert('Please enter an amount greater than $0.');
      return;
    }
    const trans: Transaction = new Transaction(
      0,
      null,
      accountnumber,
      amount,
      'Deposit'
    );
    this.accountService.deposit(trans).subscribe((resp) => {
      if (resp.message === 'Success') {
        alert('Success');
        this.ngOnInit();
      } else {
        alert('Failed. Please try again');
      }
    });
  }

  withdraw(accountnumber: string, amount: number): void {
    if (amount <= 0) {
      alert('Please enter an amount greater than $0.');
      return;
    }
    const trans: Transaction = new Transaction(
      0,
      null,
      accountnumber,
      amount,
      'Withdraw'
    );
    this.accountService.withdraw(trans).subscribe((resp) => {
      if (resp.message === 'Success') {
        alert('Success');
        this.ngOnInit();
      } else {
        alert('Failed. Please try again');
      }
    });
  }

  transfer(accountnumber: string, amount: number): void {
    if (amount <= 0) {
      alert('Please enter an amount greater than $0.');
      return;
    }
    if (this.isTransfer) {
      const trans: Transaction = new Transaction(
        0,
        accountnumber,
        this.transAcc,
        amount,
        'Transfer'
      );
      this.accountService.tranfer(trans).subscribe((resp) => {
        alert('Success');
        this.ngOnInit();
      });
    } else {
      this.isTransfer = true;
    }
  }

  sortTransaction(transList: Transaction[]): Transaction[] {
    const compare = (a: Transaction, b: Transaction): number => {
      const idA = a.transId;
      const idB = b.transId;
      let comparison = 0;
      if (idA > idB) {
        comparison = 1;
      } else if (idA < idB) {
        comparison = -1;
      }
      return comparison;
    };
    transList.sort(compare);
    transList.reverse();
    return transList;
  }

  clearInput(): void {
    const inputArray = document.getElementsByTagName('input');
    if (inputArray.length > 0) {
      for (let i = 0; i < inputArray.length; i++) {
        inputArray[i].value = '';
      }
      // for (const input of Object.keys(inputArray)){
      //   inputArray[input] = '';
      // }
    }
    this.isTransfer = false;
  }
}
