import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  id: string;
  icon: string;
  question: string;
  answer: string;
  column?: number; // Optional property to control column placement
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  activeFaq: string | null = null;
  
  faqItems: FaqItem[] = [
    {
      id: 'faq1',
      icon: 'fas fa-ticket-alt',
      question: '¿Qué incluye la inscripción?',
      answer: 'Incluye la entrada al evento, talleres, caja del evento con materiales, refrigerios, espacio de exposición, cóctel de bienvenida y chocolatada de despedida. Menores pueden asistir con un acompañante.',
      column: 1
    },
    {
      id: 'faq2',
      icon: 'fas fa-calendar-check',
      question: '¿Cuál es la diferencia entre la inscripción completa o por día?',
      answer: 'La inscripción completa es para asistir a todas las actividades. La inscripción por días es para asistir solo el sábado o domingo. Todos reciben el kit del evento.',
      column: 1
    },
    {
      id: 'faq3',
      icon: 'fas fa-exchange-alt',
      question: '¿Cuántos grupos hay de intercambio de tarjetas?',
      answer: 'Esto depende de la cantidad de personas inscritas, a veces hay 2 y otras solo 1. La información será confirmada a las personas inscritas una semana antes del evento.',
      column: 1
    },
    {
      id: 'faq4',
      icon: 'fas fa-chalkboard-teacher',
      question: '¿Cómo selecciono mis talleres?',
      answer: 'En la mañana de cada día, con tu número de inscripción, podrás seleccionar tus talleres en la página a partir de las 8 am. Es por cupos, así que ten listas varias opciones por si no hay cupo en tu preferido.',
      column: 1
    },
    {
      id: 'faq5',
      icon: 'fas fa-sort-numeric-down',
      question: '¿Cómo se asignan los números para la inscripción?',
      answer: 'Los números se asignan por orden de inscripción, es decir, por la fecha de pago. Entre más temprano te inscribas, menor número tendrás.',
      column: 1
    },
    {
      id: 'faq6',
      icon: 'fas fa-user-friends',
      question: '¿A qué tengo derecho como acompañante?',
      answer: 'Podrás visitar los espacios comunes del evento, pero no asistir a talleres ni recibir materiales o refrigerios.',
      column: 2
    },
    {
      id: 'faq7',
      icon: 'fas fa-child',
      question: '¿Todos los menores de edad deben ir acompañados?',
      answer: 'El evento no exige acompañante para todos los menores, pero los organizadores no se harán responsables. Es decisión del acompañante estar presente o no.',
      column: 2
    },
    {
      id: 'faq8',
      icon: 'fas fa-envelope',
      question: 'Si no llegó el correo con el número, ¿qué hago?',
      answer: 'Tendremos una lista impresa con los números. Te recomendamos agregar como contacto el correo inscripciones&#64;origamibogota.com para recibir toda la información.',
      column: 2
    },
    {
      id: 'faq9',
      icon: 'fas fa-clock',
      question: '¿Cuáles son los horarios del evento?',
      answer: 'Consulta el cronograma en la sección "Acerca del evento" y haz clic en el botón "Cronograma".',
      column: 2
    },
    {
      id: 'faq10',
      icon: 'fas fa-bus',
      question: '¿Quiénes pueden participar en la chiva?',
      answer: 'Adultos participantes del evento, parejas o amigos de participantes (todos mayores de edad) que paguen el valor adicional de la actividad (incluye copa y aguardiente).',
      column: 2
    },
    {
      id: 'faq11',
      icon: 'fas fa-thumbtack',
      question: '¿Cuántos pines/prendedores debo hacer?',
      answer: 'Es una actividad libre, puedes hacer los que quieras regalar o intercambiar. El evento realiza 70 pines para todos los participantes que asistan al cóctel de bienvenida.',
      column: 3
    },
    {
      id: 'faq12',
      icon: 'fas fa-box-open',
      question: '¿En qué momento reclamó mi kit?',
      answer: 'El viernes desde las 5pm hasta las 6pm o después del cóctel, Sábado o Domingo de 8am a 9am.',
      column: 3
    },
    {
      id: 'faq13',
      icon: 'fas fa-calendar-times',
      question: '¿Qué pasa si no puedo asistir al evento?',
      answer: 'Podrás transferir tu inscripción a otra persona o reclamar el kit del evento. Las inscripciones no son reembolsables ni redimibles en ningún caso para eventos posteriores.',
      column: 3
    },
    {
      id: 'faq14',
      icon: 'fas fa-map-marker-alt',
      question: '¿A dónde debo llegar?',
      answer: 'La oficina del evento estará en el claustro de la universidad el Rosario. Dirígete allí para reclamar tu escarapela y kit del evento. El cóctel de bienvenida es en el auditorio Jockey.',
      column: 3
    },
    {
      id: 'faq15',
      icon: 'fas fa-id-card',
      question: '¿Cómo organizo las tarjetas?',
      answer: 'Por lo general hay 2 grupos de tarjetas, se deben hacer sets de 16 tarjetas por cada grupo.',
      column: 3
    }
  ];
  
  constructor(private renderer: Renderer2) {}
  
  toggleFaq(faqId: string): void {
    if (this.activeFaq === faqId) {
      this.activeFaq = null;
    } else {
      this.activeFaq = faqId;
    }
  }
  
  getFaqsByColumn(column: number): FaqItem[] {
    return this.faqItems.filter(item => item.column === column);
  }
}
