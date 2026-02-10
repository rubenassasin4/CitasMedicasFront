import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Importamos desde el archivo corto
import { PacienteListComponent } from './paciente-list'; 
import { PacienteService } from '../../services/paciente.service';

describe('PacienteListComponent', () => {
  let component: PacienteListComponent;
  let fixture: ComponentFixture<PacienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteListComponent, HttpClientTestingModule],
      providers: [PacienteService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});