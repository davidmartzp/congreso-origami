import { Component, HostListener, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { WorkshopsService } from '../../../../services/workshops.service';

@Component({
  selector: 'app-list-workshops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-workshops.component.html',
  styleUrl: './list-workshops.component.css'
})
export class ListWorkshopsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('workshopGrid') workshopGrid!: ElementRef<HTMLDivElement>;

  workshops: Workshop[] = [];
  modalVisible = false;
  selectedWorkshop: Workshop | null = null;
  currentIndex = 0;
  placeholderImage = 'https://origamibogota.com/app-ob/storage/app/public/images/placeholder.jpg';
  baseImageUrl = 'https://origamibogota.com/app-ob/storage/app/public/images/';
  showScrollIndicator = false;

  touchStartX = 0;
  touchEndX = 0;
  isDragging = false;
  isReallyDragging = false;
  startPosition = 0;
  currentPosition = 0;

  isMobileView = false;
  currentMobileCard = 0;
  private resizeObserver: ResizeObserver | null = null;
  private scrollListenerAttached = false;

  private isBrowser: boolean;

  constructor(
    private workshopsService: WorkshopsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadWorkshops();
    if (this.isBrowser) {
      this.checkMobileView();
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.checkMobileView();
      this.checkScrollable();
    });

    if (this.workshopGrid?.nativeElement) {
      this.resizeObserver.observe(this.workshopGrid.nativeElement);
    }
    this.setupScrollListener();
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.removeScrollListener();
  }

  private onResize() {
    this.checkMobileView();
  }

  checkMobileView() {
    if (!this.isBrowser) return;
    const wasMobileView = this.isMobileView;
    this.isMobileView = window.innerWidth <= 768;

    if (this.isMobileView) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }

    if (wasMobileView !== this.isMobileView) {
      this.setupScrollListener();
      setTimeout(() => {
        if (this.isMobileView) {
          this.scrollToMobileCard(this.currentMobileCard);
        }
      }, 0);
    }

    if (!this.workshopGrid?.nativeElement) {
      this.checkScrollable();
    }
  }

  private setupScrollListener() {
    if (this.isMobileView && this.workshopGrid?.nativeElement && !this.scrollListenerAttached) {
      this.workshopGrid.nativeElement.addEventListener('scroll', this.onGridScroll);
      this.scrollListenerAttached = true;
    } else if (!this.isMobileView && this.scrollListenerAttached) {
      this.removeScrollListener();
    }
  }

  private removeScrollListener() {
    if (this.workshopGrid?.nativeElement && this.scrollListenerAttached) {
      this.workshopGrid.nativeElement.removeEventListener('scroll', this.onGridScroll);
      this.scrollListenerAttached = false;
    }
  }

  private onGridScroll = (event: Event) => {
    if (!this.isMobileView || !this.workshopGrid?.nativeElement) return;

    const container = this.workshopGrid.nativeElement;
    const cards = container.querySelectorAll('.workshop-card');
    if (cards.length === 0) return;

    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 15;

    if (cardWidth > 0) {
      const scrollLeft = container.scrollLeft;
      const effectiveCardWidth = cardWidth + gap;
      const newCurrentMobileCard = Math.round(scrollLeft / effectiveCardWidth);

      if (this.currentMobileCard !== newCurrentMobileCard) {
        this.currentMobileCard = newCurrentMobileCard;
        this.cdr.detectChanges();
      }
    }
  };

  scrollToMobileCard(index: number) {
    if (!this.workshopGrid?.nativeElement) return;

    const container = this.workshopGrid.nativeElement;
    const cards = container.querySelectorAll('.workshop-card');
    if (cards.length === 0 || index < 0 || index >= cards.length) return;

    const cardElement = cards[index] as HTMLElement;
    const scrollPosition = cardElement.offsetLeft - parseFloat(getComputedStyle(container).paddingLeft);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.isReallyDragging = false;
    this.startPosition = event.clientX;
    this.currentPosition = this.workshopGrid.nativeElement.scrollLeft;
    event.preventDefault();
    document.body.style.userSelect = 'none';
  }

  drag(event: MouseEvent) {
    if (!this.isDragging) return;

    const dx = event.clientX - this.startPosition;
    if (Math.abs(dx) > 5) {
      this.isReallyDragging = true;
    }
    this.workshopGrid.nativeElement.scrollLeft = this.currentPosition - dx;
  }

  endDrag() {
    if (!this.isDragging) return;
    setTimeout(() => {
      this.isReallyDragging = false;
    }, 10);
    this.isDragging = false;
    document.body.style.userSelect = '';
  }

  checkScrollable() {
    if (this.workshopGrid?.nativeElement) {
      const element = this.workshopGrid.nativeElement;
      this.showScrollIndicator = !this.isMobileView && element.scrollWidth > element.clientWidth;
    } else {
      this.showScrollIndicator = false;
    }
  }

  scrollGallery(direction: 'left' | 'right') {
    if (!this.workshopGrid?.nativeElement || this.isMobileView) return;

    const container = this.workshopGrid.nativeElement;
    const card = container.querySelector('.workshop-card') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + (parseFloat(getComputedStyle(container).gap) || 25) : 325;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => { this.showScrollIndicator = false; }, 1500);
  }

  loadWorkshops() {
    this.workshopsService.getWorkshops().subscribe({
      next: (data: Workshop[]) => {
        this.workshops = this.shuffleArray([...data]);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.setupScrollListener();
          if (this.isMobileView) {
            this.scrollToMobileCard(this.currentMobileCard);
          }
        }, 150);
      },
      error: (err) => console.error('Error loading workshops:', err)
    });
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onTouchStart(event: TouchEvent) {
    if (!this.modalVisible) return;
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.modalVisible) return;
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const SWIPE_THRESHOLD = 50;
    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        this.prevImage();
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        this.nextImage();
        if (navigator.vibrate) navigator.vibrate(50);
      }
    }
  }

  getWorkshopImageUrl(workshop: Workshop | null): string {
    if (!workshop || !workshop.image) return this.placeholderImage;
    return this.baseImageUrl + workshop.image;
  }

  handleImageError(event: any): void {
    event.target.src = this.placeholderImage;
  }

  openModal(event: Event, workshop: Workshop, index: number): void {
    if (!this.isMobileView && this.isReallyDragging) {
      return;
    }

    this.selectedWorkshop = workshop;
    this.currentIndex = index;
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalVisible = false;
    document.body.style.overflow = '';
  }

  prevImage(): void {
    if (!this.workshops.length) return;
    this.currentIndex = (this.currentIndex === 0) ? (this.workshops.length - 1) : (this.currentIndex - 1);
    this.selectedWorkshop = this.workshops[this.currentIndex];
  }

  nextImage(): void {
    if (!this.workshops.length) return;
    this.currentIndex = (this.currentIndex === this.workshops.length - 1) ? 0 : (this.currentIndex + 1);
    this.selectedWorkshop = this.workshops[this.currentIndex];
  }

  @HostListener('window:keydown.escape')
  handleEscapeKey(): void {
    if (this.modalVisible) {
      this.closeModal();
    }
  }
}

interface Workshop {
  nameAssistant: string;
  lastname: string;
  image: string;
  name: string;
  observations?: string;
}
