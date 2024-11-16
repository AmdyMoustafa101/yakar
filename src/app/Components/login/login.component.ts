import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSecretCodeMode: boolean = false;
  code: string[] = ['', '', '', ''];

  showErrorModal: boolean = false;
  errorMessage: string = '';

  showSuccessModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleMode() {
    this.isSecretCodeMode = !this.isSecretCodeMode;
  }

   // Fonction de connexion par email
   onLoginWithEmail() {
    if (this.loginForm.invalid) {
      this.displayError('Veuillez remplir correctement le formulaire.');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.userService.loginWithEmail(email, password).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (err) => this.displayError(err.error?.message || 'Une erreur est survenue.'),
    });
  }

  // Fonction de connexion avec le code secret
  onLoginWithCode() {
    const secretCode = this.code.join('');
    if (!secretCode || secretCode.length !== 4 || !/^\d{4}$/.test(secretCode)) {
      this.displayError('Le code secret doit contenir exactement 4 chiffres.');
      return;
    }

    this.userService.loginWithSecretCode(secretCode).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (err) => this.displayError(err.error?.message || 'Une erreur est survenue.'),
    });
  }

  displayError(message: string) {
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  // Fonction qui gère la réussite de la connexion
  handleLoginSuccess(response: any) {
    // Enregistrer le rôle dans sessionStorage
    sessionStorage.setItem('role', response.role);
    this.showSuccessModal = true;

    // Fermer la modale après 3 secondes et rediriger
    setTimeout(() => {
      this.showSuccessModal = false;
      this.redirectToDashboard(response.role); // Redirection après succès
    }, 3000);
  }

  // Fonction de redirection vers le dashboard approprié
  redirectToDashboard(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'user') {
      this.router.navigate(['/user-dashboard']);
    } else {
      // Gérer un cas de rôle inconnu
      this.displayError('Rôle inconnu, veuillez contacter l\'administrateur.');
    }
  }

  onCodeInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d?$/.test(value)) {
      input.value = '';
    } else {
      this.code[index] = value;
    }

    if (value && index < this.code.length - 1) {
      const nextInput = input.parentElement?.querySelectorAll('input')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }
}
