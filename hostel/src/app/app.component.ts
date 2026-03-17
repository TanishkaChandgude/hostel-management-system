import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
menuOpen: any;

  constructor(public router: Router){}

  showHeader(){

    // Hide header and chatbot on login page
    return this.router.url !== '/login';

  }

}


