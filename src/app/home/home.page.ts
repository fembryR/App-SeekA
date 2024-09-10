import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';

  constructor(
    private menuController: MenuController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('usuarioActual') ?? '';
    if (!this.username) {
      // Si no hay usuario en localStorage, redirige a la página de login
      this.navController.navigateRoot('/login');
    }
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}