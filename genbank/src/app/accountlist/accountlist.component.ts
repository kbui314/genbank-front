import { Component, OnInit, Input } from '@angular/core';
import { Account } from './../model/account'
import { AccountlistService } from './accountlist.service';
import { Transaction } from './../model/transaction';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent implements OnInit {
  accounts:Account[];
  displayedColumns: string[] = ['date', 'accountfrom', 'transtype','amount', 'accountto','balance'];
  newAccount:Account;
  isTransfer = false;
  transAcc:string;

  constructor(
    private accountListService:AccountlistService
  ) { }

  ngOnInit(): void {
    this.accountListService.getAccounts().subscribe(resp =>{
      this.accounts = resp;
    });
    this.isTransfer = false;
    this.transAcc = "";
  }

  addNewAccount(){
    this.accountListService.generateNewAccount().subscribe(resp => {
      this.newAccount = resp;
      if(this.newAccount.accountnumber == ""){
        alert("Unable to create a new account. Please try again later.");
      }else{
        this.ngOnInit();
      }
    });
  }

  deposit(accountnumber:string,amount:number){
    if(amount <= 0){
      alert("Please enter an amount greater than $0.");
      return;
    }
    let trans:Transaction = new Transaction(0,null,accountnumber,amount,"Deposit");
    this.accountListService.deposit(trans).subscribe(resp => {
      if(resp.message == "Success"){
        alert("Success");
        this.ngOnInit();
      }else{
        alert("Failed. Please try again");
      }
    });
  }

  withdraw(accountnumber:string,amount:number){
    if(amount <= 0){
      alert("Please enter an amount greater than $0.");
      return;
    }
    let trans:Transaction = new Transaction(0,null,accountnumber,amount,"Withdraw");
    this.accountListService.withdraw(trans).subscribe(resp => {
      if(resp.message == "Success"){
        alert("Success");
        this.ngOnInit();
      }else{
        alert("Failed. Please try again");
      }
    });
  }

  transfer(accountnumber:string,amount:number){
    if(amount <= 0){
      alert("Please enter an amount greater than $0.");
      return;
    }
    if(this.isTransfer){
      let account = new Account(0,accountnumber,amount);
      let trans:Transaction = new Transaction(0,accountnumber,this.transAcc,amount,"Transfer");
      this.accountListService.tranfer(trans).subscribe(resp => {
        alert("Success");
        this.ngOnInit();
      });
    }else{
      this.isTransfer = true;
    }
  }

  sortTransaction(transList:Transaction[]){
    let compare = function(a:Transaction,b:Transaction){
      const idA = a.transId;
      const idB = b.transId;
      let comparison = 0;
      if(idA > idB){
        comparison = 1;
      }else if(idA < idB){
        comparison = -1;
      }
      return comparison;
    };
    transList.sort(compare);
    transList.reverse();
    return transList;
  }

  clearInput(){
    let inputArray = document.getElementsByTagName('input');
    if(inputArray.length > 0){
      for(let i = 0; i < inputArray.length; i++){
        inputArray[i].value = "";
      }
    }
    this.isTransfer = false;
  }

}
