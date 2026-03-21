import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent {

  form = {
    block: '',
    floors: '',
    roomsPerFloor: '',
    capacity: 4
  };

  constructor(private http: HttpClient) {}

  generateRooms() {

    this.http.post("http://localhost:5050/generate-rooms", this.form)
      .subscribe({
        next: (res:any) => {
          alert("Rooms created successfully 🚀");
          this.form = { block:'', floors:'', roomsPerFloor:'', capacity:4 };
        },
        error: () => {
          alert("Error creating rooms");
        }
      });

  }

}
