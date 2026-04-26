import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from "../../components/site/banner/banner.component";
import { FooterComponent } from "../../components/site/footer/footer.component";
import { ElParcheComponent } from "../../components/site/el-parche/el-parche.component";
import { MenuComponent } from "../../components/site/menu/menu.component";
import { SeoService } from '../../services/seo.service';

interface ImageData {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-amigos-plegadores',
  imports: [CommonModule, FormsModule, BannerComponent, FooterComponent, ElParcheComponent, MenuComponent],
  templateUrl: './amigos-plegadores.component.html',
  styleUrl: './amigos-plegadores.component.css'
})
export class AmigosPlegadoresComponent implements OnInit, OnDestroy {

  isJoining = false;
  isMobile = false;

  constructor(private seo: SeoService) { }

  currentOrigenIndex = 0;
  currentReunionesIndex = 0;
  currentEventoIndex = 0;

  origenImages: ImageData[] = [
    { src: 'images/ap/Mechas.jpeg', alt: 'Inicio del grupo' },
    { src: 'images/ap/amigos2.jpg', alt: 'Primeras reuniones' },
    { src: 'images/ap/origen3.jpg', alt: 'Creaciones originales' }
  ];

  reunionesImages: ImageData[] = [
    { src: 'images/ap/R1.jpeg', alt: 'Reuniones AseisManos' },
    { src: 'images/ap/R2.jpeg', alt: 'Taller de origami' },
    { src: 'images/ap/R3.jpeg', alt: 'Conversaciones entre amigos' },
    { src: 'images/ap/R4.jpeg', alt: 'Sesión de plegado' }
  ];

  eventoImages: ImageData[] = [
    { src: 'images/ap/organizadores.jpg', alt: 'Evento internacional de origami' },
    { src: 'images/ap/convencion1.jpg', alt: 'Talleres con artistas invitados' },
    { src: 'images/ap/convencion2.jpg', alt: 'Comunidad origamista reunida' },
    { src: 'images/ap/Cetsu.jpg', alt: 'Exposición de trabajos' }
  ];

  private autoSlideInterval: any;

  ngOnInit() {
    this.seo.setPage('amigosPlegadores');
    this.checkIfMobile();
    if (this.isMobile) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    // Reset carousel intervals when switching between mobile/desktop
    if (wasMobile !== this.isMobile) {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }

      if (this.isMobile) {
        this.startAutoSlide();
      }
    }
  }

  private startAutoSlide() {
    // Clear any existing interval first
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }

    this.autoSlideInterval = setInterval(() => {
      this.autoAdvanceCarousels();
    }, 5000); // Increased to 5 seconds for better user experience
  }

  private autoAdvanceCarousels() {
    // Auto advance origen carousel
    if (this.currentOrigenIndex < this.origenImages.length - 1) {
      this.currentOrigenIndex++;
    } else {
      this.currentOrigenIndex = 0;
    }

    // Auto advance reuniones carousel
    if (this.currentReunionesIndex < this.reunionesImages.length - 1) {
      this.currentReunionesIndex++;
    } else {
      this.currentReunionesIndex = 0;
    }

    // Auto advance evento carousel
    if (this.currentEventoIndex < this.eventoImages.length - 1) {
      this.currentEventoIndex++;
    } else {
      this.currentEventoIndex = 0;
    }
  }

  nextImage(section: string) {
    switch (section) {
      case 'origen':
        if (this.currentOrigenIndex < this.origenImages.length - 1) {
          this.currentOrigenIndex++;
        }
        break;
      case 'reuniones':
        if (this.currentReunionesIndex < this.reunionesImages.length - 1) {
          this.currentReunionesIndex++;
        }
        break;
      case 'evento':
        if (this.currentEventoIndex < this.eventoImages.length - 1) {
          this.currentEventoIndex++;
        }
        break;
    }
  }

  previousImage(section: string) {
    switch (section) {
      case 'origen':
        if (this.currentOrigenIndex > 0) {
          this.currentOrigenIndex--;
        }
        break;
      case 'reuniones':
        if (this.currentReunionesIndex > 0) {
          this.currentReunionesIndex--;
        }
        break;
      case 'evento':
        if (this.currentEventoIndex > 0) {
          this.currentEventoIndex--;
        }
        break;
    }
  }

  setCurrentImage(section: string, index: number) {
    switch (section) {
      case 'origen':
        this.currentOrigenIndex = index;
        break;
      case 'reuniones':
        this.currentReunionesIndex = index;
        break;
      case 'evento':
        this.currentEventoIndex = index;
        break;
    }
  }

  onJoinClick(): void {
    this.isJoining = true;
    // Lógica para unirse a la comunidad
    setTimeout(() => {
      this.isJoining = false;
      // Mostrar mensaje de éxito o redireccionar
    }, 2000);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-logo.png';
  }
}
