import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
@Component({
  selector: 'app-manu2',
  imports: [CommonModule, RouterModule],
  templateUrl: './manu2.component.html',
  styleUrl: './manu2.component.scss'
})
export class Manu2Component {
  title = 'table';

  constructor(public router: Router, public authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
