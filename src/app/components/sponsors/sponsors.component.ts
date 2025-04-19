import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Sponsor {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {
  sponsors: Sponsor[] = [
    { src: 'images/belp-150x150.png', alt: 'Belp sponsor' },
    { src: 'images/emja-150x150.png', alt: 'EMJA sponsor' },
    { src: 'images/CEICT_Logo-150x150.png', alt: 'CEICT sponsor' },
    { src: 'images/elimon-2.png', alt: 'Elimon sponsor' },
    { src: 'images/WhatsApp-Image-2025-03-28-at-9.16.17-AM.jpeg', alt: 'EVO sponsor' },
    { src: 'images/ness-150x150.png', alt: 'NESS sponsor' },
    { src: 'images/lire-1-150x150.png', alt: 'LIRE sponsor' },
    { src: 'images/imar-150x150.png', alt: 'IMAR sponsor' },
    { src: 'images/snse-150x150.png', alt: 'SNSE sponsor' },
    { src: 'images/duo-150x150.png', alt: 'DUO sponsor' },
    { src: 'images/origamistica-150x150.png', alt: 'Origamistica sponsor' },
    { src: 'images/asm-150x150.png', alt: 'ASM sponsor' },
    { src: 'images/alpa-150x150.png', alt: 'ALPA sponsor' },
    { src: 'images/suepa-150x150.png', alt: 'SUEPA sponsor' },
    { src: 'images/andipal-150x150.png', alt: 'Andipal sponsor' },
    { src: 'images/buho-150x150.png', alt: 'Buho sponsor' },
    { src: 'images/parr-150x150.png', alt: 'PARR sponsor' }
  ];
  
  displayedSponsors: Sponsor[] = [];
  autoplayEnabled = true;
  isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Solo duplicamos los sponsors para el efecto infinito en el navegador
    if (this.isBrowser) {
      this.displayedSponsors = [...this.sponsors, ...this.sponsors];
    } else {
      // En el servidor, mostramos solo una copia para evitar problemas
      this.displayedSponsors = [...this.sponsors];
    }
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
