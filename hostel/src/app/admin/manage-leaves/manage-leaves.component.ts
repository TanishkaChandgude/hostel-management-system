import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.css']
})
export class ManageLeavesComponent {

constructor(private http:HttpClient){}

leaves:any=[];

ngOnInit(){

this.http.get("http://localhost:5000/all-leaves")
.subscribe((data:any)=>{

this.leaves=data;

});

}
approveLeave(id:any){

this.http.put("http://localhost:5000/approve-leave/"+id,{})
.subscribe(res=>{

alert("Leave Approved");
this.ngOnInit();

});

}


rejectLeave(id:any){

this.http.put("http://localhost:5000/reject-leave/"+id,{})
.subscribe(res=>{

alert("Leave Rejected");
this.ngOnInit();

});

}

}