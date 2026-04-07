import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../core/services/i18n.service';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, TranslateModule,JsonPipe,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private cartService = inject(CartService);
  auth = inject(AuthService);
  router = inject(Router);

  cartCount = this.cartService.totalCount;
  protected readonly i18n = inject(I18nService);
  handleAuthClick() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
