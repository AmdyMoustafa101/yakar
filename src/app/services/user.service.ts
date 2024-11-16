import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Importez le Router


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private router: Router ) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Connexion avec email et mot de passe
  loginWithEmail(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Connexion avec code secret
  loginWithSecretCode(secretCode: string): Observable<any> {
    console.log('Données envoyées:', { secretCode });
    return this.http.post(`${this.apiUrl}/login-secret`, { secretCode });
  }

  logout() {
    // Nettoyer la session
    sessionStorage.clear();

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }

}

