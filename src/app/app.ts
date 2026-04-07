import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layouts/header/header";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('food-application');
  auth = inject(AuthService);

  ngOnInit() {
    // restore user on reload
    if (this.auth.isAuthenticated()) {
      this.auth.getProfile().subscribe();
    }
  }
}
