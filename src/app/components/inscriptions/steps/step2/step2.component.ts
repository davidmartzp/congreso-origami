import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InscriptionService } from '../../../../services/inscription.service';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html', 
  styleUrls: ['./step2.component.css'],
  imports: [FormsModule, CommonModule],
})
export class Step2Component {
  currentStep = 1;
  isSubmitting = false;
  isSubmitted = false;
  submittedEmail = '';

  formData: any = {
    name: '',
    lastname: '',
    age: '',
    country: '57',
    city: '',
    email: '',
    phone: '',
    idname: '',
    paymethod: '',
    paydate: '',
    receipt: '',
    companion: '',
    info: '',
    otherInfo: '',
    printCertificate: false,
    group: false,
    origamigroup: '',
    cards: false,
    cardGroup: '',
    workshops: false,
    go_to_chiva: false,
    chiva_companions: '',
    chiva_accompanied: false,
    days: '',
    participateInWorkshops: false
  };

  workshops: string[] = [];

  chivaCompanionsError: string = '';

  constructor(private inscriptionService: InscriptionService) {}

  private showAlert(message: string, title: string = 'Atención', icon: 'warning' | 'error' | 'success' | 'info' | 'question' = 'warning') {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#732F37', // Color primario de la aplicación
      heightAuto: false, // Mejor para móviles
      buttonsStyling: true,
    });
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    
    if (step <= this.currentStep) {
      this.currentStep = step;
    } else {
      if (this.validateStepsUpTo(step - 1)) {
        this.currentStep = step;
      }
    }
  }

  validateStepsUpTo(step: number): boolean {
    let isValid = true;
    for (let i = 1; i <= step; i++) {
      this.currentStep = i;
      if (!this.validateCurrentStep()) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.validatePersonalInfo();
      case 2:
        return this.validateContactInfo();
      case 3:
        return this.validatePaymentInfo();
      case 4:
        return this.validateParticipationInfo();
      default:
        return true;
    }
  }

  validatePersonalInfo(): boolean {
    if (!this.formData.name) {
      this.showAlert('Debe ingresar el nombre');
      return false;
    }
    if (!this.formData.lastname) {
      this.showAlert('Debe ingresar el apellido');
      return false;
    }
    if (!this.formData.age) {
      this.showAlert('Debe ingresar la edad');
      return false;
    }
    if (!this.formData.idname) {
      this.showAlert('Debe ingresar el nombre para la escarapela');
      return false;
    }
    return true;
  }

  validateContactInfo(): boolean {
    if (!this.formData.country) {
      this.showAlert('Debe seleccionar el país');
      return false;
    }
    if (!this.formData.city) {
      this.showAlert('Debe ingresar la ciudad');
      return false;
    }
    if (!this.formData.email) {
      this.showAlert('Debe ingresar el correo electrónico');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,4}$/;
    if (!emailRegex.test(this.formData.email)) {
      this.showAlert('El correo electrónico debe ser una dirección válida');
      return false;
    }
    if (!this.formData.phone) {
      this.showAlert('Debe ingresar el teléfono');
      return false;
    }
    if (!/^\d+$/.test(this.formData.phone)) {
      this.showAlert('El teléfono debe contener solo números');
      return false;
    }
    return true;
  }

  validatePaymentInfo(): boolean {
    if (!this.formData.paymethod) {
      this.showAlert('Debe seleccionar el tipo de pago');
      return false;
    }
    
    if (this.requierePayDate()) {
      if (!this.formData.paydate) {
        this.showAlert('Debe ingresar la fecha de pago');
        return false;
      }
      if (!this.formData.receipt) {
        this.showAlert('Debe ingresar el número de comprobante');
        return false;
      }
    }
    
    return true;
  }

  validateParticipationInfo(): boolean {
    if (!this.formData.days) {
      this.showAlert('Debe especificar el o los días que va a participar');
      return false;
    }
    return true;
  }

  requierePayDate(): boolean {
    const metodosExentos = ['Becado(a)', 'Patrocinio', 'Gupo de apoyo', 'Invitado(a)'];
    return !metodosExentos.includes(this.formData.paymethod);
  }

  onSubmit() {
    if (this.validateForm() && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Capitaliza información personal
      this.formData.name = this.capitalizeWords(this.formData.name);
      this.formData.lastname = this.capitalizeWords(this.formData.lastname);
      this.formData.city = this.capitalizeWords(this.formData.city);
      this.formData.idname = this.capitalizeWords(this.formData.idname);
      
      this.submittedEmail = this.formData.email;
      
      const apiData = {
        name: this.formData.name,
        lastname: this.formData.lastname,
        age: parseInt(this.formData.age, 10),
        country: this.getCountryName(this.formData.country),
        city: this.formData.city,
        email: this.formData.email,
        phone: this.formData.phone,
        companion: this.formData.companion,
        idname: this.formData.idname,
        paymethod: this.formData.paymethod,
        paydate: this.formData.paydate || new Date().toISOString().split('T')[0], // Si es null, se manda hoy
        receipt: this.formData.receipt,
        group: this.formData.group ? 1 : 0,
        origamigroup: this.formData.origamigroup,
        medium: this.formData.info,
        othermedium: this.formData.otherInfo,
        info: this.formData.info,
        cards: this.formData.cards ? 1 : 0,
        cardgroup: this.formData.cardGroup,
        days: this.formData.days, // Enviar directamente el valor S, D o T
        printCertificate: this.formData.printCertificate ? 1 : 0,
        go_to_chiva: this.formData.go_to_chiva ? 1 : 0,
        chiva_companions: this.formData.chiva_companions ? parseInt(this.formData.chiva_companions, 10) : 0
      };
      
      console.log("Enviando datos:", apiData);
      
      this.inscriptionService.registerAssistant(apiData).subscribe({
        next: (response) => {
          console.log("Inscripción exitosa:", response);
          this.isSubmitted = true;
          this.isSubmitting = false;
          this.resetForm();
          this.currentStep = 1;
        },
        error: (error) => {
          console.error("Error en la inscripción:", error);
          this.showAlert(
            "Ocurrió un error al procesar la inscripción. Por favor, intente nuevamente.", 
            "Error", 
            "error"
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  private getCountryName(countryCode: string): string {
    const countryMap: {[key: string]: string} = {
      '57': 'Colombia',
      '58': 'Venezuela',
      '1': 'USA'
    };
    return countryMap[countryCode] || 'Colombia';
  }

  private mapDaysValue(daysValue: string): string {
    const daysMap: {[key: string]: string} = {
      'T': 'Todos los días',
      'S': 'Sábado',
      'D': 'Domingo'
    };
    return daysMap[daysValue] || '';
  }

  private capitalizeWords(text: string): string {
    if (!text) return text;
    
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  validateForm(): boolean {
    if (!this.validateStepsUpTo(5)) {
      return false;
    }

    if (!this.formData.info) {
      this.showAlert('Debe seleccionar cómo se enteró del evento');
      return false;
    }

    if (this.formData.info === 'Otro' && !this.formData.otherInfo) {
      this.showAlert('Debe especificar cómo se enteró del evento');
      return false;
    }

    if (this.formData.group && !this.formData.origamigroup) {
      this.showAlert('Debe especificar el grupo de origami al que pertenece');
      return false;
    }

    if (this.formData.cards) {
      if (!this.formData.cardGroup) {
        this.showAlert('Debe especificar el número de grupos para el intercambio de tarjetas');
        return false;
      }
      
      const numGroups = parseInt(this.formData.cardGroup);
      if (isNaN(numGroups) || numGroups < 1 || numGroups > 2) {
        this.showAlert('El número de grupos para intercambio de tarjetas debe ser 1 o 2');
        return false;
      }
    }

    if (this.formData.go_to_chiva) {
      if (this.formData.chiva_accompanied === undefined) {
        this.showAlert('Debe indicar si irá solo o con acompañantes a la chiva rumbera');
        return false;
      }
      
      if (this.formData.chiva_accompanied === true) {
        if (!this.formData.chiva_companions) {
          this.showAlert('Debe indicar cuántos acompañantes llevará a la chiva rumbera');
          return false;
        }
        
        const numCompanions = parseInt(this.formData.chiva_companions);
        if (isNaN(numCompanions) || numCompanions < 2) {
          this.showAlert('El número de acompañantes debe ser al menos 2');
          return false;
        }
        
        if (numCompanions > 3) {
          this.showAlert('El número máximo de acompañantes permitido es 3');
          return false;
        }
      }
    }

    return true;
  }

  resetForm() {
    if (!this.isSubmitted) {
      this.formData = {
        name: '',
        lastname: '',
        age: '',
        country: '57',
        city: '',
        email: '',
        phone: '',
        idname: '',
        paymethod: '',
        paydate: '',
        receipt: '',
        companion: '',
        info: '',
        otherInfo: '',
        printCertificate: false,
        group: false,
        origamigroup: '',
        cards: false,
        cardGroup: '',
        workshops: false,
        go_to_chiva: false,
        chiva_companions: '',
        chiva_accompanied: false,
        days: '',
        participateInWorkshops: false
      };
      this.workshops = [];
    }
  }

  startNewRegistration() {
    this.isSubmitted = false;
    this.submittedEmail = '';
    this.isSubmitting = false;
    
    this.formData = {
      name: '',
      lastname: '',
      age: '',
      country: '57',
      city: '',
      email: '',
      phone: '',
      idname: '',
      paymethod: '',
      paydate: '',
      receipt: '',
      companion: '',
      info: '',
      otherInfo: '',
      printCertificate: false,
      group: false,
      origamigroup: '',
      cards: false,
      cardGroup: '',
      workshops: false,
      go_to_chiva: false,
      chiva_companions: '',
      chiva_accompanied: undefined,
      days: '',
      participateInWorkshops: false
    };
    
    this.workshops = [];
    
    this.chivaCompanionsError = '';
    
    this.currentStep = 1;
  }

  onGroupChange(event: Event) {
    this.formData.group = (event.target as HTMLInputElement).checked;
    if (!this.formData.group) {
      this.formData.origamigroup = '';
    }
  }

  onCardsChange(event: Event) {
    this.formData.cards = (event.target as HTMLInputElement).checked;
    if (!this.formData.cards) {
      this.formData.cardGroup = '';
    }
  }

  onInfoChange(event: Event) {
    this.formData.info = (event.target as HTMLSelectElement).value;
    if (this.formData.info !== 'Otro') {
      this.formData.otherInfo = '';
    }
  }

  onChivaChange(event: Event) {
    this.formData.go_to_chiva = (event.target as HTMLInputElement).checked;
    
    // Si desmarca la opción de chiva, reiniciar valores relacionados
    if (!this.formData.go_to_chiva) {
      this.formData.chiva_accompanied = undefined; // Reiniciar a undefined para forzar selección
      this.formData.chiva_companions = '';
      this.chivaCompanionsError = '';
    } else {
      // Si marca la opción de chiva, asegurarse de que ninguna opción esté preseleccionada
      this.formData.chiva_accompanied = undefined;
    }
    
    console.log('Estado de chiva:', this.formData.go_to_chiva);
  }

  onChivaAccompaniedChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.formData.chiva_accompanied = value === 'true';
    
    if (this.formData.chiva_accompanied === false) {
      this.formData.chiva_companions = '';
      this.chivaCompanionsError = '';
    } else {
      // Si selecciona que llevará acompañantes, asegurar que el campo se inicialice vacío
      this.formData.chiva_companions = '';
      
      // Enfocar el campo después de un breve retraso para garantizar que el DOM esté actualizado
      setTimeout(() => {
        const companionsInput = document.getElementById('chiva_companions');
        if (companionsInput) {
          companionsInput.focus();
        }
      }, 100);
    }
    
    // Disparar detección de cambios manualmente (forzar actualización de la vista)
    console.log("Cambio de acompañante:", this.formData.chiva_accompanied);
  }

  validateChivaCompanions() {
    if (this.formData.chiva_accompanied && this.formData.chiva_companions) {
      const numCompanions = parseInt(this.formData.chiva_companions);
      
      if (isNaN(numCompanions)) {
        this.chivaCompanionsError = 'Por favor ingresa un número válido';
      } else if (numCompanions < 2) {
        this.chivaCompanionsError = 'Debe ser al menos 2 acompañantes';
      } else if (numCompanions > 3) {
        this.chivaCompanionsError = 'El máximo permitido es de 3 acompañantes';
      } else {
        this.chivaCompanionsError = '';
      }
    } else {
      this.chivaCompanionsError = '';
    }
  }

  onlyNumbers(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngAfterViewChecked() {
    if (this.formData.go_to_chiva) {
      console.log('Acompañado:', this.formData.chiva_accompanied);
      console.log('Número de acompañantes:', this.formData.chiva_companions);
    }
  }
}
