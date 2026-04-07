import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./feature-component/login/login').then((m) => m.Login)
    },
    {
        path: 'menu',
        loadComponent: () => import('./feature-component/menu/menu').then((m) => m.Menu),canActivate: [authGuard],
    },
    {
        path: 'cart',
        loadComponent: () => import('./feature-component/cart/cart').then((m) => m.Cart),canActivate: [authGuard],
    },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', redirectTo: 'login' }
];
