import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-manu2',
  imports: [CommonModule, RouterModule],
  templateUrl: './manu2.component.html',
  styleUrl: './manu2.component.scss'
})
export class Manu2Component {
  title = 'table';
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(public router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isAdmin$ = this.authService.isAdmin$;
  }
  
  logout() {
    this.authService.logout();
  }
}
