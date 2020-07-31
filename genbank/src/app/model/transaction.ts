
export class Transaction{
    transId:number;
    transdate:Date;
    accountfrom:string;
    accountto:string;
    amount:number;
    transtype:string;
    balance:number;
    message:string;

    constructor(transId:number,accountfrom:string,accountto:string,
        amount:number,transtype:string){
        
        this.transId = transId;
        this.accountfrom = accountfrom;
        this.accountto = accountto;
        this.amount = amount;
        this.transtype = transtype;
    }
}