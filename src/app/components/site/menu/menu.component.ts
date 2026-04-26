import { Component, Inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { Language } from '../../../i18n/translations';

interface MenuItem {
  name: string;
  url: string;
  type: 'internal-target' | 'internal-page' | 'external-page';
  featured?: boolean;
}

interface LangOption {
  code: Language;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  readonly menuTranslations = computed(() => this.ts.t().menu);
  readonly currentLang = computed(() => this.ts.lang());

  readonly langOptions: LangOption[] = [
    { code: 'es', label: 'ES', flag: '🇨🇴' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
  ];

  selectLang(lang: Language): void {
    this.ts.setLanguage(lang);
    this.isMenuOpen = false;
  }

  get menuItems(): MenuItem[] {
    const m = this.menuTranslations();
    return [
      { name: m.home,            url: '',                  type: 'internal-page' },
      { name: m.friends,         url: 'amigos-plegadores', type: 'internal-page', featured: true },
      { name: m.about,           url: 'about',             type: 'internal-target' },
      { name: m.inscriptions,    url: 'inscripciones',     type: 'internal-page' },
      { name: m.guests,          url: 'guests',            type: 'internal-target' },
      { name: m.activities,      url: 'activities',        type: 'internal-target' },
      { name: m.workshops,       url: 'talleres',          type: 'internal-page' },
      { name: m.publishDiagrams, url: 'activities',        type: 'internal-target' },
      { name: m.schedule,        url: 'booklet',           type: 'internal-page' },
      { name: m.registerWorkshops, url: 'inscribir-talleres', type: 'internal-page' },
      { name: m.resources,       url: 'recursos',          type: 'internal-page' },
      { name: m.contact,         url: 'contact',           type: 'internal-target' },
      { name: m.location,        url: 'contact',           type: 'internal-target' },
      { name: m.ob2025,          url: 'https://origamibogota.com/2025', type: 'external-page' },
    ];
  }

  isMenuOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private ts: TranslationService,
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Check if we're on the home page
  private isHomePage(): boolean {
    const currentUrl = this.router.url.split('#')[0];
    return currentUrl === '/' || currentUrl === '' || currentUrl === '/en' || currentUrl === '/pt' || currentUrl === '/fr';
  }

  private get langPrefix(): string {
    const lang = this.ts.lang();
    return lang === 'es' ? '' : lang;
  }

  handleNavigation(item: MenuItem): void {
    this.isMenuOpen = false;

    switch (item.type) {
      case 'external-page':
        this.openExternalLink(item.url);
        break;
      case 'internal-target':
        this.handleInternalTarget(item.url);
        break;
      case 'internal-page':
        this.handleInternalPage(item.url);
        break;
    }
  }

  private openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  private handleInternalTarget(target: string): void {
    if (this.isHomePage()) {
      this.scrollToElement(target);
    } else {
      this.router.navigate([this.langPrefix]).then(() => {
        this.scrollToElement(target);
      });
    }
  }

  private handleInternalPage(url: string): void {
    if (!url) {
      this.router.navigate([this.langPrefix || '']);
    } else if (this.langPrefix) {
      this.router.navigate([this.langPrefix, url]);
    } else {
      this.router.navigate([url]);
    }
  }

  private scrollToElement(elementId: string): void {
    setTimeout(() => {
      const element = this.document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  }
}
