<template>
  <div class="min-h-screen bg-gradiente-personal from-gray-50 to-blue-100 p-4">
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Gestión de Proveedores
              </h1>
              <p class="text-sm text-gray-600">
                Administra tus proveedores eficientemente
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="(tabItem, index) in tabs"
              :key="index"
              @click="tab = tabItem.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition',
                tab === tabItem.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              <component :is="tabItem.icon" class="w-5 h-5" />
              <span>{{ tabItem.label }}</span>
              <span
                v-if="tabItem.count !== undefined"
                class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {{ tabItem.count }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Agregar Proveedor -->
          <div v-if="tab === 'agregar'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Información Básica
                </h3>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Proveedor *
                </label>
                <fieldset class="fieldset relative">
                  <input
                    v-model="nuevoProveedor.nombre_proveedor"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: Distribuidora ABC S.A."
                  />
                  <div
                    v-if="errors.nombre_proveedor"
                    class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                    :data-tip="errors.nombre_proveedor"
                  ></div>
                </fieldset>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Completa *
                </label>
                <fieldset class="fieldset relative">
                  <textarea
                    v-model="nuevoProveedor.direccion"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: Calle Principal #123, Ciudad, Estado"
                  ></textarea>
                  <div
                    v-if="errors.direccion"
                    class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                    :data-tip="errors.direccion"
                  ></div>
                </fieldset>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono Principal *
                </label>
                <fieldset class="fieldset relative">
                  <input
                    v-model="nuevoProveedor.telefono"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: +1234567890"
                  />
                  <div
                    v-if="errors.telefono"
                    class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                    :data-tip="errors.telefono"
                  ></div>
                </fieldset>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono Secundario
                </label>
                <input
                  v-model="nuevoProveedor.telefono_secundario"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: +1234567891"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  v-model="nuevoProveedor.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: contacto@proveedor.com"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Sitio Web
                </label>
                <input
                  v-model="nuevoProveedor.sitio_web"
                  type="url"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: https://www.proveedor.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Contacto Principal
                </label>
                <input
                  v-model="nuevoProveedor.contacto_principal"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Puesto del Contacto
                </label>
                <input
                  v-model="nuevoProveedor.puesto_contacto"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: Gerente de Ventas"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  v-model="nuevoProveedor.notas"
                  rows="2"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Información adicional sobre el proveedor..."
                ></textarea>
              </div>
            </div>

            <div class="flex space-x-4 pt-4">
              <button
                v-if="!esEdicion"
                @click="agregarProveedor"
                class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center space-x-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span>Agregar Proveedor</span>
              </button>
              <button
                v-else
                @click="actualizarProveedor"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span>Actualizar Proveedor</span>
              </button>
              <button
                @click="limpiarFormulario"
                class="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Limpiar Formulario
              </button>
            </div>
          </div>

          <!-- Ver Proveedores -->
          <div v-if="tab === 'ver'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Proveedores Registrados
              </h2>
              <div
                class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div class="relative">
                  <input
                    v-model="filtroBusqueda"
                    type="text"
                    placeholder="Buscar proveedores..."
                    class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <svg
                    class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Vista de tarjetas para móvil -->
            <div class="lg:hidden space-y-4">
              <div
                v-for="(proveedor, index) in proveedoresFiltrados"
                :key="'mobile-' + index"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ proveedor.nombre_proveedor }}
                      </h3>
                      <p class="text-sm text-gray-500">
                        {{ proveedor.contacto_principal || 'Sin contacto' }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-3 mb-3">
                  <div>
                    <p class="text-xs text-gray-500">Teléfono</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ proveedor.telefono }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Email</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ proveedor.email || 'No especificado' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Dirección</p>
                    <p class="text-sm font-medium text-gray-900 line-clamp-1">
                      {{ proveedor.direccion }}
                    </p>
                  </div>
                </div>

                <div class="flex space-x-2 pt-3 border-t border-gray-100">
                  <button
                    @click="editarProveedor(index)"
                    class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminarProveedor(index)"
                    class="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div
                v-if="proveedoresFiltrados.length === 0"
                class="text-center py-12 bg-gray-50 rounded-lg"
              >
                <svg
                  class="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p class="text-gray-500 text-lg">
                  No se encontraron proveedores
                </p>
                <p class="text-gray-400 text-sm">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            </div>

            <!-- Vista de tabla para desktop -->
            <div
              class="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Proveedor
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contacto
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Teléfono
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(proveedor, index) in proveedoresFiltrados"
                    :key="index"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            class="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ proveedor.nombre_proveedor }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ proveedor.direccion.substring(0, 30) }}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ proveedor.contacto_principal || 'N/A' }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ proveedor.puesto_contacto || '' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ proveedor.telefono }}
                      </div>
                      <div
                        v-if="proveedor.telefono_secundario"
                        class="text-sm text-gray-500"
                      >
                        {{ proveedor.telefono_secundario }}
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ proveedor.email || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        @click="editarProveedor(index)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminarProveedor(index)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                v-if="proveedoresFiltrados.length === 0"
                class="text-center py-12"
              >
                <svg
                  class="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16"
                  ></path>
                </svg>
                <p class="text-gray-500 text-lg">
                  No se encontraron proveedores
                </p>
                <p class="text-gray-400 text-sm">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { api } from '../axios.js';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import {
  validarTextoSoloLetras,
  validarCorreo,
  validarCampoVacio,
  validarTelefono,
} from '../helper/validators.js';

// Iconos para las tabs
const PlusIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`,
};

const EyeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
};

export default {
  name: 'GestionProveedores',
  data() {
    return {
      tab: 'agregar',
      nuevoProveedor: {
        nombre_proveedor: '',
        direccion: '',
        telefono: '',
        telefono_secundario: '',
        email: '',
        sitio_web: '',
        contacto_principal: '',
        puesto_contacto: '',
        notas: '',
      },
      esEdicion: false,
      proveedores: [],
      filtroBusqueda: '',
      errors: {},
      tabs: [
        { id: 'agregar', label: 'Agregar Proveedor', icon: PlusIcon },
        { id: 'ver', label: 'Ver Proveedores', icon: EyeIcon, count: 0 },
      ],
    };
  },
  computed: {
    proveedoresFiltrados() {
      return this.proveedores.filter((proveedor) => {
        return (
          proveedor.nombre_proveedor
            .toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase()) ||
          proveedor.contacto_principal
            ?.toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase()) ||
          proveedor.telefono
            .toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase())
        );
      });
    },
  },
  watch: {
    proveedores: {
      handler(proveedores) {
        if (proveedores !== null && proveedores !== undefined)
          this.tabs.find((t) => t.id === 'ver').count = proveedores.length;
      },
      deep: true,
    },
  },
  mounted() {
    this.obtenerProveedores();
  },
  methods: {
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async obtenerProveedores() {
      try {
        const respuesta = await api.v1.inventario.ObtenerProveedores();
        this.proveedores = respuesta.data.proveedores;
      } catch (error) {
        console.error(error);
        this.mostrarAlertaError('Error al cargar los proveedores');
      }
    },
    validarFormulario() {
      this.errors = {};
      if (!validarCampoVacio(this.nuevoProveedor.nombre_proveedor)) {
        this.errors.nombre_proveedor = 'El nombre del proveedor es requerido';
      }

      if (!validarCampoVacio(this.nuevoProveedor.direccion)) {
        this.errors.direccion = 'La dirección es requerida';
      }

      if (!validarCampoVacio(this.nuevoProveedor.telefono)) {
        this.errors.telefono = 'El teléfono es requerido';
      } else if (!validarTelefono(this.nuevoProveedor.telefono)) {
        this.errors.telefono = 'Ingrese un número de teléfono válido';
      }
      if (
        this.nuevoProveedor.email &&
        !validarCorreo(this.nuevoProveedor.email)
      ) {
        this.errors.email = 'Ingrese un email válido';
      }

      return Object.keys(this.errors).length === 0;
    },
    async actualizarProveedor() {
      try {
        // Pendiente
        if (!this.validarFormulario()) {
          this.mostrarAlertaError(
            'Por favor corrige los errores del formulario'
          );
          return;
        }
        const proveedorFormateado = {
          id_proveedor: this.nuevoProveedor.id,
          nombre_proveedor: this.nuevoProveedor.nombre_proveedor,
          direccion: this.nuevoProveedor.direccion,
          telefono: this.nuevoProveedor.telefono,
          telefono_secundario: this.nuevoProveedor.telefono_secundario,
          email: this.nuevoProveedor.correo_electronico,
          sitio_web: this.nuevoProveedor.sitio_web,
          contacto_principal: this.nuevoProveedor.nombre_contacto,
          puesto_contacto: this.nuevoProveedor.puesto_de_contacto,
          notas: this.nuevoProveedor.notas,
        };
        const respuesta =
          await api.v1.inventario.ActualizarProveedor(proveedorFormateado);
        const proveedorActualizado = respuesta.data.proveedor;

        const index = this.proveedores.findIndex(
          (p) => p.id === proveedorFormateado.id_proveedor
        );
        this.proveedores.splice(index, 1, this.nuevoProveedor);
        this.esEdicion = false;
        this.tab = 'ver';
        this.limpiarFormulario();
        this.mostrarAlertaExito(
          `"${proveedorActualizado.nombre_proveedor}" actualizado`
        );
      } catch (error) {
        console.error(error);
        this.mostrarAlertaError('Error al editar proveedor');
      }
    },
    async agregarProveedor() {
      if (!this.validarFormulario()) {
        this.mostrarAlertaError('Por favor corrige los errores del formulario');
        return;
      }
      try {
        const response = await api.v1.inventario.AgregarProveedor(
          this.nuevoProveedor
        );
        this.proveedores.push({
          ...this.nuevoProveedor,
          id: response.data.proveedor.id_proveedor,
        });

        this.mostrarAlertaExito('Proveedor agregado exitosamente');

        this.limpiarFormulario();
        this.tab = 'ver';
      } catch (error) {
        console.error('Error al agregar proveedor:', error);
        this.mostrarAlertaError('Error al agregar el proveedor');
      }
    },

    editarProveedor(index) {
      this.nuevoProveedor = { ...this.proveedores[index] };
      this.esEdicion = true;
      this.tab = 'agregar';
    },

    async eliminarProveedor(index) {
      if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
        try {
          const id_proveedor = this.proveedores[index].id;
          const response =
            await api.v1.inventario.quitarProveedor(id_proveedor);
          const proveedorEliminado = this.proveedores[index];
          this.proveedores.splice(index, 1);

          this.mostrarAlertaExito(
            `"${proveedorEliminado.nombre_proveedor}" eliminado`
          );
        } catch (error) {
          console.error(error);
          this.mostrarAlertaError('Error al eliminar proveedor');
        }
      }
    },

    limpiarFormulario() {
      this.nuevoProveedor = {
        nombre_proveedor: '',
        direccion: '',
        telefono: '',
        telefono_secundario: '',
        email: '',
        sitio_web: '',
        contacto_principal: '',
        puesto_contacto: '',
        notas: '',
      };
      this.esEdicion = false;
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition {
  transition: all 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.transform {
  animation: slideIn 0.3s ease-out;
}
</style>
