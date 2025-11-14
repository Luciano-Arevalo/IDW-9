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