import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Guest {
  name: string;
  instagram: string;
  instagramUrl: string;
  type: string;
  biography: string;
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
  guests: Guest[] = [
    {
      name: 'Tetsuya Gotani',
      instagram: '@origami_tetsuya_gotani',
      instagramUrl: 'https://instagram.com/origami_tetsuya_gotani',
      type: 'Internacional',
      biography: 'Tetsuya Gotani es un diseñador japonés de origami que actualmente vive en Francia. Comenzó en el origami en Japón y desarrolló sus propios diseños tras mudarse a Europa. Mientras trabaja como acordeonista profesional, también enseña origami a niños en Francia, y al quedarse sin modelos, empezó a crear los suyos. Inspirado por Origami Dinosaur de Fumiaki Kawahata, ha avanzado hacia diseños más complejos. Gotani ha realizado exposiciones importantes, como una muestra en solitario en EMOZ, España, y en 2019 publicó Origamix, un libro innovador que combina diagramas con su proceso creativo. Ha sido invitado a prestigiosas convenciones de origami en Lyon, Sevilla, Dijon, Tokio y Edimburgo.',
      photoUrl: 'images/IMG_20241029_092141_360.jpg'
    },
    {
      name: 'Cekouat León',
      instagram: '@cekouat',
      instagramUrl: 'https://instagram.com/cekouat',
      type: 'Internacional',
      biography: 'Cekouat León, artista del origami y biólogo radicado en Ciudad de México, tiene más de 15 años de experiencia en plegado de papel y comenzó a diseñar modelos propios en 2013. Inspirado por su infancia en desiertos y bosques mexicanos, sus diseños reflejan la fauna y flora local. Investiga el papel amate tradicional y su producción cultural. Su trabajo ha sido exhibido internacionalmente, destacando una exposición individual en EMOZ, España, y su participación como invitado especial en convenciones de origami en Argentina y México en 2024.',
      photoUrl: 'images/Cekouat-Leon_2022-1.jpg'
    },
    {
      name: 'Diego Becerra',
      instagram: '@diegorigami',
      instagramUrl: 'https://instagram.com/diegorigami',
      type: 'Nacional',
      biography: 'Diego Becerra es un ingeniero y maestro apasionado por el origami, la matemática y la tecnología. Su trabajo explora la intersección entre el arte del plegado y la ingeniería, aplicándolo a la robótica, el diseño industrial y la transición energética. Ha diseñado más de 50 figuras originales y publicado en revistas especializadas, como Tanteidan Magazine. Actualmente, desarrolla prototipos innovadores de origami aplicado a la ingeniería eléctrica y electrónica en colaboración con universidades de la región de Santander.',
      photoUrl: 'images/escarabajo.jpg'
    }
  ];
}
