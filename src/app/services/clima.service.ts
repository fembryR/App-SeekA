import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey: string = '9ac9e6734d0f275efba2f04152faea50'; // Reemplaza con tu API Key
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather'; // Cambia esto según tu API

  constructor() {}

  async obtenerClima(ciudadId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}?id=${ciudadId}&appid=${this.apiKey}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      throw error;
    }
  }
}
