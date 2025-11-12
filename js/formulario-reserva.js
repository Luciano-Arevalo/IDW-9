
// Verificion usuario
function obtenerReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

const token = sessionStorage.getItem('accessToken');
if (!token) {
  // Si no hay token, no puede reservar
  console.warn('Acceso denegado: Se requiere iniciar sesión para reservar.');
  window.location.href = 'login.html';
}



function obtenerMedicoIdDeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('medicoId'); // Devuelve el ID o 'null'
}


function popularDropdowns() {
  // O.S.
  const obrasSelect = document.getElementById('obras-sociales-select');
  const obras = obtenerObrasSociales();
  obrasSelect.innerHTML = '<option value="">-- Seleccione Obra Social --</option>';
  obras.forEach(obra => {
    obrasSelect.innerHTML += `<option value="${obra.id}">${obra.nombre}</option>`;
  });

 
 const horariosSelect = document.getElementById('horarios-select');

  const medicoId = Number(document.getElementById('reserva-medico-id').value);
  const horariosDisponibles = obtenerHorariosDisponibles();
  const todasLasReservas = obtenerReservas();
  const slotsOcupadosPorEsteMedico = todasLasReservas
    .filter(r => r.medicoId === medicoId) 
    .map(r => r.horarioId);               

  const horariosLibresParaEsteMedico = horariosDisponibles.filter(h => {
    return !slotsOcupadosPorEsteMedico.includes(h.id);
  });

  horariosSelect.innerHTML = '<option value="">-- Seleccione Horario --</option>';
  if (horariosLibresParaEsteMedico.length === 0) {
    horariosSelect.innerHTML = '<option value="">-- No hay turnos disponibles para este médico --</option>';
    horariosSelect.disabled = true;
  } else {
    horariosLibresParaEsteMedico.forEach(h => {
      horariosSelect.innerHTML += `<option value="${h.id}">${h.hora}</option>`;
    });
  }
}


function guardarNuevaReserva(reserva) {
  
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
  
  reserva.id = Date.now(); // ID único
  reserva.username = sessionStorage.getItem('usuario'); // Guardamos quién hizo la reserva
  reserva.costoTotal = 10000; 
  
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
}


function inicializarFormulario() {
  const medicoId = obtenerMedicoIdDeURL();
  if (!medicoId) {
    alert("Error: No se seleccionó ningún médico.");
    window.location.href = 'index.html'; 
    return;
  }

  
  document.getElementById('reserva-medico-id').value = medicoId;

  
  popularDropdowns();

  
  const form = document.getElementById('form-reserva');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    const nuevaReserva = {
      medicoId: Number(document.getElementById('reserva-medico-id').value),
      pacienteNombre: document.getElementById('pacienteNombre').value,
      pacienteDNI: document.getElementById('pacienteDNI').value,
      obraSocialId: Number(document.getElementById('obras-sociales-select').value),
      horarioId: Number(document.getElementById('horarios-select').value),
    };
    
    
    guardarNuevaReserva(nuevaReserva);

    
    alert("¡Reserva confirmada con éxito!");
    window.location.href = 'reservas.html'; 
  });
}


inicializarFormulario();