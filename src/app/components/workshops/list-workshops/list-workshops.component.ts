import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService } from '../../../services/workshops.service';
import { BannerComponent } from "../../banner/banner.component";
import { FooterComponent } from "../../footer/footer.component";

interface Workshop {
  nameAssistant: string;
  lastname: string;
  image: string;
  name: string;
  observations?: string; // Added observations field
  sizeClass?: string; // New property to hold random size class
}

@Component({
  selector: 'app-list-workshops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-workshops.component.html',
  styleUrl: './list-workshops.component.css'
})
export class ListWorkshopsComponent {
  workshops: Workshop[] = [];
  modalVisible = false;
  selectedWorkshop: Workshop | null = null;
  currentIndex = 0;

  constructor(private workshopsService: WorkshopsService) { }

  ngOnInit() {
    this.workshopsService.getWorkshops().subscribe((data: Workshop[]) => {
      // First shuffle the array
      const shuffled = this.shuffleArray([...data]);
      
      // Then assign random size classes
      this.workshops = shuffled.map(workshop => {
        return {
          ...workshop,
          sizeClass: this.getRandomSizeClass()
        };
      });
      
      console.log(this.workshops);
    });
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Determine a random size class for each workshop
  private getRandomSizeClass(): string {
    const rand = Math.random();
    if (rand < 0.15) return 'size-large'; // 15% chance for large 2x2
    if (rand < 0.35) return 'size-wide';  // 20% chance for wide 2x1
    if (rand < 0.55) return 'size-tall';  // 20% chance for tall 1x2
    return 'size-normal';                 // 45% chance for normal 1x1
  }

  openModal(workshop: Workshop, index: number): void {
    this.selectedWorkshop = workshop;
    this.currentIndex = index;
    this.modalVisible = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal(): void {
    this.modalVisible = false;
    document.body.style.overflow = ''; // Restore scrolling
  }

  prevImage(): void {
    this.currentIndex = this.currentIndex === 0 ? 
      this.workshops.length - 1 : this.currentIndex - 1;
    this.selectedWorkshop = this.workshops[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = this.currentIndex === this.workshops.length - 1 ? 
      0 : this.currentIndex + 1;
    this.selectedWorkshop = this.workshops[this.currentIndex];
  }

  // Close modal when Escape key is pressed
  @HostListener('window:keydown.escape')
  handleEscapeKey(): void {
    this.closeModal();
  }
}
