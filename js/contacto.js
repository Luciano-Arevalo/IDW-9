document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");
    const resultado = document.getElementById("resultado");
    const btnBorrar = document.getElementById("borrar");


    const CONTACTOS_KEY = "contactosAgregados"; 

    if (!form) {
        console.warn(
            'contacto.js: elemento con id "formContacto" no encontrado. No se aplicará comportamiento.'
        );
        return;
    }

    const mostrarResultado = (texto) => {
        if (resultado) {
            resultado.textContent = texto;
        } else {
            console.log("Resultado:", texto);
        }
    };
    

    const cargarYMostrarUltimoContacto = () => {
        const contactos = JSON.parse(localStorage.getItem(CONTACTOS_KEY)) || [];
        if (contactos.length > 0) {
            const ultimo = contactos[contactos.length - 1];
            const texto = `Último guardado: Nombre: ${ultimo.nombre ?? "-"} - Email: ${ultimo.email ?? "-"}`;
            mostrarResultado(texto);
        } else {
            mostrarResultado("No hay contactos guardados.");
        }
    };

    cargarYMostrarUltimoContacto();


    form.addEventListener("submit", (e) => {
        e.preventDefault();


        const nombreInput = document.getElementById("nombre");
        const emailInput = document.getElementById("email");


        const nombre = nombreInput ? nombreInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";

        if (!nombre && !email) {
                mostrarResultado("¡Debe ingresar al menos Nombre o Email!");
                    return;
        }


        const nuevoContacto = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            fechaGuardado: new Date().toLocaleString(),
            
        };

        let contactosGuardados = JSON.parse(localStorage.getItem(CONTACTOS_KEY)) || [];

  
        contactosGuardados.push(nuevoContacto);

     
        localStorage.setItem(CONTACTOS_KEY, JSON.stringify(contactosGuardados));

        mostrarResultado(`¡Contacto guardado! Total: ${contactosGuardados.length}`);
        form.reset();
        cargarYMostrarUltimoContacto();
    });

   
    if (btnBorrar) {
        btnBorrar.addEventListener("click", () => {
            
            localStorage.removeItem(CONTACTOS_KEY); 
            
            
            localStorage.removeItem("nombre");
            localStorage.removeItem("email");

            mostrarResultado("Todos los contactos eliminados.");
            form.reset();
        });
    } else {
        console.info(
            'contacto.js: no se encontró botón con id "borrar". Sin funcionalidad de borrado desde UI.'
        );
    }
});