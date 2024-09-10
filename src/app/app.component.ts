import { Component } from '@angular/core';
import {  Router } from '@angular/router';

interface Menu{
  icon: string;
  name: string;
  redirectTo: string;
  action?: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menu: Menu []=[
    {
      icon: "home-outline",
      name: "Home",
      redirectTo: '/home' 
    },
    {
      icon: "id-card-outline",
      name: "Recuperar",
      redirectTo: '/restablecer'
    },
    {
      icon: "log-out-outline",
      name: "Log-Out",
      action: () => this.logout() //asocia la accion a cierre de sesion
      ,
      redirectTo: ''
    }
  ];

  constructor(public router: Router) {}

  logout() {

    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioActual');

    this.router.navigate(['/login']);

  }

  initializeApp(){
    this.router.navigateByUrl('splash');
  }
}
