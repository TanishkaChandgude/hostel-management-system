import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
stats:any = {};
  rooms:any[] = [];
  dashboard: any = {};
  searchText: string = '';

  constructor(private http: HttpClient) {}
users= JSON.parse(localStorage.getItem("user") || "{}");
  modules = [
  { name: 'Leave', icon: 'fas fa-edit', route: '/admins/leaves' },
  { name: 'Complaints', icon: 'fas fa-exclamation-circle', route: '/admins/complaints' },
  { name: 'Notices', icon: 'fas fa-bullhorn', route: '/admins/notices' },

  { name: 'View Avaliable rooms', icon: 'fas fa-door-open', route: '/admins/rooms' }, 

  { name: 'Add Staff Directory', icon: 'fas fa-users', route: '/admins/addstaff' },
  { name: 'Mess', icon: 'fas fa-utensils', route: '/admins/mess' },
  { name: 'Add rooms', icon: 'fas fa-plus', route: '/admins/addrooms' },
  
 { name: 'Register New student', icon: 'fas fa-user-plus', route: '/admins/register' },
  { name: 'Feedback', icon: 'fas fa-comment-dots', route: '/admins/feedbacks' },
  { name: 'Students', icon: 'fas fa-users', route: '/admins/view' }
];

 ngOnInit() {
  const email = localStorage.getItem("email");

  this.http.get("http://localhost:5050/student-dashboard/" + email)
    .subscribe((data: any) => {
      console.log("Dashboard Data:", data); // 👈 ADD THIS
      this.dashboard = data;
    });
      this.getRoomStats();
}
 getRoomStats(){
    this.http.get("http://localhost:5050/room-stats")
    .subscribe((data:any)=>{

      this.stats = data;
      this.rooms = data.roomDetails;
      

    });
  }


  filteredModules() {
    return this.modules.filter(m =>
      m.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}