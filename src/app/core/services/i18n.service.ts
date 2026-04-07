import { Injectable, computed, signal } from '@angular/core';
import { StorageService } from './storage.service';

export type Language = 'en' | 'ar';

/** 🔥 Rename to avoid any Angular token conflicts */
const APP_TRANSLATIONS = {
en: {
    header: {
      title: 'UNI Resto Cafe',
      tagline: 'Discover delicious flavors delivered to you.',
      nav: 'My Orders',
    },

    menu: {
      title: 'Menu',
      vegOnly: 'Veg only',
      nonVegOnly: 'Non-veg only',
      all: 'All',
      customizationsAvailable: 'Customization available',
      calories: 'calories'
    },

    cart: {
      title: 'Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      items: 'items'
    },

    orders: {
      title: 'My Orders'
    },

    auth: {
      login: 'Login',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      logout: 'Logout'
    },

    common: {
      add: 'Add',
      language: 'Language',
      backToMenu: 'Back to menu'
    }
  },

  ar: {
    header: {
      title: 'مطعم يوني',
      tagline: 'اكتشف نكهات لذيذة تصلك إلى باب منزلك.',
      nav: 'طلباتي',
    },

    menu: {
      title: 'القائمة',
      vegOnly: 'نباتي فقط',
      nonVegOnly: 'غير نباتي فقط',
      all: 'الكل',
      customizationsAvailable: 'تخصيصات متاحة',
      calories: 'سعرة حرارية'
    },

    cart: {
      title: 'السلة',
      empty: 'السلة فارغة',
      total: 'الإجمالي',
      items: 'عناصر'
    },

    orders: {
      title: 'طلباتي'
    },

    auth: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      logout: 'تسجيل الخروج'
    },

    common: {
      add: 'إضافة',
      language: 'اللغة',
      backToMenu: 'العودة للقائمة'
    }
  }
} as const;

type TranslationKeys = keyof typeof APP_TRANSLATIONS.en;

@Injectable({ providedIn: 'root' })
export class I18nService {

  private readonly key = 'food-app-language';

  private readonly languageSignal = signal<Language>('en');

  readonly language = computed(() => this.languageSignal());

  constructor(private readonly storage: StorageService) {
    const saved = this.storage.get<Language>(this.key, 'en');

    this.languageSignal.set(saved);
    this.applyDirection(saved);
  }

 t(key: string): string {
  const lang = this.languageSignal();
  const keys = key.split('.');

  let value: any = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS['en'];

  for (const k of keys) {
    value = value?.[k];
  }

  return value ?? key;
}

  setLanguage(language: Language): void {
    this.languageSignal.set(language);
    this.storage.set(this.key, language);
    this.applyDirection(language);
  }

  toggleLanguage(): void {
    this.setLanguage(this.languageSignal() === 'en' ? 'ar' : 'en');
  }

  isArabic(): boolean {
    return this.languageSignal() === 'ar';
  }

  private applyDirection(lang: Language) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}