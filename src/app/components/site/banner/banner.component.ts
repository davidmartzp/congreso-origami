import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  readonly translations = computed(() => this.ts.t().banner);

  constructor(private ts: TranslationService) {}
}
