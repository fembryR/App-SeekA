import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
   this.username = localStorage.getItem('usuarioActual') || 'Invitado';
  }
  mostrarMenu(){
    this.menucontroller.open('first');
  }

}
