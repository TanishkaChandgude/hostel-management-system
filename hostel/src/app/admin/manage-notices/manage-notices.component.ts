import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-notices',
  templateUrl: './manage-notices.component.html',
  styleUrls: ['./manage-notices.component.css']
})
export class ManageNoticesComponent implements OnInit{

notice:any = {};
notices:any[] = [];

constructor(private http:HttpClient){}

ngOnInit(){
this.getNotices();
}

addNotice(){

this.http.post("http://localhost:5000/add-notice",this.notice)
.subscribe(res=>{

alert("Notice Added");

this.notice = {};

this.getNotices();

});
}

getNotices(){

this.http.get("http://localhost:5000/notices")
.subscribe((data:any)=>{

this.notices = data;

});

}

deleteNotice(id:any){

if(confirm("Delete this notice?")){

this.http.delete("http://localhost:5000/delete-notice/"+id)
.subscribe(res=>{

alert("Notice Deleted");

this.getNotices();

});

}

}

}

