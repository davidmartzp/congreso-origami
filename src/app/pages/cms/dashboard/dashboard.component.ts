import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/cms/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // User information
  user = {
    name: 'Usuario Demo',
    role: 'Administrador',
    avatar: 'assets/images/avatar.png'
  };
  
  // Toggle sidebar in mobile view
  sidebarVisible = true;
  
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
