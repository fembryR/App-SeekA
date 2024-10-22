import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"seekaappmovil","appId":"1:1039366883046:web:0f1bc1a2d0489739541d27","storageBucket":"seekaappmovil.appspot.com","apiKey":"AIzaSyDLqx4vqbCyHrlRYqKccowvm8-xa9K9de4","authDomain":"seekaappmovil.firebaseapp.com","messagingSenderId":"1039366883046","measurementId":"G-SKT1EE985N"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()), provideRemoteConfig(() => getRemoteConfig())],
  bootstrap: [AppComponent],
})
export class AppModule {}
