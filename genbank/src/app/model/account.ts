import { Transaction } from './transaction';

export class Account{
    id: number;
    accountnumber: string;
    balance: number;
    transactions: Transaction[];

    constructor(id: number, accountnumber: string, balance: number){
        this.id = id;
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
}
