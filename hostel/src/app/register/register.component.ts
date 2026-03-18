import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  user:any = {
    name:"",
    email:"",
    password:"",
    branch:"",
    rollNo:"",
    roomNo:"",
    year:"",
    role:"student"
  };

  constructor(private http:HttpClient){}

  register(){

    this.http.post("http://localhost:5000/register",this.user)
    .subscribe((res:any)=>{

      alert("Registration Successful");

    });

  }

}
