import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-workshops-open-inscriptions',
  imports: [CommonModule],
  templateUrl: './workshops-open-inscriptions.component.html',
  styleUrl: './workshops-open-inscriptions.component.css'
})
export class WorkshopsOpenInscriptionsComponent {
  
  readonly translations = computed(() => this.ts.t().workshopsInscriptions);

  backgroundImageUrl = 'https://origamibogota.com/images/52845114767_1f979984b8_c.jpg';
  logoUrl = 'https://origamibogota.com/images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png';
  
  // Registration is open
  registrationOpenDate = new Date('2026-03-01T00:00:00');
  
  constructor(private router: Router, private ts: TranslationService) {}

  get isRegistrationOpen(): boolean {
    const now = new Date();
    return now >= this.registrationOpenDate;
  }

  get timeUntilRegistration(): string {
    if (this.isRegistrationOpen) return '';
    
    const now = new Date();
    const timeDiff = this.registrationOpenDate.getTime() - now.getTime();
    const t = this.translations();
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${t.availableIn} ${days} ${t.days}`;
    } else if (hours > 0) {
      return `${t.availableIn} ${hours} ${t.hours}`;
    } else {
      return `${t.availableIn} ${minutes} ${t.minutes}`;
    }
  }

  downloadMenuDay1() {
    window.open('https://origamibogota.com/descargas/Programacion-de-talleres-origami-bogota-2026.pdf', '_blank');
  }

  navigateToRegistration() {
    if (this.isRegistrationOpen) {
      window.open('/inscribir-talleres', '_blank');
    }
  }

  navigateToBooklet() {
    window.open('/booklet', '_blank');
  }
}
