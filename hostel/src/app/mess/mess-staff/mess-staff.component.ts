import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mess-staff',
  templateUrl: './mess-staff.component.html',
  styleUrls: ['./mess-staff.component.css']
})
export class MessStaffComponent {

  // 📦 Staff model
  staff = {
    name: '',
    role: '',
    phone: '',
    email: '',
    department: ''
  };

  constructor(private http: HttpClient) {}

  // ➕ Add staff
  addStaff() {
    
    this.staff.role = 'mess';

    if (!this.staff.name || !this.staff.role || !this.staff.phone || !this.staff.email) {
      alert("Please fill all required fields");
      return;
    }

    this.http.post('http://localhost:5050/staff', this.staff)
      .subscribe({
        next: (res) => {
          alert("✅ Staff added successfully");

          // reset form
          this.staff = {
            name: '',
            role: '',
            phone: '',
            email: '',
            department: ''
          };
        },
        error: (err) => {
          console.log(err);
          alert("❌ Error adding staff");
        }
      });
  }
}