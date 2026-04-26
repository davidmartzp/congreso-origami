import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/cms/sidebar/sidebar.component';
import { AttendeesService } from '../../../services/attendees.service';
import { EditAttendeeFormComponent } from './edit-attendee-form/edit-attendee-form.component';
import { Attendee } from '../../../models/attendee.model'; // Import the Attendee interface
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-attendees',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, EditAttendeeFormComponent],
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class AttendeesComponent implements OnInit {
  // User information (reused from dashboard)
  user = {
    name: 'Usuario Demo',
    role: 'Administrador',
    avatar: 'assets/images/avatar.png'
  };

  // Toggle sidebar in mobile view
  sidebarVisible = true;

  // Sample attendees data
  attendees: Attendee[] = [];

  // Filtered attendees
  filteredAttendees: Attendee[] = [];

  // Search term
  searchTerm: string = '';

  // Filter properties
  selectedStatus: string = ''; // For filtering by status
  selectedPaymentMethod: string = ''; // For filtering by type of inscription
  selectedPaymentDateStart: string = ''; // Start date for payment date range
  selectedPaymentDateEnd: string = ''; // End date for payment date range
  selectedNationality: string = ''; // For filtering by nationality
  selectedAgeGroup: string = ''; // New filter for minors/adults
  selectedCardsGroup: string = ''; // Nuevo filtro para tarjetas de intercambio

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Properties for edit form
  editingAttendee: Attendee = this.initializeAttendee(); // Initialize with default values
  showEditForm: boolean = false; // Controls the visibility of the edit form
  readOnly: boolean = false; // Controls whether the form is read-only

  // IDs seleccionados para confirmación múltiple
  ids: number[] = [];

  constructor(private attendeesService: AttendeesService) {}

  ngOnInit() {
    // Fetch attendees from the service
    this.fetchAttendees();
  }

  fetchAttendees() {
    this.attendeesService.getAttendees().subscribe((response: any[]) => {
      this.attendees = response.map(item => this.normalizeAttendee(item));
      this.filterAttendees(); // Apply initial filtering
    });
  }

  normalizeAttendee(item: any): Attendee {
    // Ensure item is an object, otherwise use an empty one to prevent errors
    const safeItem = typeof item === 'object' && item !== null ? item : {};

    return {
      id: Number(safeItem.id || 0),
      code: safeItem.code !== null && safeItem.code !== undefined ? Number(safeItem.code) : null,
      name: safeItem.name || '',
      lastname: safeItem.lastname || '',
      age: Number(safeItem.age || 0),
      country: safeItem.country || null,
      city: safeItem.city || null,
      email: safeItem.email || '',
      phone: safeItem.phone || '',
      companion: safeItem.companion || null,
      idname: safeItem.idname || null,
      paydate: safeItem.paydate || new Date().toISOString().slice(0, 19).replace('T', ' '),
      paymethod: safeItem.paymethod || null,
      receipt: safeItem.receipt || null,
      origamigroup: safeItem.origamigroup || null,
      info: safeItem.info || null,
      cardsgroup: safeItem.cardsgroup !== null && safeItem.cardsgroup !== undefined ? Number(safeItem.cardsgroup) : null,
      created_at: safeItem.created_at || null,
      updated_at: safeItem.updated_at || null,
      status: safeItem.status === 1 || safeItem.status === true, // Handles 0/1 or true/false from backend
      cards: safeItem.cards === 1 || safeItem.cards === true, // Handle int as boolean
      days: safeItem.days || null,
      staff: !!safeItem.staff, // Ensures boolean
      special_code: safeItem.special_code || null,
      go_to_chiva: !!safeItem.go_to_chiva, // Ensures boolean
      printCertificate: !!safeItem.printCertificate, // Ensures boolean
      chiva_companions: Number(safeItem.chiva_companions || 0),
      pay_amount: safeItem.pay_amount || null,
    };
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  filterAttendees() {
    this.filteredAttendees = this.attendees.filter(attendee => {
      const matchesSearchTerm =
        this.searchTerm === '' ||
        attendee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        attendee.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        attendee.phone.includes(this.searchTerm);

      const matchesStatus =
        this.selectedStatus === '' ||
        (this.selectedStatus === 'Confirmado' && attendee.status === true) ||
        (this.selectedStatus === 'Pendiente' && attendee.status === false);

      const matchesPaymentMethod =
        this.selectedPaymentMethod === '' || attendee.paymethod === this.selectedPaymentMethod;

      const matchesPaymentDate =
        (this.selectedPaymentDateStart === '' || new Date(attendee.paydate) >= new Date(this.selectedPaymentDateStart)) &&
        (this.selectedPaymentDateEnd === '' || new Date(attendee.paydate) <= new Date(this.selectedPaymentDateEnd));

      const matchesNationality =
        this.selectedNationality === '' ||
        (this.selectedNationality === 'Nacional' && (attendee.country?.toLowerCase() || '').includes('colombia')) ||
        (this.selectedNationality === 'Extranjero' && !(attendee.country?.toLowerCase() || '').includes('colombia'));

      const matchesAgeGroup =
        this.selectedAgeGroup === '' ||
        (this.selectedAgeGroup === 'Menores' && attendee.age <= 13) ||
        (this.selectedAgeGroup === 'Adultos' && attendee.age > 13);

      // Nuevo filtro: Participa en Tarjetas
      const matchesCardsGroup =
        this.selectedCardsGroup === '' ||
        (this.selectedCardsGroup === 'Si' && attendee.cardsgroup && attendee.cardsgroup > 0) ||
        (this.selectedCardsGroup === 'No' && (!attendee.cardsgroup || attendee.cardsgroup === 0));

      return (
        matchesSearchTerm &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesPaymentDate &&
        matchesNationality &&
        matchesAgeGroup &&
        matchesCardsGroup // Agrega el filtro aquí
      );
    });

    // Reset pagination to the first page after filtering
    this.currentPage = 1;
  }

  // Method to get paginated attendees
  get paginatedAttendees(): Attendee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAttendees.slice(startIndex, endIndex);
  }

  // Method to change page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Method to get total pages
  get totalPages(): number {
    return Math.ceil(this.filteredAttendees.length / this.itemsPerPage);
  }

  // Counter methods
  get totalAttendees(): number {
    return this.attendees.length; // Use attendees for total count
  }

  get minors(): number {
    return this.attendees.filter(attendee => attendee.age <= 13).length;
  }

  get adults(): number {
    return this.attendees.filter(attendee => attendee.age > 13).length;
  }

  get foreigners(): number {
    return this.attendees.filter(attendee => !(attendee.country?.toLowerCase() || '').includes('colombia')).length;
  }

  get confirmed(): number {
    return this.attendees.filter(attendee => attendee.status === true).length;
  }

  get pending(): number {
    return this.attendees.filter(attendee => attendee.status === false).length;
  }

  get chiva(): number {
    return this.attendees.filter(attendee => attendee.go_to_chiva).length; // Use attendees for chiva count
  }

  get certified(): number {
    return this.attendees.filter(attendee => attendee.printCertificate).length; // Use attendees for certified count
  }

  // Actions
  viewDetails(attendee: Attendee) {
    console.log('Viewing details of attendee:', attendee);
    this.editingAttendee = { ...attendee }; // Clone the attendee to avoid direct mutation
    this.readOnly = true; // Set the form to read-only mode
    this.showEditForm = true; // Show the edit form
  }

  editAttendee(attendee: Attendee | null) {
    if (attendee) {
      console.log('Editing existing attendee:', attendee);
      this.editingAttendee = this.normalizeAttendee({ ...attendee }); // Normalize a copy
    } else {
      console.log('Creating a new attendee');
      this.editingAttendee = this.initializeAttendee(); // Initialize with default values
    }
    this.readOnly = false; // Allow editing
    this.showEditForm = true; // Show the edit form
  }

  initializeAttendee(): Attendee {
    // This should exactly match the EditAttendeeFormComponent's initializeAttendee
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
      cardsgroup: null,
      created_at: null,
      updated_at: null,
      status: false,
      cards: false,
      days: null,
      staff: false,
      special_code: null,
      go_to_chiva: false,
      printCertificate: false,
      chiva_companions: 0,
      pay_amount: null,
    };
  }

  closeEditForm() {
    this.editingAttendee = this.initializeAttendee(); // Reset to default values
    this.showEditForm = false;
  }

  updateAttendee(updatedAttendee: Attendee) {
    // The updatedAttendee coming from the form should already be correctly typed by onSave in EditAttendeeFormComponent.
    // We just pass it to the service.
    // If the backend expects 0/1 for booleans, the service layer (or backend) should handle that conversion.
    // Here, we assume the Attendee object is what the service expects.

    console.log('Attendee to send to service:', updatedAttendee);

    this.attendeesService.updateAttendee(updatedAttendee).subscribe(() => {
      // Refresh the attendee list after saving
      this.fetchAttendees();

      // Close the edit form
      this.closeEditForm();
    });
  }

  deleteAttendee(attendee: Attendee) {
    Swal.fire({
      title: '¿Está seguro?',
      html: `Está a punto de eliminar al asistente "<b>${attendee.name} ${attendee.lastname}</b>".<br>
             <span style="color:red;">Esta acción no se puede deshacer.</span><br><br>
             <b>Escriba <span style="color:#d33;">eliminar</span> para confirmar:</b>
             <input id="swal-input-eliminar" class="swal2-input" autocomplete="off">`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const inputValue = (document.getElementById('swal-input-eliminar') as HTMLInputElement)?.value;
        if (inputValue !== 'eliminar') {
          Swal.showValidationMessage('Debe escribir exactamente la palabra "eliminar" para confirmar.');
          return false;
        }
        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Actualizar el status a 5
        const updatedAttendee = { ...attendee, status: 5 };
        this.attendeesService.updateAttendee(updatedAttendee).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Asistente eliminado',
              text: 'El asistente ha sido marcado como eliminado correctamente.',
            });
            this.fetchAttendees();
          },
          (error) => {
            console.error('Error al eliminar asistente:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar el asistente. Por favor, inténtelo de nuevo.',
            });
          }
        );
      }
    });
  }

  getPhoneWithCountryCode(attendee: Attendee): string {
    const countryCodeMatch = attendee.country?.match(/\(\+\d+\)/); // Extract country code using regex
    const countryCode = countryCodeMatch ? countryCodeMatch[0] : ''; // Default to empty if no match
    return `${countryCode} ${attendee.phone}`;
  }

  exportarExcel() {
    const tabla = document.getElementById('miTabla');
    const hoja = XLSX.utils.table_to_sheet(tabla);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Hoja1');

    XLSX.writeFile(libro, 'reporte.xlsx'); // 👈 esto guarda el archivo directamente
  }

  exportarFiltradosExcel() {
    // Generar nombre de archivo con fecha y hora
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const fechaHora = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    if (this.selectedCardsGroup) {
      // Exportar nombre, apellido, email, teléfono y cardsgroup con cabeceras en español
      const data = this.filteredAttendees.map(a => ({
        'Nombre': a.name,
        'Apellido': a.lastname,
        'Correo electrónico': a.email,
        'Teléfono': a.phone,
        'Cantidad de Tarjetas': a.cardsgroup ?? 0
      }));
      const headers = ['Nombre', 'Apellido', 'Correo electrónico', 'Teléfono', 'Cantidad de Tarjetas'];
      const hoja = XLSX.utils.json_to_sheet(data, { header: headers });
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, 'Tarjetas');
      XLSX.writeFile(libro, `tarjetas_${fechaHora}.xlsx`);
    } else {
      // Exportar la tabla oculta completa
      const tabla = document.getElementById('tablaExportacion');
      if (!tabla) return;
      tabla.style.display = '';
      const hoja = XLSX.utils.table_to_sheet(tabla);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, 'AsistentesFiltrados');
      XLSX.writeFile(libro, `asistentes_filtrados_${fechaHora}.xlsx`);
      tabla.style.display = 'none';
    }
  }

  toggleAttendeeSelection(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.ids.includes(id)) {
        this.ids.push(id);
      }
    } else {
      this.ids = this.ids.filter(existingId => existingId !== id);
    }
  }

  toggleSelectAllCurrentPage(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageIds = this.paginatedAttendees.map(a => a.id);
    if (checked) {
      // Agregar todos los IDs de la página actual que no estén ya en ids
      currentPageIds.forEach(id => {
        if (!this.ids.includes(id)) {
          this.ids.push(id);
        }
      });
    } else {
      // Quitar todos los IDs de la página actual de ids
      this.ids = this.ids.filter(id => !currentPageIds.includes(id));
    }
  }

  areAllCurrentPageSelected(): boolean {
    const currentPageIds = this.paginatedAttendees.map(a => a.id);
    return currentPageIds.length > 0 && currentPageIds.every(id => this.ids.includes(id));
  }
 
  confirmMultipleAttendees() {
    if (this.ids.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay asistentes seleccionados',
        text: 'Por favor seleccione al menos un asistente para confirmar.',
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de confirmar el estado de ${this.ids.length} asistentes. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Confirmando asistentes con IDs:', this.ids);
        this.attendeesService.confirmManyAttendees({ ids: this.ids }).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Asistentes confirmados',
              text: 'El estado de los asistentes seleccionados ha sido actualizado correctamente.',
            });
            // Actualizar la lista de asistentes después de la confirmación
            this.fetchAttendees();
            // Limpiar la selección
            this.ids = [];
          },
          (error) => {
            console.error('Error al confirmar asistentes:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al confirmar los asistentes. Por favor, inténtelo de nuevo.',
            });
          }
        );
      }
    });
  }
}
