// helpers/fechaHora.js
// Formatea la fecha en español sin desfase horario
export const formatearFechaLegible = (fecha) => {
  if (!fecha) return null;
  const date = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleDateString('es-GT', opciones);
};

// Formatea la hora en español usando la zona horaria de Guatemala
export const formatearHoraLegible = (hora) => {
  if (!hora) return null;

  const date = new Date(hora);

  // Extraer horas y minutos de UTC para evitar desfase
  const horas = date.getUTCHours();
  const minutos = date.getUTCMinutes();

  const pad = (n) => String(n).padStart(2, '0');

  // Convertir a 12h
  let ampm = horas >= 12 ? 'p. m.' : 'a. m.';
  let hora12 = horas % 12;
  if (hora12 === 0) hora12 = 12;

  return `${hora12}:${pad(minutos)} ${ampm}`;
};

// Función combinada: recibe fecha + hora y devuelve un string completo
export const formatearFechaHoraEntrega = (fechaEntrega, horaEntrega) => {
  if (!fechaEntrega && !horaEntrega) return null;

  let fechaStr = fechaEntrega ? formatearFechaLegible(fechaEntrega) : '';
  let horaStr = horaEntrega ? formatearHoraLegible(horaEntrega) : '';

  if (fechaStr && horaStr) return `${fechaStr}, ${horaStr}`;
  if (fechaStr) return fechaStr;
  if (horaStr) return horaStr;

  return null;
};

export const formatearHora = (
  fecha,
  formato = 'HH:MM:SS',
  tipoRetorno = 'string'
) => {
  if (!fecha) return null;

  const date = new Date(fecha);
  const horas = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();

  if (tipoRetorno === 'numero') {
    switch (formato) {
      case 'HH:MM':
        return horas * 100 + minutos;
      case 'HH:MM:SS':
        return horas * 10000 + minutos * 100 + segundos;
      default:
        return horas * 10000 + minutos * 100 + segundos;
    }
  }

  if (tipoRetorno === 'prisma-time') {
    // Crear un Date con la fecha de hoy y hora seleccionada
    const ahora = new Date();
    return new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      horas,
      minutos,
      segundos
    );
  }

  if (tipoRetorno === 'objeto') {
    const pad = (n) => String(n).padStart(2, '0');
    return {
      horas,
      minutos,
      segundos,
      comoString: `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`,
      comoStringCorto: `${pad(horas)}:${pad(minutos)}`,
      comoNumero: horas * 100 + minutos,
      comoNumeroCompleto: horas * 10000 + minutos * 100 + segundos,
      paraPrisma: new Date(
        `1970-01-01T${pad(horas)}:${pad(minutos)}:${pad(segundos)}`
      ),
    };
  }

  const pad = (n) => String(n).padStart(2, '0');
  switch (formato) {
    case 'HH:MM':
      return `${pad(horas)}:${pad(minutos)}`;
    case 'HH:MM:SS':
      return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
    case '12h':
      return date.toLocaleTimeString('es-GT', { hour12: true });
    default:
      return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
  }
};

export const obtenerHoraParaBackend = (fecha) => {
  if (!fecha) return null;
  return formatearHora(fecha, 'HH:MM:SS', 'prisma-time');
};

export const numeroHoraABackend = (numeroHora) => {
  if (numeroHora === null || numeroHora === undefined) return null;

  let horas, minutos, segundos;

  if (numeroHora < 10000) {
    horas = Math.floor(numeroHora / 100);
    minutos = numeroHora % 100;
    segundos = 0;
  } else {
    horas = Math.floor(numeroHora / 10000);
    minutos = Math.floor((numeroHora % 10000) / 100);
    segundos = numeroHora % 100;
  }

  const pad = (n) => String(n).padStart(2, '0');
  return new Date(`1970-01-01T${pad(horas)}:${pad(minutos)}:${pad(segundos)}`);
};

// Devuelve un timestamp (ms) o ISO string listo para backend
export const fechaParaBackend = (fecha, tipo = 'timestamp') => {
  if (!fecha) return null;

  const date = new Date(fecha);

  if (tipo === 'timestamp') {
    return date.getTime(); // milisegundos desde 1970-01-01
  }

  if (tipo === 'iso') {
    return date.toISOString(); // "2025-09-29T23:53:41.000Z"
  }

  // Por defecto, ISO string
  return date.toISOString();
};

export const fechaParaBackendLocal = (fecha) => {
  if (!fecha) return null;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ` +
    `${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`
  );
};
