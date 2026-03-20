import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mess',
  templateUrl: './mess.component.html',
  styleUrls: ['./mess.component.css']
})
export class MessComponent implements OnInit {

  menu: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>("http://localhost:5050/mess")
      .subscribe(data => {
        console.log("Mess Menu:", data);
        this.menu = data;
      });
  }
}
