import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})

export class LeaveComponent implements OnInit {
today = new Date().toISOString().split('T')[0];
leave:any = {
  reason:'',
  fromDate:'',
  toDate:''
};

leaves:any[] = [];

constructor(private http:HttpClient){}

ngOnInit(){
  this.getLeaves();
}

applyLeave(){

const email = localStorage.getItem("email");

const from = new Date(this.leave.fromDate);
const to = new Date(this.leave.toDate);
const today = new Date();

today.setHours(0,0,0,0);

if(from < today){
  alert("Leave cannot start in the past");
  return;
}

if(to < from){
  alert("To Date cannot be before From Date");
  return;
}

const data = {
  studentEmail: email,
  reason: this.leave.reason,
  fromDate: this.leave.fromDate,
  toDate: this.leave.toDate,
   status: "Pending"
};

this.http.post("http://localhost:5000/apply-leave",data)
.subscribe(res=>{

alert("Leave Applied");

this.leave = {};
this.getLeaves();

});

}

getLeaves(){

const email = localStorage.getItem("email");

this.http.get("http://localhost:5000/my-leaves/"+email)
.subscribe((data:any)=>{

this.leaves = data;

});

}


}