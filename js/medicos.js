
// medicos.js

const MEDICOS_INICIALES = [
  {
    id: 1,
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    descripcion: "15 años de experiencia. Especialista en enfermedades cardiovasculares.",
    imagen: "../imagenes/medico1.png"
  },
  {
    id: 2,
    nombre: "Dra. Ana Gómez",
    especialidad: "Pediatría",
    descripcion: "10 años atendiendo a niños y adolescentes. Atención cálida y cercana.",
    imagen: "../imagenes/medico2.png"
  },
  {
    id: 3,
    nombre: "Dr. Carlos Ruiz",
    especialidad: "Neurología",
    descripcion: "Especialista en trastornos del sistema nervioso. Innovador en tratamientos.",
    imagen: "../imagenes/medico3.png"
  },
  {
    id: 4,
    nombre: "Dra. María López",
    especialidad: "Dermatología",
    descripcion: "Cuida tu piel con tratamientos modernos y personalizados.",
    imagen: "../imagenes/medico4.png"
  },
  {
    id: 5,
    nombre: "Dr. Pedro Martínez",
    especialidad: "Ortopedia",
    descripcion: "Especialista en huesos y articulaciones. Enfoque integral en recuperación.",
    imagen: "../imagenes/medico5.png"
  }
];

const STORAGE_KEY = 'medicos';

function inicializarLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MEDICOS_INICIALES));
  }
}

function obtenerMedicos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarMedicos(medicos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicos));
}

function agregarMedico(medico) {
  const medicos = obtenerMedicos();
  medico.id = Date.now(); // ID único
  medicos.push(medico);
  guardarMedicos(medicos);
  renderizarTabla();
}

function eliminarMedico(id) {
  const medicos = obtenerMedicos().filter(m => m.id !== id);
  guardarMedicos(medicos);
  renderizarTabla();
}

function editarMedico(id, datosActualizados) {
  const medicos = obtenerMedicos().map(m => {
    if (m.id === id) {
      return { ...m, ...datosActualizados };
    }
    return m;
  });
  guardarMedicos(medicos);
  renderizarTabla();
}

// RENDERIZADO
function renderizarTabla() {
  const contenedor = document.getElementById('tablaMedicosBody');
  const medicos = obtenerMedicos();
  contenedor.innerHTML = '';

  medicos.forEach(medico => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><img src="${medico.imagen}" width="60" /></td>
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td>${medico.descripcion}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="cargarFormularioEdicion(${medico.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarMedico(${medico.id})">🗑️</button>
      </td>
    `;
    contenedor.appendChild(fila);
  });
}

function cargarFormularioEdicion(id) {
  const medico = obtenerMedicos().find(m => m.id === id);
  if (medico) {
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('especialidad').value = medico.especialidad;
    document.getElementById('descripcion').value = medico.descripcion;
    document.getElementById('imagen').value = medico.imagen;
    document.getElementById('medicoId').value = medico.id;
  }
}

function manejarEnvioFormulario(event) {
  event.preventDefault();

  const id = document.getElementById('medicoId').value;
  const nuevoMedico = {
    nombre: document.getElementById('nombre').value,
    especialidad: document.getElementById('especialidad').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen').value
  };

  if (id) {
    editarMedico(Number(id), nuevoMedico);
  } else {
    agregarMedico(nuevoMedico);
  }

  document.getElementById('formMedico').reset();
  document.getElementById('medicoId').value = '';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  inicializarLocalStorage();
  renderizarTabla();

  document.getElementById('formMedico').addEventListener('submit', manejarEnvioFormulario);
});


