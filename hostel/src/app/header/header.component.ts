import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  initials: string = '';
  dropdownOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(res => {
      this.user = res;
      this.setInitials();
    });
  }

  setInitials() {
  if (this.user?.name) {
    const names = this.user.name.split(' ');
    this.initials = names.map((n: string) => n[0]).join('').toUpperCase();
  }
}


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
  }
}