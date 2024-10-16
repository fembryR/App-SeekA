import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
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

  constructor(public router: Router) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  logout() {

    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioActual');

    this.router.navigate(['/login']);

  }

  initializeApp(){
    this.router.navigateByUrl('splash');
  }
}
