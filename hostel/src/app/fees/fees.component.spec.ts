import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  fees: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const email = sessionStorage.getItem("email");

    this.http.get("http://localhost:5000/fees/" + email)
      .subscribe((data: any) => {
        this.fees = data;
      });
  }

  getStatus(pending: number) {
    return pending === 0 ? 'Paid' : 'Pending';
  }

}