export interface ApiResponseItem {
  restaurant_id: string;
  restaurant_name: string;
  branch_name?: string;
  table_menu_list: MenuCategory[];
}

export interface MenuCategory {
  menu_category: string;
  menu_category_id: string;
  category_dishes: Dish[];
}

export interface Dish {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image?: string;
  dish_currency: string;
  dish_calories: number;
  dish_description: string;
  dish_Availability: boolean;
  dish_Type: number;
  addonCat?: AddonCategory[];
}

export interface AddonCategory {
  addon_category: string;
  addon_category_id: string;
  addon_selection: number;
  addons: Dish[];
}



// export type Language = 'en' | 'ar';

// export interface UserProfile {
//   username: string;
//   password: string;
// }
