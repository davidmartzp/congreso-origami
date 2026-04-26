import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TranslationService } from '../../../../../services/translation.service';

interface PhaseInfo {
  name: string;
  price: number;
  deadline: string;
  deadlineDate: string;
  isHighlight?: boolean;
  badge?: string;
  includes: string[];
}

interface DailyOption {
  day: string;
  date: string;
  price: number;
  description: string;
  url?: string;
}

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  readonly ts = inject(TranslationService);
  readonly t = computed(() => this.ts.t().inscriptions);

  buyLink = 'https://origamistica.com/producto/inscripcion-completa-origami-bogota/';

  readonly phases = computed((): PhaseInfo[] => {
    const t = this.t();
    return [
      {
        name: t.earlyBirdName,
        price: 140000,
        deadline: t.earlyBirdDeadline,
        deadlineDate: '2026-01-15',
        badge: t.earlyBirdBadge,
        includes: t.includes
      },
      {
        name: '',
        price: 200000,
        deadline: t.phase2Deadline,
        deadlineDate: '2026-06-14',
        includes: t.includes
      }
    ];
  });

  readonly filteredPhases = computed((): PhaseInfo[] => {
    const today = new Date();
    return this.phases().filter(phase => new Date(phase.deadlineDate) >= today);
  });

  readonly dailyOptions = computed((): DailyOption[] => {
    const t = this.t();
    return [
      {
        day: t.saturdayDay,
        date: '13/06',
        price: 120000,
        description: t.saturdayDesc,
        url: 'https://origamistica.com/producto/inscripcion-dia-sabado-origami-bogota/'
      },
      {
        day: t.sundayDay,
        date: '14/06',
        price: 120000,
        description: t.sundayDesc,
        url: 'https://origamistica.com/producto/inscripcion-dia-domingo-origami-bogota/'
      }
    ];
  });

  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  onBuyClick(event: Event): void {
    event.preventDefault();
    const t = this.t();

    Swal.fire({
      title: t.paymentInfoTitle,
      html: t.paymentInfoHtml,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#732F37',
      cancelButtonColor: '#6c757d',
      confirmButtonText: t.continueBtn,
      cancelButtonText: t.cancelBtn
    }).then((result) => {
      if (result.isConfirmed) {
        const target = event.target as HTMLAnchorElement;
        const href = target.href;
        window.open(href, '_blank');
      }
    });
  }
}
