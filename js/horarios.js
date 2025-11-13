/*const HORARIOS_INICIALES = [
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


export { obtenerHorariosDisponibles, agregarHorario, eliminarHorario };*/


const HORARIOS_INICIALES = [
  { id: 1, hora: '10:00 AM', disponible: true },
  { id: 2, hora: '11:00 AM', disponible: true },
  { id: 3, hora: '12:00 PM', disponible: true },
  { id: 4, hora: '01:00 PM', disponible: false }, 
  { id: 5, hora: '02:00 PM', disponible: true }
];

const STORAGE_KEY_HORARIOS = 'horarios';



function inicializarHorarios() {
  if (!localStorage.getItem(STORAGE_KEY_HORARIOS)) {
    localStorage.setItem(STORAGE_KEY_HORARIOS, JSON.stringify(HORARIOS_INICIALES));
  }
}

function obtenerHorarios() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_HORARIOS)) || [];
}

function guardarHorarios(horarios) {
  localStorage.setItem(STORAGE_KEY_HORARIOS, JSON.stringify(horarios));
}

//CRUD

function obtenerHorariosDisponibles() {
  const horarios = obtenerHorarios(); 
  return horarios.filter(horario => horario.disponible);
}

function agregarHorario(hora, disponible) {
  const horarios = obtenerHorarios();
  const nuevoHorario = { id: Date.now(), hora: hora, disponible: disponible };
  horarios.push(nuevoHorario);
  guardarHorarios(horarios);
  renderizarTablaHorarios();
}

function eliminarHorario(id) {
  if (confirm("¿Está seguro de que desea eliminar este horario?")) {
    let horarios = obtenerHorarios();
    horarios = horarios.filter(h => h.id !== id);
    guardarHorarios(horarios);
    renderizarTablaHorarios();
  }
}

function editarHorario(id, hora, disponible) {
  let horarios = obtenerHorarios();
  const index = horarios.findIndex(h => h.id === id);
  if (index !== -1) {
    horarios[index].hora = hora;
    horarios[index].disponible = disponible;
    guardarHorarios(horarios);
    renderizarTablaHorarios();
  }
}

function cargarFormularioEdicion(id) {
  const horario = obtenerHorarios().find(h => h.id === id);
  if (horario) {
    document.getElementById('horarioId').value = horario.id;
    document.getElementById('horarioHora').value = horario.hora;
    document.getElementById('horarioDisponible').checked = horario.disponible;
  }
}
function renderizarTablaHorarios() {
  const contenedor = document.getElementById('tablaHorariosBody');
  if (!contenedor) return; 

  const horarios = obtenerHorarios();
  contenedor.innerHTML = ''; 

  horarios.forEach(h => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${h.id}</td>
      <td>${h.hora}</td>
      <td>${h.disponible ? 'Sí' : 'No'}</td> 
      <td>
        <button class="btn btn-sm btn-warning" onclick="cargarFormularioEdicion(${h.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarHorario(${h.id})">🗑️</button>
      </td>
    `;
    contenedor.appendChild(fila);
  });
}



function manejarEnvioFormulario(event) {
  event.preventDefault();
  
  const id = document.getElementById('horarioId').value;
  const hora = document.getElementById('horarioHora').value.trim();
  const disponible = document.getElementById('horarioDisponible').checked; 

  if (hora) {
    if (id) {
      editarHorario(Number(id), hora, disponible);
    } else {
      agregarHorario(hora, disponible);
    }
    document.getElementById('formHorario').reset();
    document.getElementById('horarioId').value = '';
    
  } else {
    alert("Por favor, ingrese una hora.");
  }
}


inicializarHorarios();
renderizarTablaHorarios();

const formHorario = document.getElementById('formHorario');
if (formHorario) {
  formHorario.addEventListener('submit', manejarEnvioFormulario);
}