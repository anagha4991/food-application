import { Component, computed, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule,PasswordModule,InputTextModule,IftaLabelModule,ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLogin = signal(true);
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    });
  }

  submit() {
    this.errorMsg.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name,email, password, confirmPassword } = this.form.value;

    this.loading.set(true);

    if (this.isLogin()) {
      // LOGIN
      this.auth.login(email, password).subscribe({
        next: () => {
          this.auth.getProfile().subscribe({
            next: () => {
              this.loading.set(false);
              this.router.navigate(['/menu']);
            },
            error: () => {
              this.loading.set(false);
              this.errorMsg.set('Profile fetch failed');
            }
          });
        },
        error: () => {
          this.loading.set(false);
          this.errorMsg.set('Invalid credentials');
        }
      });

    } else {
      // REGISTER
      if (password !== confirmPassword) {
        this.loading.set(false);
        this.errorMsg.set('Passwords do not match');
        return;
      }

      this.auth.register(name,email, password).subscribe({
        next: () => {
          this.loading.set(false);
          this.isLogin.set(true);
          this.form.reset();
          this.errorMsg.set('Registered. Please login.');
        },
        error: () => {
          this.loading.set(false);
          this.errorMsg.set('Registration failed');
        }
      });
    }
  }

  showRegister() {
    this.isLogin.set(false);
    this.errorMsg.set(null);
  }

  showLogin() {
    this.isLogin.set(true);
    this.errorMsg.set(null);
  }

  // convenience getters (clean template)
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}
