// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('sessionToken'); // Verificar 'sessionToken'
  }

  // Método para iniciar sesión (puedes modificarlo según tu lógica de autenticación)
  login(token: string) {
    localStorage.setItem('sessionToken', token); // Guarda el token en el Local Storage
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('sessionToken'); // Limpia el token del Local Storage
  }

  // Método para obtener el usuario actual (opcional)
  getCurrentUser() {
    const token = localStorage.getItem('sessionToken');
    // Aquí puedes decodificar el token o obtener el usuario actual de otra manera
    return token ? { token } : null; // Devuelve el usuario si el token existe
  }
}
