import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;

  constructor() {
    const savedTheme = localStorage.getItem('dark-theme');
    this.darkTheme = savedTheme === 'true';
    this.applyTheme();
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('dark-theme', this.darkTheme.toString());
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.darkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
