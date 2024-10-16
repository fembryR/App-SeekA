import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  username: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  async recuperar() {
    if (!this.username) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su nombre de usuario',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Convierte el nombre de usuario a minúsculas para evitar problemas de capitalización
    const normalizedUsername = this.username.toLowerCase();
    const storedUser = localStorage.getItem(normalizedUsername);

    if (!storedUser) {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró el usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Usuario encontrado. Redirigiendo a la página de restablecimiento de contraseña.',
        buttons: ['Aceptar']
      });
      await alert.present();

      this.router.navigate(['/login']);
    }
}

  async mostrarError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  ngOnInit() { }

}
