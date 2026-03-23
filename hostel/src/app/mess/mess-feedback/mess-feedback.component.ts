import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mess-feedback',
  templateUrl: './mess-feedback.component.html',
  styleUrls : ['./mess-feedback.component.css']
})
export class MessFeedbackComponent implements OnInit {

  feedbacks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:5050/feedback")
      .subscribe((data: any) => {
        this.feedbacks = data.filter((f: any) => f.category === 'Mess');
      });
  }

  updateStatus(f: any) {
    this.http.put("http://localhost:5050/feedback-status", f)
      .subscribe(() => {
        alert("Status updated");
      });
  }
}