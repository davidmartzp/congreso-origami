import { Inject, Injectable, computed, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Language, SiteTranslations, TRANSLATIONS } from '../i18n/translations';

const SUPPORTED_LANGS: string[] = ['en', 'pt', 'fr'];

function detectLangFromPath(path: string): Language {
  // Strip query string and fragment before parsing the path segment
  const segment = path.split('?')[0].split('#')[0].split('/').filter(Boolean)[0];
  return (segment && SUPPORTED_LANGS.includes(segment)) ? segment as Language : 'es';
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly langSig = signal<Language>('es');

  readonly lang = this.langSig.asReadonly();

  /** Reactive computed — reading this in a template auto-tracks language changes */
  readonly t = computed<SiteTranslations>(() => TRANSLATIONS[this.langSig()]);

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {
    // Set language immediately from the current URL (avoids hydration mismatch
    // in in-app browsers like Instagram that may render before NavigationEnd fires)
    const initialLang = detectLangFromPath(doc.location.pathname);
    this.langSig.set(initialLang);
    this.doc.documentElement.setAttribute('lang', initialLang);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const lang = detectLangFromPath(e.urlAfterRedirects);
        this.langSig.set(lang);
        this.doc.documentElement.setAttribute('lang', lang);
      });
  }

  setLanguage(lang: Language): void {
    this.router.navigate([lang === 'es' ? '' : lang]);
  }
}
