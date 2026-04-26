import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

interface Sponsor {
  src: string;
  alt: string;
  url?: string;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {
  readonly translations = computed(() => this.ts.t().sponsors);

  sponsors: Sponsor[] = [
    { src: 'images/emja-150x150.png', alt: 'EMJA sponsor', url: 'https://www.colombia.emb-japan.go.jp/itprtop_es/index.html' },
    { src: 'images/elimon-2.png', alt: 'Elimon sponsor', url: 'https://www.instagram.com/elimonn/' },
    { src: 'images/pliegues_origami.png', alt: 'Pliegues Origami', url: 'https://www.instagram.com/pliegues_origami/' },
    { src: 'images/WhatsApp-Image-2026-03-28-at-9.16.17-AM.jpeg', alt: 'EVO sponsor', url: '#' },
    { src: 'images/ness-150x150.png', alt: 'NESS sponsor', url: '#' },
    { src: 'images/lire-1-150x150.png', alt: 'LIRE sponsor', url: '#' },
    { src: 'images/imar-150x150.png', alt: 'IMAR sponsor', url: '#' },
    { src: 'images/snse-150x150.png', alt: 'SNSE sponsor', url: '#' },
    { src: 'images/duo-150x150.png', alt: 'DUO sponsor', url: '#' },
    { src: 'images/origamistica-150x150.png', alt: 'Origamistica sponsor', url: 'https://origamistica.com/' },
    { src: 'images/asm-150x150.png', alt: 'ASM sponsor', url: 'https://www.instagram.com/aseismanos/' },
    { src: 'images/alpa-150x150.png', alt: 'ALPA sponsor', url: '#' },
    { src: 'images/suepa-150x150.png', alt: 'SUEPA sponsor', url: '#' },
    { src: 'images/andipal.jpeg', alt: 'Andipal sponsor', url: '#' },
    { src: 'images/buho-150x150.png', alt: 'Buho sponsor', url: '#' },
    { src: 'images/parr-150x150.png', alt: 'PARR sponsor', url: '#' },
    { src: 'images/artisan.png', alt: 'artisan', url: '#' },
    { src: 'images/gomezul.png', alt: 'Gomezul', url: '#' },
  ];

  displayedSponsors: Sponsor[] = [];
  autoplayEnabled = true;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ts: TranslationService) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Siempre duplicamos para que SSR y cliente rendericen lo mismo (evita hydration mismatch)
    this.displayedSponsors = [...this.sponsors, ...this.sponsors];
  }

  ngOnInit(): void {
    // No realizamos operaciones del DOM en el servidor
  }

  ngOnDestroy(): void {
    // No hay nada que limpiar
  }

  toggleAutoplay(): void {
    if (this.isBrowser) {
      this.autoplayEnabled = !this.autoplayEnabled;
    }
  }
}
