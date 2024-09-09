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

  username: string = '';
  password: string = '';


  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
  })

}

  ngOnInit() {}

  registrarse() {
    this.router.navigate(['/registro']);
  }

  async ingresar() {
    const f = this.formularioLogin.value;

    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No existe un usuario registrado en el sistema.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    const usuario = JSON.parse(usuarioString);

    if (usuario.nombre === f.nombre && usuario.password === f.password) {
      console.log('Ingresado');

      localStorage.setItem('usuarioActual', f.nombre);
      console.log('Nombre guardado en localStorage:', f.nombre);

      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
