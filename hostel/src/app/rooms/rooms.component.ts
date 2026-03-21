import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent  implements OnInit {

  stats:any = {};
  rooms:any[] = [];
  filteredRooms:any[] = [];

  searchText:string = '';
  selectedFilter:string = 'all';

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getRoomStats();
  }

  getRoomStats(){
    this.http.get("http://localhost:5050/room-stats")
    .subscribe((data:any)=>{

      this.stats = data;
      this.rooms = data.roomDetails;
      this.filteredRooms = this.rooms;

    });
  }

  getStatus(room:any){
    if(room.occupants === 0){
      return 'empty';
    }
    else if(room.occupants === room.capacity){
      return 'full';
    }
    else{
      return 'partial';
    }
  }

  applyFilters(){

    this.filteredRooms = this.rooms.filter(room => {

      const matchesSearch =
        room.roomNo.toLowerCase().includes(this.searchText.toLowerCase());

      const status = this.getStatus(room);

      const matchesFilter =
        this.selectedFilter === 'all' || status === this.selectedFilter;

      return matchesSearch && matchesFilter;

    });

  }

}