import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponseItem, MenuCategory } from '../models/main';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http = inject(HttpClient);
  
  // In Angular 21, the 'public' folder is served from the root. 
  // Change this path to match your actual file location.
  private readonly jsonUrl = 'assets/mock/menu.json'; 

  getRestaurantMenu(): Observable<{ restaurantName: string; categories: MenuCategory[] }> {
    return this.http.get<ApiResponseItem[]>(this.jsonUrl).pipe(
      map((response: any) => {
        // Handle if the JSON is an array or a single object
        const data = Array.isArray(response) ? response[0] : response;
        
        return {
          restaurantName: data?.restaurant_name ?? 'Local Resto',
          categories: data?.table_menu_list ?? []
        };
      })
    );
  }
}