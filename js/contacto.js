document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");
    const resultado = document.getElementById("resultado");
    const btnBorrar = document.getElementById("borrar");

    const CONTACTOS_KEY = "contactosAgregados"; 

    if (!form) {
        return;
    }

    const mostrarResultado = (texto) => {
        if (resultado) {
            resultado.textContent = texto;
            resultado.style.display = 'block'; 
        } else {
            console.log("Resultado:", texto);
        }
    };
    
    const cargarYMostrarUltimoContacto = () => {
        const contactos = JSON.parse(localStorage.getItem(CONTACTOS_KEY)) || [];
        if (contactos.length > 0) {
            const ultimo = contactos[contactos.length - 1];
            const texto = `Último guardado: ${ultimo.nombre} (${ultimo.email}) - Total: ${contactos.length}`;
            mostrarResultado(texto);
        } else {
            mostrarResultado("No hay contactos guardados.");
        }
    };

    cargarYMostrarUltimoContacto(); 
    
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const area = document.getElementById("area").value;
        const consulta = document.getElementById("consulta").value.trim();

        if (!nombre || !email) {
             mostrarResultado("ERROR: Nombre y Email son obligatorios.");
             return;
        }

        const nuevoContacto = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            telefono: telefono,
            dni: dni,
            area: area,
            consulta: consulta,
            fechaGuardado: new Date().toLocaleString()
        };

        let contactosGuardados = JSON.parse(localStorage.getItem(CONTACTOS_KEY)) || [];

        contactosGuardados.push(nuevoContacto);

        localStorage.setItem(CONTACTOS_KEY, JSON.stringify(contactosGuardados));

        mostrarResultado(`¡Contacto de ${nombre} guardado! Total: ${contactosGuardados.length}`);
        form.reset();
    });

    if (btnBorrar) {
        btnBorrar.addEventListener("click", () => {
            localStorage.removeItem(CONTACTOS_KEY); 
            
            mostrarResultado("Todos los contactos han sido eliminados del Local Storage.");
            form.reset();
        });
    }
});