/*
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
*/

const OBRAS_SOCIALES_INICIALES = [
  { id: 1, nombre: 'Salud Total Plus' },
  { id: 2, nombre: 'Old Argentina' },
  { id: 3, nombre: 'Vida Sana Prepaga' },
  { id: 4, nombre: 'Cobertura Médica Sur' }
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
      <td>
        <button class="btn btn-sm btn-warning" onclick="cargarFormularioEdicion(${obra.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarObraSocial(${obra.id})">🗑️</button>
      </td>
    `;
    contenedor.appendChild(fila);
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

const formObraSocial = document.getElementById('formObraSocial');
if (formObraSocial) {
  formObraSocial.addEventListener('submit', manejarEnvioFormulario);
}