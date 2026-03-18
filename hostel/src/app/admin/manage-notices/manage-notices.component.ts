import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-notices',
  templateUrl: './manage-notices.component.html',
  styleUrls: ['./manage-notices.component.css']
})
export class ManageNoticesComponent
implements OnInit {

  notice: any = {};
  notices: any[] = [];
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getNotices();
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addNotice() {
    const formData = new FormData();

    formData.append('title', this.notice.title);
    formData.append('description', this.notice.description);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post("http://localhost:5000/notices", formData)
      .subscribe(() => {
        alert("✅ Notice Added");

        this.notice = {};
        this.selectedFile = null;

        this.getNotices();
      }, err => {
        console.error(err);
        alert("❌ Upload failed");
      });
  }

  getNotices() {
    this.http.get("http://localhost:5000/notices")
      .subscribe((data: any) => {
        this.notices = data;
      });
  }

  deleteNotice(id: any) {
    if (confirm("Delete this notice?")) {
      this.http.delete("http://localhost:5000/delete-notice/" + id)
        .subscribe(() => {
          alert("🗑 Notice Deleted");
          this.getNotices();
        });
    }
  }

}