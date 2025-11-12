// obrasSociales.js

const OBRAS_SOCIALES_INICIALES = [
  { id: 1, nombre: 'Obra Social 1' },
  { id: 2, nombre: 'Obra Social 2' },
  { id: 3, nombre: 'Obra Social 3' }
];

const STORAGE_KEY_OBRAS_SOCIALES = 'obrasSociales';

function inicializarObrasSociales() {
  if (!localStorage.getItem(STORAGE_KEY_OBRAS_SOCIALES)) {
    localStorage.setItem(STORAGE_KEY_OBRAS_SOCIALES, JSON.stringify(OBRAS_SOCIALES_INICIALES));
  }
}

function obtenerObrasSociales() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_OBRAS_SOCIALES)) || [];
}

function agregarObraSocial(obraSocial) {
  const obrasSociales = obtenerObrasSociales();
  obraSocial.id = Date.now(); 
  obrasSociales.push(obraSocial);
  localStorage.setItem(STORAGE_KEY_OBRAS_SOCIALES, JSON.stringify(obrasSociales));
}

function eliminarObraSocial(id) {
  const obrasSociales = obtenerObrasSociales().filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY_OBRAS_SOCIALES, JSON.stringify(obrasSociales));
}

inicializarObrasSociales();