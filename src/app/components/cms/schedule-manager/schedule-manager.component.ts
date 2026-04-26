import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../../../services/workshops.service';
import { ActivitiesService } from '../../../services/activities.service';
import { RoomsService } from '../../../services/rooms.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { EventsService } from '../../../services/events.services';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-schedule-manager',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.css'],
  imports: [CommonModule]
})
export class ScheduleManagerComponent implements OnInit {
  workshops: any[] = [];
  activities: any[] = [];
  rooms: any[] = [];
  selectedWorkshop: any = null;
  selectedActivity: any = null;
  dropdownOpen: 'workshops' | 'activities' | null = null;
  weekendHours: string[] = [];
  selectedDay: 'Saturday' | 'Sunday' = 'Saturday'; // Default to Saturday
  events: any[] = []; // Initialize as an empty array to store events from the API

  selectedCell: { period: string; room: any } | null = null;

  constructor(
    private workshopsService: WorkshopsService,
    private activitiesService: ActivitiesService,
    private roomsService: RoomsService,
    private eventsService: EventsService // Inject EventsService
  ) {}

  ngOnInit(): void {
    this.generateWeekendHours();

    forkJoin({
      workshops: this._fetchWorkshops(),
      activities: this._fetchActivities(),
      rooms: this._fetchRooms(),
      events: this._fetchEvents()
    }).subscribe({
      next: ({ workshops, activities, rooms, events }) => {
        this.workshops = workshops; // Already mapped and sorted in _fetchWorkshops
        this.activities = activities; // Already mapped in _fetchActivities
        this.rooms = rooms; // Already mapped in _fetchRooms
        this.events = events;

        // All data is now available
        this.initializeRoomEvents(); 
        this.updateWorkshopHiddenStatus(); // Update hidden status after events are processed

      },
      error: (err) => {
        console.error('Error fetching initial data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de Carga',
          text: 'No se pudieron cargar los datos iniciales. Por favor, intente recargar la página.',
        });
      }
    });
  }

  private _fetchWorkshops(): Observable<any[]> {
    return this.workshopsService.getWorkshops().pipe(
      map(workshops => 
        workshops.map((workshop: any) => ({
          ...workshop,
          name: workshop.name || 'Unnamed Workshop',
          hidden: false // Initial state, will be updated by updateWorkshopHiddenStatus
        })).sort((a: any, b: any) => a.name.localeCompare(b.name))
      )
    );
  }

  private _fetchActivities(): Observable<any[]> {
    return this.activitiesService.getActivities().pipe(
      map(activities => 
        activities.map((activity: any) => ({
          ...activity,
          name: activity.name || 'Unnamed Activity'
        }))
      )
    );
  }

  private _fetchRooms(): Observable<any[]> {
    return this.roomsService.getRooms().pipe(
      map(rooms => 
        rooms.map((room: any) => ({
          ...room,
          name: room.name || 'Sala sin nombre',
          events: { Saturday: {}, Sunday: {} } // Initialize events structure
        }))
      )
    );
  }

  private _fetchEvents(): Observable<any[]> {
    return this.eventsService.getEvents();
  }

  private updateWorkshopHiddenStatus(): void {
    const scheduledWorkshopIds = new Set<number>();
    this.events.forEach(event => {
      if (event.id_workshop !== null && event.id_workshop !== undefined) {
        scheduledWorkshopIds.add(event.id_workshop);
      }
    });

    this.workshops = this.workshops.map(workshop => ({
      ...workshop,
      hidden: scheduledWorkshopIds.has(workshop.id)
    }));
  }

  private generateWeekendHours(): void {
    const startHour = 8; // Start at 8:00 AM
    const endHour = 19; // End at 7:00 PM
    const intervals = 4; // 4 intervals of 15 minutes per hour
    this.weekendHours = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let interval = 0; interval < intervals; interval++) {
        const startMinute = interval * 15;
        const endMinute = (startMinute + 15) % 60;
        const endHour = hour + Math.floor((startMinute + 15) / 60);
        const formattedStart = `${hour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}:00`; // Add seconds
        const formattedEnd = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:00`; // Add seconds
        this.weekendHours.push(`${formattedStart} - ${formattedEnd}`);
      }
    }
  }

  toggleDropdown(type: 'workshops' | 'activities' | null): void {
    this.dropdownOpen = this.dropdownOpen === type ? null : type;
  }

  selectWorkshop(workshop: any): void {
    this.selectedWorkshop = workshop;
    this.selectedActivity = null; // Deselect activity
    console.log('Selected Workshop:', workshop);
  }

  selectActivity(activity: any): void {
    this.selectedActivity = activity;
    this.selectedWorkshop = null; // Deselect workshop
    console.log('Selected Activity:', activity);
  }

  setDay(day: 'Saturday' | 'Sunday'): void {
    this.selectedDay = day;
    console.log('Selected Day:', day);

    // Update the UI to reflect the selected day's events
    this.rooms.forEach((room) => {
      room.events = room.events || {};
    });
  }

  private initializeRoomEvents(): void {
    // Ensure rooms have the basic events structure if not already set by _fetchRooms (though it should be)
    this.rooms.forEach(room => {
      if (!room.events) {
        room.events = { Saturday: {}, Sunday: {} };
      } else {
        // Clear previous event data for re-initialization
        room.events.Saturday = {};
        room.events.Sunday = {};
      }
    });

    this.events.forEach((event) => {
      const room = this.rooms.find(r => r.id === event.id_room);
      if (room && (event.day === 'Saturday' || event.day === 'Sunday')) {
        let currentTime = event.start_time;
        while (currentTime && event.end_time && currentTime < event.end_time) {
          const nextPeriod = this.weekendHours.find((p) => p.startsWith(currentTime));
          if (!nextPeriod) { break; }
          room.events[event.day] = room.events[event.day] || {};
          const workshopDetails = event.id_workshop ? this.workshops.find(w => w.id === event.id_workshop) : null;
          const activityDetails = event.id_activity ? this.activities.find(a => a.id === event.id_activity) : null;
          room.events[event.day][nextPeriod] = {
            name: workshopDetails?.name || activityDetails?.name || (event.id_workshop ? 'Taller sin nombre' : 'Actividad sin nombre'),
            // Ahora concatenar nameAssistant y lastname para el taller
            nameAssistant: workshopDetails 
              ? ((workshopDetails.nameAssistant || '') + ' ' + (workshopDetails.lastname || '')).trim() 
              : null,
            duration: workshopDetails
              ? `${workshopDetails.duration} h`
              : (activityDetails ? `${activityDetails.duration} min` : 'N/A'),
            level: workshopDetails?.level || null,
            public: workshopDetails?.public || null,
            isFirst: currentTime === event.start_time
          };
          currentTime = this.calculateEndTime(currentTime, 15);
        }
      }
    });
  }

  addItem(period: string, room: any): void {
    if (!this.selectedWorkshop && !this.selectedActivity) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un taller o actividad antes de agregar un evento.',
      });
      return;
    }

    const [startTime] = period.split(' - ');

    let durationMinutes: number;
    let itemTypeString = '';

    if (this.selectedWorkshop) {
      itemTypeString = 'taller';
      durationMinutes = Number(this.selectedWorkshop.duration) * 60;
    } else if (this.selectedActivity) {
      itemTypeString = 'actividad';
      durationMinutes = Number(this.selectedActivity.duration);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Duración',
        text: 'No se pudo determinar la duración del evento.',
      });
      return;
    }

    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Duración',
        text: `La duración del ${itemTypeString} debe ser un número positivo.`,
      });
      return;
    }

    const calculatedEndTime = this.calculateEndTime(startTime, durationMinutes);

    // Check for conflicts across all periods the event spans for the selected day
    let currentTime = startTime;
    while (currentTime < calculatedEndTime) {
      const nextPeriod = this.weekendHours.find((p) => p.startsWith(currentTime));
      if (!nextPeriod) {
        break; // Stop if the period is not found
      }

      // Check if the cell is already occupied
      if (room.events?.[this.selectedDay]?.[nextPeriod]?.name) {
        Swal.fire({
          icon: 'warning',
          title: 'Conflicto',
          text: 'Ya existe un evento en este horario y sala para el día seleccionado.',
        });
        return;
      }

      currentTime = this.calculateEndTime(currentTime, 15); // Increment by 15 minutes
    }

    const newEvent = {
      id_room: room.id,
      start_time: startTime,
      end_time: calculatedEndTime,
      day: this.selectedDay,
      id_workshop: this.selectedWorkshop ? this.selectedWorkshop.id : null,
      id_activity: this.selectedActivity ? this.selectedActivity.id : null,
    };

    this.eventsService.createEvent(newEvent).subscribe({
      next: (createdEvent) => {
        this.events.push(createdEvent);
        currentTime = startTime;
        let isFirst = true;
        while (currentTime < calculatedEndTime) {
          const nextPeriod = this.weekendHours.find((p) => p.startsWith(currentTime));
          if (nextPeriod) {
            room.events = room.events || {};
            room.events[this.selectedDay] = room.events[this.selectedDay] || {};
            room.events[this.selectedDay][nextPeriod] = {
              name: this.selectedWorkshop
                ? this.selectedWorkshop.name
                : this.selectedActivity.name,
              // Ahora concatenar nameAssistant y lastname para el taller
              nameAssistant: this.selectedWorkshop 
                ? ((this.selectedWorkshop.nameAssistant || '') + ' ' + (this.selectedWorkshop.lastname || '')).trim() 
                : this.selectedActivity.nameAssistant,
              duration: this.selectedWorkshop
                ? `${this.selectedWorkshop.duration} h`
                : (this.selectedActivity ? `${this.selectedActivity.duration} min` : ''),
              level: this.selectedWorkshop?.level || null,
              public: this.selectedWorkshop?.public || null,
              isFirst,
            };
            isFirst = false;
          }
          currentTime = this.calculateEndTime(currentTime, 15);
        }
        // Hide the workshop in the list if it was added
        if (this.selectedWorkshop) {
          // No need to call updateWorkshopHiddenStatus here, 
          // as it's done on initial load and after removing an item.
          // The local 'hidden' flag on the selectedWorkshop instance in the list will be updated directly.
          const workshopInList = this.workshops.find(w => w.id === this.selectedWorkshop.id);
          if (workshopInList) {
            workshopInList.hidden = true;
          }
          this.selectedWorkshop = null; // Deselect the workshop
        } else if (this.selectedActivity) {
          // Potentially hide activity if it's a one-time schedulable item
          // For now, just deselect
          this.selectedActivity = null;
        }

        Swal.fire({
          icon: 'success',
          title: 'Evento agregado',
          text: 'El evento se ha agregado correctamente.',
        });
      },
      error: (err) => {
        console.error('Error creating event:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el evento. Intente nuevamente.',
        });
      }
    });
  }

  removeItem(period: string, room: any): void {
    if (!room.events?.[this.selectedDay]?.[period]?.isFirst) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Solo se puede eliminar desde la primera celda del rango ocupado.',
      });
      return;
    }

    const eventName = room.events[this.selectedDay][period]?.name;

    // Find the event in the events array
    const eventToRemove = this.events.find(
      (event) =>
        event.id_room === room.id &&
        event.start_time === period.split(' - ')[0] &&
        event.day === this.selectedDay
    );

    if (eventToRemove) {
      this.eventsService.deleteEvent(eventToRemove.id).subscribe({
        next: () => {
          this.events = this.events.filter((event) => event !== eventToRemove);
          // Free all cells occupied by the event
          let currentTime = eventToRemove.start_time;
          while (currentTime < eventToRemove.end_time) {
            const nextPeriod = this.weekendHours.find((p) => p.startsWith(currentTime));
            if (nextPeriod) {
              delete room.events[this.selectedDay][nextPeriod];
            }
            currentTime = this.calculateEndTime(currentTime, 15); // Increment by 15 minutes
          }

          // Unhide the workshop if it was associated with the event
          if (eventToRemove.id_workshop) {
            const workshop = this.workshops.find(w => w.id === eventToRemove.id_workshop);
            if (workshop) {
              workshop.hidden = false; // Unhide the workshop
            }
          }
          // No need to call updateWorkshopHiddenStatus() here as we directly modified the specific workshop.
          // If a full re-evaluation is needed for complex scenarios, it could be called.

          Swal.fire({
            icon: 'success',
            title: 'Evento eliminado',
            text: `El taller o actividad "${eventName}" ha sido eliminado correctamente.`,
          });
        },
        error: (err) => {
          console.error('Error deleting event:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el evento. Intente nuevamente.',
          });
        }
      });
    }
  }

  selectCell(period: string, room: any): void {
    this.selectedCell = { period, room };
    
  }

  private calculateEndTime(startTime: string, duration: number): string {
    const [hour, minute] = startTime.split(':').map(Number);
    const totalMinutes = hour * 60 + minute + duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:00`; // Add seconds
  }

  // Nuevo método para exportar la tabla a Excel
  exportarExcel(): void {
    const tabla = document.getElementById('miTabla');
    if (tabla) {
      const hoja = XLSX.utils.table_to_sheet(tabla);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, 'Hoja1');
      XLSX.writeFile(libro, 'reporte.xlsx');
    }
  }
}
