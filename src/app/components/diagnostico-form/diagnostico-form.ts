import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { CrearDiagnostico, ActualizarDiagnostico } from '../../models/interfaces';

@Component({
    selector: 'app-diagnostico-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './diagnostico-form.html',
    styles: []
})
export class DiagnosticoFormComponent implements OnInit {

    form: FormGroup;
    id: number | null = null;
    esEdicion: boolean = false;
    titulo: string = 'Nuevo Diagnóstico';

    constructor(
        private fb: FormBuilder,
        private diagnosticoService: DiagnosticoService,
        private router: Router,
        private aRoute: ActivatedRoute
    ) {
        this.form = this.fb.group({
            valoracionEspecialista: ['', Validators.required],
            enfermedad: ['', Validators.required],
            citaId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const idUrl = this.aRoute.snapshot.paramMap.get('id');

        if (idUrl) {
            this.id = +idUrl;
            this.esEdicion = true;
            this.titulo = 'Editar Diagnóstico';
            this.cargarDatosEdicion();
        }
    }

    cargarDatosEdicion() {
        if (this.id) {
            this.diagnosticoService.getDiagnostico(this.id).subscribe({
                next: (diag) => {
                    this.form.patchValue({
                        valoracionEspecialista: diag.valoracionEspecialista,
                        enfermedad: diag.enfermedad,
                        citaId: diag.citaId
                    });
                    // El ID de Cita no se puede cambiar en edición
                    this.form.get('citaId')?.disable();
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
            const diag: ActualizarDiagnostico = {
                valoracionEspecialista: this.form.value.valoracionEspecialista,
                enfermedad: this.form.value.enfermedad
            };

            this.diagnosticoService.actualizar(this.id, diag).subscribe({
                next: () => this.router.navigate(['/diagnosticos']),
                error: (e) => alert('Error al actualizar')
            });

        } else {
            const diag: CrearDiagnostico = {
                valoracionEspecialista: this.form.value.valoracionEspecialista,
                enfermedad: this.form.value.enfermedad,
                citaId: +this.form.value.citaId
            };

            this.diagnosticoService.crear(diag).subscribe({
                next: () => this.router.navigate(['/diagnosticos']),
                error: (e) => alert('Error al crear diagnóstico')
            });
        }
    }
}
