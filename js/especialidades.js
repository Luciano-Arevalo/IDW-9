const ESPECIALIDADES_INICIALES = [
  { id: 1, nombre: "Cardiología" },
  { id: 2, nombre: "Pediatría" },
  { id: 3, nombre: "Neurología" },
  { id: 4, nombre: "Dermatología" },
  { id: 5, nombre: "Ortopedia" }
];
const STORAGE_KEY_ESPECIALIDADES = 'especialidades';



function inicializarEspecialidades() {
  if (!localStorage.getItem(STORAGE_KEY_ESPECIALIDADES)) {
    localStorage.setItem(STORAGE_KEY_ESPECIALIDADES, JSON.stringify(ESPECIALIDADES_INICIALES));
  }
}
function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_ESPECIALIDADES)) || [];
}
function guardarEspecialidades(especialidades) {
  localStorage.setItem(STORAGE_KEY_ESPECIALIDADES, JSON.stringify(especialidades));
}



function agregarEspecialidad(nombre) {
  const especialidades = obtenerEspecialidades();
  const maxId = especialidades.reduce((max, esp) => (esp.id > max ? esp.id : max), 0);
  const nuevaEspecialidad = { 
    id: maxId + 1, 
    nombre: nombre 
  };
  especialidades.push(nuevaEspecialidad);
  guardarEspecialidades(especialidades);
  renderizarTablaEspecialidades(); 
}

function eliminarEspecialidad(id) {
  if (confirm("¿Está seguro de que desea eliminar esta especialidad?")) {
    let especialidades = obtenerEspecialidades();
    especialidades = especialidades.filter(e => e.id !== id);
    guardarEspecialidades(especialidades);
    renderizarTablaEspecialidades();
  }
}
function editarEspecialidad(id, nombre) {
  let especialidades = obtenerEspecialidades();
  const index = especialidades.findIndex(e => e.id === id);
  if (index !== -1) {
    especialidades[index].nombre = nombre;
    guardarEspecialidades(especialidades);
    renderizarTablaEspecialidades();
  }
}

function cargarFormularioEdicion(id) {
  const especialidad = obtenerEspecialidades().find(e => e.id === id);
  if (especialidad) {
    document.getElementById('especialidadId').value = especialidad.id;
    document.getElementById('nombreEspecialidad').value = especialidad.nombre;
  }
}



function renderizarTablaEspecialidades() {
  const contenedor = document.getElementById('tablaEspecialidadesBody');
  if (!contenedor) return; 

  const especialidades = obtenerEspecialidades();
  contenedor.innerHTML = ''; 

  especialidades.forEach(esp => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${esp.id}</td>
      <td>${esp.nombre}</td>
      <td>
                <button class="btn btn-sm btn-warning" onclick="cargarFormularioEdicion(${esp.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarEspecialidad(${esp.id})">🗑️</button>
      </td>
    `;
    contenedor.appendChild(fila);
  });
}


function manejarEnvioFormulario(event) {
  event.preventDefault();
  
  const id = document.getElementById('especialidadId').value;
  const nombre = document.getElementById('nombreEspecialidad').value.trim();

  if (nombre) {
    if (id) {

      editarEspecialidad(Number(id), nombre);
    } else {

      agregarEspecialidad(nombre);
    }

    document.getElementById('formEspecialidad').reset();
    document.getElementById('especialidadId').value = '';
    
  } else {
    alert("Por favor, ingrese un nombre para la especialidad.");
  }
}



inicializarEspecialidades();
renderizarTablaEspecialidades();

const formEspecialidad = document.getElementById('formEspecialidad');
if (formEspecialidad) {
  formEspecialidad.addEventListener('submit', manejarEnvioFormulario);
}