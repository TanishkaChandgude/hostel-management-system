import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-complaints',
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.css']
})
export class ManageComplaintsComponent {

  complaints:any=[];

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.http.get("http://localhost:5050/complaints")
    .subscribe((data:any)=>{

      this.complaints = data;

    });

  }
  resolveComplaint(id:any){

this.http.put("http://localhost:5050/resolve-complaint/"+id,{})
.subscribe(res=>{

alert("Complaint Resolved");

this.ngOnInit(); // refresh list

});

}

}
