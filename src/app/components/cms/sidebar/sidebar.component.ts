import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { 
  @Input() user: any;
  @Input() collapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  sessionUser: any = localStorage.getItem('OB_user') ? JSON.parse(localStorage.getItem('OB_user') || '') : null;

 

  constructor(private authService: AuthService, private router: Router) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cerrará tu sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.confirmLogout();
      }
    });
  }
  
  confirmLogout() {
    // Use the AuthService to handle logout
    this.authService.logout().subscribe(() => {
      // Clear user data from local storage
      localStorage.removeItem('OB_user');
      localStorage.removeItem('OB_access_token');

      // Navigate to the login page
      window.location.reload();
    });
  }
}
