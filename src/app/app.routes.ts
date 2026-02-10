import { Routes } from '@angular/router';
// Importamos el componente desde el archivo sin la extensión .component
import { PacienteListComponent } from './components/paciente-list/paciente-list';
import { PacienteFormComponent } from './components/paciente-form/paciente-form';

import { MedicoListComponent } from './components/medico-list/medico-list';
import { MedicoFormComponent } from './components/medico-form/medico-form';

import { CitaListComponent } from './components/cita-list/cita-list';
import { CitaFormComponent } from './components/cita-form/cita-form';

import { DiagnosticoListComponent } from './components/diagnostico-list/diagnostico-list';
import { DiagnosticoFormComponent } from './components/diagnostico-form/diagnostico-form';

export const routes: Routes = [
  // Si la ruta está vacía, redirigimos a pacientes
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },

  // --- PACIENTES ---
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'pacientes/nuevo', component: PacienteFormComponent },
  { path: 'pacientes/editar/:id', component: PacienteFormComponent },

  // --- MEDICOS ---
  { path: 'medicos', component: MedicoListComponent },
  { path: 'medicos/nuevo', component: MedicoFormComponent },
  { path: 'medicos/editar/:id', component: MedicoFormComponent },

  // --- CITAS ---
  { path: 'citas', component: CitaListComponent },
  { path: 'citas/nuevo', component: CitaFormComponent },
  { path: 'citas/editar/:id', component: CitaFormComponent },

  // --- DIAGNOSTICOS ---
  { path: 'diagnosticos', component: DiagnosticoListComponent },
  { path: 'diagnosticos/nuevo', component: DiagnosticoFormComponent },
  { path: 'diagnosticos/editar/:id', component: DiagnosticoFormComponent }
];