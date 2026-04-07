import { Injectable, signal, computed, effect } from '@angular/core';

// Structure of each cart item
export interface CartItem {
  dish: any;        // actual dish object (contains name, price, etc.)
  quantity: number; // how many items added
}

@Injectable({ providedIn: 'root' })
export class CartService {

  // Key used to store cart in browser storage
  private STORAGE_KEY = 'cart';

  // MAIN STATE 
  // Map<dishId, CartItem>
  private cart = signal<Map<string, CartItem>>(this.loadFromStorage());

  constructor() {
    // Runs automatically whenever cart signal changes
    effect(() => {
      const cartArray = Array.from(this.cart().entries());

      // Save cart to localStorage (persistence)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartArray));
    });
  }

  // LOAD CART FROM localStorage ON APP START
  private loadFromStorage(): Map<string, CartItem> {
    const data = localStorage.getItem(this.STORAGE_KEY);

    // If nothing stored → return empty cart
    if (!data) return new Map();

    try {
      // Convert JSON string back to array
      const parsed: [string, CartItem][] = JSON.parse(data);

      // Rebuild Map
      // Force keys to string to avoid mismatch bugs
      return new Map(parsed.map(([k, v]) => [String(k), v]));
    } catch {
      // If corrupted data reset cart
      return new Map();
    }
  }

  // ADD / REMOVE / UPDATE ITEM QUANTITY
  updateQuantity(dish: any, delta: number) {
    this.cart.update(map => {

      // Always clone signals need immutable updates
      const newMap = new Map(map);

      // Use dish_id as key 
      const key = String(dish.dish_id);

      // Get current quantity
      const existing = newMap.get(key);
      const current = existing?.quantity ?? 0;

      // Apply change 
      const updated = Math.max(0, current + delta);

      if (updated === 0) {
        // Remove item if quantity becomes 0
        newMap.delete(key);
      } else {
        // Add or update item
        newMap.set(key, {
          dish,
          quantity: updated
        });
      }

      return newMap;
    });
  }

  // DERIVED DATA (auto updates when cart changes)

  // Convert Map → Array (easier for UI rendering)
  items = computed(() => Array.from(this.cart().values()));

   totalCount = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );
  // GET QUANTITY FOR A SPECIFIC ITEM
  getQuantity(dishId: string | number) {
    return computed(() =>
      this.cart().get(String(dishId))?.quantity ?? 0
    );
  }

}