import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { RegistrarMedico, ActualizarMedico } from '../../models/interfaces';

@Component({
    selector: 'app-medico-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './medico-form.html',
    styles: []
})
export class MedicoFormComponent implements OnInit {

    form: FormGroup;
    id: number | null = null;
    esEdicion: boolean = false;
    titulo: string = 'Nuevo Médico';

    constructor(
        private fb: FormBuilder,
        private medicoService: MedicoService,
        private router: Router,
        private aRoute: ActivatedRoute
    ) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            nombreUsuario: ['', Validators.required],
            clave: [''],
            numColegiado: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const idUrl = this.aRoute.snapshot.paramMap.get('id');

        if (idUrl) {
            this.id = +idUrl;
            this.esEdicion = true;
            this.titulo = 'Editar Médico';
            this.cargarDatosEdicion();
        } else {
            this.form.get('clave')?.setValidators([Validators.required]);
        }
    }

    cargarDatosEdicion() {
        if (this.id) {
            this.medicoService.getMedico(this.id).subscribe({
                next: (medico) => {
                    this.form.patchValue({
                        nombre: medico.nombre,
                        apellidos: medico.apellidos,
                        nombreUsuario: medico.nombreUsuario,
                        numColegiado: medico.numColegiado
                    });
                    this.form.get('clave')?.clearValidators();
                    this.form.get('clave')?.updateValueAndValidity();
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
            const medico: ActualizarMedico = {
                nombre: this.form.value.nombre,
                apellidos: this.form.value.apellidos,
                nombreUsuario: this.form.value.nombreUsuario,
                numColegiado: this.form.value.numColegiado
            };

            this.medicoService.actualizar(this.id, medico).subscribe({
                next: () => this.router.navigate(['/medicos']),
                error: (e) => alert('Error al actualizar')
            });

        } else {
            const medico: RegistrarMedico = {
                nombre: this.form.value.nombre,
                apellidos: this.form.value.apellidos,
                nombreUsuario: this.form.value.nombreUsuario,
                clave: this.form.value.clave,
                numColegiado: this.form.value.numColegiado
            };

            this.medicoService.registrar(medico).subscribe({
                next: () => this.router.navigate(['/medicos']),
                error: (e) => alert('Error al registrar')
            });
        }
    }
}
