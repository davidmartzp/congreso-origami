import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendee } from '../../../../models/attendee.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-edit-attendee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-attendee-form.component.html',
  styleUrls: ['./edit-attendee-form.component.css']
})
export class EditAttendeeFormComponent implements OnChanges {
  @Input() attendee: Attendee = this.initializeAttendee(); // Initialize with default values
  @Input() visible: boolean = false; // Controls visibility of the form
  @Input() readOnly: boolean = false; // Controls whether the form is read-only
  @Output() close = new EventEmitter<void>(); // Event to close the form
  @Output() save = new EventEmitter<Attendee>(); // Event to save the attendee

  // Getter and setter for paydate to handle conversion 
  get paydate(): string | null {
    if (this.attendee?.paydate) {
      // Convert 'YYYY-MM-DD HH:MM:SS' to 'YYYY-MM-DD' for compatibility with <input type="date">
      return this.attendee.paydate.split(' ')[0];
    }
    return null;
  }

  set paydate(value: string | null) {
    if (this.attendee && value) {
      // Parse the date string as a local date and convert back to 'YYYY-MM-DD HH:MM:SS'
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      this.attendee.paydate = date.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attendee'] && changes['attendee'].currentValue) {
      const rawAttendee = changes['attendee'].currentValue;
      this.attendee = {
        id: Number(rawAttendee.id || 0),
        code: rawAttendee.code !== null && rawAttendee.code !== undefined ? Number(rawAttendee.code) : null,
        name: rawAttendee.name || '',
        lastname: rawAttendee.lastname || '',
        age: Number(rawAttendee.age || 0),
        country: rawAttendee.country || null,
        city: rawAttendee.city || null,
        email: rawAttendee.email || '',
        phone: rawAttendee.phone || '',
        companion: rawAttendee.companion || null,
        idname: rawAttendee.idname || null,
        paydate: rawAttendee.paydate || new Date().toISOString().slice(0, 19).replace('T', ' '),
        paymethod: rawAttendee.paymethod || null,
        receipt: rawAttendee.receipt || null,
        origamigroup: rawAttendee.origamigroup || null,
        info: rawAttendee.info || null,
        cardsgroup: rawAttendee.cardsgroup !== null && rawAttendee.cardsgroup !== undefined ? Number(rawAttendee.cardsgroup) : null,
        created_at: rawAttendee.created_at || null,
        updated_at: rawAttendee.updated_at || null,
        status: !!rawAttendee.status, // Ensures boolean
        cards: !!rawAttendee.cards, // Ensures boolean
        days: rawAttendee.days || null,
        staff: !!rawAttendee.staff, // Ensures boolean
        special_code: rawAttendee.special_code || null,
        go_to_chiva: !!rawAttendee.go_to_chiva, // Ensures boolean
        printCertificate: !!rawAttendee.printCertificate, // Ensures boolean
        chiva_companions: Number(rawAttendee.chiva_companions || 0),
        pay_amount: rawAttendee.pay_amount !== undefined && rawAttendee.pay_amount !== null ? String(rawAttendee.pay_amount) : null,
      };
    }
  }

  initializeAttendee(): Attendee {
    return {
      id: 0,
      code: null,
      name: '',
      lastname: '',
      age: 0,
      country: null,
      city: null,
      email: '',
      phone: '',
      companion: null,
      idname: null,
      paydate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      paymethod: null,
      receipt: null,
      origamigroup: null,
      info: null,
      cardsgroup: null, // As per model: number | null
      created_at: null,
      updated_at: null,
      status: false, // As per model: boolean
      cards: false, // As per model: boolean
      days: null,
      staff: false, // As per model: boolean
      special_code: null,
      go_to_chiva: false, // As per model: boolean
      printCertificate: false, // As per model: boolean
      chiva_companions: 0, // As per model: number (defaults to 0 if not nullable)
      pay_amount: null, // Ahora string | null
    };
  }

  onCardsChange() {
    if (!this.attendee.cards) {
        this.attendee.cardsgroup = null; // Consistent with model (number | null)
    }
  }

  onGoToChivaChange() {
    if (!this.attendee.go_to_chiva) {
        this.attendee.chiva_companions = 0; 
    }
  }

  onSave() {
    if (this.attendee) {
      const updatedAttendee: Attendee = {
        // Spread to ensure all fields are present, then override
        ...this.initializeAttendee(), // Start with a clean, typed default
        ...this.attendee, // Apply current form values

        // Trim string fields and ensure null for empty optional strings
        name: this.attendee.name.trim(),
        lastname: this.attendee.lastname.trim(),
        email: this.attendee.email.trim(),
        phone: this.attendee.phone.trim(),
        country: this.attendee.country?.trim() || null,
        city: this.attendee.city?.trim() || null,
        companion: this.attendee.companion?.trim() || null,
        idname: this.attendee.idname?.trim() || null,
        paymethod: this.attendee.paymethod?.trim() || null,
        receipt: this.attendee.receipt?.trim() || null,
        origamigroup: this.attendee.origamigroup?.trim() || null,
        info: this.attendee.info?.trim() || null,
        special_code: this.attendee.special_code?.trim() || null,
        days: this.attendee.days?.trim() || null,

        // Ensure correct numeric types
        age: Number(this.attendee.age || 0),
        code: this.attendee.code !== null && this.attendee.code !== undefined ? Number(this.attendee.code) : null,
        
        // Ensure boolean types
        status: !!this.attendee.status,
        cards: !!this.attendee.cards,
        staff: !!this.attendee.staff,
        go_to_chiva: !!this.attendee.go_to_chiva,
        printCertificate: !!this.attendee.printCertificate,

        // Conditional numeric/null fields
        cardsgroup: this.attendee.cards ? Number(this.attendee.cardsgroup || 0) : null,
        chiva_companions: this.attendee.go_to_chiva ? Number(this.attendee.chiva_companions || 0) : 0,
        pay_amount: this.attendee.pay_amount !== undefined && this.attendee.pay_amount !== null ? String(this.attendee.pay_amount) : null,
      };
      
      // Ensure id is a number
      updatedAttendee.id = Number(this.attendee.id || 0);

      this.save.emit(updatedAttendee);

      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El asistente ha sido actualizado correctamente.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }

  onClose() {
    this.close.emit(); // Emit the close event
  }

  onPayAmountKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const char = event.key;

    // Permitir solo dígitos y un punto (.) como separador decimal
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
      return;
    }

    // Solo un punto permitido (separador decimal)
    if (char === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }

    // No permitir punto como primer carácter
    if (char === '.' && value.length === 0) {
      event.preventDefault();
      return;
    }

    // Obtener la posición del cursor y el valor resultante si se permite el carácter
    const selectionStart = input.selectionStart ?? value.length;
    const selectionEnd = input.selectionEnd ?? value.length;
    const newValue =
      value.substring(0, selectionStart) +
      char +
      value.substring(selectionEnd);

    const [integerPart = '', decimalPart = ''] = newValue.split('.');

    // Limitar a 2 decimales después del punto
    if (newValue.includes('.') && decimalPart.length > 2 && selectionStart > newValue.indexOf('.')) {
      event.preventDefault();
      return;
    }
  }
}
