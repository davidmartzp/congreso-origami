import { Routes } from '@angular/router';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';  
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/cms/dashboard/dashboard.component';
import { AttendeesComponent } from './pages/cms/attendees/attendees.component';
import { ResourcesPageComponent } from './pages/resources/resources.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CongresoAuthGuard } from './guards/congreso-auth.guard';
import { ScheduleComponent } from './pages/cms/schedule/schedule.component';
import { PublicAttendeesComponent } from './pages/public-attendees/public-attendees.component';
import { BookletComponent } from './pages/booklet/booklet.component';
import { ListsPageComponent } from './pages/lists-page/lists-page.component';
import { AmigosPlegadoresComponent } from './pages/amigos-plegadores/amigos-plegadores.component';

const pageRoutes: Routes = [
  { path: 'inscripciones', component: InscriptionsComponent },
  { path: 'talleres', component: WorkshopsComponent },
  { path: 'recursos', component: ResourcesPageComponent },
  { path: 'inscribir-talleres', component: PublicAttendeesComponent },
  { path: 'booklet', component: BookletComponent },
  { path: 'listas', component: ListsPageComponent },
  { path: 'amigos-plegadores', component: AmigosPlegadoresComponent },
];

export const routes: Routes = [
  // Spanish (default — no language prefix)
  { path: '', component: HomeComponent },
  ...pageRoutes,

  // English prefix: /en, /en/inscripciones, etc.
  { path: 'en', children: [
    { path: '', component: HomeComponent },
    ...pageRoutes,
  ]},

  // Portuguese prefix: /pt, /pt/inscripciones, etc.
  { path: 'pt', children: [
    { path: '', component: HomeComponent },
    ...pageRoutes,
  ]},

  // French prefix: /fr, /fr/inscripciones, etc.
  { path: 'fr', children: [
    { path: '', component: HomeComponent },
    ...pageRoutes,
  ]},

  // Legacy / convenience redirects
  { path: 'es', redirectTo: '', pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'workshops', redirectTo: 'talleres', pathMatch: 'full' },
  { path: 'inscriptions', redirectTo: 'inscripciones', pathMatch: 'full' },

  // CMS (no language prefix needed)
  { 
    path: 'congreso', 
    children: [ 
      { path: 'login',      component: LoginComponent,     canActivate: [CongresoAuthGuard] },
      { path: 'dashboard',  component: DashboardComponent, canActivate: [CongresoAuthGuard] },
      { path: 'asistentes', component: AttendeesComponent, canActivate: [CongresoAuthGuard] },
      { path: 'talleres',   component: ScheduleComponent,  canActivate: [CongresoAuthGuard] },
    ] 
  },

  { path: '**', component: NotFoundComponent }
];

