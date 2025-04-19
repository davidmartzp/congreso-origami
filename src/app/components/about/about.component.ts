import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  images: string[] = [
    'images/447852680_18270623236238474_4507690254501985740_n-1.jpg',
    'images/448164653_3095731247235750_707800889273709722_n-1.jpg',
    'images/448250194_3095731250569083_4061268142432000593_n.jpg',
    'images/448253238_3095731240569084_7790277608441104566_n.jpg',
    'images/448395262_3095731243902417_2491209369772138750_n.jpg',
       'images/448091135_18437258194013811_7695621160662052354_n.jpg',
    'images/447976146_10160345898882075_9191561863334080077_n.jpg'
    // Puedes añadir más imágenes aquí
  ];
  
  animationDuration: number = 0;
  animationDelays: number[] = [];
  
  ngOnInit(): void {
    this.calculateAnimationTiming();
  }
  
  private calculateAnimationTiming(): void {
    // Calcular la duración total de la animación (8 segundos por imagen)
    this.animationDuration = this.images.length * 8;
    
    // Calcular los retrasos para cada imagen
    this.animationDelays = this.images.map((_, index) => index * 8);
  }
  
  getAnimationStyle(index: number): object {
    return {
      'animation-duration': `${this.animationDuration}s`,
      'animation-delay': `${this.animationDelays[index]}s`,
      'z-index': `${this.images.length - index}`
    };
  }
}
