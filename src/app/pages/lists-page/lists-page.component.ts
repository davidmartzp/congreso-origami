import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.services';

@Component({
  selector: 'app-lists-page',
  imports: [CommonModule],
  templateUrl: './lists-page.component.html',
  styleUrl: './lists-page.component.css'
})
export class ListsPageComponent implements OnInit {
  workshops: any[] = [];
  attendees: any[] = [];
  selectedEventId: number | null = null;
  loading = false;
  loadingAttendees = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadWorkshops();
  }

  loadWorkshops(): void {
    this.loading = true;
    this.eventsService.getWorkshopsActive().subscribe({
      next: (data) => {
        this.workshops = data.sort((a: any, b: any) => 
          a.workshop_name.localeCompare(b.workshop_name, 'es', { sensitivity: 'base' })
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading workshops:', error);
        this.loading = false;
      }
    });
  }

  selectEvent(eventId: number): void {
    this.selectedEventId = eventId;
    this.loadAttendees(eventId);
  }

  loadAttendees(eventId: number): void {
    this.loadingAttendees = true;
    this.eventsService.getAttendeesByEvent(eventId).subscribe({
      next: (data) => {
        this.attendees = data;
        this.loadingAttendees = false;
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
        this.loadingAttendees = false;
      }
    });
  }

  clearSelection(): void {
    this.selectedEventId = null;
    this.attendees = [];
  }

  // TrackBy functions for better performance
  trackByEventId(index: number, workshop: any): number {
    return workshop.id_event;
  }

  trackByAttendeeId(index: number, attendee: any): number {
    return attendee.id || index;
  }
}
