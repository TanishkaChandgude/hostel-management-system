import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent{
user: string = '';
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
  sessionStorage.clear(); // or sessionStorage.clear()
  this.router.navigate(['']);
}

goHome() {
  this.router.navigate(['/admins']);   // 👈 IMPORTANT
}

}
