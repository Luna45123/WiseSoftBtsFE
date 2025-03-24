import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-singup',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService:AuthService) { }

  singup() {
    this.authService.singup(this.username,this.password);
  }
}
