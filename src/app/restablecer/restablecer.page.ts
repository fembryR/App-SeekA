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

  async recuperar(){
    if(!this.username){
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
      // Usuario no encontrado
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró el usuario en el LocalStorage.',
        buttons: ['Aceptar']
      });
      await alert.present();
    } else {
      // Usuario encontrado, solicita nueva contraseña
      const alert = await this.alertController.create({
        header: 'Actualizar Contraseña',
        inputs: [
          {
            name: 'newPassword',
            type: 'password',
            placeholder: 'Nueva Contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Aceptar',
            handler: (data) => {
              if (data.newPassword) {
                this.actualizarContraseña(normalizedUsername, data.newPassword);
              } else {
                this.mostrarError('Por favor, ingrese una nueva contraseña.');
              }
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async actualizarContraseña(username: string, newPassword: string) {
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      let userData = JSON.parse(storedUser);
      userData.password = newPassword;
      localStorage.setItem(username, JSON.stringify(userData));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Contraseña actualizada exitosamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(['/login']);
    }
  }

  async mostrarError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  
  ngOnInit() {
  }
}

