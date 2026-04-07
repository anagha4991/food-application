import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
 protected readonly i18n = inject(I18nService);
   items = this.cartService.items;
totalCount = this.cartService.totalCount;

  updateQuantity = this.cartService.updateQuantity.bind(this.cartService);
}
