import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service'; // Importer le service

@Component({
  selector: 'app-dasboard-header',
  templateUrl: './dasboard-header.component.html',
  styleUrls: ['./dasboard-header.component.css']
})
export class DasboardHeaderComponent implements OnInit {

  isDarkMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vérifie l'état du Dark Mode depuis le localStorage au chargement
    const storedDarkMode = localStorage.getItem('dark-mode');
    if (storedDarkMode === 'true') {
      this.enableDarkMode();
    }
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true');
  }

  disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'false');
  }

  // Déconnexion (fonction de base)
  onLogout() {
    // Logique de déconnexion, par exemple effacer le token d'authentification
    console.log('Déconnexion');
  }
}
