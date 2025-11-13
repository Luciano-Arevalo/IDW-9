// Obtiene el token 
const token = sessionStorage.getItem('accessToken');
const role = sessionStorage.getItem('userRole');


if (!token || role !== 'admin') //control de rol
 { 
  console.warn('Acceso denegado: Se requiere rol de administrador.');
  window.location.href = 'login.html'; 
}