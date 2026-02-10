import { Routes } from '@angular/router';
// Importamos el componente desde el archivo sin la extensión .component
import { PacienteListComponent } from './components/paciente-list/paciente-list';
import { PacienteFormComponent } from './components/paciente-form/paciente-form'; 

export const routes: Routes = [
  // Si la ruta está vacía, redirigimos a pacientes
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
  
  // Aquí decimos: "Si la URL es /pacientes, carga el PacienteListComponent"
  { path: 'pacientes', component: PacienteListComponent },

  // Ruta para CREAR (sin ID)
  { path: 'pacientes/nuevo', component: PacienteFormComponent },
  
  // Ruta para EDITAR (con ID)
  { path: 'pacientes/editar/:id', component: PacienteFormComponent }
];