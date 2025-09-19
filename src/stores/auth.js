import { defineStore } from 'pinia';
import { api } from '../axios.js';
import { all } from 'axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue'; // esto est bien no lo cambies
import { cargarRutasInicioPublicas } from './rutasPublicas.js';
import { cargarRutasInicioPublicasConAuth } from './rutasPublicasConAuth.js';
import routes from 'virtual:generated-pages';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    rutasProtegidas: [],
    cargado: false,
    mapaPermisos: {},
  }),
  actions: {
    async cargarRutasProtegidasAutenticadas() {
      this.mapaPermisos = {};
      await this.cargarRutasPublicasConAutenticacion();
      try {
        const response = await api.v1.cargaInicial.cargarRutas();
        if (response.data && Array.isArray(response.data.rutasPermitidas)) {
          response.data.rutasPermitidas.forEach((perm) => {
            const path = this.normalizaPath(perm.path);
            this.mapaPermisos[path] = { path, ...perm };
          });
        }
      } catch (error) {
        this.mostrarAlertaError(
          'Error al cargar las rutas protegidas. Inténtalo de nuevo.'
        );
        console.error('Error al cargar las rutas protegidas:', error);
        this.cargado = true;
      }
    },

    cargarRutasPublicas() {
      console.log('cargando rutas publicas');
      this._cargarListaEnMapa(cargarRutasInicioPublicas());
    },

    cargarRutasPublicasConAutenticacion() {
      console.log('cargando rutas publicas con autenticación');
      this._cargarListaEnMapa(cargarRutasInicioPublicasConAuth());
    },

    limiparRutasAIniciales() {
      this.mapaPermisos = {};
      console.log('limpiando rutas');
      this._cargarListaEnMapa(cargarRutasInicioPublicas());
    },

    _cargarListaEnMapa(lista) {
      if (lista && Array.isArray(lista)) {
        lista.forEach((perm) => {
          const path = this.normalizaPath(perm.path);
          this.mapaPermisos[path] = { path, ...perm };
        });
      }
    },
    normalizaPath(p) {
      if (!p) return '/';
      let out = p.trim();
      if (!out.startsWith('/')) out = '/' + out;
      return out.toLowerCase();
    },
    rutaProtegidaPermitida(ruta) {
      const path = this.normalizaPath(ruta);
      const permiso = this.mapaPermisos[path];
      return !!(permiso && permiso.meta.allowed === true);
    },
    login(usuario, token) {
      this.usuario = usuario;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('token', token);
    },
    async logout() {
      try {
        const result = await api.v1.auth.logout();
        if (result.status >= 400) {
          const errorMessage =
            result.data?.message || `Error en logout (${result.status})`;
          throw new Error(`No se pudo hacer el logout: ${errorMessage}`);
        }
        this.usuario = null;
        this.rutasProtegidas = [];
        this.limiparRutasAIniciales();
        this.mapaPermisos = {};
        this.cargado = false;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.mostrarAlertaError('Error al cerrar sesión. Inténtalo de nuevo.');
        console.error('Error al cerrar sesión:', error);
        return;
      }
    },
    estaRegistrado() {
      return this.tokenAutenticacionValido();
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    tokenAutenticacionValido() {
      const usuario = localStorage.getItem('usuario');
      const token = localStorage.getItem('token');
      if (usuario && token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const ahora = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp > ahora) {
          return true;
        } else {
          if (this.refrescarToken()) {
            return true;
          } else {
            this.logout();
            this.mostrarAlertaError(
              'Sesión expirada. Por favor, inicia sesión nuevamente.'
            );
            return false;
          }
        }
      } else {
        this.mostrarAlertaError('No autenticado. Por favor, inicia sesión.');
        this.logout();
        return false;
      }
    },

    async refrescarToken() {
      try {
        const response = await api.v1.auth.refreshToken();

        if (response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          return true;
        }
        this.mostrarAlertaError(
          'No se pudo refrescar el token. Por favor, inicia sesión nuevamente.'
        );
        this.logout();
        return false;
      } catch (error) {
        this.mostrarAlertaError(
          'Error al refrescar el token. Por favor, inicia sesión nuevamente.'
        );
        this.logout();
        return false;
      }
    },
  },
});
