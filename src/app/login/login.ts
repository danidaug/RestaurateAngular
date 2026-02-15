import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username === 'chef' && password === '1234') {
        localStorage.setItem('role', 'chef'); 
        this.router.navigate(['/admin']);
      } else {
        localStorage.setItem('role', 'user');
        this.router.navigate(['/menu']);
      }
    }
  }
}
