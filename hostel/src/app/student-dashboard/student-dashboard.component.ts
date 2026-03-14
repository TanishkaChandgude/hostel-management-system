import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent  implements OnInit{

dashboard:any = {};

constructor(private http:HttpClient){}

ngOnInit(){

const email = localStorage.getItem("email");

this.http.get("http://localhost:5000/student-dashboard/"+email)
.subscribe((data:any)=>{

this.dashboard = data;

});

}

}
