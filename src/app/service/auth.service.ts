import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface Role {
  authority: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private currentUserRoles = new BehaviorSubject<string[]>([]);
  private accessTokenSubject = new BehaviorSubject<string | null>(null);

  public isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isAdmin$ = new BehaviorSubject<boolean>(this.isAdmin());

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loadUserRoles();
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  isAdmin(): boolean {
    return this.currentUserRoles.getValue().includes('ROLE_ADMIN');
  }

  private loadUserRoles() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        if (Array.isArray(decodedToken.roles) && typeof decodedToken.roles[0] === 'object') {
          const roles = decodedToken.roles.map((role: { authority: Role; }) => role.authority);
          this.currentUserRoles.next(roles);
          this.isAdmin$.next(roles.includes('ROLE_ADMIN'));
        } else if (Array.isArray(decodedToken.roles)) {
          this.currentUserRoles.next(decodedToken.roles);
          this.isAdmin$.next(decodedToken.roles.includes('ROLE_ADMIN'));
        } else {
          console.log("Unexpected roles format:", decodedToken.roles);
        }
      } else {
        console.log("No Token Found in localStorage");
        this.currentUserRoles.next([]);
        this.isAdmin$.next(false);
      }
    }
  }
  

  login(username: string, password: string) {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<any>('http://localhost:8080/api/auth/login', { username, password }, { withCredentials: true }).subscribe(response => {
        this.setAccessToken(response.token);
        this.loadUserRoles();
        this.router.navigate(['/']);
      });
    }
    return of();

  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true }).pipe(
        catchError((err) => {
          console.error('Logout request failed:', err);
          return of(null); // return dummy observable เพื่อไม่ให้ crash
        })
      ).subscribe(() => {
        this.setAccessToken(null);
        localStorage.removeItem('token');
        this.currentUserRoles.next([]);
        this.router.navigate(['/']);
      });
    }
    return of();

  }

  refreshToken() {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<any>('http://localhost:8080/api/auth/refresh', {}, { withCredentials: true }).pipe(
        map(response => {
          console.log("New AccessToken:", response.token);
          this.setAccessToken(response.token);
          return response.token;
        })
      );
    }
    return of();


  }

  setAccessToken(token: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      this.accessTokenSubject.next(token);
  
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
  
     
      this.loadUserRoles();
    }
  
    this.isLoggedIn$.next(this.isLoggedIn());
    this.isAdmin$.next(this.isAdmin());
  }

  getAccessToken() {
    if (isPlatformBrowser(this.platformId)) {
      return this.accessTokenSubject.value || localStorage.getItem('token');
    }
    return of();
  }

  public checkTokenExpiration() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
  
      if (token && this.jwtHelper.isTokenExpired(token)) {
        console.log("⛔ Token หมดอายุ → พยายาม refresh");
  
        this.refreshToken().subscribe({
          next: (newToken) => {
            if (newToken) {
              console.log("✅ ได้ Token ใหม่:", newToken);
              this.setAccessToken(newToken);
            } else {
              console.warn("❌ ได้ token ใหม่เป็น null → logout");
              this.logout();
            }
          },
          error: (err) => {
            console.error("❌ Refresh token ไม่สำเร็จ → logout", err);
            this.logout();
          }
        });
  
      } else {
        console.log("✅ Token ยังไม่หมดอายุ");
      }
    }
  }

  public initializeAuthState() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
  
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.setAccessToken(token); // ✅ ใช้ method เดิมให้ BehaviorSubject อัปเดต
      } else {
        this.setAccessToken(null); // ❌ ถ้าไม่มีหรือหมดอายุ → ล้างออก
      }
    }
  }

}
