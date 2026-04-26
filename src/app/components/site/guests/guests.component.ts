import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

interface Guest {
  name: string;
  instagram: string;
  instagramUrl: string;
  photoUrl: string;
}

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css'
})
export class GuestsComponent {
  readonly translations = computed(() => this.ts.t().guests);

  constructor(private ts: TranslationService) { }

  private static readonly guestStatic: Guest[] = [
    {
      name: 'Joseph Wu',
      instagram: 'josephwuorigami',
      instagramUrl: 'https://www.flickr.com/photos/josephwuorigami/',
      photoUrl: 'images/joseph-wu-profile.png'
    },
    {
      name: 'Diana Milena Vargas',
      instagram: '@hikari.dimivaro',
      instagramUrl: 'https://instagram.com/hikari.dimivaro',
      photoUrl: 'https://origamibogota.com/images/diana_milena.png'
    }
  ];

  readonly guests = computed(() =>
    GuestsComponent.guestStatic.map((g, i) => ({
      ...g,
      type: this.translations().items[i]?.type ?? '',
      biography: this.translations().items[i]?.biography ?? '',
    }))
  );
}
