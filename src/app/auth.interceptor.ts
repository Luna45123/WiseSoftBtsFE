import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (
        error.status === 403 &&
        !req.url.includes('api/auth/login') &&
        !req.url.includes('api/auth/refresh') &&
        !req.url.includes('api/auth/logout')&&
        !req.url.includes('api/auth/singup')
      ) {
        console.warn("Token หมดอายุ → พยายาม refresh");
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken}`)
            });
            return next(retryReq);
          }),
          catchError(err => {
            console.error("Refresh token ไม่สำเร็จ → logout", err);
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
