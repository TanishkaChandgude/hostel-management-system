import { Component } from '@angular/core';

@Component({
  selector: 'app-mess-dashboard',
  templateUrl: './mess-dashboard.component.html',
  styleUrls: ['./mess-dashboard.component.css']
})
export class MessDashboardComponent {

  searchText = '';

  // 📊 Sidebar Data
  stats = {
    totalComplaints: 8,
    pendingComplaints: 3,
    totalFeedback: 15
  };

  // 🍛 Menu
  menu = {
    breakfast: 'Poha & Tea',
    lunch: 'Rice & Dal',
    dinner: 'Chapati & Sabji'
  };

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