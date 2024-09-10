import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,public alertController: AlertController, private router: Router) { 
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required)
    },{
      validator: this.passwordsCoinciden('password', 'confirmacionPassword')
    });
  }

  ngOnInit() {
  }

  passwordsCoinciden(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors['passwordsCoinciden']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ passwordsCoinciden: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  async guardar() {
    if (this.formularioRegistro.invalid) {

      //Registro errado
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const f = this.formularioRegistro.value;
    const nombre = f.nombre.toLowerCase(); //Normaliza el nombre del usuario
    const usuario = {
      nombre: nombre,
      password: f.password
    };

    localStorage.setItem(nombre, JSON.stringify(usuario));
    console.log('Usuario registrado:', usuario);

    //Registro exitoso
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'El usuario ha sido registrado correctamente.',
      buttons: ['Aceptar']
    });

    await alert.present();

    await alert.onDidDismiss(); //Esto espera a que el usuario cierre la alerta
    this.router.navigate(['/login']); //Me redirige a Login
  }
}