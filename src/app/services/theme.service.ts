import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.isDarkMode());
  darkMode$ = this.darkModeSubject.asObservable(); // Observable pour être réactif

  constructor() {
    this.initializeTheme();
   }

  // Activer le mode sombre
  enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    this.darkModeSubject.next(true); // Mettre à jour l'état
  }

  // Activer le mode clair
  enableLightMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    this.darkModeSubject.next(false); // Mettre à jour l'état
  }

  // Initialiser le thème à partir du localStorage ou du thème par défaut
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }

  // Changer entre le mode sombre et clair
  toggleMode() {
    if (this.isDarkMode()) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  // Vérifier si le mode sombre est activé
  isDarkMode(): boolean {
    return document.body.classList.contains('dark-mode');
  }
}
