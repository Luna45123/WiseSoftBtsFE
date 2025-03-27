import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ ใช้ CommonModule แทน
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(private authService:AuthService,public router: Router) { }

  login() {
    this.authService.login(this.username,this.password);
  }
}
