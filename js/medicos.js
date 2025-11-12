
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
  renderizarCatalogo();
}

function eliminarMedico(id) {
  const medicos = obtenerMedicos().filter(m => m.id !== id);
  guardarMedicos(medicos);
  renderizarTabla();
  renderizarCatalogo();
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
  renderizarCatalogo();
}

//CATÁLOGO PÚBLICO
function renderizarCatalogo() {
  const contenedor = document.getElementById('catalogoMedicos');

  if (!contenedor) {
    return;
  }

  const medicos = obtenerMedicos();
  contenedor.innerHTML = ''; // Limpio el catalógo antes de renderizar

  medicos.forEach(medico => {
    const col = document.createElement('div');
    col.className = 'col'; 

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${medico.imagen}" class="card-img-top" alt="Foto de ${medico.nombre}">
        <div class="card-body">
          <h5 class="card-title">${medico.nombre}</h5>
          <p class="card-text">${medico.especialidad}</p>
          <p class="card-text text-muted small">${medico.descripcion}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

// RENDERIZADO
// Archivo: medicos.js

function renderizarTabla() {
  const medicos = obtenerMedicos();
  const contenedor = document.getElementById('tablaMedicosBody');
  contenedor.innerHTML = ''; // Limpia la tabla

  medicos.forEach(medico => {
    const fila = document.createElement('tr');
    
    const obrasSocialesTexto = Array.isArray(medico.obrasSociales) 
        ? medico.obrasSociales.join(', ')
        : '';
        
    const valorConsultaFormateado = medico.valorConsulta ? 
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(medico.valorConsulta) : 
        'N/A';

    fila.innerHTML = `
      <td><img src="${medico.imagen}" alt="${medico.nombre}"></td>
      <td>${medico.id}</td>
      <td>${medico.matricula || ''}</td>       
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td>${medico.email || ''}</td>           
      <td>${valorConsultaFormateado}</td>      
      <td>${obrasSocialesTexto}</td>           
      <td>${medico.descripcion.substring(0, 50)}...</td>
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
    document.getElementById('matricula').value = medico.matricula || '';
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('especialidad').value = medico.especialidad;
    document.getElementById('email').value = medico.email || '';
    document.getElementById('valorConsulta').value = medico.valorConsulta || 0;
    document.getElementById('obrasSociales').value = Array.isArray(medico.obrasSociales) 
        ? medico.obrasSociales.join(', ')
        : '';
    document.getElementById('descripcion').value = medico.descripcion;
    document.getElementById('imagen').value = medico.imagen;
    document.getElementById('medicoId').value = medico.id;
  }
}

function manejarEnvioFormulario(event) {
  event.preventDefault();

  const id = document.getElementById('medicoId').value;
  const obrasSocialesInput = document.getElementById('obrasSociales').value;
  const obrasSocialesArray = obrasSocialesInput 
      ? obrasSocialesInput.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id) && id > 0)
      : [];
  const nuevoMedico = {
    matricula: document.getElementById('matricula').value,
    nombre: document.getElementById('nombre').value,
    especialidad: document.getElementById('especialidad').value,
    email: document.getElementById('email').value,
    valorConsulta: Number(document.getElementById('valorConsulta').value),
    obrasSociales: obrasSocialesArray,
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

  inicializarLocalStorage();
  renderizarTabla();
  renderizarCatalogo(); // Renderizo el catálogo

  const formMedico = document.getElementById('formMedico');
if (formMedico) {
  formMedico.addEventListener('submit', manejarEnvioFormulario);
}

  //document.getElementById('formMedico').addEventListener('submit', manejarEnvioFormulario);



