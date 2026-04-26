import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// @ts-ignore
import Swal from 'sweetalert2';
import { EventsService } from '../../services/events.services';
import { AttendeesService } from '../../services/attendees.service';
import jsPDF from 'jspdf';

interface Instructor {
  id: number;
  name: string;
}

interface Workshop {
  id: number;
  name: string;
  instructor: Instructor;
  duration: string;
  level: string;
  public: string;
  image?: string;
  tickets: number;
}

interface Room {
  id: number;
  name: string;
}

interface EventData {
  event: {
    id: number;
    start_time: string;
    end_time: string;
    day: string;
  };
  workshop: Workshop;
  room: Room;
}

interface OrganizedWorkshop {
  time: string;
  name: string;
  room: string;
  instructor: string;
}

@Component({
  selector: 'app-public-attendees',
  standalone: true,
  templateUrl: './public-attendees.component.html',
  styleUrls: ['./public-attendees.component.css'],
  imports: [FormsModule, CommonModule],
})
export class PublicAttendeesComponent implements OnInit {
  participantNumber = '';
  email = '';
  submitted = false; // CAMBIAR: Cambiar a false para usar login real
  buttonsDisabled = false;
  selectedEvents: number[] = [];
  registering: { [id: number]: number } = {}; // id: segundos restantes
  registered: number[] = [];
  attendeeId = 0; // CAMBIAR: Inicializar en 0

  events: EventData[] = [];
  rooms: Room[] = [];
  selectedRoomId: string = '';
  selectedStartTime: string = '';
  selectedInstructorId: string = '';
  filteredEvents: EventData[] = [];
  noTickets = new Set<number>();
  filtersOpen = false;

  // NUEVO: Variables para el día
  currentDay: string = '';
  currentDaySpanish: string = '';

  // NUEVO: Variables para el horario
  showSchedule = false;
  organizedSchedule: { saturday: OrganizedWorkshop[]; sunday: OrganizedWorkshop[] } = {
    saturday: [],
    sunday: []
  };

  // NUEVO: Variables para la animación de bienvenida
  showWelcomeAnimation = false;
  welcomePhase1 = false;
  welcomePhase2 = false;
  animationCompleted = false;

  constructor(
    private eventsService: EventsService,
    private attendeesService: AttendeesService
  ) {}

  ngOnInit() {
    // Check if the user is already logged in
    const storedEmail = localStorage.getItem('email');
    const storedParticipantNumber = localStorage.getItem('participantNumber');
    const storedAttendeeId = localStorage.getItem('attendeeId');

    if (storedEmail && storedParticipantNumber && storedAttendeeId) {
      this.email = storedEmail;
      this.participantNumber = storedParticipantNumber;
      this.attendeeId = parseInt(storedAttendeeId, 10);
      this.submitted = true;

      // Load registered events for the attendee
      this.eventsService.getEventIdsByAttendee(this.attendeeId).subscribe({
        next: ids => {
          this.registered = ids; // Ensure registered events are loaded correctly
          this.loadEvents(); // Solo cargar eventos si ya hay sesión activa
        },
        error: () => {
          this.registered = []; // Reset registered events on error
          this.loadEvents();
        }
      });
    } else {
      // Usuario no logueado - NO cargar eventos hasta el login exitoso
      this.submitted = false;
      this.attendeeId = 0;
      // Asegurar que las listas estén vacías hasta el login
      this.events = [];
      this.filteredEvents = [];
      this.registered = [];
    }
  }

  // NUEVO: Iniciar la animación de bienvenida después del login exitoso
  private startWelcomeAnimation(): void {
    this.showWelcomeAnimation = true;
    
    // Fase 1: Logo y texto inicial (después de 500ms para el fade in)
    setTimeout(() => {
      this.welcomePhase1 = true;
    }, 500);

    // Fase 2: Título principal (después de 2.5 segundos)
    setTimeout(() => {
      this.welcomePhase1 = false;
      setTimeout(() => {
        this.welcomePhase2 = true;
      }, 300); // Pequeño delay para el fade
    }, 2500);

    // Finalizar animación y mostrar talleres (después de 5 segundos total)
    setTimeout(() => {
      this.welcomePhase2 = false;
      setTimeout(() => {
        this.showWelcomeAnimation = false;
        this.animationCompleted = true;
        this.submitted = true; // NUEVO: Mostrar talleres después de la animación
        // Marcar como mostrada en localStorage
        localStorage.setItem('welcomeAnimationShown', 'true');
      }, 500); // Tiempo para fade out
    }, 5000);
  }

  private loadEvents() {
    this.eventsService.getActiveEvents().subscribe({
      next: data => { this.setEvents(data); },
      error: (err) => {
        if (err?.status === 403 || err?.logout === true) {
          this.logout();
        } else {
          this.events = [];
        }
      }
    });
  }

  private setEvents(data: EventData[]) {
    this.events = data;
    this.rooms = Array.from(new Map(data.map(e => [e.room.id, e.room])).values()).sort((a, b) => a.name.localeCompare(b.name));
    // NUEVO: Determinar el día actual (sábado o domingo)
    this.setCurrentDay();
    this.filterEvents();
  }

  // NUEVO: Determina el día de los eventos (sábado o domingo)
  private setCurrentDay() {
    const days = Array.from(new Set(this.events.map(e => e.event.day)));
    // Si hay más de un día, prioriza sábado sobre domingo, o toma el primero
    if (days.includes('Saturday')) {
      this.currentDay = 'Saturday';
      this.currentDaySpanish = 'Sábado';
    } else if (days.includes('Sunday')) {
      this.currentDay = 'Sunday';
      this.currentDaySpanish = 'Domingo';
    } else if (days.length > 0) {
      this.currentDay = days[0];
      this.currentDaySpanish = this.translateDay(days[0]);
    } else {
      this.currentDay = '';
      this.currentDaySpanish = '';
    }
  }

  onRoomChange() { this.filterEvents(); }

  clearFilters(): void {
    // Restablecer los valores de los filtros
    this.selectedRoomId = '';
    this.selectedStartTime = '';
    this.selectedInstructorId = '';
    
    // Actualizar la lista de eventos filtrados
    this.filterEvents();
  }

  filterEvents(): void {
    // Filtrar eventos según los valores seleccionados en los filtros
    this.filteredEvents = this.events.filter(event => {
      const matchesRoom = !this.selectedRoomId || event.room.id === +this.selectedRoomId;
      
      // CORRECCIÓN: Comparar solo hora y minutos (primeros 5 caracteres)
      const matchesStartTime = !this.selectedStartTime || 
        event.event.start_time.slice(0, 5) === this.selectedStartTime;
      
      const matchesInstructor = !this.selectedInstructorId || 
        event.workshop.instructor.id === +this.selectedInstructorId;

      return matchesRoom && matchesStartTime && matchesInstructor;
    }).sort((a, b) => {
      // NUEVO: Ordenar primero por hora de inicio, luego por ID de sala
      const timeA = this.timeToMinutes(a.event.start_time);
      const timeB = this.timeToMinutes(b.event.start_time);
      
      if (timeA !== timeB) {
        return timeA - timeB; // Ordenar por hora primero
      }
      
      // Si la hora es la misma, ordenar por ID de sala
      return a.room.id - b.room.id;
    });
  }

  onRegister(item: EventData) {
    const eventId = item.event.id;
    if (
      this.registered.includes(eventId) ||
      this.hasTimeConflict(item) ||
      this.registering[eventId] !== undefined ||
      this.noTickets.has(eventId) ||
      this.hasTimeConflictWithSelected(item)
    ) return;

    this.buttonsDisabled = true;
    this.selectedEvents.push(eventId);
    this.registering[eventId] = 3; // Countdown inicial para throttling
    let phase: 'throttling' | 'registering' = 'throttling';

    const interval = setInterval(() => {
      this.registering[eventId]--;
      
      if (this.registering[eventId] <= 0) {
        if (phase === 'throttling') {
          // Fase 1: Throttling completado, ahora hacer la llamada API
          phase = 'registering';
          this.registering[eventId] = 3; // Reiniciar countdown para feedback visual
          
          this.eventsService.saveEventAttendee(this.attendeeId, eventId).subscribe({
            next: (saveResult: any) => {
              this.handleRegistrationSuccess(eventId, saveResult, item, interval);
            },
            error: (err) => {
              this.handleRegistrationError(eventId, err, item, interval);
            }
          });
        } else {
          // Fase 2: Registro completado, limpiar
          this.finalizeRegistration(eventId, interval);
        }
      }
    }, 1000);
  }

  private handleRegistrationSuccess(eventId: number, saveResult: any, item: EventData, interval: any) {
    if (saveResult?.noTickets) {
      this.noTickets.add(eventId);
      this.updateEventTickets(eventId, 0);
      this.cleanupRegistration(eventId, interval);
      Swal.fire({
        icon: 'error',
        title: '¡Lo sentimos!',
        text: 'Este taller ya no tiene cupos disponibles, intenta inscribirte en otro taller.',
        confirmButtonColor: '#ffb74d', /* Naranja pastel */
        background: '#232323',
        color: '#fff'
      });
      this.refreshEventsCache();
      return;
    }

    this.registered.push(eventId);
    this.refreshEventsCache();
  }

  private handleRegistrationError(eventId: number, err: any, item: EventData, interval: any) {
    this.cleanupRegistration(eventId, interval);
    
    if (err?.status === 422) {
      this.noTickets.add(eventId);
      this.updateEventTickets(eventId, 0);
      Swal.fire({
        icon: 'error',
        title: 'Sin cupos',
        text: 'Este taller ya no tiene cupos disponibles.',
        confirmButtonColor: '#ffb74d', /* Naranja pastel */
        background: '#232323',
        color: '#fff'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo completar la inscripción. Intenta nuevamente.',
        confirmButtonColor: '#ffb74d', /* Naranja pastel */
        background: '#232323',
        color: '#fff'
      });
    }
    this.refreshEventsCache();
  }

  private finalizeRegistration(eventId: number, interval: any) {
    const item = this.events.find(e => e.event.id === eventId);
    if (item && this.registered.includes(eventId)) {
      this.showSuccessMessage(item);
    }
    this.cleanupRegistration(eventId, interval);
  }

  private cleanupRegistration(eventId: number, interval: any) {
    clearInterval(interval);
    delete this.registering[eventId];
    const selectedIndex = this.selectedEvents.indexOf(eventId);
    if (selectedIndex > -1) this.selectedEvents.splice(selectedIndex, 1);
    this.buttonsDisabled = false;
  }

  private updateEventTickets(eventId: number, tickets: number) {
    const event = this.events.find(e => e.event.id === eventId);
    if (event) event.workshop.tickets = tickets;
  }

  private refreshEventsCache() {
    this.eventsService.getActiveEvents().subscribe({
      next: data => {
        this.setEvents(data);
      }
    });
  }

  private showSuccessMessage(item: any) {
    Swal.fire({
      icon: 'success',
      title: 'Inscripción',
      html: `
        <div>
          Te has inscrito al evento "<b>${item.workshop.name}</b>".
          <br><br>
          <span style="color:#90caf9;font-weight:bold;">Debes dirigirte a la sala</span>
          <span style="color:#a5d6a7;font-weight:bold;">${item.room.name}</span>
          <span style="color:#90caf9;font-weight:bold;">a las</span>
          <span style="color:#f8bbd9;font-weight:bold;">${this.formatTime(item.event.start_time)}</span>
          <br>
          <span style="color:#90caf9;font-weight:bold;">Con:</span>
          <span style="color:#d1c4e9;font-weight:bold;">${item.workshop.instructor.name}</span>
          <br>
          <span style="color:#90caf9;font-weight:bold;">Duración:</span>
          <span style="color:#fff9c4;font-weight:bold;">${item.workshop.duration}</span>
          <br>
          <span style="color:#90caf9;font-weight:bold;">Día:</span>
          <span style="color:#c8e6c9;font-weight:bold;">${this.translateDay(item.event.day)}</span>
          <br><br>
          <span style="color:#888;">O pregunta a los integrantes del grupo de apoyo</span>
        </div>
      `,
      confirmButtonColor: '#ffb74d', /* Naranja pastel */
      background: '#232323',
      color: '#fff'
    });
  }

  // Traducción de días de la semana
  translateDay(day: string): string {
    const days: { [key: string]: string } = {
      'Monday': 'Lunes',
      'Tuesday': 'Martes',
      'Wednesday': 'Miércoles',
      'Thursday': 'Jueves',
      'Friday': 'Viernes',
      'Saturday': 'Sábado',
      'Sunday': 'Domingo'
    };
    return days[day] || day;
  }

  // Formatear hora a formato 12 horas (am/pm)
  formatTime(time: string): string {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${minute} ${ampm}`;
  }

  // Traducir código de nivel
  translateLevel(level: string): string {
    const levels: { [key: string]: string } = {
      'A': 'Avanzado',
      'I': 'Intermedio', 
      'P': 'Principiante'
    };
    return levels[level] || level;
  }

  // Traducir código de público
  translatePublic(publicCode: string): string {
    const publics: { [key: string]: string } = {
      'A': 'Adultos',
      'N': 'Niños'
    };
    return publics[publicCode] || publicCode;
  }

  // Verifica conflicto con eventos seleccionados en la sesión actual
  private hasTimeConflictWithSelected(item: EventData): boolean {
    // Si no hay talleres seleccionados, no hay conflicto
    if (this.selectedEvents.length === 0) return false;

    return this.selectedEvents.some(selectedId => {
      if (selectedId === item.event.id) return false;
      
      const selectedEvent = this.events.find(e => e.event.id === selectedId);
      if (!selectedEvent) return false;
      
      // CORRECCIÓN: Solo verificar conflicto si es el mismo día
      return this.timeOverlap(item, selectedEvent);
    });
  }

  private timeOverlap(a: EventData, b: EventData): boolean {
    // CORRECCIÓN: Solo comparar si es el mismo día
    if (a.event.day !== b.event.day) return false;
    
    const aStart = this.timeToMinutes(a.event.start_time);
    const aEnd = this.timeToMinutes(a.event.end_time);
    const bStart = this.timeToMinutes(b.event.start_time);
    const bEnd = this.timeToMinutes(b.event.end_time);
    
    // Verificar solapamiento: A empieza antes de que B termine Y A termina después de que B empiece
    return aStart < bEnd && aEnd > bStart;
  }

  hasTimeConflict(item: EventData): boolean {
    return this.registered.some(registeredId => {
      const registeredEvent = this.events.find(e => e.event.id === registeredId);
      if (!registeredEvent) return false;
      
      // CORRECCIÓN: Solo comparar si es el mismo día
      return this.timeOverlap(item, registeredEvent);
    });
  }

  // Convertir tiempo HH:MM:SS a minutos, manejando formatos con y sin segundos
  private timeToMinutes(time: string): number {
    if (!time) return 0;
    
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    
    return hours * 60 + minutes;
  }

  // Verificar si un evento puede ser registrado
  canRegister(item: EventData): boolean {
    const eventId = item.event.id;
    return !this.buttonsDisabled &&
      this.registering[eventId] === undefined && // No está en proceso de registro
      !this.registered.includes(eventId) && // No está ya registrado
      !this.hasTimeConflict(item) && // No tiene conflicto con eventos ya registrados
      !this.hasTimeConflictWithSelected(item) && // No tiene conflicto con selecciones actuales
      item.workshop.tickets > 0 && // Tiene cupos disponibles
      !this.noTickets.has(eventId) && // No está marcado como sin cupos
      Object.keys(this.registering).length === 0; // NUEVO: No hay ninguna operación de registro en curso
  }

  // NUEVO: Verificar si se puede eliminar una inscripción
  canUnregister(item: EventData): boolean {
    return !this.buttonsDisabled && this.registered.includes(item.event.id);
  }

  // NUEVO: Método para verificar si hay operaciones en curso
  hasOperationsInProgress(): boolean {
    return this.buttonsDisabled || Object.keys(this.registering).length > 0;
  }

  getButtonText(item: EventData): string {
    const eventId = item.event.id;
    
    // CORRECCIÓN: Orden de prioridad para mostrar estados
    if (this.registered.includes(eventId)) return '✓ Inscrito';
    
    if (item.workshop.tickets <= 0 || this.noTickets.has(eventId)) return 'Sin cupos';
    
    if (this.registering[eventId] !== undefined) {
      // CORRECCIÓN: Determinar fase basado en si el evento ya fue registrado exitosamente
      if (this.selectedEvents.includes(eventId) && !this.registered.includes(eventId)) {
        return `Preparando... ${this.registering[eventId]}`;
      }
      if (this.registered.includes(eventId)) {
        return `Confirmando... ${this.registering[eventId]}`;
      }
      return `Inscribiendo... ${this.registering[eventId]}`;
    }
    
    // CORRECCIÓN: Verificar conflictos de horario solo del mismo día
    if (this.hasTimeConflict(item)) {
      const conflictingEvent = this.events.find(e => 
        this.registered.includes(e.event.id) && 
        this.timeOverlap(item, e)
      );
      return conflictingEvent ? 
        `Ya tienes "${conflictingEvent.workshop.name}" a esa hora` : 
        'Ya tienes otro taller a esa hora';
    }
    
    if (this.hasTimeConflictWithSelected(item)) {
      return 'Ya seleccionaste otro taller a esa hora';
    }
    
    return 'Inscribirse';
  }

  getButtonClasses(item: EventData): any {
    const eventId = item.event.id;
    const isRegistering = this.registering[eventId] !== undefined;
    const isRegistered = this.registered.includes(eventId);
    const hasTimeConflict = this.hasTimeConflict(item) || this.hasTimeConflictWithSelected(item);
    const noTicketsAvailable = item.workshop.tickets <= 0 || this.noTickets.has(eventId);
    
    return {
      'primary': !isRegistering && !isRegistered && !hasTimeConflict && !noTicketsAvailable,
      'registering': isRegistering && !isRegistered,
      'registered': isRegistered,
      'unavailable': hasTimeConflict && !isRegistered && !isRegistering,
      'no-tickets': noTicketsAvailable && !isRegistered && !isRegistering
    };
  }

  trackByEventId(index: number, item: EventData): number { return item.event.id; }

  getUniqueStartTimes(): string[] {
    // CORRECCIÓN: Asegurar que devolvemos solo hora:minutos y eliminar duplicados
    const times = Array.from(new Set(
      this.events.map(e => e.event.start_time.slice(0, 5))
    )).sort();
    
    return times;
  }

  getUniqueInstructors(): { id: number, name: string }[] {
    const map = new Map<number, string>();
    this.events.forEach(e => {
      if (e.workshop.instructor) {
        map.set(e.workshop.instructor.id, e.workshop.instructor.name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }

  onUnregister(item: EventData) {
    const id = item.event.id;
    
    // NUEVO: Prevenir múltiples operaciones simultáneas
    if (this.buttonsDisabled || !this.registered.includes(id)) return;

    Swal.fire({
      icon: 'warning',
      title: 'Eliminar inscripción',
      text: 'Si eliminas este taller, podrías perder el cupo ya que otros asistentes están seleccionando talleres.',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#1976d2',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#232323',
      color: '#fff'
    }).then(result => {
      if (result.isConfirmed) {
        // NUEVO: Bloquear todos los botones durante la operación
        this.buttonsDisabled = true;
        
        this.eventsService.removeEventAttendee(this.attendeeId, id).subscribe({
          next: () => {
            this.registered = this.registered.filter(registeredId => registeredId !== id);
            this.refreshEventsCache();
            // NUEVO: Reactivar botones después de la operación exitosa
            this.buttonsDisabled = false;
            Swal.fire({
              icon: 'success',
              title: 'Inscripción eliminada',
              text: `Has eliminado tu inscripción al taller "${item.workshop.name}".`,
              confirmButtonColor: '#1976d2',
              background: '#232323',
              color: '#fff'
            });
          },
          error: () => {
            // NUEVO: Reactivar botones después del error
            this.buttonsDisabled = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la inscripción. Intenta nuevamente.',
              confirmButtonColor: '#1976d2',
              background: '#232323',
              color: '#fff'
            });
          }
        });
      }
    });
  }

  // NUEVO: Método para iniciar sesión
  onLogin(event: Event) {
    event.preventDefault();
    
    // NUEVO: Activar estado de carga
    this.buttonsDisabled = true;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.buttonsDisabled = false; // Reactivar botón
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor, ingresa el email que usaste para registrarte al evento.',
        confirmButtonColor: '#ffb74d',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    if (!this.participantNumber.trim()) {
      this.buttonsDisabled = false; // Reactivar botón
      Swal.fire({
        icon: 'error',
        title: 'Código requerido',
        text: 'Ingresa tu código de participante de 6 dígitos.',
        confirmButtonColor: '#ffb74d',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    // NUEVO: Usar el servicio de verificación de código
    this.attendeesService.verifyAttendeeCode(this.email.trim(), this.participantNumber.trim()).subscribe({
      next: (response) => {
        this.buttonsDisabled = false; // Reactivar botón
        
        if (response && response.valid== true) {
          // Login exitoso - configurar datos del asistente
          this.attendeeId = response.id;
          // MODIFICADO: No establecer submitted = true inmediatamente

          // Persist login state
          localStorage.setItem('email', this.email);
          localStorage.setItem('participantNumber', this.participantNumber);
          localStorage.setItem('attendeeId', this.attendeeId.toString());

          // Cargar eventos registrados del asistente
          this.eventsService.getEventIdsByAttendee(this.attendeeId).subscribe({
            next: ids => {
              this.registered = ids;
              this.loadEvents(); // Load events after successful login
            },
            error: () => {
              this.registered = [];
              this.loadEvents();
            }
          });

          // NUEVO: Verificar si es la primera vez que hace login
          const welcomeShown = localStorage.getItem('welcomeAnimationShown');
          
          if (!welcomeShown) {
            // Primera vez - mostrar animación de bienvenida
            this.startWelcomeAnimation();
          } else {
            // Ya vio la animación antes - ir directamente a talleres
            this.submitted = true;
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido de nuevo!',
              text: `¡Hola ${response.name || 'participante'}! Ya puedes inscribirte en los talleres disponibles.`,
              confirmButtonColor: '#ffb74d',
              background: '#232323',
              color: '#fff'
            });
          }
        } else {
          // Código no encontrado o respuesta inválida
          Swal.fire({
            icon: 'error',
            title: 'oops!',
            text: response.message,
            confirmButtonColor: '#ffb74d',
            background: '#232323',
            color: '#fff'
          });
        }
      },
      error: (error) => {
        this.buttonsDisabled = false; // Reactivar botón
        
        // Error en la verificación
        let errorMessage = 'Hubo un problema al verificar tus datos.';
        
        if (error.status === 404) {
          errorMessage = 'No encontramos una cuenta con estos datos. Verifica tu email y código de participante.';
        } else if (error.status === 0) {
          errorMessage = 'Sin conexión a internet. Verifica tu conexión e intenta nuevamente.';
        } else if (error.status === 422) {
          errorMessage = 'Los datos ingresados no tienen el formato correcto.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error de acceso',
          text: errorMessage,
          confirmButtonColor: '#ffb74d',
          background: '#232323',
          color: '#fff'
        });
      }
    });
  }

  logout() {
    this.submitted = false;
    this.attendeeId = 0; // Reset attendeeId
    this.events = [];
    this.filteredEvents = [];
    this.registered = [];
    this.selectedRoomId = '';
    this.selectedStartTime = '';
    this.selectedInstructorId = '';
    
    // NUEVO: Reset animation states
    this.showWelcomeAnimation = false;
    this.welcomePhase1 = false;
    this.welcomePhase2 = false;
    this.animationCompleted = false;

    // Clear login state
    localStorage.removeItem('email');
    localStorage.removeItem('participantNumber');
    localStorage.removeItem('attendeeId');
    // NUEVO: También limpiar el flag de animación para que se muestre en el próximo login
    localStorage.removeItem('welcomeAnimationShown');

    Swal.fire({
      icon: 'success',
      title: 'Sesión finalizada',
      text: 'Has cerrado sesión correctamente. ¡Nos vemos en los talleres!',
      confirmButtonColor: '#ffb74d',
      background: '#232323',
      color: '#fff'
    });
  }

  showScheduleModal(): void {
    if (this.registered.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin talleres aún',
        text: 'Aún no te has inscrito en ningún taller. ¡Explora los talleres disponibles y elige tus favoritos!',
        confirmButtonColor: '#ffb74d',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    this.organizeSchedule();
    this.showSchedule = !this.showSchedule; // Toggle modal visibility
  }

  // NUEVO: Cerrar modal de filtros al hacer click fuera
  closeFiltersModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.filtersOpen = false;
    }
  }

  // NUEVO: Cerrar modal de horario al hacer click fuera
  closeScheduleModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.showSchedule = false;
    }
  }

  // CORRECCIÓN: Mejorar la organización del horario por días
  private organizeSchedule(): void {
    const saturday: OrganizedWorkshop[] = [];
    const sunday: OrganizedWorkshop[] = [];

    this.registered.forEach(id => {
      const event = this.events.find(e => e.event.id === id);
      if (event) {
        const workshopDetails: OrganizedWorkshop = {
          time: `${this.formatTime(event.event.start_time)} - ${this.formatTime(event.event.end_time)}`,
          name: event.workshop.name,
          room: event.room.name,
          instructor: event.workshop.instructor.name
        };

        // CORRECCIÓN: Usar comparación exacta de días
        if (event.event.day === 'Saturday') {
          saturday.push(workshopDetails);
        } else if (event.event.day === 'Sunday') {
          sunday.push(workshopDetails);
        }
      }
    });

    // CORRECCIÓN: Ordenar por hora de inicio usando timeToMinutes para consistencia
    const sortByTime = (a: OrganizedWorkshop, b: OrganizedWorkshop) => {
      const timeA = a.time.split(' - ')[0];
      const timeB = b.time.split(' - ')[0];
      return this.parseTimeForSorting(timeA) - this.parseTimeForSorting(timeB);
    };

    saturday.sort(sortByTime);
    sunday.sort(sortByTime);

    this.organizedSchedule = { saturday, sunday };
  }

  // CORRECCIÓN: Función auxiliar para convertir tiempo en formato 12h a minutos para ordenamiento
  private parseTimeForSorting(time12h: string): number {
    if (!time12h) return 0;
    
    const [time, period] = time12h.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let adjustedHours = hours;
    if (period === 'pm' && hours !== 12) {
      adjustedHours += 12;
    } else if (period === 'am' && hours === 12) {
      adjustedHours = 0;
    }
    
    return adjustedHours * 60 + minutes;
  }

  // NUEVO: Eliminar taller desde el modal de horario
  removeWorkshopFromSchedule(workshop: OrganizedWorkshop): void {
    // Buscar el evento correspondiente por nombre del taller
    const event = this.events.find(e => 
      e.workshop.name === workshop.name && 
      e.room.name === workshop.room &&
      e.workshop.instructor.name === workshop.instructor
    );

    if (!event) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo encontrar el taller para eliminar.',
        confirmButtonColor: '#1976d2',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    // NUEVO: Prevenir múltiples operaciones simultáneas
    if (this.buttonsDisabled || !this.registered.includes(event.event.id)) return;

    Swal.fire({
      icon: 'warning',
      title: 'Eliminar inscripción',
      text: 'Si eliminas este taller, podrías perder el cupo ya que otros asistentes están seleccionando talleres.',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#1976d2',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#232323',
      color: '#fff'
    }).then(result => {
      if (result.isConfirmed) {
        // NUEVO: Bloquear todos los botones durante la operación
        this.buttonsDisabled = true;
        
        this.eventsService.removeEventAttendee(this.attendeeId, event.event.id).subscribe({
          next: () => {
            this.registered = this.registered.filter(registeredId => registeredId !== event.event.id);
            this.refreshEventsCache();
            // NUEVO: Reactivar botones después de la operación exitosa
            this.buttonsDisabled = false;
            
            // NUEVO: Cerrar el modal después de eliminar exitosamente
            this.showSchedule = false;
            
            Swal.fire({
              icon: 'success',
              title: 'Inscripción eliminada',
              text: `Has eliminado tu inscripción al taller "${event.workshop.name}".`,
              confirmButtonColor: '#1976d2',
              background: '#232323',
              color: '#fff'
            });
          },
          error: () => {
            // NUEVO: Reactivar botones después del error
            this.buttonsDisabled = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la inscripción. Intenta nuevamente.',
              confirmButtonColor: '#1976d2',
              background: '#232323',
              color: '#fff'
            });
          }
        });
      }
    });
  }

  // Importa jsPDF
  downloadScheduleAsPDF(): void {
    if (this.registered.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin talleres para descargar',
        text: 'Necesitas inscribirte en al menos un taller para poder descargar tu horario.',
        confirmButtonColor: '#ffb74d',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    this.organizeSchedule();
    
    const doc = new jsPDF();
    
    // Configurar fuente y título
    doc.setFontSize(20);
    doc.text('Mi Horario - Origami Bogotá 2026', 20, 20);
    
    doc.setFontSize(12);
    let yPosition = 40;
    
    // Agregar talleres del sábado
    if (this.organizedSchedule.saturday.length > 0) {
      doc.setFontSize(16);
      doc.text('Sábado', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      this.organizedSchedule.saturday.forEach((workshop) => {
        doc.text(`${workshop.time}`, 20, yPosition);
        doc.text(`Taller: ${workshop.name}`, 20, yPosition + 10);
        doc.text(`Sala: ${workshop.room}`, 20, yPosition + 20);
        doc.text(`Instructor: ${workshop.instructor}`, 20, yPosition + 30);
        yPosition += 45;
      });
    }
    
    // Agregar talleres del domingo
    if (this.organizedSchedule.sunday.length > 0) {
      doc.setFontSize(16);
      doc.text('Domingo', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      this.organizedSchedule.sunday.forEach((workshop) => {
        doc.text(`${workshop.time}`, 20, yPosition);
        doc.text(`Taller: ${workshop.name}`, 20, yPosition + 10);
        doc.text(`Sala: ${workshop.room}`, 20, yPosition + 20);
        doc.text(`Instructor: ${workshop.instructor}`, 20, yPosition + 30);
        yPosition += 45;
      });
    }
    
    // Descargar el PDF
    doc.save('horario-origami-bogota-2026.pdf');
  }

  // NUEVO: Agrupar eventos por hora para el timeline
  getEventsGroupedByTime(): { time: string; events: EventData[] }[] {
    const grouped = new Map<string, EventData[]>();
    
    this.filteredEvents.forEach(event => {
      const time = this.formatTime(event.event.start_time);
      if (!grouped.has(time)) {
        grouped.set(time, []);
      }
      grouped.get(time)!.push(event);
    });
    
    // Convertir a array y ordenar por hora
    return Array.from(grouped.entries())
      .map(([time, events]) => ({
        time,
        events: events.sort((a, b) => a.room.id - b.room.id) // Ordenar por sala dentro de cada hora
      }))
      .sort((a, b) => {
        const timeA = this.parseTimeForSorting(a.time);
        const timeB = this.parseTimeForSorting(b.time);
        return timeA - timeB;
      });
  }

  // NUEVO: TrackBy function para optimizar el rendering
  trackByTime(index: number, item: { time: string; events: EventData[] }): string {
    return item.time;
  }


  
}
