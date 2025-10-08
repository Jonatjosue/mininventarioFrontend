import axios from 'axios';
import { useAuthStore } from './stores/auth.js';
const urlConexion = import.meta.env.VITE_URL_CONEXION;
// Variable global para controlar el estado del refresh
let isRefreshing = false;
let refreshSubscribers = [];
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2; // Máximo de intentos de refresh
function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}
const api = axios.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: urlConexion,
});

axios.defaults.withCredentials = true;

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
    obtenerhistorialInicalLogs: () =>
      api.get('/v1/cargaInicial/obtenerhistorialInicalLogs'),
    obtenerResumenProductos: () =>
      api.get('/v1/cargaInicial/obtenerResumenProductos'),
  },
  venta: {
    obtnerClientes: () => api.get('/v1/venta/obtnerClientes'),
    obtenerEstadosPedido: () => api.get('/v1/venta/obtenerEstadosPedido'),
    obtenerProductosPedido: () => api.get('/v1/venta/obtenerProductosPedido'),
    crearPedido: (data) => api.post('/v1/venta/crearPedido', data),
    obtenerPedidos: (id_cliente) =>
      api.get('/v1/venta/obtenerPedidos', {
        params: { id_cliente },
      }),
    obtenerDetallePedido: (id_cliente_pedido) =>
      api.get('/v1/venta/obtenerDetallePedido', {
        params: { id_cliente_pedido },
      }),
    actualizarEstadoPedido: (data) =>
      api.post('/v1/venta/actualizarEstadoPedido', data),
    obtenerProductosParaCompra: () =>
      api.get('/v1/venta/obtenerProductosParaCompra'),
    obtenerConsidenciasCorreo: (correo) =>
      api.get('/v1/venta/obtenerConsidenciasCorreo', { params: { correo } }),
    obtenerClientePorCorreo: (correo) =>
      api.get('/v1/venta/obtenerClientePorCorreo', { params: { correo } }),
    clienteDebeActualizar: (correo) =>
      api.get('/v1/venta/clienteDebeActualizar', { params: { correo } }),
    obtenerPedidosPorNumero: (numero_pedido) =>
      api.get('/v1/venta/obtenerPedidosPorNumero', {
        params: { numero_pedido },
      }),
    crearFacturaCliente: (data) =>
      api.post('/v1/venta/crearFacturaCliente', data),
    obtenerFacturasClientes: () => api.get('/v1/venta/obtenerFacturasClientes'),
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
    ofertasProducto: () => api.get('/v1/inventario/ofertasProducto'),
    agregarOfertaProducto: (data) =>
      api.post('/v1/inventario/agregarOfertaProducto', data),
    borrarProductoOferta: (id_producto_oferta) =>
      api.delete(`/v1/inventario/borrarProductoOferta/${id_producto_oferta}`),
    obtenerEstadosFactura: (filtro) =>
      api.get('/v1/inventario/obtenerEstadosFactura', { params: { filtro } }),
    obtenerTiposPago: () => api.get('/v1/inventario/obtenerTiposPago'),
    obtenerProductosPorProveedor: (proveedor) =>
      api.get('/v1/inventario/obtenerProductosPorProveedor', {
        params: { proveedor },
      }),
    obtenerMovimientosInventario: () =>
      api.get('/v1/inventario/obtenerMovimientosInventario'),
    agregarMovimientoProducto: (data) =>
      api.post('/v1/inventario/agregarMovimientoProducto', data),
    borrarFacturayDetalle: (id_factura) =>
      api.delete(`/v1/inventario/borrarFacturayDetalle/${id_factura}`),
  },
  opcionesGenerales: {
    obtenerPais: () => api.get('/v1/opcionesGenerales/obtenerPais'),
    obtenerDepartamento: (idPais) =>
      api.get('/v1/opcionesGenerales/obtenerDepartamento', {
        params: { idPais },
      }),
    obtenerMunicipio: (departamentoId) =>
      api.get('/v1/opcionesGenerales/obtenerMunicipio', {
        params: { departamentoId },
      }),
    obtenerTiposIdentificacion: () =>
      api.get('/v1/opcionesGenerales/obtenerTiposIdentificacion'),
    crearDireccion: (data) =>
      api.post('/v1/opcionesGenerales/crearDireccion', data),
    obtenerEstadotelefono: () =>
      api.get('/v1/opcionesGenerales/obtenerEstadotelefono'),
    obtenerPorcentajeIva: () =>
      api.get('/v1/opcionesGenerales/obtenerPorcentajeIva'),
  },
  cliente: {
    actualizarCliente: (data) =>
      api.post('/v1/cliente/actualizarCliente', data),
    crearDocumentoIdentificacion: (data) =>
      api.post('/v1/cliente/crearDocumentoIdentificacion', data),
    crearTelefonosContacto: (data) =>
      api.post('/v1/cliente/crearTelefonosContacto', data),
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

    // EXCLUIR endpoints críticos que no deben hacer refresh
    const excludedEndpoints = [
      '/v1/auth/refreshToken',
      '/v1/auth/login',
      '/v1/auth/logout',
      '/v1/auth/SignUp',
    ];

    const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
      originalRequest.url.includes(endpoint)
    );

    if (isExcludedEndpoint) {
      return Promise.reject(error);
    }

    // Si ya superamos el máximo de intentos, forzamos logout
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      // Usamos una función de logout directa para evitar el interceptor
      forceLogout();
      return Promise.reject(error);
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Si ya se está refrescando, encolamos la solicitud
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      refreshAttempts++;

      try {
        const refrescado = await authStore.refrescarToken();

        if (refrescado) {
          const newToken = localStorage.getItem('token');
          isRefreshing = false;
          refreshAttempts = 0; // Resetear contador si tiene éxito
          onRefreshed(newToken);

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          throw new Error('Refresh token failed');
        }
      } catch (refreshError) {
        isRefreshing = false;

        // Si falla el refresh, limpiamos todo y redirigimos
        if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
          forceLogout();
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function forceLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  window.location.href = '/';
}
export { api };
