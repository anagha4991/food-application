import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);

  items = this.cartService.items;
  totalAmount = this.cartService.totalAmount;

  updateQuantity = this.cartService.updateQuantity.bind(this.cartService);
}
