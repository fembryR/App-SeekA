import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ClimaService } from '../services/clima.service';
import { ThemeService } from '../services/theme.service';
import { Camera, CameraResultType } from '@capacitor/camera';

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
  isDarkMode: boolean = false;
  fotoTomada: string | null = null;


  constructor(
    private menuController: MenuController,
    private navController: NavController,
    private climaService: ClimaService,
    public themeService: ThemeService
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

  toggleDarkMode(event: any): void {
    const isDarkMode = event.detail.checked;
    document.body.classList.toggle('dark', isDarkMode);
    this.isDarkMode = isDarkMode; // Actualiza el estado del tema
  }

  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl, // Obtiene la imagen en formato base64
    });

    if (imagen.dataUrl) {
      this.fotoTomada = imagen.dataUrl;
      console.log(this.fotoTomada); // Puedes hacer algo con la foto tomada aquí, como mostrarla
    }
  }
}
