import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

// Updated interface for menu items
interface MenuItem {
  name: string;
  url: string;         // URL for navigation
  type: 'internal-target' | 'internal-page' | 'external-page'; // Type of navigation
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  menuItems: MenuItem[] = [
    { name: 'Inicio', url: '', type: 'internal-page' },
    { name: 'Acerca del evento', url: 'about', type: 'internal-target' },
    { name: 'Inscripciones abiertas', url: 'inscriptions', type: 'internal-page' },
    { name: 'Invitados', url: 'guests', type: 'internal-target' },
    { name: 'Actividades', url: 'activities', type: 'internal-target' },
    { name: '¡Sé tallerista!', url: 'talleres', type: 'internal-page' },
    { name: '+ Sobre Tetsuya', url: 'https://gotaniorigami.wixsite.com/hello', type: 'external-page' },
    { name: '+ Sobre Cekouat', url: 'https://cekouatorigami.com/es', type: 'external-page' },
    { name: '+ Sobre Diego', url: 'https://instagram.com/diegorigami', type: 'external-page' },
    { name: 'Contáctanos', url: 'contact', type: 'internal-target' },


  ];

  isMenuOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Check if we're on the home page
  private isHomePage(): boolean {
    const currentUrl = this.router.url.split('#')[0]; // Remove any fragment
    return currentUrl === '/' || currentUrl === '/home' || currentUrl === '';
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
      this.router.navigate(['']).then(() => {
        this.scrollToElement(target);
      });
    }
  }

  private handleInternalPage(url: string): void {
    window.location.href = url;
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
