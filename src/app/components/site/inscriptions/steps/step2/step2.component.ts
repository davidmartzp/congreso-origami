import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InscriptionService } from '../../../../../services/inscription.service';
import { TranslationService } from '../../../../../services/translation.service';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html', 
  styleUrls: ['./step2.component.css'],
  imports: [FormsModule, CommonModule],
})
export class Step2Component {
  readonly ts = inject(TranslationService);
  readonly t = computed(() => this.ts.t().inscriptions);
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

  private showAlert(message: string, title: string = '', icon: 'warning' | 'error' | 'success' | 'info' | 'question' = 'warning') {
    const resolvedTitle = title || this.t().alertTitle;
    return Swal.fire({
      title: resolvedTitle,
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
      this.showAlert(this.t().valName);
      return false;
    }
    if (!this.formData.lastname) {
      this.showAlert(this.t().valLastname);
      return false;
    }
    if (!this.formData.age) {
      this.showAlert(this.t().valAge);
      return false;
    }
    if (!this.formData.idname) {
      this.showAlert(this.t().valIdname);
      return false;
    }
    return true;
  }

  validateContactInfo(): boolean {
    if (!this.formData.country) {
      this.showAlert(this.t().valCountry);
      return false;
    }
    if (!this.formData.city) {
      this.showAlert(this.t().valCity);
      return false;
    }
    if (!this.formData.email) {
      this.showAlert(this.t().valEmail);
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,4}$/;
    if (!emailRegex.test(this.formData.email)) {
      this.showAlert(this.t().valEmailInvalid);
      return false;
    }
    if (!this.formData.phone) {
      this.showAlert(this.t().valPhone);
      return false;
    }
    if (!/^\d+$/.test(this.formData.phone)) {
      this.showAlert(this.t().valPhoneNumeric);
      return false;
    }
    return true;
  }

  validatePaymentInfo(): boolean {
    if (!this.formData.paymethod) {
      this.showAlert(this.t().valPayMethod);
      return false;
    }
    
    if (this.requierePayDate()) {
      if (!this.formData.paydate) {
        this.showAlert(this.t().valPayDate);
        return false;
      }
      if (!this.formData.receipt) {
        this.showAlert(this.t().valReceipt);
        return false;
      }
    }
    
    return true;
  }

  validateParticipationInfo(): boolean {
    if (!this.formData.days) {
      this.showAlert(this.t().valDays);
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
            this.t().submitError,
            this.t().submitErrorTitle,
            "error"
          );
          this.isSubmitting = false;
        }
      });
    }
  }

  private getCountryName(countryCode: string): string {
    const countryMap: { [key: string]: string } = {
      '93': 'Afghanistan (+93)',
      '213': 'Algeria (+213)',
      '244': 'Angola (+244)',
      '247': 'Ascension Island (+247)',
      '61': 'Australia (+61)',
      '297': 'Aruba (+297)',
      '229': 'Benin (+229)',
      '267': 'Botswana (+267)',
      '55': 'Brazil (+55)',
      '226': 'Burkina Faso (+226)',
      '257': 'Burundi (+257)',
      '237': 'Cameroon (+237)',
      '238': 'Cape Verde (+238)',
      '236': 'Central African Republic (+236)',
      '86': 'China (+86)',
      '57': 'Colombia (+57)',
      '242': 'Congo (+242)',
      '243': 'Congo (DRC) (+243)',
      '269': 'Comoros (+269)',
      '246': 'Diego Garcia (+246)',
      '253': 'Djibouti (+253)',
      '291': 'Eritrea (+291)',
      '251': 'Ethiopia (+251)',
      '298': 'Faroe Islands (+298)',
      '33': 'France (+33)',
      '241': 'Gabon (+241)',
      '220': 'Gambia (+220)',
      '49': 'Germany (+49)',
      '233': 'Ghana (+233)',
      '299': 'Greenland (+299)',
      '224': 'Guinea (+224)',
      '245': 'Guinea-Bissau (+245)',
      '91': 'India (+91)',
      '62': 'Indonesia (+62)',
      '98': 'Iran (+98)',
      '225': 'Ivory Coast (+225)',
      '81': 'Japan (+81)',
      '254': 'Kenya (+254)',
      '266': 'Lesotho (+266)',
      '231': 'Liberia (+231)',
      '218': 'Libya (+218)',
      '261': 'Madagascar (+261)',
      '265': 'Malawi (+265)',
      '223': 'Mali (+223)',
      '222': 'Mauritania (+222)',
      '230': 'Mauritius (+230)',
      '95': 'Myanmar (+95)',             // ✔️ Ahora está en el lugar correcto
      '64': 'New Zealand (+64)',
      '227': 'Niger (+227)',
      '234': 'Nigeria (+234)',
      '47': 'Norway (+47)',
      '90': 'Pakistan (+90)',
      '63': 'Philippines (+63)',
      '48': 'Poland (+48)',
      '351': 'Portugal (+351)',
      '262': 'Reunion (+262)',
      '7': 'Russia (+7)',
      '250': 'Rwanda (+250)',
      '290': 'Saint Helena (+290)',
      '239': 'Sao Tome and Principe (+239)',
      '221': 'Senegal (+221)',
      '248': 'Seychelles (+248)',
      '65': 'Singapore (+65)',
      '232': 'Sierra Leone (+232)',
      '94': 'Sri Lanka (+94)',
      '27': 'South Africa (+27)',
      '82': 'South Korea (+82)',
      '34': 'Spain (+34)',
      '268': 'Swaziland (+268)',
      '46': 'Sweden (+46)',
      '66': 'Thailand (+66)',
      '228': 'Togo (+228)',
      '216': 'Tunisia (+216)',
      '92': 'Turkey (+92)',
      '256': 'Uganda (+256)',
      '1': 'USA (+1)',
      '58': 'Venezuela (+58)',
      '31': 'Netherlands (+31)',
      '260': 'Zambia (+260)',
      '263': 'Zimbabwe (+263)'
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
      this.showAlert(this.t().valHowHeard);
      return false;
    }

    if (this.formData.info === 'Otro' && !this.formData.otherInfo) {
      this.showAlert(this.t().valHowHeardSpecify);
      return false;
    }

    if (this.formData.group && !this.formData.origamigroup) {
      this.showAlert(this.t().valOrigamiGroup);
      return false;
    }

    if (this.formData.cards) {
      if (!this.formData.cardGroup) {
        this.showAlert(this.t().valCardGroup);
        return false;
      }
      
      const numGroups = parseInt(this.formData.cardGroup);
      if (isNaN(numGroups) || numGroups < 1 || numGroups > 2) {
        this.showAlert(this.t().valCardGroupRange);
        return false;
      }
    }

    if (this.formData.go_to_chiva) {
      if (this.formData.chiva_accompanied === undefined) {
        this.showAlert(this.t().valChivaAccompanied);
        return false;
      }
      
      if (this.formData.chiva_accompanied === true) {
        if (!this.formData.chiva_companions) {
          this.showAlert(this.t().valChivaCompanions);
          return false;
        }
        
        const numCompanions = parseInt(this.formData.chiva_companions);
        if (isNaN(numCompanions) || numCompanions < 2) {
          this.showAlert(this.t().valChivaMin);
          return false;
        }
        
        if (numCompanions > 3) {
          this.showAlert(this.t().valChivaMax);
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
        this.chivaCompanionsError = this.t().chivaErrNum;
      } else if (numCompanions < 2) {
        this.chivaCompanionsError = this.t().chivaErrMin;
      } else if (numCompanions > 3) {
        this.chivaCompanionsError = this.t().chivaErrMax;
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
