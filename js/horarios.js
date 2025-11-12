const HORARIOS_INICIALES = [
  { id: 1, hora: '10:00 AM', disponible: true },
  { id: 2, hora: '11:00 AM', disponible: true },
  { id: 3, hora: '12:00 PM', disponible: true },
  { id: 4, hora: '01:00 PM', disponible: true },
  { id: 5, hora: '02:00 PM', disponible: true }
];

const STORAGE_KEY_HORARIOS = 'horarios';


function inicializarHorarios() {
  if (!localStorage.getItem(STORAGE_KEY_HORARIOS)) {
    localStorage.setItem(STORAGE_KEY_HORARIOS, JSON.stringify(HORARIOS_INICIALES));
  }
}

function obtenerHorariosDisponibles() {
  const horarios = JSON.parse(localStorage.getItem(STORAGE_KEY_HORARIOS)) || [];
  return horarios.filter(horario => horario.disponible);
}

function agregarHorario(horario) {
  const horarios = JSON.parse(localStorage.getItem(STORAGE_KEY_HORARIOS)) || [];
  horario.id = Date.now(); 
  horarios.push(horario);
  localStorage.setItem(STORAGE_KEY_HORARIOS, JSON.stringify(horarios));
}

function eliminarHorario(id) {
  const horarios = JSON.parse(localStorage.getItem(STORAGE_KEY_HORARIOS)) || [];
  const nuevosHorarios = horarios.filter(h => h.id !== id);
  localStorage.setItem(STORAGE_KEY_HORARIOS, JSON.stringify(nuevosHorarios));
}


inicializarHorarios();


export { obtenerHorariosDisponibles, agregarHorario, eliminarHorario };