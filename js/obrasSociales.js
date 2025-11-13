const OBRAS_SOCIALES_INICIALES = [
  { id: 1, nombre: 'Salud Total Plus' },
  { id: 2, nombre: 'Old Argentina' },
  { id: 3, nombre: 'Vida Sana Prepaga' },
  { id: 4, nombre: 'Cobertura Médica Sur' }
];
const DESCRIPCIONES_OBRAS_SOCIALES = {
  1: 'Planes disponibles: Básico, Familiar, Premium. Estudios no cubiertos: cirugía estética, implantes dentales. Enfoque: cobertura nacional con beneficios exclusivos.',
  2: 'Planes disponibles: Tradicional, Jubilados. Estudios no cubiertos: tratamientos experimentales, fertilización asistida. Enfoque: amplia red de prestadores en todo el país.',
  3: 'Planes disponibles: Preventivo, Bienestar. Estudios no cubiertos: cirugía estética, ortodoncia. Enfoque: medicina preventiva y promoción de hábitos saludables.',
  4: 'Planes disponibles: Regional, Familiar. Estudios no cubiertos: tratamientos fuera de zona, cirugía estética. Enfoque: atención personalizada en el sur del país.'
};
const STORAGE_KEY_OBRAS_SOCIALES = 'obrasSociales';

function inicializarObrasSociales() {
  if (!localStorage.getItem(STORAGE_KEY_OBRAS_SOCIALES)) {
    localStorage.setItem(STORAGE_KEY_OBRAS_SOCIALES, JSON.stringify(OBRAS_SOCIALES_INICIALES));
  }
}

function obtenerObrasSociales() {
  const obras = JSON.parse(localStorage.getItem(STORAGE_KEY_OBRAS_SOCIALES)) || [];
  return obras.map(obra => ({
    ...obra,
    descripcion: DESCRIPCIONES_OBRAS_SOCIALES[obra.id] || 'Sin descripción disponible.'
  }));
}

function guardarObrasSociales(obrasSociales) {
  localStorage.setItem(STORAGE_KEY_OBRAS_SOCIALES, JSON.stringify(obrasSociales));
}

function agregarObraSocial(nombre) {
  const obrasSociales = obtenerObrasSociales();
  const nuevaObra = { id: Date.now(), nombre: nombre };
  obrasSociales.push(nuevaObra);
  guardarObrasSociales(obrasSociales);
  renderizarTablaObrasSociales();
}

function eliminarObraSocial(id) {
  if (confirm("¿Está seguro de que desea eliminar esta obra social?")) {
    let obrasSociales = obtenerObrasSociales();
    obrasSociales = obrasSociales.filter(o => o.id !== id);
    guardarObrasSociales(obrasSociales);
    renderizarTablaObrasSociales();
  }
}

function editarObraSocial(id, nombre) {
  let obrasSociales = obtenerObrasSociales();
  const index = obrasSociales.findIndex(o => o.id === id);
  if (index !== -1) {
    obrasSociales[index].nombre = nombre;
    guardarObrasSociales(obrasSociales);
    renderizarTablaObrasSociales();
  }
}

function cargarFormularioEdicion(id) {
  const obra = obtenerObrasSociales().find(o => o.id === id);
  if (obra) {
    document.getElementById('obraSocialId').value = obra.id;
    document.getElementById('nombreObraSocial').value = obra.nombre;
  }
}

function renderizarTablaObrasSociales() {
    const contenedor = document.getElementById('tablaObrasSocialesBody');
    if (!contenedor) return;

    const obrasSociales = obtenerObrasSociales();
    contenedor.innerHTML = '';

    obrasSociales.forEach(obra => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${obra.id}</td>
            <td>${obra.nombre}</td>
            <td>${obra.descripcion}</td> <!-- Aquí se agrega la descripción -->
            <td>
                <button class="btn btn-sm btn-warning" onclick="cargarFormularioEdicion(${obra.id})">✏️</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarObraSocial(${obra.id})">🗑️</button>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}

function renderizarCatalogoObrasSociales() {
  const contenedor = document.getElementById('catalogoObrasSociales');
  if (!contenedor) {
    return;
  }
  const obras = obtenerObrasSociales();
  contenedor.innerHTML = '';
  obras.forEach(obra => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card shadow-sm p-2">
        <img src="../imagenes/obra_generica.png" class="card-img-top" alt="${obra.nombre}" style="object-fit: contain; height: 80px;">
        <p class="mt-2 fw-semibold text-primary">${obra.nombre}</p>
        <p class="text-muted small">${obra.descripcion}</p> <!-- Asegúrate de que esta línea esté activa -->
      </div>
    `;
    contenedor.appendChild(col);
  });
}

function manejarEnvioFormulario(event) {
  event.preventDefault();
  
  const id = document.getElementById('obraSocialId').value;
  const nombre = document.getElementById('nombreObraSocial').value.trim();

  if (nombre) {
    if (id) {
      editarObraSocial(Number(id), nombre);
    } else {
      agregarObraSocial(nombre);
    }
    document.getElementById('formObraSocial').reset();
    document.getElementById('obraSocialId').value = '';
    
  } else {
    alert("Por favor, ingrese un nombre para la obra social.");
  }
}
inicializarObrasSociales();
renderizarTablaObrasSociales();
renderizarCatalogoObrasSociales();

const formObraSocial = document.getElementById('formObraSocial');
if (formObraSocial) {
  formObraSocial.addEventListener('submit', manejarEnvioFormulario);
}