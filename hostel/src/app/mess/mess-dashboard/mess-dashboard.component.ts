import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mess-dashboard',
  templateUrl: './mess-dashboard.component.html',
  styleUrls: ['./mess-dashboard.component.css']
})
export class MessDashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  goToMenu() {
  this.router.navigate(['/mess/menu']);
}

  ngOnInit(): void {
  this.loadStats();
  this.getTodayMenu(); // ✅ ADD THIS
}

  loadStats() {
  this.getComplaints();
  this.getFeedback();
}

getComplaints() {
  this.http.get("http://localhost:5050/complaints")
    .subscribe((data: any) => {

      // ✅ FILTER ONLY MESS COMPLAINTS
      const messComplaints = data.filter(
        (c: any) => (c.type || '').toLowerCase() === 'mess'
      );

      // ✅ TOTAL
      this.stats.totalComplaints = messComplaints.length;

      // ✅ PENDING
      this.stats.pendingComplaints = messComplaints.filter(
        (c: any) => (c.status || '').toLowerCase() === 'pending'
      ).length;

    }, err => {
      console.error("Complaint fetch error", err);
    });
}

getFeedback() {
  this.http.get("http://localhost:5050/feedback")
    .subscribe((data: any) => {

      // ✅ FILTER ONLY MESS FEEDBACK
      const messFeedback = data.filter(
        (f: any) => (f.category || '').toLowerCase() === 'mess'
      );

      this.stats.totalFeedback = messFeedback.length;

    }, err => {
      console.error("Feedback fetch error", err);
    });
}

  searchText = '';

  // 📊 Sidebar Data
  stats = {
    totalComplaints: 0,
    pendingComplaints: 0,
    totalFeedback: 0
  };

  // 🍛 Menu
  menu: any = {};

  getTodayMenu() {
  this.http.get("http://localhost:5050/today-menu")
    .subscribe((data: any) => {

      console.log("Today's Menu:", data); // debug

      if (data) {
        this.menu = data;
      }

    }, err => {
      console.error("Menu fetch error", err);
    });
}

  // 🧩 Cards
  modules = [
    { name: 'Mess', icon: 'fas fa-utensils', route: '/mess/menu' },
    { name: 'Feedback', icon: 'fas fa-comments', route: '/mess/feedback' },
    { name: 'Complaints', icon: 'fas fa-exclamation-triangle', route: '/mess/complaints' },
    { name: 'Staff', icon: 'fas fa-user-cog', route: '/mess/staff' },
    { name: 'Notices', icon: 'fas fa-bullhorn', route: '/mess/notices' }
  ];

  filteredModules() {
    return this.modules.filter(m =>
      m.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}