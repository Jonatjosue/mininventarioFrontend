import axios from 'axios';
import { useAuthStore } from './stores/auth.js';
import SignUp from './pages/SignUp.vue';
const urlConexion = import.meta.env.VITE_URL_CONEXION;
const api = axios.create({
  baseURL: urlConexion,
});

api.defaults.withCredentials = true;
api.defaults.timeout = 10000;

api.v1 = {
  auth: {
    rutasInicio: () => api.get('/v1/auth/rutasInicio'),
    login: (credentials) => api.post('/v1/auth/login', credentials),
    logout: () => api.post('/v1/auth/logout'),
    refreshToken: () => api.post('/v1/auth/refreshToken'),
    SignUp: (data) => api.post('/v1/auth/SignUp', data),
  },
  cargaInicial: {
    paginasDefault: () => api.get('/v1/cargaInicial/paginasDefault'),
    cargarRutas: () => api.get('/v1/cargaInicial/cargaRutas'),
  },
  inventario: {
    ObtenerProveedores: () => api.get('/v1/inventario/ObtenerProveedores'),
    AgregarProveedor: (data) =>
      api.post('/v1/inventario/AgregarProveedor', data),
    quitarProveedor: (id_proveedor) =>
      api.delete(`/v1/inventario/quitarProveedor/${id_proveedor}`),
    ActualizarProveedor: (data) =>
      api.post('/v1/inventario/ActualizarProveedor', data),
    crearCategoriaProducto: (data) =>
      api.post('/v1/inventario/crearCategoriaProducto', data),
    obtenerCategoriasProducto: () =>
      api.get('/v1/inventario/obtenerCategoriasProducto'),
    actualizarCategoriaProducto: (data) =>
      api.post('/v1/inventario/actualizarCategoriaProducto', data),
    eliminarCategoriaProducto: (id_tipo_producto) =>
      api.delete(
        `/v1/inventario/eliminarCategoriaProducto/${id_tipo_producto}`
      ),
    obtenerProveedoresProducto: () =>
      api.get('/v1/inventario/obtenerProveedoresProducto'),
    obtenerTiposOferta: () => api.get('/v1/inventario/obtenerTiposOferta'),
    obtenerOfertas: () => api.get('/v1/inventario/obtenerOfertas'),
    crearTipoOferta: (data) => api.post('/v1/inventario/crearTipoOferta', data),
    crearOferta: (data) => api.post('/v1/inventario/crearOferta', data),
    actualizarTipoOferta: (data) =>
      api.post('/v1/inventario/actualizarTipoOferta', data),
    actualizarOferta: (data) =>
      api.post('/v1/inventario/actualizarOferta', data),
    eliminarTipoOferta: (id_tipo_oferta) =>
      api.delete(`/v1/inventario/eliminarTipoOferta/${id_tipo_oferta}`),
    eliminarOferta: (id_oferta) =>
      api.delete(`/v1/inventario/eliminarOferta/${id_oferta}`),
    //--PRODUCTO
    obtenerEstadosProducto: () =>
      api.get('/v1/inventario/obtenerEstadosProducto'),
    obtenerProductos: () => api.get('/v1/inventario/obtenerProductos'),
    crearProducto: (data) => api.post('/v1/inventario/crearProducto', data),
    actualizarProducto: (data) =>
      api.post('/v1/inventario/actualizarProducto', data),
    borrarProducto: (p_producto_Id) =>
      api.delete(`/v1/inventario/borrarProducto/${p_producto_Id}`),
  },
};
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refreshtoken')
    ) {
      originalRequest._retry = true;
      const refrescado = await authStore.refrescarToken();
      console.log(refrescado);
      if (refrescado) {
        originalRequest.headers['Authorization'] =
          'Bearer ' + localStorage.getItem('token');

        return api(originalRequest);
      }
    }
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      //localStorage.removeItem('token');
      //localStorage.removeItem('usuario');
      //window.location.href = '/';
    } else {
      console.error('Error en la solicitud', error);
    }

    return Promise.reject(error);
  }
);

export { api };
