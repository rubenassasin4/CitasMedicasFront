import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Necesario para formularios
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente, RegistrarPaciente, ActualizarPaciente } from '../../models/interfaces';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './paciente-form.html',
  styleUrls: ['./paciente-form.css']
})
export class PacienteFormComponent implements OnInit {

  form: FormGroup;
  id: number | null = null;
  esEdicion: boolean = false;
  titulo: string = 'Nuevo Paciente';

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    // Definimos el formulario y validaciones
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      // La clave es requerida al principio, pero la manejaremos dinámicamente
      clave: [''], 
      nss: ['', Validators.required],
      numTarjeta: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificamos si hay un ID en la URL
    const idUrl = this.aRoute.snapshot.paramMap.get('id');
    
    if (idUrl) {
      this.id = +idUrl;
      this.esEdicion = true;
      this.titulo = 'Editar Paciente';
      this.cargarDatosEdicion();
    } else {
      // Si es CREACIÓN, la clave es obligatoria
      this.form.get('clave')?.setValidators([Validators.required]);
    }
  }

  cargarDatosEdicion() {
    if (this.id) {
      this.pacienteService.getPaciente(this.id).subscribe({
        next: (paciente) => {
          // Rellenamos el formulario con los datos, EXCEPTO la clave (no se edita aquí)
          this.form.patchValue({
            nombre: paciente.nombre,
            apellidos: paciente.apellidos,
            nombreUsuario: paciente.nombreUsuario,
            nss: paciente.nss,
            numTarjeta: paciente.numTarjeta,
            telefono: paciente.telefono,
            direccion: paciente.direccion
          });
          // En edición, quitamos la validación de clave porque no se envía
          this.form.get('clave')?.clearValidators();
          this.form.get('clave')?.updateValueAndValidity();
        },
        error: (e) => console.error(e)
      });
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca campos en rojo si faltan datos
      return;
    }

    if (this.esEdicion && this.id) {
      // --- MODO EDICIÓN ---
      // Preparamos el objeto ActualizarPaciente (SIN CLAVE)
      const paciente: ActualizarPaciente = {
        nombre: this.form.value.nombre,
        apellidos: this.form.value.apellidos,
        nombreUsuario: this.form.value.nombreUsuario,
        nss: this.form.value.nss,
        numTarjeta: this.form.value.numTarjeta,
        telefono: this.form.value.telefono,
        direccion: this.form.value.direccion
      };

      this.pacienteService.actualizar(this.id, paciente).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: (e) => alert('Error al actualizar')
      });

    } else {
      // --- MODO CREACIÓN ---
      // Preparamos el objeto RegistrarPaciente (CON CLAVE)
      const paciente: RegistrarPaciente = {
        nombre: this.form.value.nombre,
        apellidos: this.form.value.apellidos,
        nombreUsuario: this.form.value.nombreUsuario,
        clave: this.form.value.clave,
        nss: this.form.value.nss,
        numTarjeta: this.form.value.numTarjeta,
        telefono: this.form.value.telefono,
        direccion: this.form.value.direccion
      };

      this.pacienteService.registrar(paciente).subscribe({
        next: () => this.router.navigate(['/pacientes']),
        error: (e) => alert('Error al registrar')
      });
    }
  }
}