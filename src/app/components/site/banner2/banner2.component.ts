import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-banner2',
  imports: [CommonModule],
  templateUrl: './banner2.component.html',
  styleUrl: './banner2.component.css'
})
export class Banner2Component {
  readonly translations = computed(() => this.ts.t().banner2);

  constructor(private ts: TranslationService) {}
}
