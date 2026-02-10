import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Asegúrate de que este import apunte a tu archivo de servicio correcto (el que arreglamos en el paso anterior)
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/interfaces';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-list.html',
  styleUrls: ['./paciente-list.css']
})
export class PacienteListComponent implements OnInit {

  pacientes: Paciente[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(
    private pacienteService: PacienteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.cargando = true;
    this.pacienteService.getPacientes().subscribe({
      next: (datos) => {
        this.pacientes = datos;
        this.cargando = false;
        this.cdr.detectChanges(); // Forzar actualización de vista
      },
      error: (e) => {
        console.error('Error al cargar pacientes:', e);
        this.error = 'No se pudieron cargar los datos. Revisa que la API esté encendida.';
        this.cargando = false;
        this.cdr.detectChanges(); // Forzar actualización de vista
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.eliminar(id).subscribe({
        next: () => {
          this.cargarPacientes();
        },
        error: (e) => {
          alert('Error al eliminar el paciente');
          this.cdr.detectChanges(); // Forzar por si acaso
        }
      });
    }
  }
}
