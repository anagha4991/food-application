import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/helper/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
   providePrimeNG({
        theme: {
            preset: Lara,
            options: {
                cssLayer: {
                    name: 'primeng',
                    order: 'tailwind-base, primeng, tailwind-utilities'
                },
                darkModeSelector: '.dark' 
            }
        }
    }),
    provideHttpClient(withInterceptors([authInterceptor]))
  
  ]
};
