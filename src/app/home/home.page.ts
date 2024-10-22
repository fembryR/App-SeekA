import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  leftProgress: number = 0;
  rightProgress: number = 0;
  clima: any; //Almacena info clima

  constructor(
    private menuController: MenuController,
    private navController: NavController,
    private climaService: ClimaService
  ) {}

  async ngOnInit() {
    const ciudadId = '3871336'; // ID ciudad
    try {
      this.clima = await this.climaService.obtenerClima(ciudadId);
      console.log(this.clima); // Verifica la respuesta del clima

      // Verificamos si el usuario está en el localStorage
      this.username = localStorage.getItem('usuarioActual') ?? '';
      if (!this.username) {
        this.navController.navigateRoot('/login');
      }
    } catch (error) {
      console.error("Error en ngOnInit:", error);
    }
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}
