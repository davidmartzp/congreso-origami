import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  activities = [
    {
      "title": "Publica tus Diagramas:  Deja tu Huella 📝",
      "imageUrl": "images/457442674_10233497359799729_1347389003187592882_n.jpg",
      "icon": "fas fa-book",
      "content": "¿Creaste un modelo de origami increíble? ¡Es tu oportunidad de verlo publicado! Comparte tus diagramas originales en nuestro libro \"Páginas De Origami 2026\". Llegarás a origamistas de todo el mundo y tu creación será parte del libro oficial del evento. 🌍\n¿Cómo participar? Fácil: descarga las Bases de la convocatoria ([español](<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>LINK_BASES_ES</a>) o [inglés](<a style='color: #B19CD9' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>LINK_BASES_EN</a>)), prepara tus diagramas y envíalos antes del 20 de mayo de 2026 a Camilo Torres: paginasdeorigami@gmail.com. ¡Anímate a compartir tu arte!"
    },
    {
      "title": "Comparte tu Talento: ¡Sé Tallerista! 🎨",
      "imageUrl": "images/61160257_10220581757310914_8555122383122333696_n-1.jpg",
      "icon": "fas fa-hands",
      "content": "¿Te apasiona enseñar origami? ¡Este es tu momento! Inscríbete para ser tallerista en nuestras categorías (Básico, Intermedio, Avanzado, Kids) y comparte tu magia con otros plegadores. Al inscribirte, cuéntanos qué figuras geniales quieres enseñar, o si prefieres, ¡nos mandas los detalles más tarde! Anímate a inspirar a otros con tus pliegues. ✨"
    },
    {
      "title": "Rompe el Hielo con Pines Plegados 📌",
      "imageUrl": "images/289780022_2495040103971537_8568591026589863873_n-1.jpg",
      "icon": "fas fa-thumbtack",
      "content": "¿Un poco tímido/a para empezar a charlar? ¡Tenemos la solución! Únete al intercambio de pines: dobla un montón de figuritas de origami chulas que se puedan usar como prendedor. Repártelas a quien quieras en la inauguración o durante todo el evento. ¡Es la excusa perfecta para conectar, hacer amigos y llevarte un recuerdo único! 😉"
    },
    {
      "title": "Chocogami: ¡El Reto más Dulce! 🍫",
      "imageUrl": "images/289282322_10230290849552152_1956165075611761127_n-1.jpg",
      "icon": "fas fa-cookie-bite",
      "content": "¡Prepárate para un desafío delicioso y creativo! En Chocogami, destapas un chocolate colombiano popular, descubres una foto secreta y... ¡a plegar! La regla de oro: solo puedes usar el empaque del chocolate. Demuestra tu ingenio, compite por premios divertidos o simplemente pásalo genial viendo las creaciones (¡y comiendo chocolate!). ¿Te atreves?"
    },
    {
      "title": "Intercambio de Tarjetas (ATC): 🃏",
      "imageUrl": "images/AG-mariposas-1.png",
      "icon": "fas fa-exchange-alt",
      "content": "¡Haz que tus ATC (Artist Trading Cards) sean inolvidables! Diseña y arma paquetes de tarjetas de origami (16 tarjetas por paquete, en grupos de 2). Al final, se intercambian paquetes de 16 o 32 tarjetas diferentes entre los participantes, ¡y todos se llevan una colección única! Además, participa en el concurso a la mejor tarjeta y deja que tu creatividad brille. Descarga las <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx'>bases de la convocatoria</a> y empieza a plegar conexiones llenas de arte."
    },
    {
      "title": "¡Súbete a la Chiva Rumbera! 🚌🎶",
      "imageUrl": "images/f7f84ec16ebb55c406af906456176219-1.jpg",
      "icon": "fas fa-bus",
      "content": "¿Listos para una noche de pura fiesta colombiana? La Chiva Rumbera es nuestro autobús colorido y musical para una escapada nocturna llena de baile y diversión. Es una actividad extra (¡y solo para adultos!) perfecta para soltar el esqueleto después de un día de plegado. ¡No te la pierdas si quieres rumba de la buena! ヾ(-.-)ゞ *(Actividad opcional, consulta detalles)*."
    },
    {
      "title": "Encuentro con los invitados ✨",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-users",
      "content": "¡Una oportunidad de oro! Tendremos clases especiales con nuestros invitados estrella (internacionales y nacionales). Imagina aprender sus secretos, escuchar sus historias y plegar un modelo especial directamente con ellos en un grupo grande. ¡Prepárate para una dosis concentrada de inspiración y conocimiento de los que más saben!"
    },
    {
      "title": "Talleres para Todos: ¡Encuentra tu Pliegue! 🤓",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-chalkboard-teacher",
      "content": "¿Eres nuevo/a en el mundo del origami o ya eres súper pro plegando? ¡No importa! Nuestros talleres se dividen por niveles (Principiante, Intermedio, Experto) para que disfrutes aprendiendo figuras a tu ritmo. Lo mejor: muchos profes enseñan modelos creados por ellos mismos. ¡Son oportunidades únicas para aprender figuras que no encontrarás en otro lugar!"
    },
    {
      "title": "Exposición: ¡Muestra tu Arte al Mundo! 🤩",
      "imageUrl": "images/447852680_18270623236238474_4507690254501985740_n-1.jpg",
      "icon": "fas fa-eye",
      "content": "¡Este es tu escenario! Trae tus mejores creaciones y exponlas para que todos las admiren. Recuerda ponerle una etiqueta con los datos clave (autor, plegador, tipo de papel...). Además, ¡tus modelos pueden ganar premios! Habrá votaciones durante todo el evento para elegir la mejor exposición (¡la creatividad cuenta!). No olvides votar por tus favoritas y dejar que tu trabajo inspire a otros."
    },
    {
      "title": "Origami Kids: ¡Diversión para los Peques! 😊",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-child",
      "content": "¡El futuro del origami está aquí! Tenemos un rincón especial para los niños y niñas, con talleres súper divertidos, juegos y figuras pensadas para sus manitas creativas. Y si te encanta enseñar y tienes un don con los peques, ¡anímate a ser profe voluntario en Origami Kids! Es una experiencia gratificante llena de risas y papelitos de colores."
    },
    {
      "title": "Subasta Silenciosa: ¡Tesoros Escondidos! 🤫",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-gavel",
      "content": "¿Buscas esa joya de origami que no encuentras en ningún lado? ¡Participa en nuestra Subasta Silenciosa! Podrás encontrar libros, papeles especiales, modelos exclusivos donados por artistas y muchas sorpresas más. Escribe tu oferta en secreto, cruza los dedos y ¡llévate a casa algo único! Además, ayudas a apoyar a la comunidad de origami."
    },
    {
      "title": "Origami de Pasillo: ¡La Magia Espontánea! ✨",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-comments",
      "content": "A veces, los mejores descubrimientos ocurren fuera de las aulas. El \"Origami de Pasillo\" es ese momento mágico donde compartes un truco rápido, aprendes una figura de un nuevo amigo o simplemente charlas sobre papeles y pliegues en cualquier rincón del evento. ¡Mantén los ojos abiertos y el papel listo, la conexión y el aprendizaje suceden en todas partes!"
    },
    {
      "title": "Explora Bogotá: ¡Más Allá del Papel! 🌆",
      "imageUrl": "images/guatavita.jpeg",
      "icon": "fas fa-map-marked-alt",
      "content": "¿Quieres aprovechar el viaje para conocer la capital? ¡Claro que sí! Te daremos tips y quizás organicemos algunos paseos opcionales para descubrir los encantos de Bogotá. Explora la cultura, prueba la comida local y llévate recuerdos que van más allá del origami. ¡Una oportunidad para estirar las piernas y ver la ciudad entre pliegue y pliegue! *(Consulta la programación para más detalles)*."
    },
    {
      "title": "¡Rifas y Sorteos Sorpresa! 🎯🎁",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-gift",
      "content": "¡Mantente alerta y atento/a durante todo el evento! Organizaremos rifas y sorteos sorpresa en diferentes momentos. Podrías ganar libros de origami, papeles especiales, herramientas únicas y mucho más. La clave para no perderte nada: ¡estate pendiente a los anuncios y actividades! Participa en talleres, asiste a charlas y mantén los oídos bien abiertos. ¡La suerte sonríe a quienes están presentes y activos! No te quedes con las ganas de llevarte a casa un premio genial. 🍀✨"
    }
  ];

  selectedIndex: number = -1;
  isMobile: boolean = false;

  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private readonly SWIPE_THRESHOLD = 50;

  private isUserInteracting = false;

  constructor(private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.checkIfMobile();
    // autoselect the first activity on init
    if (this.activities.length > 0) {
      this.selectedIndex = 0;
    }
  }

  ngOnDestroy(): void {}

  @HostListener('window:resize')
  checkIfMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      return this.isMobile;
    }
    return false; // Por defecto, asumimos que no es móvil en el servidor
  }

  @HostListener('mouseenter')
  @HostListener('touchstart')
  onUserInteractionStart(): void {
    this.isUserInteracting = true;
  }

  @HostListener('mouseleave')
  onUserInteractionEnd(): void {
    this.isUserInteracting = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    // Ensure horizontal swipe is detected and vertical movement is ignored
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        this.showActivity(this.getPrevActivityIndex());
      } else {
        this.showActivity(this.getNextActivityIndex());
      }
    }
  }

  showActivity(index: number): void {
    if (index < 0 || index >= this.activities.length) return; // Prevent invalid indices

    this.selectedIndex = index;

    if (isPlatformBrowser(this.platformId)) {
      const contentArea = document.querySelector('.activity-content-area');
      if (contentArea) {
        contentArea.scrollTop = 0; // Reset scroll position for new activity
      }
    }
  }

  // Handle both click and touch events for navigation buttons
  navButtonClick(direction: 'next' | 'prev', event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const index = direction === 'next' ? this.getNextActivityIndex() : this.getPrevActivityIndex();
    console.log(`Navigating ${direction}, current index: ${this.selectedIndex}, next index: ${index}`); // Debugging log

    if (index !== -1) {
      this.showActivity(index); // Use showActivity to update the selectedIndex and handle UI updates
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.selectedIndex === -1) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const nextIndex = this.getNextActivityIndex();
      if (nextIndex !== -1) {
        this.showActivity(nextIndex);
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const prevIndex = this.getPrevActivityIndex();
      if (prevIndex !== -1) {
        this.showActivity(prevIndex);
      }
    }
  }

  getNextActivityIndex(): number {
    if (this.activities.length === 0) return -1; // Handle empty activities array
    return (this.selectedIndex + 1) % this.activities.length;
  }

  getPrevActivityIndex(): number {
    if (this.activities.length === 0) return -1; // Handle empty activities array
    return (this.selectedIndex - 1 + this.activities.length) % this.activities.length;
  }

  getSanitizedContent(content: string): SafeHtml {
    // Ensure links are properly formatted and clickable
    return this.sanitizer.bypassSecurityTrustHtml(
      content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')
    );
  }

  onTouchMove(event: TouchEvent): void {
    // Prevenir comportamiento de desplazamiento predeterminado al usar botones de navegación
    const target = event.target as HTMLElement;
    if (target.closest('.nav-btn')) {
      event.preventDefault();
    }
  }
  
  // Método específico para dispositivos iOS para garantizar la funcionalidad correcta de los botones
  @HostListener('click', ['$event'])
  handleGlobalClick(event: Event): void {
    const target = event.target as HTMLElement;
    const navBtn = target.closest('.nav-btn');
    
    if (navBtn) {
      // Para iOS, aseguramos que el clic se procese correctamente
      event.stopPropagation();
      
      if (navBtn.classList.contains('prev-btn')) {
        this.navButtonClick('prev', event);
      } else if (navBtn.classList.contains('next-btn')) {
        this.navButtonClick('next', event);
      }
    }
  }
}