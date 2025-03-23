import { Component } from '@angular/core';
import { Router } from '@angular/router';  // If you want to navigate after login
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // if you have styles
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private loggerService: LoggerService, private router: Router) {}

  onLogin() {
    this.loggerService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loggerService.saveToken(response.token);
        alert('Logged in successfully!');
        // Navigate to homepage or dashboard:
        this.router.navigate(['/shop/products']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username or password');
      }
    });
  }
}
