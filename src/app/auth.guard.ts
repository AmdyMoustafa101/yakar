import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'admin' || role === 'user') {
      return true; // L'utilisateur est autorisé à accéder à la route
    }
    this.router.navigate(['/login']); // Si l'utilisateur n'est pas connecté ou n'a pas de rôle, rediriger vers la page de connexion
    return false;
  }
}
