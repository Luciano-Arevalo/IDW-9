const HORARIOS_INICIALES = [
  { id: 1, hora: '10:00 AM', disponible: true, especialidades: 'Cardiología, Pediatría' },
  { id: 2, hora: '11:00 AM', disponible: true, especialidades: 'Dermatología' },
  { id: 3, hora: '12:00 PM', disponible: false, especialidades: 'Traumatología' },
  { id: 4, hora: '01:00 PM', disponible: true, especialidades: '' },
  { id: 5, hora: '02:00 PM', disponible: true, especialidades: 'General' }
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
    document.getElementById('horarioHora').value = horario.hora;
    document.getElementById('horarioDisponible').checked = horario.disponible;
    document.getElementById('horarioEspecialidades').value = horario.especialidades || ''; 
    document.getElementById('horarioId').value = horario.id;
  }
}
function renderizarTablaHorarios() {
  const contenedor = document.getElementById('tablaHorariosBody');
  if (!contenedor) return; 

  const horarios = obtenerHorarios();
  contenedor.innerHTML = ''; 

  horarios.forEach(h => {
    const especialidadesTexto = h.especialidades || 'Todas las especialidades'; 
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${h.id}</td>
      <td>${h.hora}</td>
      <td>${especialidadesTexto}</td> <td>${h.disponible ? 'Sí' : 'No'}</td> 
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
  const especialidades = document.getElementById('horarioEspecialidades').value.trim(); 

  if (hora) {
    
    const horarioData = {
        hora: hora,
        disponible: disponible,
        especialidades: especialidades 
    };

    if (id) {
      editarHorario(Number(id), horarioData); 
    } else {
      agregarHorario(horarioData); 
    }
    
    document.getElementById('formHorario').reset();
    document.getElementById('horarioId').value = '';
    
    const modalElement = document.getElementById('modalHorario');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();

  }
}


inicializarHorarios();
renderizarTablaHorarios();

const formHorario = document.getElementById('formHorario');
if (formHorario) {
  formHorario.addEventListener('submit', manejarEnvioFormulario);
}