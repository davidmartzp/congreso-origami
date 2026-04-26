import { Component, HostListener, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';
import { ItineraryDay } from '../../../i18n/translations';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent implements AfterViewInit, OnDestroy {
  readonly translations = computed(() => this.ts.t().itinerary);
  readonly days = computed(() => this.ts.t().itinerary.days);

  isModalOpen = false;
  private touchStartY: number | null = null;
  private modalElement: HTMLElement | null = null;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ts: TranslationService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.modalElement = document.querySelector('.modal-content');
      this.adjustModalHeight(); // Adjust modal height on load
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.isModalOpen) {
      document.body.style.overflow = '';
    }
  }

  openModal(): void {
    if (!this.isBrowser) return;
    
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
    
    // Ensure modal is visible and positioned correctly
    setTimeout(() => {
      if (this.modalElement) {
        this.modalElement.scrollTop = 0;
      }
      
      const modalBody = document.querySelector('.modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }, 50);
  }

  closeModal(): void {
    if (!this.isBrowser) return;
    
    this.isModalOpen = false;
    document.body.style.overflow = ''; // Re-enable body scrolling
  }

  closeModalOnOverlayClick(event: MouseEvent): void {
    // Only close if the actual overlay background is clicked
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isModalOpen && this.isBrowser) {
      this.closeModal();
    }
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(e: TouchEvent): void {
    if (!this.isModalOpen || !this.isBrowser) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    const target = e.target as HTMLElement;
    const modalHeader = target.closest('.modal-header');
    
    // Only track touch if it's on the header (for swiping down to close)
    if (modalHeader) {
      this.touchStartY = touch.clientY;
    }
  }

  @HostListener('touchmove', ['$event'])
  handleTouchMove(e: TouchEvent): void {
    // Prevent default scrolling when swiping on header to close modal
    if (this.touchStartY !== null && (e.target as HTMLElement).closest('.modal-header')) {
      e.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(e: TouchEvent): void {
    if (!this.isModalOpen || !this.touchStartY || !this.isBrowser) return;
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaY = touch.clientY - this.touchStartY;
    
    // If swiped down significantly, close modal
    if (deltaY > 50) {
      this.closeModal();
    }
    
    this.touchStartY = null;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.adjustModalHeight(); // Adjust modal height on window resize
  }

  private adjustModalHeight(): void {
    if (this.modalElement) {
      const maxHeight = window.innerHeight * 0.85; // 85% of viewport height
      this.modalElement.style.maxHeight = `${maxHeight}px`;
    }
  }
}
