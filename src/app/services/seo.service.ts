import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from './translation.service';
import { SiteTranslations } from '../i18n/translations';

export type SeoPage = keyof SiteTranslations['seo'];

const BASE_URL = 'https://origamibogota.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private translationService: TranslationService,
    private router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {
    // Keep canonical in sync on every navigation
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateCanonical(e.urlAfterRedirects));
  }

  /** Call this in ngOnInit of each public page component */
  setPage(page: SeoPage): void {
    const { title, description } = this.translationService.t().seo[page];
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.updateCanonical(this.router.url);
  }

  private updateCanonical(url: string): void {
    // Strip query params and fragments for the canonical URL
    const path = url.split('?')[0].split('#')[0];
    const canonical = `${BASE_URL}${path === '/' ? '' : path}`;

    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }
}
