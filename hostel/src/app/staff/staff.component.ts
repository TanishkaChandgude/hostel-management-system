import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit  {

  staffList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  // 📥 Fetch staff from backend
  loadStaff() {
    this.http.get<any[]>('http://localhost:5050/staff')
      .subscribe({
        next: (data) => {
          this.staffList = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  // 💬 WhatsApp redirect
  openWhatsApp(phone: string) {
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
  }
}