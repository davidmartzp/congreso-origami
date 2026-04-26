import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {}

  onSubmit() {
    // Validar si los campos están vacíos
    if (!this.email || !this.password) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#721725',
      });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(this.email)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#721725',
      });
      return;
    }

    // Validar longitud de contraseña
    if (this.password.length < 6) {
      Swal.fire({
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#721725',
      });
      return;
    }

    // Llamar al servicio de login
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response && response.access_token) { 

          localStorage.setItem('OB_access_token', response.access_token);
          localStorage.setItem('OB_user', JSON.stringify(response.user));

          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión correctamente',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#721725',
            timer: 2000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/congreso/dashboard']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: response?.message || 'Credenciales incorrectas',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#721725',
          });
        }
      },
      error: (err) => {
        if (err.status === 422) {
          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'Datos inválidos. Por favor, revisa los campos e intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#721725',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al intentar iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#721725',
          });
        }
      }
    });
  }
}
