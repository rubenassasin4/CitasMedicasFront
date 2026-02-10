import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente, RegistrarPaciente, ActualizarPaciente } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  // Asegúrate de que este puerto (7001) es el correcto de tu Visual Studio
  private apiUrl = 'https://localhost:7248/api/pacientes'; 

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  registrar(paciente: RegistrarPaciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  actualizar(id: number, paciente: ActualizarPaciente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, paciente);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}