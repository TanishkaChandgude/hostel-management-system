import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  // 🔥 Categories updated
  categories = ['Hostel', 'Mess', 'Maintenance', 'Security', 'Staff', 'Other'];

  feedback: any = {
    category: '',
    rating: 0,
    message: '',
    email: localStorage.getItem("email")
  };

  constructor(private http: HttpClient) {}

  setRating(star: number) {
    this.feedback.rating = star;
  }

  submitFeedback() {

  console.log("🔥 Submit clicked", this.feedback);

  this.http.post("http://localhost:5050/feedback", this.feedback)
    .subscribe({
      next: () => {

        alert("✅ Feedback submitted successfully!");

        // reset form
        this.feedback = {
          category: '',
          rating: 0,
          message: '',
          email: localStorage.getItem("email")
        };

      },
      error: (err) => {

        console.log("❌ Error:", err);
        alert("❌ Submission failed");

      }
    });
}
}