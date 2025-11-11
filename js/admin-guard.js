
// Obtiene el token 
const token = sessionStorage.getItem('accessToken');

//
if (!token) {
  //Si no existe, echa al usuario.
  console.warn('Acceso denegado: Se requiere iniciar sesión.');

  window.location.href = 'login.html';
}