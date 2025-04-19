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
      "title": "Deja tu Huella: Publica tus Diagramas 📝",
      "imageUrl": "images/457442674_10233497359799729_1347389003187592882_n.jpg",
      "icon": "fas fa-book",
      "content": "¿Creaste un modelo de origami increíble? ¡Es tu oportunidad de verlo publicado! Comparte tus diagramas originales en nuestro libro \"Páginas De Origami 2025\". Llegarás a origamistas de todo el mundo y tu creación será parte del libro oficial del evento. 🌍\n¿Cómo participar? Fácil: descarga las Bases de la convocatoria ([español](<a style='color: #be7e62' href='https://origamibogota.com/descargas/basesdiagramasES.docx'>LINK_BASES_ES</a>) o [inglés](<a style='color: #be7e62' href='https://origamibogota.com/descargas/basesdiagramasEN.docx'>LINK_BASES_EN</a>)), prepara tus diagramas y envíalos antes del 15 de mayo de 2025 a Camilo Torres: paginasdeorigami@gmail.com. ¡Anímate a compartir tu arte!"
    },
    {
      "title": "Intercambio de Tarjetas: ¡Colecciónalas! 🃏",
      "imageUrl": "images/AG-mariposas-1.png",
      "icon": "fas fa-exchange-alt",
      "content": "Dale un giro creativo a tus tarjetas de presentación. Diseña la tuya en formato origami (plana o con un toque plegable), agrega tus datos y prepárate para compartir arte en cada encuentro. Es como intercambiar cromos, pero con estilo y personalidad. Al final, te llevarás una colección única de mini-obras de arte... ¡y nuevos contactos increíbles! Descarga las <a style='color: #be7e62' href='https://origamibogota.com/descargas/ATC.docx\'>bases de la convocatoria</a> y empieza a plegar conexiones."
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
      "content": "¿Eres nuevo/a en el mundo del origami o ya eres un/a crack plegando? ¡No importa! Nuestros talleres se dividen por niveles (Principiante, Intermedio, Experto) para que disfrutes aprendiendo figuras a tu ritmo. Lo mejor: muchos profes enseñan modelos creados por ellos mismos. ¡Son oportunidades únicas para aprender figuras que no encontrarás en otro lugar!"
    },
    {
      "title": "Exposición: ¡Muestra tu Arte al Mundo! 🤩",
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
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
      "imageUrl": "images/cropped-AP-2-qep957ie0pzbkwpdzf4c2r01boqxpvvlttrkjq3bvs.png",
      "icon": "fas fa-map-marked-alt",
      "content": "¿Quieres aprovechar el viaje para conocer la capital? ¡Claro que sí! Te daremos tips y quizás organicemos algunos paseos opcionales para descubrir los encantos de Bogotá. Explora la cultura, prueba la comida local y llévate recuerdos que van más allá del origami. ¡Una oportunidad para estirar las piernas y ver la ciudad entre pliegue y pliegue! *(Consulta la programación para más detalles)*."
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

  showActivity(index: number): void {
    if (index < 0 || index >= this.activities.length) return; // Prevent invalid indices

    this.selectedIndex = index;

    if (isPlatformBrowser(this.platformId)) {
      const contentArea = document.querySelector('.activity-content-area');
      if (contentArea) {
        contentArea.scrollTop = 0;
      }
    }
  }

  // Handle both click and touch events for navigation buttons
  navButtonClick(direction: 'next' | 'prev', event?: Event): void {
    if (event) {
      // Prevent any default behaviors
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Use setTimeout to break event chain that might be causing issues on mobile
    setTimeout(() => {
      const index = direction === 'next' ? this.getNextActivityIndex() : this.getPrevActivityIndex();
      if (index !== -1) {
        this.selectedIndex = index;
        
        if (isPlatformBrowser(this.platformId)) {
          try {
            const contentArea = document.querySelector('.activity-content-area');
            if (contentArea) {
              contentArea.scrollTop = 0;
            }
          } catch (error) {
            console.error('Error accessing DOM:', error);
          }
        }
      }
    }, 10);
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
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  onTouchStart(event: TouchEvent): void {
    // Add logic here if needed, or leave it empty if it's just a placeholder
    console.log('Touch start event:', event);
  }

  onTouchMove(event: TouchEvent): void {
    // Lógica para manejar el evento touchmove
    console.log('Touch move event:', event);
  }
}