import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-mess',
  templateUrl: './mess.component.html',
  styleUrls: ['./mess.component.css']
})
export class AdminMessComponent {

  formData = {
    day: '',
    breakfast: '',
    lunch: '',
    dinner: ''
  };

  constructor(private http: HttpClient) {}

  submit() {
  console.log(this.formData); // 👈 ADD THIS LINE

  this.http.post("http://localhost:5050/mess", this.formData)

    .subscribe((res: any) => {
      alert(res.message);
    });
}

}
