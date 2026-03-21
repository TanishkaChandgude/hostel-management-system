import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent {

  user: string = '';
  users = JSON.parse(localStorage.getItem("user") || "{}");
  userInitial: string = '';

  showDropdown: boolean = false;

  // 🔔 Notification variables
  notifications: any[] = [];
  unreadCount: number = 0;
  showNotificationDropdown: boolean = false;

  // ✅ safer email
  userEmail: string = localStorage.getItem("email") || '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.user = localStorage.getItem("name") || '';

    if (this.user) {
      this.userInitial = this.user.charAt(0).toUpperCase();
    }

    this.loadUnreadCount();

    setInterval(() => {
      this.loadUnreadCount();
    }, 10000);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  goHome() {
    this.router.navigate(['/student']);
  }

  /* 🔔 Toggle notification dropdown */
  toggleNotifications() {
    this.showNotificationDropdown = !this.showNotificationDropdown;

    if (this.showNotificationDropdown) {
      this.loadNotifications();

      // 🔥 MARK ALL AS READ
      this.http.put(
        `http://localhost:5050/notifications/read-all/${this.userEmail}`, 
        {}
      ).subscribe(() => {
        this.unreadCount = 0; // instant UI update
      });
    }
  }

  /* 📩 Get all notifications */
  loadNotifications() {
    this.http.get<any[]>(`http://localhost:5050/notifications/${this.userEmail}`)
      .subscribe(data => {
        this.notifications = data;
      });
  }

  /* 🔴 Get unread count */
  loadUnreadCount() {
    this.http.get<any[]>(`http://localhost:5050/notifications/${this.userEmail}`)
      .subscribe(data => {
        this.unreadCount = data.filter(n => !n.isRead).length;
      });
  }

  /* ✅ Mark single as read */
  markAsRead(n: any) {
    n.isRead = true;

    this.http.put(`http://localhost:5050/notifications/read/${n._id}`, {})
      .subscribe(() => {
        this.loadUnreadCount();
      });
  }

}