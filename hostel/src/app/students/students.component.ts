import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];
  searchText: string = '';

  blockCounts: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // 📥 Load students
  loadStudents() {
    this.http.get<any[]>('http://localhost:5050/students')
      .subscribe({
        next: (data) => {
          this.students = data;
          this.filteredStudents = data;

          this.calculateBlockCounts();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  // 🔍 Search
  searchStudents() {
    const text = this.searchText.toLowerCase();

    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text) ||
      (student.roomNo && student.roomNo.toLowerCase().includes(text))
    );
  }

  // 🧮 Block-wise count
  calculateBlockCounts() {
    this.blockCounts = {};

    this.students.forEach(student => {
      const block = student.block || 'Unknown';

      if (this.blockCounts[block]) {
        this.blockCounts[block]++;
      } else {
        this.blockCounts[block] = 1;
      }
    });
  }

  // ✏️ Update room
  updateRoom(student: any) {
    this.http.put(`http://localhost:5050/students/${student._id}/room`, {
      roomNo: student.roomNo
    }).subscribe({
      next: () => {
        alert("✅ Room updated successfully");
      },
      error: (err) => {
        console.log(err);
        alert("❌ Error updating room");
      }
    });
  }
}