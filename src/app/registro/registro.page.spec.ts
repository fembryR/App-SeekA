import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { FirestoreService } from '../services/services/firestore.service';

// Crear mocks
class MockFirestoreService {
  checkUserExists(nombre: string) {
    return Promise.resolve(false); // Simulamos que el usuario no existe
  }
  createDoc(usuario: any) {
    return Promise.resolve(); // Simulamos éxito al guardar el documento con el objeto usuario
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
  navigate(commands: any[], extras?: NavigationExtras) {
    return Promise.resolve(true); // Simulamos la navegación
  }
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let alertController: MockAlertController;
  let firestoreService: MockFirestoreService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      declarations: [RegistroPage],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: FirestoreService, useClass: MockFirestoreService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: Router, useClass: MockRouter }
      ]
    });

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    firestoreService = TestBed.inject(FirestoreService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
