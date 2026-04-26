import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// servicios de eventos
import { EventsService } from '../../services/events.services';
import { SeoService } from '../../services/seo.service';

interface Room {
  id: number;
  name: string;
}

interface Event {
  id: number;
  id_room: number;
  start_time: string;
  end_time: string;
  day: string;
  id_workshop: number;
  id_activity: number | null;
  created_at: string;
  updated_at: string;
  room: Room;
}

interface Workshop {
  id: number;
  name: string;
  image: string;
  level: string;
  observations: string;
  public: string;
  duration: number;
  assistantName: string;
  event: Event;
}

@Component({
  selector: 'app-booklet',
  templateUrl: './booklet.component.html',
  styleUrl: './booklet.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None
}) 
export class BookletComponent implements OnInit {
  workshops: Workshop[] = [];
  organizedWorkshops: { [day: string]: { [time: string]: Workshop[] } } = {};
  days: string[] = [];
  selectedImage: string | null = null;
  selectedWorkshop: Workshop | null = null;
  isModalOpen: boolean = false;
  
  constructor(private eventsService: EventsService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.setPage('booklet');
    this.eventsService.getActiveWorkshopsWithEvents().subscribe(events => {
      console.log('Eventos cargados:', events);
      this.workshops = events;
      this.organizeWorkshops();
    });

    // Add keyboard event listener for escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeImageModal();
      }
    });
  }

  organizeWorkshops() {
    this.organizedWorkshops = {};
    this.workshops.forEach(workshop => {
      const day = workshop.event.day;
      const time = workshop.event.start_time;
      
      if (!this.organizedWorkshops[day]) {
        this.organizedWorkshops[day] = {};
      }
      
      if (!this.organizedWorkshops[day][time]) {
        this.organizedWorkshops[day][time] = [];
      }
      
      this.organizedWorkshops[day][time].push(workshop);
    });

    // Sort workshops by room within each time slot and ensure time slots are ordered
    Object.keys(this.organizedWorkshops).forEach(day => {
      // Sort time slots chronologically
      const sortedTimes = Object.keys(this.organizedWorkshops[day]).sort();
      const sortedDay: { [time: string]: Workshop[] } = {};
      
      sortedTimes.forEach(time => {
        sortedDay[time] = this.organizedWorkshops[day][time].sort((a, b) => 
          a.event.room.name.localeCompare(b.event.room.name)
        );
      });
      
      this.organizedWorkshops[day] = sortedDay;
    });

    this.days = Object.keys(this.organizedWorkshops);
  }

  getLevelColor(level: string): string {
    switch(level) {
      case 'P': return '#4CAF50'; // Green for Principiante
      case 'I': return '#FF9800'; // Orange for Intermedio
      case 'A': return '#F44336'; // Red for Avanzado
      default: return '#757575';
    }
  }

  getLevelText(level: string): string {
    switch(level) {
      case 'P': return 'Principiante';
      case 'I': return 'Intermedio';
      case 'A': return 'Avanzado';
      default: return level;
    }
  }

  getPublicText(publicType: string): string {
    return publicType === 'N' ? 'Niños' : 'Adultos';
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  openImageModal(workshop: Workshop) {
    this.selectedWorkshop = workshop;
    this.selectedImage = `https://origamibogota.com/app-ob/storage/app/public/images/${workshop.image}`;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.selectedImage = null;
    this.selectedWorkshop = null;
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
