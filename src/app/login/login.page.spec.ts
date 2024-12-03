import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule, AlertController, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { FirestoreService } from '../services/services/firestore.service';  // Asegúrate de importar FirestoreService

// Crear mocks para los servicios que se usan en el componente
class MockFirestoreService {
  getUserByCredentials() {
    return Promise.resolve(null);  // Simula que no se encuentra el usuario
  }
}

class MockAlertController {
  create() {
    return {
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve(),
    } as any;
  }
}

class MockRouter {
  navigate(commands: any[], extras?: any) {
    return Promise.resolve(true);  // Simula la navegación
  }
}

class MockAnimationController {
  create() {
    return {
      addElement: () => this,  // Permite encadenar addElement()
      duration: (time: number) => this,  // Permite encadenar duration() con un parámetro
      iterations: (count: number) => this,  // Permite encadenar iterations()
      keyframes: (frames: any[]) => this,  // Permite encadenar keyframes()
      play: () => {}  // Simula la acción de play()
    } as any;
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      declarations: [LoginPage],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: FirestoreService, useClass: MockFirestoreService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: Router, useClass: MockRouter },
        { provide: AnimationController, useClass: MockAnimationController }
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
