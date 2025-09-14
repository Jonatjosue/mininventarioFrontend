export function validarTextoSoloLetras(texto) {
  if (!texto || texto.trim().length <= 1) return false;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(texto.trim());
}

export function validarCorreo(correo) {
  if (!correo) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo.trim());
}

export function validarCampoVacio(campo) {
  if (!campo || campo.trim().length === 0) return false;
  return true;
}

export function validarSoloNumeros(campo) {
  const regex = /^\d+$/;
  return regex.test(campo);
}
export function validarContrasena(contrasena) {
  if (!contrasena || contrasena.trim().length < 6) return false;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(contrasena.trim());
}

export function validarSimilaridadContrasena(contrasena, confirmacion) {
  if (!contrasena || !confirmacion) return false;
  return contrasena.trim() === confirmacion.trim();
}

export function validarTelefono(telefono) {
  if (!telefono) return true; // opcional
  const regex = /^(\d+|\+\d+\s\d+)$/;
  return regex.test(telefono.trim());
}
