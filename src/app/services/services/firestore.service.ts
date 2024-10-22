import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afirestore: Firestore) {}

  // Método para crear un nuevo documento de usuario
  async createDoc(usuario: any) {
    const usuariosCollection = collection(this.afirestore, 'Usuarios');
    const docRef = await addDoc(usuariosCollection, usuario); // Agrega un nuevo documento
    console.log('Usuario registrado con ID:', docRef.id); // Log del ID del documento
  }

  // Método para verificar si el usuario existe
  async checkUserExists(nombre: string) {
    const usuariosCollection = collection(this.afirestore, 'Usuarios');
    const q = query(usuariosCollection, where('nombre', '==', nombre));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty; // Retorna true si el usuario existe
  }

  // Método para obtener un usuario por sus credenciales
  async getUserByCredentials(nombre: string, password: string) {
    const usuariosCollection = collection(this.afirestore, 'Usuarios');
    const q = query(usuariosCollection, where('nombre', '==', nombre));
    const querySnapshot = await getDocs(q);

    // Si el usuario existe, verificamos la contraseña
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
  
      return userData['password'] === password ? userData : null;
    }
    
    console.log('Usuario no encontrado'); // Log si el usuario no existe
    return null;
  }
}
