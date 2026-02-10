// ==========================================
// 1. MODELOS BASE Y AUTH
// ==========================================

export interface LoginRequest {
  nombreUsuario: string;
  clave: string;
}

// Interfaz base para herencia (UsuarioDto.cs)
export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  // Propiedad calculada en el backend, viene en el JSON si el serializer lo permite
  nombreCompleto?: string; 
}

// ==========================================
// 2. PACIENTES (PacienteDto.cs)
// ==========================================

// Para Listados y Detalles (GET)
export interface Paciente extends Usuario {
  nss: string;
  numTarjeta: string;
  telefono: string;
  direccion: string;
}

// Para Registro (POST) - Incluye Clave
export interface RegistrarPaciente {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  clave: string;
  nss: string;
  numTarjeta: string;
  telefono: string;
  direccion: string;
}

// Para Actualización (PUT) - NO incluye Clave
export interface ActualizarPaciente {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  nss: string;
  numTarjeta: string;
  telefono: string;
  direccion: string;
}

// ==========================================
// 3. MÉDICOS (MedicoDto.cs)
// ==========================================

// Para Listados y Detalles (GET)
export interface Medico extends Usuario {
  numColegiado: string;
}

// Para Registro (POST) - Incluye Clave
export interface RegistrarMedico {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  clave: string;
  numColegiado: string;
}

// Para Actualización (PUT) - NO incluye Clave
export interface ActualizarMedico {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  numColegiado: string;
}

// ==========================================
// 4. CITAS (CitaDto.cs)
// ==========================================

// Para Listados y Detalles (GET)
export interface Cita {
  id: number;
  fechaHora: string; // ISO String (2026-02-10T10:30:00)
  motivoCita: string;
  
  // Datos aplanados
  medicoId: number;
  nombreMedico: string;
  pacienteId: number;
  nombrePaciente: string;
  
  tieneDiagnostico: boolean;
}

// Para Crear (POST)
export interface CrearCita {
  fechaHora: string;
  motivoCita: string;
  pacienteId: number;
  medicoId: number;
}

// Para Actualizar (PUT) - Mantiene PacienteId fijo (no se envía)
export interface ActualizarCita {
  fechaHora: string;
  motivoCita: string;
  medicoId: number;
}

// ==========================================
// 5. DIAGNÓSTICOS (DiagnosticoDto.cs)
// ==========================================

// Para Listados y Detalles (GET)
export interface Diagnostico {
  id: number;
  valoracionEspecialista: string;
  enfermedad: string;
  citaId: number;
}

// Para Crear (POST)
export interface CrearDiagnostico {
  valoracionEspecialista: string;
  enfermedad: string;
  citaId: number;
}

// Para Actualizar (PUT) - CitaId es inmutable
export interface ActualizarDiagnostico {
  valoracionEspecialista: string;
  enfermedad: string;
}

