import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent {
user: string = '';

users= JSON.parse(sessionStorage.getItem("user") || "{}");
userInitial: string = '';

showDropdown: boolean = false;
 constructor( private router:Router){}
ngOnInit() {
  this.user = sessionStorage.getItem("name") || '';

  // ✅ Get first letter dynamically
  if (this.user) {
    this.userInitial = this.user.charAt(0).toUpperCase();
  }
}
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

logout() {
  sessionStorage.clear(); // or localStorage.clear()
  this.router.navigate(['']);
}
}
