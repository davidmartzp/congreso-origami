import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-resources-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent {
  readonly translations = computed(() => this.ts.t().resources);

  constructor(private ts: TranslationService) {}
}
