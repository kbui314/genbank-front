export class Person{
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    phonenumber: string;

    constructor(id: number, firstname: string, lastname: string, username: string, password: string, email: string, phonenumber: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phonenumber = phonenumber;
    }
}
