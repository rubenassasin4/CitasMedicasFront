import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/interfaces';

@Component({
    selector: 'app-cita-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cita-list.html',
    styles: []
})
export class CitaListComponent implements OnInit {

    citas: Cita[] = [];
    cargando: boolean = true;
    error: string = '';

    constructor(private citaService: CitaService) { }

    ngOnInit(): void {
        this.cargarCitas();
    }

    cargarCitas() {
        this.cargando = true;
        this.citaService.getCitas().subscribe({
            next: (datos) => {
                this.citas = datos;
                this.cargando = false;
            },
            error: (e) => {
                console.error('Error al cargar citas:', e);
                this.error = 'No se pudieron cargar los datos.';
                this.cargando = false;
            }
        });
    }

    eliminar(id: number) {
        if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
            this.citaService.eliminar(id).subscribe({
                next: () => {
                    this.cargarCitas();
                },
                error: (e) => alert('Error al eliminar la cita')
            });
        }
    }
}
