import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';
import { Language } from '../../../i18n/translations';

interface LangOption {
  code: Language;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  readonly options: LangOption[] = [
    { code: 'es', label: 'ES', flag: '🇨🇴' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
  ];

  readonly currentLang = computed(() => this.ts.lang());

  isOpen = false;

  constructor(readonly ts: TranslationService) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  select(lang: Language): void {
    this.ts.setLanguage(lang);
    this.isOpen = false;
  }

  getCurrentOption(): LangOption {
    return this.options.find((o) => o.code === this.currentLang()) ?? this.options[0];
  }
}
