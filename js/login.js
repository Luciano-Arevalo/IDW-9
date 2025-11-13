async function handleLogin(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('login-error'); 

    try {
        
        const resLogin = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const dataLogin = await resLogin.json();

        if (!resLogin.ok || !dataLogin.accessToken) {
            throw new Error(dataLogin.message || 'Credenciales incorrectas');
        }

  
        const token = dataLogin.accessToken;
        const userId = dataLogin.id;
        const userUsername = dataLogin.username;


        const resUser = await fetch(`https://dummyjson.com/users/${userId}`);
        
        if (!resUser.ok) {
            throw new Error('Login exitoso, pero no se pudo obtener el rol del usuario.');
        }

        const dataUser = await resUser.json();
        const userRole = dataUser.role; 

        
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('usuario', userUsername);
        sessionStorage.setItem('userRole', userRole); // 

        
        if (userRole === 'admin') {
            window.location.href = 'admin_medicos.html';
        } else {
            // Si es 'user' o 'moderator', va a reservas
            window.location.href = 'reservas.html'; 
        }

    } catch (err) {
      console.error('Fallo en el proceso de login:', err.message);
      errorMsg.textContent = err.message;
      errorMsg.style.display = 'block';
  }
}

// (sea cual sea el ID) y asigna el evento
const formLogin = document.getElementById('form-login') || document.getElementById('loginForm');
if (formLogin) {
    formLogin.addEventListener('submit', handleLogin);
}