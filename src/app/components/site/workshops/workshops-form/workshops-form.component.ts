import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { WorkshopsService } from '../../../../services/workshops.service';
import { CommonModule } from '@angular/common';

interface Workshop {
  assistantID: number;
  assistantName: string;
  id: number;
  name: string;
  public: string;
  level: string;
  duration: number; // Duration in hours
  observations: string | null;
  image: string;
  editing?: boolean;
}

interface Assistant {
  id: number;
  name: string;
  lastname: string; 
  email: string;
}

interface WorkshopResponse {
  wsp: Workshop[];
  ast: Assistant[];
}

@Component({
  selector: 'app-workshops-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './workshops-form.component.html',
  styleUrls: [
    './workshops-form.component.css', 
    './workshop-add.component.css',
    './workshops-mobile.component.css'
  ]
})
export class WorkshopsFormComponent {
  workshopForm: FormGroup;
  workshopsData: WorkshopResponse | null = null;
  workshops: Workshop[] = [];
  assistant: Assistant | null = null;
  loading = false;
  submitted = false;
  error = '';
  editForms: Map<number, FormGroup> = new Map();
  saveSuccess: Map<number, boolean> = new Map();

  // Variables para la gestión de imágenes
  uploadingImage: Map<number, boolean> = new Map();
  imageUploadSuccess: Map<number, boolean> = new Map();
  imageUploadError: Map<number, string> = new Map();

  // Variables para gestionar el proceso de eliminación
  deletingWorkshop: Map<number, boolean> = new Map();

  // Variables para gestionar la creación de talleres
  showNewWorkshopForm = false;
  newWorkshopForm: FormGroup;
  pendingWorkshops: any[] = [];
  addingWorkshops = false;
  addWorkshopsSuccess = false;

  constructor(
    private workshopsService: WorkshopsService,
    private formBuilder: FormBuilder
  ) {
    this.workshopForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Inicializar el formulario para nuevos talleres
    this.newWorkshopForm = this.createWorkshopFormGroup();
  }

  get f() { return this.workshopForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.workshopForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.workshops = [];
    this.assistant = null;
    this.editForms.clear();
    this.saveSuccess.clear();

    this.workshopsService.getWorkshopByEmail(this.f['email'].value)
      .subscribe({
        next: (response: any) => {
         let  data = response.data;
          this.workshopsData = data;
          this.workshops = data.wsp || [];
          this.assistant = data.ast?.length > 0 ? data.ast[0] : null;
          
          this.workshops.forEach(workshop => {
            this.initEditForm(workshop);
          });
          
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Ha ocurrido un error al cargar los talleres. Por favor, intenta de nuevo.';
          this.loading = false;
        }
      });
  }

  initEditForm(workshop: Workshop) {
    const form = this.formBuilder.group({
      name: [workshop.name, Validators.required],
      public: [workshop.public, Validators.required],
      level: [workshop.level, Validators.required],
      duration: [workshop.duration, Validators.required], // Duration in hours
      observations: [workshop.observations]
    });
    this.editForms.set(workshop.id, form);
  }

  toggleEdit(workshop: Workshop) {
    workshop.editing = !workshop.editing;
    if (!workshop.editing) {
      this.initEditForm(workshop);
    }
    this.saveSuccess.set(workshop.id, false);
  }

  saveWorkshop(workshop: Workshop) {
    if (!this.editForms.has(workshop.id)) return;
    
    const form = this.editForms.get(workshop.id)!;
    
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.get(key)?.markAsTouched();
      });
      return;
    }

    // Preparar los datos para enviar al servidor
    const updatedWorkshop = {
      id: workshop.id,
      name: form.value.name,
      public: form.value.public,
      level: form.value.level,
      duration: form.value.duration, // Duration in hours
      observations: form.value.observations
    };

    // Indicamos que estamos procesando
    this.loading = true;
    
    // Llamar al servicio para actualizar el taller
    this.workshopsService.updateWorkshop(updatedWorkshop)
      .subscribe({
        next: (response) => {
          // Actualizar los datos locales con los datos del formulario
          Object.assign(workshop, form.value);
          workshop.editing = false;
          this.saveSuccess.set(workshop.id, true);
          
          // Limpiar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.saveSuccess.set(workshop.id, false);
          }, 3000);
          
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al actualizar el taller:', err);
          this.error = 'Ha ocurrido un error al actualizar el taller. Por favor, intenta de nuevo.';
          this.loading = false;
        }
      });
  }

  getFormForWorkshop(id: number): FormGroup {
    return this.editForms.get(id) || this.formBuilder.group({});
  }

  getPublicOptions() {
    return [
      { value: 'A', label: 'Adultos' },
      { value: 'N', label: 'Niños' },
      { value: 'T', label: 'Todos' }
    ];
  }

  getLevelOptions() {
    return [
      { value: 'A', label: 'Avanzado' },
      { value: 'I', label: 'Intermedio' },
      { value: 'P', label: 'Principiante' }
    ];
  }

  // Añadir método para obtener las opciones de duración
  getTimeOptions() {
    return [
      { value: 1, label: '1 Hora' },
      { value: 2, label: '2 Horas' },
      { value: 3, label: '3 Horas' }
    ]; // Duration in hours
  }

  // Función para construir la URL de la imagen del taller
  getWorkshopImageUrl(imageName: string): string {
    // Ruta base de las imágenes de talleres actualizada
    return `https://origamibogota.com/app-ob/storage/app/public/images/${imageName}`;
  }

  // Imagen por defecto en caso de error
  getDefaultImageUrl(): string {
    return 'https://origamibogota.com/app-ob/storage/app/public/images/default.jpg';
  }

  // Verifica si un taller tiene imagen
  hasImage(workshop: Workshop): boolean {
    return typeof workshop.image === 'string' && workshop.image.trim() !== '';
  }
  
  // Abre el selector de archivos
  triggerFileInput(workshopId: number): void {
    const fileInput = document.getElementById(`file-input-${workshopId}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  // Maneja el cambio en la selección de archivos
  onFileSelected(event: any, workshop: Workshop): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file, workshop);
    }
  }
  
  // Sube la imagen al servidor
  uploadImage(file: File, workshop: Workshop): void {
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      this.imageUploadError.set(workshop.id, 'El archivo seleccionado no es una imagen válida.');
      return;
    }
    
    // Limpiar estados anteriores
    this.imageUploadSuccess.set(workshop.id, false);
    this.imageUploadError.set(workshop.id, '');
    this.uploadingImage.set(workshop.id, true);
    
    this.workshopsService.uploadWorkshopImage(workshop.id, file)
      .subscribe({
        next: (response) => {
          console.log('Imagen subida con éxito:', response);
          
          // Actualizar la imagen del taller en el objeto local temporalmente
          if (response.imageName) {
            workshop.image = response.imageName;
          }
          
          this.uploadingImage.set(workshop.id, false);
          this.imageUploadSuccess.set(workshop.id, true);
          
          // Recargar los datos del taller para asegurar que todo está sincronizado
          if (this.assistant && this.assistant.email) {
            // Usamos el email del asistente actual para recargar todos los talleres
            this.workshopsService.getWorkshopByEmail(this.assistant.email)
              .subscribe({
                next: (response: any) => {
                  let data = response.data;
                  // Actualizar solo los talleres, manteniendo la referencia al asistente
                  this.workshops = data.wsp || [];
                  
                  // Reinicializar los formularios de edición para cada taller
                  this.workshops.forEach(workshop => {
                    this.initEditForm(workshop);
                  });
                  
                  // Ocultar el mensaje de éxito después de 3 segundos
                  setTimeout(() => {
                    this.imageUploadSuccess.set(workshop.id, false);
                  }, 3000);
                },
                error: (err) => {
                  console.error('Error al recargar los talleres:', err);
                  // Aún así debemos ocultar el mensaje después de 3 segundos
                  setTimeout(() => {
                    this.imageUploadSuccess.set(workshop.id, false);
                  }, 3000);
                }
              });
          } else {
            // Si no tenemos el email, simplemente ocultamos el mensaje después de 3 segundos
            setTimeout(() => {
              this.imageUploadSuccess.set(workshop.id, false);
            }, 3000);
          }
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
          this.uploadingImage.set(workshop.id, false);
          this.imageUploadError.set(workshop.id, 'Ha ocurrido un error al subir la imagen. Por favor, intenta de nuevo.');
        }
      });
  }

  // Método para eliminar un taller
  deleteWorkshop(workshop: Workshop): void {
    // Confirmación antes de eliminar
    if (!confirm(`¿Estás seguro de que deseas eliminar el taller "${workshop.name}"?`)) {
      return;
    }
    
    // Indicar que estamos eliminando este taller
    this.deletingWorkshop.set(workshop.id, true);
    this.error = '';
    
    this.workshopsService.deleteWorkshop(workshop.id)
      .subscribe({
        next: (response) => {
          // Eliminar el taller de la lista local después de eliminarlo en el servidor
          this.workshops = this.workshops.filter(w => w.id !== workshop.id);
          this.deletingWorkshop.set(workshop.id, false);
        },
        error: (err) => {
          console.error('Error al eliminar el taller:', err);
          this.error = 'Ha ocurrido un error al eliminar el taller. Por favor, intenta de nuevo.';
          this.deletingWorkshop.set(workshop.id, false);
        }
      });
  }

  // Crea un nuevo FormGroup para un taller
  createWorkshopFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      public: ['A', Validators.required],
      level: ['P', Validators.required],
      duration: [1, Validators.required], // Default to 1 hour
      observations: ['']
    });
  }

  // Muestra u oculta el formulario para añadir talleres
  toggleNewWorkshopForm(): void {
    this.showNewWorkshopForm = !this.showNewWorkshopForm;
    if (this.showNewWorkshopForm) {
      // Resetear el formulario cuando se muestra
      this.newWorkshopForm = this.createWorkshopFormGroup();
    }
  }

  // Añade un taller a la lista pendiente
  addWorkshopToPending(): void {
    if (this.newWorkshopForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.newWorkshopForm.controls).forEach(key => {
        this.newWorkshopForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    // Añadir el taller a la lista pendiente
    this.pendingWorkshops.push(this.newWorkshopForm.value);
    
    // Resetear el formulario para añadir otro taller
    this.newWorkshopForm = this.createWorkshopFormGroup();
    
    // Mostrar mensaje de éxito brevemente
    this.addWorkshopsSuccess = true;
    setTimeout(() => {
      this.addWorkshopsSuccess = false;
    }, 3000);
  }

  // Envía un nuevo taller al servidor
  addNewWorkshop(): void {
    if (!this.assistant) return;
    
    if (this.newWorkshopForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.newWorkshopForm.controls).forEach(key => {
        this.newWorkshopForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.addingWorkshops = true;
    this.error = '';
    
    // Creamos un array con un solo taller para el endpoint
    const workshopsToAdd = [this.newWorkshopForm.value];
    
    this.workshopsService.addWorkshops(this.assistant.id, workshopsToAdd)
      .subscribe({
        next: (response) => {
          this.addingWorkshops = false;
          this.addWorkshopsSuccess = true;
          
          // Ocultar el formulario después de un tiempo
          setTimeout(() => {
            this.showNewWorkshopForm = false;
            this.addWorkshopsSuccess = false;
            
            // Recargar los talleres para mostrar el nuevo
            if (this.assistant && this.assistant.email) {
              this.workshopsService.getWorkshopByEmail(this.assistant.email)
                .subscribe({
                  next: (response: any) => {
                    let data = response.data;
                    this.workshops = data.wsp || [];
                    this.workshops.forEach(workshop => {
                      this.initEditForm(workshop);
                    });
                  },
                  error: (err) => {
                    console.error('Error al recargar los talleres:', err);
                  }
                });
            }
          }, 2000);
        },
        error: (err) => {
          console.error('Error al añadir el taller:', err);
          this.error = 'Ha ocurrido un error al añadir el taller. Por favor, intenta de nuevo.';
          this.addingWorkshops = false;
        }
      });
  }

  // Elimina un taller pendiente
  removePendingWorkshop(index: number): void {
    this.pendingWorkshops.splice(index, 1);
  }

  // Envía todos los talleres pendientes al servidor
  submitPendingWorkshops(): void {
    if (!this.assistant || this.pendingWorkshops.length === 0) {
      return;
    }
    
    this.addingWorkshops = true;
    this.error = '';
    
    this.workshopsService.addWorkshops(this.assistant.id, this.pendingWorkshops)
      .subscribe({
        next: (response) => {
          console.log('Talleres añadidos con éxito:', response);
          this.addingWorkshops = false;
          
          // Limpiar la lista de talleres pendientes
          this.pendingWorkshops = [];
          
          // Ocultar el formulario
          this.showNewWorkshopForm = false;
          
          // Recargar los talleres para mostrar los nuevos
          if (this.assistant && this.assistant.email) {
            this.workshopsService.getWorkshopByEmail(this.assistant.email)
              .subscribe({
                next: (response: any) => {
                  let data = response.data;
                  this.workshops = data.wsp || [];
                  this.workshops.forEach(workshop => {
                    this.initEditForm(workshop);
                  });
                },
                error: (err) => {
                  console.error('Error al recargar los talleres:', err);
                }
              });
          }
        },
        error: (err) => {
          console.error('Error al añadir talleres:', err);
          this.error = 'Ha ocurrido un error al añadir los talleres. Por favor, intenta de nuevo.';
          this.addingWorkshops = false;
        }
      });
  }
}
