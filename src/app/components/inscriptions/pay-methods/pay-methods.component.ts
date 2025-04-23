import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  headerTitle = 'Métodos de pago';
  headerDescription = 'Puedes usar estos diferentes métodos. Recuerda completar el formulario de inscripción una vez realizado el pago para que puedas escoger los talleres.';
  
  footerNote = '¡Importante! Una vez realizado el pago, no olvides completar el formulario de inscripción para asegurar tu lugar y seleccionar los talleres a los que deseas asistir. ¡El último paso para ser parte de esta increíble experiencia!';
  
  paymentMethods: PaymentMethod[] = [
    {
      id: 'mobile',
      icon: 'fas fa-mobile-alt',
      title: 'Nequi, Daviplata, Rappipay',
      description: '+57 315 2459839'
    },
    {
      id: 'bank',
      icon: 'fas fa-university',
      title: 'Depósito Bancario',
      description: 'Solicita la información de depósito bancario a través de whatsapp.',
      link: {
        url: 'https://api.whatsapp.com/send?phone=573152459839&text=Hola,%20quiero%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20cuentas%20para%20inscribirme%20en%20el%20evento',
        text: 'Whatsapp'
      }
    },
    {
      id: 'card',
      icon: 'far fa-credit-card',
      title: 'Tarjetas',
      description: 'Utilizando su tarjeta de crédito o débito en la tienda online.',
      link: {
        url: 'https://origamistica.com/producto/inscripcion-completa-origami-bogota-2023-segunda-etapa/',
        text: 'Click aquí'
      }
    },
    {
      id: 'cash',
      icon: 'far fa-money-bill-alt',
      title: 'Efectivo',
      description: 'Comunicándose con nosotros por whatsapp',
      link: {
        url: 'https://api.whatsapp.com/send?phone=573152459839&text=Hola,%20quiero%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20pago%20en%20efectivo%20para%20inscribirme%20en%20el%20evento',
        text: 'Whatsapp'
      }
    }
  ];
}
