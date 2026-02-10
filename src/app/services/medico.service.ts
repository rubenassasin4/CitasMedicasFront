import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico, RegistrarMedico, ActualizarMedico } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'https://localhost:7001/api/medicos';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  registrar(medico: RegistrarMedico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  actualizar(id: number, medico: ActualizarMedico): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, medico);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}