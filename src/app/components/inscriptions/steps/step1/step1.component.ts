import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface PhaseInfo {
  name: string;
  price: number;
  deadline: string;
  isHighlight?: boolean;
  badge?: string;
  includes: string[];
}

interface DailyOption {
  day: string;
  date: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  pageTitle = 'PASO I';
  pageSubtitle = 'Realiza el pago de tu inscripción escogiendo cualquiera de nuestros métodos de pago, aprovecha las ofertas por etapas.';
  buyLink = 'https://origamistica.com/producto/inscripcion-completa-origami-bogota-2023-segunda-etapa/';
  phases: PhaseInfo[] = [
    {
      name: 'Madrugadores',
      price: 140000,
      deadline: 'Hasta enero 15, 2025',

      badge: 'Oferta especial',
      includes: [
        'Kit de materiales',
        'Refrigerios (no almuerzo)',
        'Entrada a los talleres'
      ]
    },
    {
      name: 'Primera Etapa',
      price: 150000,
      deadline: 'Hasta marzo 31, 2025',
      includes: [
        'Kit de materiales',
        'Refrigerios (no almuerzo)',
        'Entrada a los talleres'
      ]
    },
    {
      name: 'Segunda Etapa',
      price: 160000,
      isHighlight: true,
      deadline: 'Hasta mayo 31, 2025',
      includes: [
        'Kit de materiales',
        'Refrigerios (no almuerzo)',
        'Entrada a los talleres'
      ]
    },
    {
      name: 'Tercera Etapa',
      price: 170000,
      deadline: 'Hasta junio 20, 2025',
      includes: [
        'Kit de materiales',
        'Refrigerios (no almuerzo)',
        'Entrada a los talleres'
      ]
    }
  ];
  
  dailyOptions: DailyOption[] = [
    {
      day: 'Día Sábado',
      date: '21/06',
      price: 95000,
      description: 'Inscripción para participar en el evento el día viernes y sábado, con acceso a los talleres, conferencias y concursos. Incluye materiales y refrigerios (no almuerzo).'
    },
    {
      day: 'Día Domingo',
      date: '22/06',
      price: 95000,
      description: 'Inscripción para participar en el evento el día viernes y domingo, con acceso a los talleres, conferencias y concursos. Incluye materiales y refrigerios (no almuerzo).'
    }
  ];
  
  // Helper method para formatear el precio con separador de miles
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  get filteredPhases(): PhaseInfo[] {
    const today = new Date();
    return this.phases.filter(phase => new Date(phase.deadline) >= today);
  }

  onBuyClick(event: Event): void {
    event.preventDefault();
    
    Swal.fire({
      title: 'Información de pago',
      html: `
        <p>Serás redirigido al sitio de pagos en nuestro patrocinador origamistica.com.</p>
        <p>Una vez realizado el pago, <strong>debes regresar a esta página</strong> para completar el formulario de inscripción por cada participante.</p>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#732F37',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Continuar al pago',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(this.buyLink, '_blank');
      }
    });
  }
}
