import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  activeFaq: string | null = null;

  readonly translations = computed(() => this.ts.t().faq);

  constructor(private ts: TranslationService) {}

  toggleFaq(faqId: string): void {
    this.activeFaq = this.activeFaq === faqId ? null : faqId;
  }

  getFaqsByColumn(column: number) {
    return this.translations().items.filter(item => item.column === column);
  }
}
