import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ElParcheMember {
  name: string;
  image: string;
  alt: string;
  instagramLabel: string;
  instagramUrl?: string;
}

@Component({
  selector: 'app-el-parche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './el-parche.component.html',
  styleUrl: './el-parche.component.css'
})
export class ElParcheComponent {
  @Input() sectionNumber = '03';
  @Input() title = 'El parche';
  @Input() description =
    'Una franja para la gente que sostiene el parche: manos, historias y ganas de plegar, conversar y volver a encontrarse.';

  readonly members: ElParcheMember[] = [
    {
      name: 'Mechas',
      image: 'images/profiles/Mechas.png',
      alt: 'Retrato del parche de Amigos Plegadores',
      instagramLabel: '@origamistica',
      instagramUrl: 'https://www.instagram.com/origamistica/'
    },
    {
      name: 'Cami',
      image: 'images/profiles/Cami.png',
      alt: 'Retrato del parche de Amigos Plegadores',
      instagramLabel: '@lucamto_origami',
      instagramUrl: 'https://www.instagram.com/lucamto_origami/'
    },
    {
      name: 'Christophe',
      image: 'images/profiles/Christophe.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@christophe.boudias',
      instagramUrl: 'https://www.instagram.com/christophe.boudias'
    },
    {
      name: 'David',
      image: 'images/profiles/David.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@david_paperfold',
      instagramUrl: 'https://www.instagram.com/david_paperfold/'
    },
    {
      name: 'Joha',
      image: 'images/profiles/Joha.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@rola_kami',
      instagramUrl: 'https://www.instagram.com/rola_kami/'
    },
    {
      name: 'Mauricio ',
      image: 'images/profiles/Mauricio.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@imagiro_colombia',
      instagramUrl: 'https://www.instagram.com/imagiro_colombia/'
    },
    {
      name: 'Diego',
      image: 'images/profiles/Diego.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@diegogilrincon',
      instagramUrl: 'https://www.instagram.com/diegogilrincon/'
    },
    {
      name: 'Juan David',
      image: 'images/profiles/JuanDavid.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@juan_origamista1',
      instagramUrl: 'https://www.instagram.com/juan_origamista1/'
    },
    {
      name: 'Michael',
      image: 'images/profiles/Michael.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@phreq.uency',
      instagramUrl: 'https://www.instagram.com/phreq.uency/'
    },
    {
      name: 'José David',
      image: 'images/profiles/JoseDavid.png',
      alt: 'Integrante del parche durante una reunión',
      instagramLabel: '@davidtapiasorigami',
      instagramUrl: 'https://www.instagram.com/davidtapiasorigami/'
    }

  ];

  get loopedMembers(): ElParcheMember[] {
    return this.members.length > 1 ? [...this.members, ...this.members] : this.members;
  }
}
