import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/services/auth.service'; // Asegúrate de importar el servicio
import { ThemeService } from './services/theme.service';

interface Menu {
  icon: string;
  name: string;
  redirectTo: string;
  action?: () => void; // Acción opcional para el menú
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  menu: Menu[] = [
    {
      icon: "home-outline",
      name: "Home",
      redirectTo: '/home' 
    },
    {
      icon: "log-out-outline",
      name: "Log-Out",
      action: () => this.logout(), // Asocia la acción a cierre de sesión
      redirectTo: ''
    }
  ];

  constructor(public router: Router, private authService: AuthService, public themeService: ThemeService) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioActual');
  
    // Puedes también limpiar el sessionToken aquí si lo tienes
    localStorage.removeItem('sessionToken'); // Limpia el token de sesión, si aplica
  
    this.router.navigate(['/login']);
  }

  initializeApp() {
    this.router.navigateByUrl('splash');
  }
}
