async function cargarUsuarios() {

  const tbody = document.querySelector('#tablaUsuarios tbody');
  
  // Si no es la página correcta, no hacenada
  if (!tbody) {
    return;
  }

  try {
    const res = await fetch('https://dummyjson.com/users');
    
    if (!res.ok) throw new Error('Error al conectar con la API');

    const data = await res.json();

    tbody.innerHTML = ''; 

    data.users.forEach(u => {
      const row = document.createElement('tr');
      

      row.innerHTML = `
        <td>${u.id}</td>
        <td><img src="${u.image}" alt="Foto" width="40" style="border-radius: 50%;"></td>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
      `;
      tbody.appendChild(row);
    });

  } catch (err) {
    console.error(err);

    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar usuarios</td></tr>`; 
  }
}


cargarUsuarios();