import { Component, HostListener, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Day {
  title: string;
  content: string;
}

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent implements AfterViewInit, OnDestroy {
  isModalOpen = false;
  private touchStartY: number | null = null;
  private modalElement: HTMLElement | null = null;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  days: Day[] = [
    {
      title: 'Día —',
      content: `Ya sabemos que está tachando los días que faltan para el evento uno a uno en su calendario, 
                pliegue sistemáticamente los modelos del libro digital, escriba sobre su ansiedad en el grupo de WhatsApp 
                y tenga paciencia, solo podemos hacer un evento al año.`
    },
    {
      title: 'Unos meses antes',
      content: `Ya están abiertas las inscripciones, ¡de por diós!, inscríbase ya, que le sale más barato 
                y tiene mejor turno para escoger talleres.`
    },
    {
      title: '60 días antes',
      content: `Aún estamos en el grupo de WhatsApp del año pasado, algún adelantado empezará a preguntar por los pines, 
                no entre en pánico pero tampoco se relaje que no es mañana pero tampoco hay tanto tiempo, es momento de 
                empezar a pensar en los pines, las tarjetas y su expo personal, bueno está bien entre en pánico supérelo y empiece a doblar.`
    },
    {
      title: '1 día antes',
      content: `Aún puede trasnochar y aprovechar la ansiedad si no empezó antes puede llegar al menos con 10 pines, 
                me pido uno, nada como pin con ansiedad y adrenalina, aliste la maleta y prepárese para el fin de semana que tanto ha esperado.`
    },
    {
      title: 'Día 1',
      content: `<ol>
                  <li>Espere la noche antes de que arranque el evento (es importante dormir aunque la ansiedad no lo deje).</li>
                  <li>En la fecha indicada desplácese hasta el sitio, si lo prefiere un par de horas antes de que todo comience, 
                      seguro encontrará a otro Origamista ansioso por el sector, podrán almorzar juntos (en caso extremo desayunar) 
                      tomarse un café y esperar a que sean las 3 (ya aprendimos y en 1/2 hora no se monta la expo).</li>
                  <li>Reclame su kit y si dobló algo para la Expo diríjase a hacer el montaje; Alejo Erazo lo estará esperando, 
                      no se desespere y tenga paciencia. Espere con calma mientras revisa el contenido del kit 
                      (haga lista mental de con qué va a completar la caja para el día siguiente).</li>
                  <li>Listo para el canelazo y la inauguración, seguro que para estas alturas ya habrá doblado algo en los pasillos 
                      y habrá adelantado cuaderno con los viejos amigos o habrá conocido a su parche del fin de semana.</li>
                  <li>Prepárese para no dormir esta noche tampoco.</li>
                  <li>Duerma por favor! … Esperé día 2</li>
                </ol>`
    },
    {
      title: 'Día 2',
      content: `<ol start="0">
                  <li>Como no pudo dormirse temprano y finalmente pudo conciliar el sueño como a las 4 am, apúrele porque va a llegar tarde.</li>
                  <li>Mientras se desplaza al evento en transmi, taxi, Uber, bici, teletransportación o corriendo entre a la página y 
                      seleccione los talleres, no entre en pánico, si no lo deja entrar tal vez aún no es su turno. 
                      ¡Si ud es el que conduce pare para inscribir, no use su celular mientras conduce.</li>
                  <li>Dedíquese a plegar todo el día, prepárese mentalmente para la foto grupal, si es precavido ya sabrá dónde va a almorzar, 
                      si no, fresco: hay grupos que ya tienen estudiada la zona, péguese al que más le llame la atención.</li>
                  <li>Venciendo el sueño, asista a los talleres de la tarde, prepárese para el chocogami y ¡de por dios! 
                      si se inscribió a las tarjetas, entréguelas que lo están buscando desde ayer.</li>
                  <li>Solo SI ES MAYOR DE EDAD, alístese para la chiva (hoy tampoco va a dormir).</li>
                </ol>`
    },
    {
      title: 'Día 3',
      content: `<ol>
                  <li>Si logró levantarse nos vemos en el evento.</li>
                  <li>Todo lo demás como el día segundo.</li>
                  <li>Entrega de reconocimientos, clausura, chocolatada. Ud. sentirá una ligera nostalgia 
                      que durará hasta el próximo evento.</li>
                </ol>`
    },
    {
      title: 'Día 4',
      content: `Es probable que salgan planes, fuera de programa, esté pendiente en el WhatsApp del evento, 
                la emoción nos hace vernos hasta dos semanas seguidas, si le nace en alguno nos veremos.`
    }
  ];

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.modalElement = document.querySelector('.modal-content');
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
}
