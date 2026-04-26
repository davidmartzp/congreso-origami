import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TranslationService } from '../../../../services/translation.service';

interface PaymentMethod {
  id: string;
  icon: string;
  title: string;
  description: string;
  link?: {
    url: string;
    text: string;
  };
}

@Component({
  selector: 'app-pay-methods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {
  readonly ts = inject(TranslationService);
  readonly t = computed(() => this.ts.t().inscriptions);

  readonly headerTitle = computed(() => this.t().payMethodsTitle);
  readonly headerDescription = computed(() => this.t().payMethodsDesc);
  readonly footerNote = computed(() => this.t().payMethodsFooter);

  readonly paymentMethods = computed((): PaymentMethod[] => {
    const t = this.t();
    return [
      {
        id: 'mobile',
        icon: 'fas fa-mobile-alt',
        title: 'Nequi, Daviplata, Rappipay',
        description: t.mobileDesc
      },
      {
        id: 'bank',
        icon: 'fas fa-university',
        title: t.bankTitle,
        description: t.bankDesc,
        link: {
          url: 'https://api.whatsapp.com/send?phone=573152459839&text=Hola,%20quiero%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20cuentas%20para%20inscribirme%20en%20el%20evento',
          text: 'Whatsapp'
        }
      },
      {
        id: 'card',
        icon: 'far fa-credit-card',
        title: t.cardTitle,
        description: t.cardDesc,
        link: {
          url: 'https://origamistica.com/producto/inscripcion-completa-origami-bogota/',
          text: t.cardLink
        }
      },
      {
        id: 'cash',
        icon: 'far fa-money-bill-alt',
        title: t.cashTitle,
        description: t.cashDesc,
        link: {
          url: 'https://api.whatsapp.com/send?phone=573152459839&text=Hola,%20quiero%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20pago%20en%20efectivo%20para%20inscribirme%20en%20el%20evento',
          text: 'Whatsapp'
        }
      }
    ];
  });

  onBuyClick(event: Event): void {
    event.preventDefault();
    const t = this.t();

    Swal.fire({
      title: t.paymentInfoTitle,
      html: t.paymentInfoHtml,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#732F37',
      cancelButtonColor: '#6c757d',
      confirmButtonText: t.continueBtn,
      cancelButtonText: t.cancelBtn
    }).then((result) => {
      if (result.isConfirmed) {
        const target = event.target as HTMLAnchorElement;
        const href = target.href;
        window.open(href, '_blank');
      }
    });
  }
}
