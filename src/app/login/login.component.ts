import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ ใช้ CommonModule แทน
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(private authService:AuthService) { }

  login() {
    this.authService.login(this.username,this.password);
  }
}
