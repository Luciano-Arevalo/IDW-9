
function inicializarLogin() {
  const formLogin = document.getElementById('form-login');

  // Si no existe el formulario, no hace nada
  if (!formLogin) {
    return;
  }

  formLogin.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // 1. Obtenemos los valores de los campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 2. Usamos Fetch para enviar los datos a la API
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then(data => {

      if (data.accessToken) {

        console.log('Login exitoso:', data);

        sessionStorage.setItem('accessToken', data.accessToken);

        document.getElementById('login-error').style.display = 'none';

        window.location.href = 'admin_medicos.html'; 

      } else {
        // Error: Datos incorrectos
        console.error('Login fallido:', data.message);
        document.getElementById('login-error').style.display = 'block';
      }
    })
    .catch(err => {
      // Error de red
      console.error('Error de red:', err);
      document.getElementById('login-error').innerText = 'Error de conexión. Intente más tarde.';
      document.getElementById('login-error').style.display = 'block';
    });
  });
}

inicializarLogin();