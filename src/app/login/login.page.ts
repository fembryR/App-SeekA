import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) { 

    this.formularioLogin = this.fb.group({
      nombre: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
  })

}

  ngOnInit() {}

  registrarse() {
    this.router.navigate(['/registro']);
  }

  restablecer(){
    this.router.navigate(['/restablecer']);
  }

  async ingresar() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, complete todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const { nombre, password } = this.formularioLogin.value;
    const normalizedUsername = nombre.toLowerCase(); // Normaliza el nombre del usuario
    const usuarioString = localStorage.getItem(normalizedUsername);

    if (!usuarioString) {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró el usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const usuario = JSON.parse(usuarioString);

    if (usuario.password === password) {
      console.log('Ingresado');

      localStorage.setItem('usuarioActual', normalizedUsername);
      console.log('Nombre guardado en localStorage:', normalizedUsername);

      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'La contraseña es incorrecta.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
