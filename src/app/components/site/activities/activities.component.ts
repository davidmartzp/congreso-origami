import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID, computed, effect } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslationService } from '../../../services/translation.service';
import { ActivityItem } from '../../../i18n/translations';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ActivitiesComponent implements OnInit {
  readonly translations = computed(() => this.ts.t().activities);

  get activities(): ActivityItem[] {
    return this.translations().items;
  }

  selectedIndex: number = -1;
  isMobile: boolean = false;
  currentSlide: number = 0;
  shuffledActivities: ActivityItem[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  translateX: number = 0;

  // Touch events
  private touchStartX: number = 0;
  private touchCurrentX: number = 0;
  private isDragging: boolean = false;
  private startTranslateX: number = 0;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ts: TranslationService,
  ) {
    // Re-shuffle whenever the language changes
    effect(() => {
      const items = this.translations().items;
      this.shuffledActivities = [...items];
      for (let i = this.shuffledActivities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledActivities[i], this.shuffledActivities[j]] = [this.shuffledActivities[j], this.shuffledActivities[i]];
      }
      this.currentPage = 0;
      this.calculateTotalPages();
      this.updateTranslateX();
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
    this.updateItemsPerPage();
  }

  shuffleActivities(): void {
    this.shuffledActivities = [...this.activities];
    for (let i = this.shuffledActivities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledActivities[i], this.shuffledActivities[j]] = [this.shuffledActivities[j], this.shuffledActivities[i]];
    }
  }

  updateItemsPerPage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.itemsPerPage = width <= 768 ? 1 : 4;
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.shuffledActivities.length / this.itemsPerPage);
  }

  updateTranslateX(): void {
    const pageWidth = 100;
    this.translateX = -this.currentPage * pageWidth;
  }

  nextSlide(): void {
    this.currentPage = (this.currentPage + 1) % this.totalPages;
    this.updateTranslateX();
  }

  previousSlide(): void {
    this.currentPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
    this.updateTranslateX();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateTranslateX();
  }

  goToSlide(index: number): void {
    this.currentPage = Math.floor(index / this.itemsPerPage);
    this.updateTranslateX();
  }

  // Touch events para mobile
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
    this.isDragging = true;
    this.startTranslateX = this.translateX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchCurrentX = event.touches[0].clientX;
    // No actualizar translateX durante el movimiento para evitar slides cortados
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;

    this.isDragging = false;
    const diff = this.touchCurrentX - this.touchStartX;
    const threshold = 50; // Mínimo desplazamiento para cambiar de página

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.updateTranslateX(); // Volver a la posición original
    }
  }

  @HostListener('window:resize')
  checkIfMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      const oldItemsPerPage = this.itemsPerPage;
      this.updateItemsPerPage();

      // Si cambió el número de items por página, recalcular
      if (oldItemsPerPage !== this.itemsPerPage) {
        this.calculateTotalPages();
        this.currentPage = 0;
        this.updateTranslateX();
      }

      return this.isMobile;
    }
    return false;
  }

  openActivityDetail(index: number): void {
    this.selectedIndex = index;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
  }

  closeDetail(): void {
    this.selectedIndex = -1;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
  }

  nextActivity(): void {
    if (this.selectedIndex < this.shuffledActivities.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0; // Volver al inicio
    }
  }

  previousActivity(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.shuffledActivities.length - 1; // Ir al final
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.selectedIndex === -1) return;

    if (event.key === 'Escape') {
      this.closeDetail();
    } else if (event.key === 'ArrowRight') {
      this.nextActivity();
    } else if (event.key === 'ArrowLeft') {
      this.previousActivity();
    }
  }

  getSanitizedContent(content: string): SafeHtml {
    // Ensure links are properly formatted and clickable
    return this.sanitizer.bypassSecurityTrustHtml(
      content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')
    );
  }
}