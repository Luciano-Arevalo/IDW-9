/*
import { obtenerMedicos } from './medicos.js';
import { obtenerObrasSociales } from './obrasSociales.js';
import { obtenerHorarios } from './horarios.js';

function obtenerReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

// Carga de Reservas
function cargarReservas() {
  const reservas = obtenerReservas();
  const medicos = obtenerMedicos();
  const obrasSociales = obtenerObrasSociales();
  const horarios = obtenerHorarios();
  const tabla = document.getElementById('tabla-reservas');
  const resumen = document.getElementById('resumen-total');
  tabla.innerHTML = '';
  resumen.textContent = '';

  if (reservas.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="6" class="text-center text-secondary py-5">
      <i class='bi bi-calendar-x display-4'></i><br>
      <span class='fs-4'>No hay reservas realizadas</span><br>
      <a href="../index.html" class="btn btn-success mt-3"><i class="bi bi-plus-circle"></i> Hacer Reserva</a>
      <div class="mt-2" style="font-size: 0.95em; font-style: italic; color: #444;">
        *Al apretar este botón serás redirigido a la página principal. Oprima el botón "Hacer Reserva" debajo del médico que desee.
      </div>
    </td>`;
    tabla.appendChild(tr);
    return;
  }

  let totalGeneral = 0;
  reservas.forEach(reserva => {
    const medico = medicos.find(m => m.id === reserva.medicoId);
    const obraSocial = obrasSociales.find(o => o.id === reserva.obraSocialId);
    const horario = horarios.find(h => h.id === reserva.horarioId);
    totalGeneral += parseInt(reserva.costoTotal);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${medico ? medico.nombre : 'Médico no encontrado'}</td>
      <td>${obraSocial ? obraSocial.nombre : 'Obra Social no encontrada'}</td>
      <td>${horario ? horario.hora : 'Horario no encontrado'}</td>
      <td>$${parseInt(reserva.costoTotal).toLocaleString()}</td>
      <td>
        <button onclick="editarReserva(${reserva.id})" class="btn btn-warning btn-sm me-2"><i class='bi bi-pencil-square'></i></button>
        <button onclick="eliminarReserva(${reserva.id})" class="btn btn-danger btn-sm"><i class='bi bi-trash'></i></button>
      </td>
    `;
    tabla.appendChild(tr);
  });
  resumen.textContent = `Total general: $${totalGeneral.toLocaleString()}`;
}

// Eliminar una reserva
window.eliminarReserva = function(id) {
  if (confirm("¿Seguro que quieres quitar esta reserva?")) {
    let reservas = obtenerReservas();
    reservas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    cargarReservas();
  }
};

window.editarReserva = function(id) {
  window.location.href = `formulario-reserva.html?id=${id}`;
};

document.addEventListener('DOMContentLoaded', cargarReservas);
*/

/*
function cargarReservas() {
  const reservas = obtenerReservas();
  const medicos = obtenerMedicos(); 
  const obrasSociales = obtenerObrasSociales(); 
  

  const horarios = obtenerHorariosDisponibles(); 

  const tabla = document.getElementById('tabla-reservas');
  const resumen = document.getElementById('resumen-total');

  if(!tabla) return; 

  tabla.innerHTML = '';
  resumen.textContent = '';

  if (reservas.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="7" class="text-center text-secondary py-5">
      <i class='bi bi-calendar-x display-4'></i><br>
      <span class='fs-4'>No hay reservas realizadas</span><br>
    </td>`;
 
    tabla.appendChild(tr);
    return;
  }*/

   function obtenerReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function cargarReservas() {
  const tabla = document.getElementById('tabla-reservas');
  const resumen = document.getElementById('resumen-total');

  if (!tabla || !resumen) return; 

  const todasLasReservas = obtenerReservas();
  const role = sessionStorage.getItem('userRole');
  const username = sessionStorage.getItem('usuario');

  let reservasParaMostrar;
  if (role === 'admin') {
    reservasParaMostrar = todasLasReservas;
  } else {
    reservasParaMostrar = todasLasReservas.filter(r => r.username === username);
  }

  tabla.innerHTML = '';
  resumen.textContent = '';

  if (reservasParaMostrar.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="7" class="text-center text-secondary py-5">... (tu mensaje de 'No hay reservas') ...</td>`;
    tabla.appendChild(tr);
    return;
  }


  const medicos = obtenerMedicos();
  const obrasSociales = obtenerObrasSociales();

  const horarios = obtenerHorarios(); 

  let totalGeneral = 0;
  reservasParaMostrar.forEach(reserva => { 
    const medico = medicos.find(m => m.id === reserva.medicoId); 
    const obraSocial = obrasSociales.find(o => o.id === reserva.obraSocialId);
    const horario = horarios.find(h => h.id === reserva.horarioId);

    const costo = reserva.costoTotal || 10000;
    totalGeneral += parseInt(costo);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reserva.pacienteDNI || 'S/D'}</td>
      <td>${reserva.pacienteNombre || 'S/N'}</td>
      <td>${obraSocial ? obraSocial.nombre : 'No encontrada'}</td>

      <td>
        <strong>${medico ? medico.nombre : 'Médico no encontrado'}</strong><br>
        <small>${medico ? medico.especialidad : 'S/E'}</small>
      </td>

      <td>${horario ? horario.hora : 'No encontrado'}</td>
      <td>$${parseInt(costo).toLocaleString()}</td>
      <td>
        <button onclick="eliminarReserva(${reserva.id})" class="btn btn-danger btn-sm"><i class='bi bi-trash'></i></button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  resumen.textContent = `Total general: $${totalGeneral.toLocaleString()}`;
}

window.eliminarReserva = function(id) {
  if (confirm("¿Seguro que quieres quitar esta reserva?")) {
    let reservas = obtenerReservas();
    reservas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    cargarReservas(); //
  }
};

cargarReservas();