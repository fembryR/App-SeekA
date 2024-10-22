import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service'; // mi servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Si el usuario está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirigir al login
      return false;
    }
  }
}
