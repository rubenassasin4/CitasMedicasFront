import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { Medico, Paciente, CrearCita, ActualizarCita } from '../../models/interfaces';

@Component({
    selector: 'app-cita-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './cita-form.html',
    styles: []
})
export class CitaFormComponent implements OnInit {

    form: FormGroup;
    id: number | null = null;
    esEdicion: boolean = false;
    titulo: string = 'Nueva Cita';

    medicos: Medico[] = [];
    pacientes: Paciente[] = [];

    constructor(
        private fb: FormBuilder,
        private citaService: CitaService,
        private medicoService: MedicoService,
        private pacienteService: PacienteService,
        private router: Router,
        private aRoute: ActivatedRoute
    ) {
        this.form = this.fb.group({
            fechaHora: ['', Validators.required],
            motivoCita: ['', Validators.required],
            medicoId: ['', Validators.required],
            pacienteId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        // Cargar listas para los select
        this.cargarListas();

        const idUrl = this.aRoute.snapshot.paramMap.get('id');

        if (idUrl) {
            this.id = +idUrl;
            this.esEdicion = true;
            this.titulo = 'Editar Cita';
            this.cargarDatosEdicion();
        }
    }

    cargarListas() {
        this.medicoService.getMedicos().subscribe(data => this.medicos = data);
        this.pacienteService.getPacientes().subscribe(data => this.pacientes = data);
    }

    cargarDatosEdicion() {
        if (this.id) {
            this.citaService.getCita(this.id).subscribe({
                next: (cita) => {
                    this.form.patchValue({
                        fechaHora: cita.fechaHora, // Asegurar formato compatible con input datetime-local si es necesario
                        motivoCita: cita.motivoCita,
                        medicoId: cita.medicoId,
                        pacienteId: cita.pacienteId
                    });

                    // En edición, deshabilitamos paciente porque no se puede cambiar en el PUT
                    this.form.get('pacienteId')?.disable();
                },
                error: (e) => console.error(e)
            });
        }
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.esEdicion && this.id) {
            const cita: ActualizarCita = {
                fechaHora: this.form.value.fechaHora,
                motivoCita: this.form.value.motivoCita,
                medicoId: +this.form.value.medicoId
            };

            this.citaService.actualizar(this.id, cita).subscribe({
                next: () => this.router.navigate(['/citas']),
                error: (e) => alert('Error al actualizar')
            });

        } else {
            const cita: CrearCita = {
                fechaHora: this.form.value.fechaHora,
                motivoCita: this.form.value.motivoCita,
                medicoId: +this.form.value.medicoId,
                pacienteId: +this.form.value.pacienteId
            };

            this.citaService.crear(cita).subscribe({
                next: () => this.router.navigate(['/citas']),
                error: (e) => alert('Error al crear cita')
            });
        }
    }
}
