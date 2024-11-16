import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;  // Utilisation du modificateur "!"
  showModal = true; // Pour afficher la première modale
  showSuccessModal = false; // Pour afficher la modale de succès
  showErrorModal = false; // Pour afficher la modale d'erreur

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      prenom: ['', [
        Validators.required,
        this.noSpecialChars,
        this.noSpaceAtStartEnd
      ]],
      nom: ['', [
        Validators.required,
        this.noSpecialChars,
        this.noSpaceAtStartEnd
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$'), // Vérifie que le téléphone est numérique
        this.telephoneRange
      ]],
      role: ['user', Validators.required]
    },{
      validator: this.passwordMatchValidator
    });
  }

  // Validator pour vérifier que le champ ne contient pas de caractères spéciaux
  noSpecialChars(control: any) {
    const regex = /^[A-Za-zéèêàùîôçÉÈÀ]+([-\s][A-Za-zéèêàùîôçÉÈÀ]+)*$/;
    if (control.value && !regex.test(control.value)) {
      return { noSpecialChars: true };
    }
    return null;
  }

  // Validator pour vérifier que le champ ne commence ni ne termine par un espace
  noSpaceAtStartEnd(control: any) {
    const value = control.value.trim();
    if (value !== control.value) {
      return { noSpaceAtStartEnd: true };
    }
    return null;
  }

  // Validator pour vérifier que le numéro de téléphone est dans la plage spécifiée
  telephoneRange(control: any) {
    const value = control.value;
    if (value < 750000000 || value > 789999999) {
      return { invalidRange: true };
    }
    return null;
  }

  // Validator pour vérifier que les mots de passe sont identiques
  passwordMatchValidator(formGroup: FormGroup) {
    const { password, confirmPassword } = formGroup.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Méthode pour vérifier si le formulaire est valide
  isValidForm(): boolean {
    return this.registerForm.valid;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
            // Redirige vers la page de connexion après 5 secondes
            window.location.href = '/login';
          }, 5000);
        },
        error: (err) => {
          this.showErrorModal = true;
          setTimeout(() => {
            this.showErrorModal = false;
          }, 5000);
        },
      });
    }
  }
}
