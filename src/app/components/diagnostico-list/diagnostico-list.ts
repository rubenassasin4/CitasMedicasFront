import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { Diagnostico } from '../../models/interfaces';

@Component({
    selector: 'app-diagnostico-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './diagnostico-list.html',
    styles: []
})
export class DiagnosticoListComponent implements OnInit {

    diagnosticos: Diagnostico[] = [];
    cargando: boolean = true;
    error: string = '';

    constructor(
        private diagnosticoService: DiagnosticoService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.cargarDiagnosticos();
    }

    cargarDiagnosticos() {
        this.cargando = true;
        this.diagnosticoService.getDiagnosticos().subscribe({
            next: (datos) => {
                this.diagnosticos = datos;
                this.cargando = false;
                this.cdr.detectChanges(); // Forzar actualización de vista
            },
            error: (e) => {
                console.error('Error al cargar diagnósticos:', e);
                this.error = 'No se pudieron cargar los datos.';
                this.cargando = false;
                this.cdr.detectChanges(); // Forzar actualización de vista
            }
        });
    }

    eliminar(id: number) {
        if (confirm('¿Estás seguro de que deseas eliminar este diagnóstico?')) {
            this.diagnosticoService.eliminar(id).subscribe({
                next: () => {
                    this.cargarDiagnosticos();
                },
                error: (e) => {
                    alert('Error al eliminar el diagnóstico');
                    this.cdr.detectChanges();
                }
            });
        }
    }
}
