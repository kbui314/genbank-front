import { Transaction } from './transaction';

export class Account{
    accountid: number;
    accountnumber: string;
    balance: number;
    transactions: Transaction[];

    constructor(accountid: number, accountnumber: string, balance: number){
        this.accountid = accountid;
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
}
