import  jwt from "jsonwebtoken";

// Obtén el token del localStorage
const token = localStorage.getItem('token');

// Define una función para validar el token
function validarToken(token) {
  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, 'secreto_del_jwt');

    // El token es válido
    return decoded;
  } catch (error) {
    // El token no es válido
    return null;
  }
}

// Llama a la función de validación con el token
const resultado = validarToken(token);

// Comprueba el resultado
if (resultado) {
  console.log('El token es válido:', resultado);
} else {
  console.log('El token no es válido');
}
