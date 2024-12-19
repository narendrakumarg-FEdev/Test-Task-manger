import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    // Directly call the authenticateUser  method and subscribe to the observable
    this.userService.authenticateUser (this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          alert('Login successful');
          this.router.navigate(['/home']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert('An error occurred during login. Please try again.');
      }
    });
  }
}