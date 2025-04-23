import { Routes } from '@angular/router';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';  

export const routes: Routes = [ 
  { path: 'talleres', component: WorkshopsComponent }, 
  { path: 'inscripciones', component: InscriptionsComponent }, // Assuming the same component is used for both routes
  { path: 'workshops', redirectTo: 'talleres', pathMatch: 'full' },
  { path: 'inscriptions', redirectTo: 'inscripciones', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Root path shows HomeComponent directly
  { path: 'home', redirectTo: '', pathMatch: 'full' }, // Redirect /home to the root URL
  { path: '**', redirectTo: '' } // Catch all unknown routes and redirect to root

  
];

