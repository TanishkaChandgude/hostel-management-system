import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-fees',
  templateUrl: './manage-fees.component.html',
  styleUrls: ['./manage-fees.component.css']
})
export class ManageFeesComponent {

  formData: any = {
    rollNo: '',
    name: '',
    email: '', // hidden (backend ke liye)
    hostelPaid: 0,
    messPaid: 0,
    hostelDue: '',
    messDue: ''
  };

  constructor(private http: HttpClient) {}

  // 🔥 Auto fetch name + email
  fetchStudent() {
  if (!this.formData.rollNo) return;

  this.http.get(`http://localhost:5050/student/${this.formData.rollNo}`)
    .subscribe({
      next: (res: any) => {
        this.formData.name = res.name;
        this.formData.email = res.email;
      },
      error: (err) => {
        console.log(err);

        // ❌ Student not found
        alert("❌ Invalid Enrollment Number! Student not found");

        // reset fields
        this.formData.name = '';
        this.formData.email = '';
      }
    });
}
submitFees() {

  if (!this.formData.rollNo || !this.formData.email) {
    alert("❌ Please enter valid Enrollment Number first");
    return;
  }

  this.http.post("http://localhost:5050/update-fees", this.formData)
    .subscribe({
      next: () => {
        alert("✅ Fees Updated Successfully!");

        this.formData = {
          rollNo: '',
          name: '',
          email: '',
          hostelPaid: 0,
          messPaid: 0,
          hostelDue: '',
          messDue: ''
        };
      },
      error: (err) => {
        console.log(err);
        alert("❌ Error updating fees");
      }
    });
}

}