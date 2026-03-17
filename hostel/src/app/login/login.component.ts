import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth:AuthService, private router:Router){}

  login() {
  const data = {
    email: this.email,
    password: this.password
  };

  this.auth.login(data).subscribe((res: any) => {

    console.log("LOGIN RESPONSE:", res); // 🔥 DEBUG

    localStorage.setItem("token", res.token);
    localStorage.setItem("email", res.user.email);
    localStorage.setItem("role", res.user.role);

    if(res.user.role === "admin"){
      this.router.navigate(['/admins']);
    } else {
      this.router.navigate(['/student']);
    }

  }, (err) => {
    console.log("LOGIN ERROR:", err); // 🔥 DEBUG
    alert("Invalid login");
  });
}


}