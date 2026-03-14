import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {
  constructor(private http:HttpClient){}

complaint = {
title:'',
description:''
}

submitComplaint(){

const email = localStorage.getItem("email");

const data = {
  email:email,
  title:this.complaint.title,
  description:this.complaint.description
}

this.http.post("http://localhost:5000/add-complaint",data)
.subscribe(res=>{
  alert("Complaint Submitted");
})

}

}
