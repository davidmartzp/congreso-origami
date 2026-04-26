import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-workshop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-workshop.component.html',
  styleUrl: './virtual-workshop.component.css'
})
export class VirtualWorkshopComponent {
  // The component is primarily static content, so we don't need
  // additional functionality at this point.
}
