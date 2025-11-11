// Si no hay token, redirigir
if (!sessionStorage.getItem('token')) {
  alert('Debe iniciar sesión para acceder a esta página');
  window.location.href = 'login.html';
}

const tbody = document.querySelector('#tablaUsuarios tbody');
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
}

async function cargarUsuarios() {
  try {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json();

    tbody.innerHTML = '';
    data.users.forEach(u => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${u.id}</td>
        <td>${u.firstName} ${u.lastName}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar usuarios</td></tr>`;
  }
}

cargarUsuarios();
