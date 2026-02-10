import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiagnosticoService } from './diagnostico.service';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiagnosticoService]
    });
    service = TestBed.inject(DiagnosticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});