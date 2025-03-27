import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'table';

  constructor(public router: Router, private authService: AuthService) { } // ถ้าใช้ router ใน HTML ต้องเป็น public
  ngOnInit(): void {
    this.authService.initializeAuthState();

    // setTimeout(() => {
    //   this.authService.checkTokenExpiration();
    // }, 100); // ชัวร์ว่า initializeAuthState() ทำงานเสร็จก่อน
  }
}
