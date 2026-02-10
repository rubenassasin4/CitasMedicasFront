import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importante para simular peticiones
import { PacienteService } from './paciente.service'; // Asegúrate que la ruta coincide con tu archivo

describe('PacienteService', () => {
  let service: PacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Inyectamos el módulo de pruebas HTTP
      providers: [PacienteService]
    });
    service = TestBed.inject(PacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});