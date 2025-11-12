async function handleLogin(event) {
    event.preventDefault(); // Evitar que la página se recargue

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('login-error'); // ID de error

    try {
        const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        
        if (!res.ok || !data.accessToken) {
            throw new Error(data.message || 'Credenciales incorrectas');
        }

        
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('usuario', data.username); 

        
        window.location.href = 'admin_medicos.html';

    } catch (err) {
      console.error('Login fallido:', err.message);
      errorMsg.textContent = err.message;
      errorMsg.style.display = 'block';
    }
}

// (sea cual sea el ID) y asigna el evento
const formLogin = document.getElementById('form-login') || document.getElementById('loginForm');
if (formLogin) {
    formLogin.addEventListener('submit', handleLogin);
}