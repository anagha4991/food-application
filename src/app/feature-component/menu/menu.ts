import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TabsModule } from 'primeng/tabs';
import { MenuCategory, Dish } from '../../core/models/main';
import { MenuService } from '../../core/services/menu-service';
import { CartService } from '../../core/services/cart.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-menu',
  imports: [TabsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
private cartService = inject(CartService);
 protected readonly i18n = inject(I18nService);

   //protected readonly i18n = inject(I18nService);
  private readonly menuService = inject(MenuService);
  private readonly menuData = toSignal(this.menuService.getRestaurantMenu(), {
    initialValue: { restaurantName: 'UNI Resto Cafe', categories: [] as MenuCategory[] }
  });

  protected readonly filter = signal<'all' | 'veg' | 'nonveg'>('all');
  selectedCategoryId = signal<string>('');
  protected readonly restaurantName = computed(() => this.menuData().restaurantName);
  protected readonly categories = computed(() => this.menuData().categories);
  protected readonly selectedCategory = computed(() => this.categories().find((c) => c.menu_category_id === this.selectedCategoryId()) ?? this.categories()[0]);
  protected readonly filteredDishes = computed(() => {
    const dishes = this.selectedCategory()?.category_dishes ?? [];
    if (this.filter() === 'veg') return dishes.filter((dish) => dish.dish_Type === 2);
    if (this.filter() === 'nonveg') return dishes.filter((dish) => dish.dish_Type !== 2);
    return dishes;
  });


// add this getter/setter bridge
get selectedCategoryIdValue() {
  return this.selectedCategoryId();
}

set selectedCategoryIdValue(val: string) {
  this.selectedCategoryId.set(val);
}
  constructor() {
    effect(() => {
      const firstCategory = this.categories()[0];
      if (firstCategory && !this.selectedCategoryId()) {
        this.selectedCategoryId.set(firstCategory.menu_category_id);
      }
    });
  }

  protected trackCategory(_: number, category: MenuCategory): string {
    return category.menu_category_id;
  }

  protected trackDish(_: number, dish: Dish): string {
    return dish.dish_id;
  }
updateQuantity(dish: any, delta: number) {
  this.cartService.updateQuantity(dish, delta);
}

getQuantity(dishId: string) {
  return this.cartService.getQuantity(dishId);
}
}
