document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    

    try {
        const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Credenciales incorrectas');

    const data = await res.json();

    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('usuario', data.username);

    
    window.location.href = 'index.html';
    } catch (err) {
    errorMsg.textContent = err.message;
    }

    
});