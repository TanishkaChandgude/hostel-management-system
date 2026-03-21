import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent {

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