import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { FirestoreService } from '../services/services/firestore.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  animation: any;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private animationController: AnimationController,
    private firestoreService: FirestoreService // Inyecta el servicio Firestore
  ) { 
    this.formularioLogin = this.fb.group({
      nombre: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.setupAnimation();
  }

  setupAnimation() {
    this.animation = this.animationController.create()
      .addElement(document.querySelector('.SeekAlogo') as HTMLElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0)' },
        { offset: 0.4, transform: 'translateY(-30px)' },
        { offset: 0.6, transform: 'translateY(-15px)' },
        { offset: 1, transform: 'translateY(0)' }
      ]);
  
    this.animation.play();
  }

  registrarse() {
    this.router.navigate(['/registro']);
  }

  restablecer() {
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

    // Verifica el usuario en Firestore
    const usuario = await this.firestoreService.getUserByCredentials(normalizedUsername, password);

    if (usuario) {
      console.log('Ingresado');
      localStorage.setItem('usuarioActual', normalizedUsername);
      console.log('Nombre guardado en localStorage:', normalizedUsername);
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Nombre de usuario o contraseña incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
