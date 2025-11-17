// medicos.js

const MEDICOS_INICIALES = [
  {
    id: 1,
    matricula: 83745,
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    valorConsulta: 10000.00,
    obrasSociales: [1, 2, 3, 4],
    email: "juan.perez@vientonorte.com",
    descripcion: "15 años de experiencia. Especialista en enfermedades cardiovasculares.",
    imagen: "../imagenes/medico1.png"
  },
  {
    id: 2,
    matricula: 38475,
    nombre: "Dra. Ana Gómez",
    especialidad: "Pediatría",
    valorConsulta: 10000.00,
    obrasSociales: [1, 2, 3, 4],
    email: "ana.gomez@vientonorte.com",
    descripcion: "10 años atendiendo a niños y adolescentes. Atención cálida y cercana.",
    imagen: "../imagenes/medico2.png"
  },
  {
    id: 3,
    matricula: 73659,
    nombre: "Dr. Carlos Ruiz",
    especialidad: "Neurología",
    valorConsulta: 10000.00,
    obrasSociales: [1, 2, 3, 4],
    email: "carlos.ruiz@vientonorte.com",
    descripcion: "Especialista en trastornos del sistema nervioso. Innovador en tratamientos.",
    imagen: "../imagenes/medico3.png"
  },
  {
    id: 4,
    matricula: 27047,
    nombre: "Dra. María López",
    especialidad: "Dermatología",
    valorConsulta: 10000.00,
    obrasSociales: [1, 2, 3, 4],
    email: "maria.lopez@vientonorte.com",
    descripcion: "Cuida tu piel con tratamientos modernos y personalizados.",
    imagen: "../imagenes/medico4.png"
  },
  {
    id: 5,
    matricula: 38947,
    nombre: "Dr. Pedro Martínez",
    especialidad: "Ortopedia",
    valorConsulta: 10000.00,
    obrasSociales: [1, 2, 3, 4],
    email: "pedro.martinez@vientonorte.com",
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
  const obrasSocialesMaestro = obtenerObrasSociales();
  contenedor.innerHTML = ''; // Limpio el catalógo antes de renderizar

  medicos.forEach(medico => {
    const col = document.createElement('div');
    col.className = 'col'; 
    const valorFormateado =
      medico.valorConsulta && !isNaN(medico.valorConsulta)
        ? `$${medico.valorConsulta.toLocaleString("es-AR")}`
        : "No disponible";
        
    let obrasSocialesNombres = "No acepta";
    if (medico.obrasSociales && medico.obrasSociales.length > 0) {
      obrasSocialesNombres = medico.obrasSociales.map(idBuscado => {
        const obra = obrasSocialesMaestro.find(o => o.id === idBuscado);
        return obra ? obra.nombre : 'Desconocida';
      }).join(', ');
    }

    col.innerHTML = `
  <div class="card h-100 shadow-sm">
    <img src="${medico.imagen}" class="card-img-top" alt="Foto de ${medico.nombre}">
    <div class="card-body d-flex flex-column">
      
            <h5 class="card-title">${medico.nombre}</h5>
      <p class="text-muted small mb-1">Matrícula: ${medico.matricula || 'N/A'}</p>
      <p class="card-text text-primary fw-bold">${medico.especialidad}</p>
      <p class="card-text text-muted small flex-grow-1">${medico.descripcion}</p>
      
      <div class="border-top pt-2 mt-2">
        <p class="card-text text-muted small mb-1" style="word-break: break-all;">
          <strong>Email:</strong> ${medico.email || 'N/A'}
        </p>
        <p class="card-text text-muted small mb-0">
          <strong>Obras Sociales:</strong> ${obrasSocialesNombres}
        </p>
      </div>

            <div class="d-flex justify-content-between align-items-center my-3">
        <span class="text-muted">Consulta:</span>
        <span class="fs-5 fw-bold text-primary">${valorFormateado}</span>
      </div>
      
      <a href="../html/formulario_reserva.html?medicoId=${medico.id}" class="btn btn-primary w-100 mt-auto">Reservar</a>
	
    </div>
  </div>
`;
    contenedor.appendChild(col);
  });
}

function popularSelectEspecialidades() {
  const select = document.getElementById('especialidadSelect');
  if (!select) return;

  const especialidades = obtenerEspecialidades();
  select.innerHTML = '';
  select.innerHTML = '<option value="">-- Seleccione una especialidad --</option>';
  especialidades.forEach(esp => {
    const option = document.createElement('option');
    option.value = esp.nombre;
    option.textContent = esp.nombre;
    select.appendChild(option);
  });
}


// RENDERIZADO
function renderizarTabla() {
  const medicos = obtenerMedicos();
  const contenedor = document.getElementById('tablaMedicosBody');
   if (!contenedor) {
    return;
  }
  contenedor.innerHTML = ''; 

  medicos.forEach(medico => {
    const fila = document.createElement('tr');
    
    const valorConsultaFormateado = medico.valorConsulta && !isNaN(medico.valorConsulta) ? 
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(medico.valorConsulta) : 
        'N/A';
        
    const obrasSocialesTexto = Array.isArray(medico.obrasSociales) 
        ? medico.obrasSociales.join(', ')
        : 'Ninguna';

    fila.innerHTML = `
      <td><img src="${medico.imagen}" alt="${medico.nombre}" width="70" style="object-fit: cover; border-radius: 6px; min-width: 70px;"></td>
      <td>${medico.matricula || "N/A"}</td>
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td>${medico.email || "N/A"}</td>
      <td>${valorConsultaFormateado}</td>
      <td>${obrasSocialesTexto}</td>
    
      <td class="text-truncate" style="max-width: 150px;">${medico.descripcion}</td>
      
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
    document.getElementById('valorConsulta').value = medico.valorConsulta || '';
    document.getElementById('obrasSociales').value = Array.isArray(medico.obrasSociales) ? medico.obrasSociales.join(', ') : '';
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('especialidadSelect').value = medico.especialidad;
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
      ? obrasSocialesInput.split(',')
                           .map(id => Number(id.trim()))
                           .filter(id => !isNaN(id) && id > 0)
      : [];
  const nuevoMedico = {
    matricula: Number(document.getElementById('matricula').value),
    nombre: document.getElementById('nombre').value,
    especialidad: document.getElementById('especialidadSelect').value,
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
  renderizarTabla()
}

// Inicialización

  inicializarLocalStorage();
  renderizarTabla();
  renderizarCatalogo(); // Renderizo el catálogo
  popularSelectEspecialidades();

  const formMedico = document.getElementById('formMedico');
if (formMedico) {
  formMedico.addEventListener('submit', manejarEnvioFormulario);
}


  /*document.getElementById('formMedico').addEventListener('submit', manejarEnvioFormulario);*/

