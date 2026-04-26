import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// @ts-ignore
import Swal from 'sweetalert2';
import { EventsService } from '../services/events.services';

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
  submitted = true; // Siempre true para desarrollo
  buttonsDisabled = false;
  selectedEvents: number[] = [];
  registering: { [id: number]: number } = {}; // id: segundos restantes
  registered: number[] = [];
  attendeeId = 1; // Simulación, reemplaza por el id real del asistente

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

  constructor(private eventsService: EventsService) {}

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
          this.loadEvents(); // Load events if the user is logged in
        },
        error: () => {
          this.registered = []; // Reset registered events on error
          this.loadEvents();
        }
      });
    } else {
      this.submitted = false;
      this.attendeeId = 0;
    }
  }

  private loadEvents() {
    // Eliminar uso de localStorage, siempre obtener desde el servicio
    this.eventsService.getActiveEvents().subscribe({
      next: data => { this.setEvents(data); },
      error: () => this.events = []
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
      const matchesStartTime = !this.selectedStartTime || event.event.start_time === this.selectedStartTime;
      const matchesInstructor = !this.selectedInstructorId || event.workshop.instructor.id === +this.selectedInstructorId;

      return matchesRoom && matchesStartTime && matchesInstructor;
    });
  }

  onRegister(item: EventData) {
    const id = item.event.id;
    if (
      this.registered.includes(id) || // Check if already registered
      this.hasTimeConflict(item) || // Check for time conflicts
      this.registering[id] || // Check if currently registering
      this.noTickets.has(id) // Check if no tickets are available
    ) return;

    this.buttonsDisabled = true;
    this.selectedEvents.push(id);
    this.registering[id] = 3;
    let phase: 'pre' | 'post' = 'pre';

    const interval = setInterval(() => {
      this.registering[id]--;
      if (this.registering[id] <= 0) {
        if (phase === 'pre') {
          this.eventsService.saveEventAttendee(this.attendeeId, id).subscribe({
            next: (saveResult: any) => {
              if (saveResult && saveResult.noTickets) {
                this.noTickets.add(id);
                this.updateEventTickets(id, 0);
                clearInterval(interval);
                delete this.registering[id];
                this.buttonsDisabled = false;
                Swal.fire({
                  icon: 'error',
                  title: '¡Lo sentimos!',
                  text: 'Este taller ya no tiene cupos disponibles, intenta inscribirte en otro taller.',
                  confirmButtonColor: '#1976d2',
                  background: '#232323',
                  color: '#fff'
                });
                return;
              }
              this.registered.push(id); // Correctly update registered array
              this.registering[id] = 3;
              phase = 'post';
              this.refreshEventsCache();
            },
            error: err => {
              if (err?.status === 422) {
                this.noTickets.add(id);
                this.updateEventTickets(id, 0);
                Swal.fire({
                  icon: 'error',
                  title: 'Sin cupos',
                  text: 'Este taller ya no tiene cupos disponibles.',
                  confirmButtonColor: '#1976d2',
                  background: '#232323',
                  color: '#fff'
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se pudo completar la inscripción. Intenta nuevamente.',
                  confirmButtonColor: '#1976d2',
                  background: '#232323',
                  color: '#fff'
                });
              }
              const idx = this.selectedEvents.indexOf(id);
              if (idx > -1) this.selectedEvents.splice(idx, 1);
              clearInterval(interval);
              delete this.registering[id];
              this.buttonsDisabled = false;
            }
          });
        } else {
          clearInterval(interval);
          delete this.registering[id];
          this.buttonsDisabled = false;
          this.showSuccessMessage(item);
        }
      }
    }, 1000);
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
          <span style="color:#1976d2;font-weight:bold;">Debes dirigirte a la sala</span>
          <span style="color:#43a047;font-weight:bold;">${item.room.name}</span>
          <span style="color:#1976d2;font-weight:bold;">a las</span>
          <span style="color:#d32f2f;font-weight:bold;">${this.formatTime(item.event.start_time)}</span>
          <br>
          <span style="color:#1976d2;font-weight:bold;">Con:</span>
          <span style="color:#ff9800;font-weight:bold;">${item.workshop.instructor.name}</span>
          <br>
          <span style="color:#1976d2;font-weight:bold;">Duración:</span>
          <span style="color:#d32f2f;font-weight:bold;">${item.workshop.duration}</span>
          <br>
          <span style="color:#1976d2;font-weight:bold;">Día:</span>
          <span style="color:#d32f2f;font-weight:bold;">${this.translateDay(item.event.day)}</span>
          <br><br>
          <span style="color:#888;">O pregunta a los integrantes del grupo de apoyo</span>
        </div>
      `,
      confirmButtonColor: '#1976d2',
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

    return this.selectedEvents.some(id => {
      if (id === item.event.id) return false;
      const sel = this.events.find(e => e.event.id === id);
      return sel ? this.timeOverlap(item, sel) : false;
    });
  }

  private timeOverlap(a: EventData, b: EventData): boolean {
    // Solo comparar si es el mismo día
    if (a.event.day !== b.event.day) return false;
    const [aStart, aEnd] = [this.timeToMinutes(a.event.start_time), this.timeToMinutes(a.event.end_time)];
    const [bStart, bEnd] = [this.timeToMinutes(b.event.start_time), this.timeToMinutes(b.event.end_time)];
    return aStart < bEnd && aEnd > bStart;
  }

  hasTimeConflict(item: EventData): boolean {
    return this.registered.some(registeredId => {
      const registeredEvent = this.events.find(e => e.event.id === registeredId);
      if (!registeredEvent) return false;
      // Solo comparar si es el mismo día
      return this.timeOverlap(item, registeredEvent);
    });
  }

  // Convertir tiempo HH:MM:SS a minutos para facilitar comparaciones
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Verificar si un evento tiene conflicto de horario con eventos ya registrados
  canRegister(item: EventData): boolean {
    const eventId = item.event.id;
    return !this.buttonsDisabled &&
      !this.registering[eventId] &&
      !this.registered.includes(eventId) &&
      !this.hasTimeConflict(item) &&
      !this.hasTimeConflictWithSelected(item) &&
      item.workshop.tickets > 0 &&
      !this.noTickets.has(eventId);
  }

  getButtonText(item: EventData): string {
    const eventId = item.event.id;
    if (this.registered.includes(eventId)) return '✓ Inscrito';
    if (item.workshop.tickets <= 0 || this.noTickets.has(eventId)) return 'Sin cupos';
    if (this.registering[eventId]) {
      if (this.selectedEvents.includes(eventId) && !this.registered.includes(eventId)) return `Preparando... ${this.registering[eventId]}`;
      if (this.selectedEvents.includes(eventId) && this.registered.includes(eventId)) return `Inscribiendo... ${this.registering[eventId]}`;
      return `Procesando... ${this.registering[eventId]}`;
    }
    if (this.hasTimeConflict(item)) return 'Ya tienes otro taller a esa hora';
    if (this.hasTimeConflictWithSelected(item)) return 'Conflicto con selección actual';
    return 'Inscribirse';
  }

  getButtonClasses(item: EventData): any {
    const eventId = item.event.id;
    return {
      'primary': !this.registering[eventId] && !this.registered.includes(eventId) && !this.hasTimeConflict(item) && !this.hasTimeConflictWithSelected(item),
      'registering': this.registering[eventId],
      'registered': this.registered.includes(eventId),
      'conflict': (this.hasTimeConflict(item) || this.hasTimeConflictWithSelected(item)) && !this.registered.includes(eventId)
    };
  }

  trackByEventId(index: number, item: EventData): number { return item.event.id; }

  getUniqueStartTimes(): string[] {
    return Array.from(new Set(this.events.map(e => e.event.start_time.slice(0, 5)))).sort();
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
    if (!this.registered.includes(id)) return;

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
        this.eventsService.removeEventAttendee(this.attendeeId, id).subscribe({
          next: () => {
            this.registered = this.registered.filter(registeredId => registeredId !== id);
            this.refreshEventsCache();
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

  onLogin(event: Event) {
    event.preventDefault();
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonColor: '#1976d2',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    if (!this.participantNumber.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'El código de participante es obligatorio.',
        confirmButtonColor: '#1976d2',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    // Dummy login logic
    this.attendeeId = 1; // Always set to 1 for now
    this.submitted = true;

    // Persist login state
    localStorage.setItem('email', this.email);
    localStorage.setItem('participantNumber', this.participantNumber);
    localStorage.setItem('attendeeId', this.attendeeId.toString());

    this.loadEvents(); // Load events after login
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

    // Clear login state
    localStorage.removeItem('email');
    localStorage.removeItem('participantNumber');
    localStorage.removeItem('attendeeId');

    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonColor: '#1976d2',
      background: '#232323',
      color: '#fff'
    });
  }

  showScheduleModal(): void {
    if (this.registered.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin talleres inscritos',
        text: 'No tienes talleres inscritos para ver tu horario.',
        confirmButtonColor: '#1976d2',
        background: '#232323',
        color: '#fff'
      });
      return;
    }

    this.organizeSchedule();
    this.showSchedule = !this.showSchedule; // Toggle modal visibility
  }

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

        if (event.event.day === 'Saturday') {
          saturday.push(workshopDetails);
        } else if (event.event.day === 'Sunday') {
          sunday.push(workshopDetails);
        }
      }
    });

    // Ordenar los talleres por hora de inicio
    saturday.sort((a, b) => this.timeToMinutes(a.time.split(' - ')[0]) - this.timeToMinutes(b.time.split(' - ')[0]));
    sunday.sort((a, b) => this.timeToMinutes(a.time.split(' - ')[0]) - this.timeToMinutes(b.time.split(' - ')[0]));

    this.organizedSchedule = { saturday, sunday };
  }
}
