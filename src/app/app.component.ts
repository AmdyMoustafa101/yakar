import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'yakar-frontend';
  currentTheme: string = 'light'; // Valeur par défaut

  constructor(private themeService: ThemeService){}

  ngOnInit(): void {
    // Initialiser le thème au démarrage de l'application
    this.themeService.initializeTheme();
  }
}
