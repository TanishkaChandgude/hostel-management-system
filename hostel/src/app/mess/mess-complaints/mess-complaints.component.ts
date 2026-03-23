import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mess-complaints',
  templateUrl: './mess-complaints.component.html',
  styleUrls: ['./mess-complaints.component.css']
})
export class MessComplaintsComponent {

  complaints:any=[];

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.http.get("http://localhost:5050/complaints")
    .subscribe((data:any)=>{

      console.log("MESS DATA:", data); // 🔍 DEBUG

      // ✅ ONLY MESS COMPLAINTS
      this.complaints = data.filter(
        (c: any) => c.type?.toLowerCase() === 'mess'
      );


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
