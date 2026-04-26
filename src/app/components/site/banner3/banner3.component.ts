import { Component, computed } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-banner3',
  imports: [],
  templateUrl: './banner3.component.html',
  styleUrl: './banner3.component.css'
})
export class Banner3Component {
  readonly translations = computed(() => this.ts.t().banner3);

  constructor(private ts: TranslationService) {}
}
