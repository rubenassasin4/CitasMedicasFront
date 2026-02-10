import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/interfaces';

@Component({
    selector: 'app-medico-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './medico-list.html',
    styles: [] // inline styles or external css if needed, but keeping it simple as per request context
})
export class MedicoListComponent implements OnInit {

    medicos: Medico[] = [];
    cargando: boolean = true;
    error: string = '';

    constructor(
        private medicoService: MedicoService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this.cargando = true;
        this.medicoService.getMedicos().subscribe({
            next: (datos) => {
                this.medicos = datos;
                this.cargando = false;
                this.cdr.detectChanges(); // Forzar actualización de vista
            },
            error: (e) => {
                console.error('Error al cargar médicos:', e);
                this.error = 'No se pudieron cargar los datos. Revisa que la API esté encendida.';
                this.cargando = false;
                this.cdr.detectChanges(); // Forzar actualización de vista
            }
        });
    }

    eliminar(id: number) {
        if (confirm('¿Estás seguro de que deseas eliminar este médico?')) {
            this.medicoService.eliminar(id).subscribe({
                next: () => {
                    this.cargarMedicos();
                },
                error: (e) => {
                    alert('Error al eliminar el médico');
                    this.cdr.detectChanges();
                }
            });
        }
    }
}
