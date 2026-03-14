import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit{

notices:any[]=[];

constructor(private http:HttpClient){}

ngOnInit(){

this.http.get("http://localhost:5000/notices")
.subscribe((data:any)=>{

this.notices=data;

});

}

}