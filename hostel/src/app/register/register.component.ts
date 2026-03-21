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
    year:""
  };

  constructor(private http:HttpClient){}

  register(){

    this.http.post("http://localhost:5050/register", this.user)
    .subscribe((res:any)=>{

      alert("Registered Successfully 🎉\nRoom Assigned: " + res.roomAssigned);

    }, (err) => {
    console.log("LOGIN ERROR:", err); // 🔥 DEBUG
    alert("Student already exists");
  });

  }

}
