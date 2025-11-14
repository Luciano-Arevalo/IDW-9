const STORAGE_KEY_TURNOS = 'turnos';
const TURNOS_INICIALES = [];

function inicializarTurnos() {
    if (!localStorage.getItem(STORAGE_KEY_TURNOS)) {
        localStorage.setItem(STORAGE_KEY_TURNOS, JSON.stringify(TURNOS_INICIALES));
    }
}

function obtenerTurnos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_TURNOS)) || [];
}

function guardarTurnos(turnos) {
    localStorage.setItem(STORAGE_KEY_TURNOS, JSON.stringify(turnos));
}

function agregarTurno(idMedico, fecha, hora) {
    const turnos = obtenerTurnos();
    const nuevoTurno = { id: Date.now(), idMedico, fecha, hora };
    turnos.push(nuevoTurno);
    guardarTurnos(turnos);
    renderizarTablaTurnos();
}

function eliminarTurno(id) {
    const turnos = obtenerTurnos().filter(turno => turno.id !== id);
    guardarTurnos(turnos);
    renderizarTablaTurnos();
}

function renderizarTablaTurnos() {
    const contenedor = document.getElementById('tablaTurnosBody');
    contenedor.innerHTML = '';
    const turnos = obtenerTurnos();
    turnos.forEach(turno => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${turno.id}</td>
            <td>${turno.idMedico}</td>
            <td>${turno.fecha}</td>
            <td>${turno.hora}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarTurno(${turno.id})">Eliminar</button>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}

function manejarEnvioFormularioTurno(event) {
    event.preventDefault();
    const idMedico = document.getElementById('idMedico').value;
    const fecha = document.getElementById('fechaTurno').value;
    const hora = document.getElementById('horaTurno').value;
    
    if (idMedico && fecha && hora) {
        agregarTurno(idMedico, fecha, hora);
        document.getElementById('formTurno').reset();
    }
}

// Inicializar y cargar turnos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarTurnos();
    renderizarTablaTurnos();

    const formTurno = document.getElementById('formTurno');
    if (formTurno) {
        formTurno.addEventListener('submit', manejarEnvioFormularioTurno);
    }
});