import { Injectable, signal, computed, effect } from '@angular/core';

export interface CartItem {
  dish: any;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private STORAGE_KEY = 'cart';

  //  STATE 
  private cart = signal<Map<string, CartItem>>(this.loadFromStorage());

  constructor() {
    // auto-save whenever cart changes
    effect(() => {
      const cartArray = Array.from(this.cart().entries());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartArray));
    });
  }

  //  LOAD FROM STORAGE 
  private loadFromStorage(): Map<string, CartItem> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return new Map();

    try {
      const parsed: [string, CartItem][] = JSON.parse(data);

      // ensure keys are strings (critical)
      return new Map(parsed.map(([k, v]) => [String(k), v]));
    } catch {
      return new Map();
    }
  }

  //UPDATE CART 
  updateQuantity(dish: any, delta: number) {
    this.cart.update(map => {
      const newMap = new Map(map);

      const key = String(dish.dish_id); // ✅ force string key

      const existing = newMap.get(key);
      const current = existing?.quantity ?? 0;
      const updated = Math.max(0, current + delta);

      if (updated === 0) {
        newMap.delete(key);
      } else {
        newMap.set(key, {
          dish,
          quantity: updated
        });
      }

      return newMap;
    });
  }

  //  READ DATA 
  items = computed(() => Array.from(this.cart().values()));

  totalCount = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  totalAmount = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity * i.dish.dish_price, 0)
  );

  //  GET QUANTITY (FIXED) 
  getQuantity(dishId: string | number) {
    return computed(() =>
      this.cart().get(String(dishId))?.quantity ?? 0
    );
  }

}