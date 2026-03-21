import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  dashboard: any = {};
  searchText: string = '';

  constructor(private http: HttpClient) {}
users= JSON.parse(sessionStorage.getItem("user") || "{}");
  modules = [
  { name: 'Leave', icon: 'fas fa-edit', route: '/student/leave' },
  { name: 'Complaints', icon: 'fas fa-exclamation-circle', route: '/student/complaint' },
  { name: 'Notices', icon: 'fas fa-bullhorn', route: '/student/notice' },

  { name: 'Attendance', icon: 'fas fa-calendar-check', route: '/student/attendance' }, 

  { name: 'Staff Directory', icon: 'fas fa-users', route: '/student/staff' },
  { name: 'Mess', icon: 'fas fa-utensils', route: '/student/mess' },
  { name: 'Fees', icon: 'fas fa-money-bill', route: '/student/fees' },

  { name: 'Feedback', icon: 'fas fa-comment-dots', route: '/student/feedback' }
];

 ngOnInit() {
  const email = this.users.email;

  this.http.get("http://localhost:5050/student-dashboard/" + email)
    .subscribe((data: any) => {
      console.log("Dashboard Data:", data); // 👈 ADD THIS
      this.dashboard = data;
    });
}


  filteredModules() {
    return this.modules.filter(m =>
      m.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}