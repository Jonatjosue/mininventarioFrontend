import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import { cargarRutasInicioPublicas } from '../stores/rutasPublicas.js';

import routes from 'virtual:generated-pages';
let rutasRestauradas = false;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function mostrarAlertaError(mensaje) {
  mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
}

function mostrarAlertaExito(mensaje) {
  mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
}

routes.forEach((route) => {
  const usuario = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');
  if (token !== null && usuario !== null) {
    const payload = JSON.parse(atob(token?.split('.')[1])); // decodifica el payload
    const ahora = Math.floor(Date.now() / 1000);
    if (payload?.exp && payload?.exp > ahora) {
      // Token válido
      return true;
    } else {
      //localStorage.removeItem('usuario');
      //localStorage.removeItem('token');
    }
  }
  const rutasPublicas = cargarRutasInicioPublicas();
  const rutaPublica = rutasPublicas.find(
    (r) => r.path.toLowerCase() === route.path.toLowerCase()
  );

  route.meta = {
    allowed: false, // por defecto
    isPublic: false, // por defecto
    title: route.name || 'Sin título',
    icon: 'FileIcon',
    group: 'General',
    requiresAuth: true,
    ...(route.meta || {}),
    // si existe ruta pública, sobrescribir con sus valores
    ...(rutaPublica
      ? {
          ...rutaPublica.meta,
          allowed: rutaPublica.meta?.allowed ?? true,
          isPublic: true,
        }
      : {}),
  };

  if (rutaPublica) {
    route.name = rutaPublica.name; // asegura que el nombre también se actualice
  }
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!rutasRestauradas) {
    const [nav] = performance.getEntriesByType('navigation');
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (nav && nav.type === 'reload' && token && usuario) {
      try {
        await authStore.cargarRutasProtegidasAutenticadas();
      } catch (e) {}
    }
    rutasRestauradas = true;
  }
  const rutasPublicas = cargarRutasInicioPublicas();
  const rutaPublica = rutasPublicas.find(
    (r) => r.path.toLowerCase() === to.path.toLowerCase()
  );

  if (rutaPublica) {
    to.meta.isPublic = true;
    to.meta.allowed = true;
    to.meta.title = rutaPublica.name;
    to.meta.name = rutaPublica.name;
    to.meta.icon = rutaPublica.icon;
    to.meta.requiresAuth = rutaPublica.meta?.requiresAuth || false;

    if (to.meta.requiresAuth && !authStore.estaRegistrado()) {
      return next('/');
    }
    return next();
  }

  if (!authStore.rutaProtegidaPermitida(to.path)) {
    console.log(to.path);
    mostrarAlertaError('No tienes permiso para acceder a esta ruta.');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return next(from.path);
  }

  if (
    !to.meta.isPublic &&
    to.meta.allowed &&
    to.meta.requiresAuth &&
    !authStore.estaRegistrado()
  ) {
    console.warn('Token no válido o expirado. Redirigiendo al inicio.');
    return next('/');
  }

  next();
});

export default router;
