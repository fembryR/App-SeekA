import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private firestoreService: FirestoreService // Asegúrate de que este servicio esté correctamente inyectado
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    }, {
      validator: this.passwordsCoinciden('password', 'confirmacionPassword')
    });
  }

  ngOnInit() {}

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
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const f = this.formularioRegistro.value;
    const nombre = f.nombre.toLowerCase(); // Normaliza el nombre del usuario

    // Verifica si el usuario ya existe
    const exists = await this.firestoreService.checkUserExists(nombre);
    if (exists) {
      const alert = await this.alertController.create({
        header: 'Usuario existente',
        message: 'Este nombre de usuario ya está en uso. Elige otro.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const usuario = {
      nombre: nombre,
      password: f.password
    };

    // Guarda el usuario en Firestore
    this.firestoreService.createDoc(usuario)
      .then(async () => {
        console.log('Usuario registrado en Firestore:', usuario);
        localStorage.setItem(nombre, JSON.stringify(usuario));

        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'El usuario ha sido registrado correctamente.',
          buttons: ['Aceptar']
        });
        await alert.present();
        await alert.onDidDismiss(); // Espera a que el usuario cierre la alerta
        this.router.navigate(['/login']); // Redirige a Login
      })
      .catch(async (error: any) => {
        console.error('Error al registrar usuario en Firestore:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al registrar el usuario.',
          buttons: ['Aceptar']
        });
        await alert.present();
      });
  }
}
