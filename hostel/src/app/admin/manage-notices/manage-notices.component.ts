import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-notices',
  templateUrl: './manage-notices.component.html',
  styleUrls: ['./manage-notices.component.css']
})
export class ManageNoticesComponent {

notice:any={};

constructor(private http:HttpClient){}

addNotice(){

this.http.post("http://localhost:5000/add-notice",this.notice)
.subscribe(res=>{

alert("Notice Added");

this.notice={};

});

}

}