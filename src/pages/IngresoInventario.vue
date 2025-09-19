<template>
  <div
    class="min-h-screen bg-gradiente-personal from-gray-50 to-orange-100 p-4"
  >
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center"
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Ingreso de Facturas
              </h1>
              <p class="text-sm text-gray-600">
                Registrar productos a través de facturas de compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Content -->

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-5">
            <button
              v-for="(tabItem, index) in tabs"
              :key="index"
              @click="tab = tabItem.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition',
                tab === tabItem.id
                  ? 'border-orange-500 text-orange-600'
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
        <!--Ingreso Factura-->
        <div v-if="tab === 'IFactura'" class="p-1">
          <!-- Notificación -->
          <div
            v-if="mensaje.texto"
            :class="[
              'rounded-lg p-4 mb-4 flex items-center justify-between',
              mensaje.tipo === 'exito'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            <div class="flex items-center">
              <svg
                v-if="mensaje.tipo === 'exito'"
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <span>{{ mensaje.texto }}</span>
            </div>
            <button
              @click="mensaje.texto = ''"
              class="text-xl font-semibold leading-none"
            >
              &times;
            </button>
          </div>

          <!-- Datos de Factura -->
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">
              Datos de la Factura
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor *
                </label>
                <select
                  v-model="factura.proveedor"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.proveedor }"
                >
                  <option value="" disabled>Seleccione un proveedor</option>
                  <option
                    v-for="proveedor in proveedores"
                    :key="proveedor.id"
                    :value="proveedor.id"
                  >
                    {{ proveedor.nombre_proveedor }}
                  </option>
                </select>
                <p v-if="errores.proveedor" class="mt-1 text-sm text-red-600">
                  {{ errores.proveedor }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Número de Factura *</label
                >
                <input
                  v-model="factura.numero"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.numero }"
                  placeholder="Número de factura"
                />
                <p v-if="errores.numero" class="mt-1 text-sm text-red-600">
                  {{ errores.numero }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Serie de Factura *</label
                >
                <input
                  v-model="factura.numero"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.numero }"
                  placeholder="Número de factura"
                />
                <p v-if="errores.numero" class="mt-1 text-sm text-red-600">
                  {{ errores.numero }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Fecha Emisión*</label
                >
                <input
                  v-model="factura.fecha"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.fecha }"
                />
                <p v-if="errores.fecha" class="mt-1 text-sm text-red-600">
                  {{ errores.fecha }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Fecha Vencimiento</label
                >
                <input
                  v-model="factura.fecha"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.fecha }"
                />
                <p v-if="errores.fecha" class="mt-1 text-sm text-red-600">
                  {{ errores.fecha }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tipo de pago</label
                >
                <input
                  v-model="factura.fecha"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.fecha }"
                />
                <p v-if="errores.fecha" class="mt-1 text-sm text-red-600">
                  {{ errores.fecha }}
                </p>
              </div>
            </div>
          </div>

          <!-- Detalle de Productos -->
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Productos de la Factura
              </h2>
              <span class="text-sm text-gray-500"
                >{{ factura.detalle.length }} producto(s)</span
              >
            </div>

            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th
                      class="border border-gray-300 p-3 text-left text-gray-600"
                    >
                      Producto
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Cantidad
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Precio Unitario
                    </th>

                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Subtotal
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Descuento
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Es Lote
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Precio Lote
                    </th>
                    <th
                      class="border border-gray-300 p-3 text-right text-gray-600"
                    >
                      Total
                    </th>

                    <th class="border border-gray-300 p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in factura.detalle" :key="index">
                    <td class="border border-gray-200 p-3">
                      <input
                        v-model="item.codigo"
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Código"
                      />
                    </td>
                    <td class="border border-gray-200 p-3">
                      <input
                        v-model="item.nombre"
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Nombre del producto"
                      />
                    </td>
                    <td class="border border-gray-200 p-3">
                      <input
                        v-model.number="item.cantidad"
                        type="number"
                        min="1"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                        @change="validarCantidad(index)"
                      />
                    </td>
                    <td class="border border-gray-200 p-3">
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >Q</span
                        >
                        <input
                          v-model.number="item.precio"
                          type="number"
                          step="0.01"
                          min="0"
                          class="w-full border border-gray-300 rounded px-3 py-2 pl-8 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                          @change="validarPrecio(index)"
                        />
                      </div>
                    </td>
                    <td
                      class="border border-gray-200 p-3 text-right font-medium text-gray-700"
                    >
                      {{ formatoMoneda(item.cantidad * item.precio) }}
                    </td>
                    <td class="border border-gray-200 p-3 text-center">
                      <button
                        @click="confirmarEliminacion(index)"
                        class="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                        title="Eliminar producto"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="factura.detalle.length === 0">
                    <td
                      colspan="6"
                      class="border border-gray-200 p-6 text-center text-gray-500"
                    >
                      No hay productos agregados. Haz clic en "Agregar Producto"
                      para comenzar.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              @click="agregarItem"
              class="mt-4 flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <svg
                class="w-5 h-5 mr-2"
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
              Agregar Producto
            </button>
          </div>

          <!-- Totales -->
          <div
            class="class=p-6 flex flex-col items-end space-y-2 p-4 bg-gray-50 rounded-lg"
          >
            <div class="text-right">
              <p class="text-gray-700 text-lg">
                Total:
                <span class="font-bold text-2xl text-green-600">
                  {{ formatoMoneda(totalFactura) }}
                </span>
              </p>
            </div>
            <p v-if="factura.detalle.length > 0" class="text-sm text-gray-500">
              {{ factura.detalle.length }} producto(s) · Impuestos incluidos
            </p>
          </div>

          <!-- Guardar -->
          <div
            class="p-6 flex flex-col-reverse md:flex-row justify-end space-y-4 space-y-reverse md:space-y-0 md:space-x-4"
          >
            <button
              @click="limpiarFormulario"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Limpiar
            </button>
            <button
              @click="guardarFactura"
              :disabled="guardando"
              class="flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg
                v-if="guardando"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ guardando ? 'Procesando...' : 'Guardar Factura' }}
            </button>
          </div>
        </div>
        <!--Historial Factura-->
        <div v-if="tab === 'HFactura'" class="p-1 text-black">Hola jsjs</div>
      </div>
    </main>
  </div>
</template>

<script>
import { api } from '../axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import {
  validarTextoSoloLetras,
  validarCorreo,
  validarCampoVacio,
  validarSoloNumeros,
  validarSimilaridadContrasena,
} from '../helper/validators.js';
const TypeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`,
};
const OfferIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
};
export default {
  name: 'IngresoFactura',
  data() {
    return {
      tabs: [
        { id: 'IFactura', label: 'Ingreso Factura', icon: TypeIcon },
        { id: 'HFactura', label: 'Historial Facturas', icon: OfferIcon },
      ],
      tab: 'HFactura',
      factura: {
        proveedor: '',
        numero: '',
        fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
        detalle: [],
      },
      errores: {
        proveedor: '',
        numero: '',
        fecha: '',
      },
      mensaje: {
        texto: '',
        tipo: '', // 'exito' o 'error'
      },
      guardando: false,
    };
  },
  computed: {
    totalFactura() {
      return this.factura.detalle.reduce(
        (acc, item) => acc + item.cantidad * item.precio,
        0
      );
    },
  },
  methods: {
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
        minimumFractionDigits: 2,
      }).format(valor);
    },
    agregarItem() {
      this.factura.detalle.push({
        codigo: '',
        nombre: '',
        cantidad: 1,
        precio: 0,
      });
    },
    confirmarEliminacion(index) {
      if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        this.eliminarItem(index);
      }
    },
    eliminarItem(index) {
      this.factura.detalle.splice(index, 1);
      this.mostrarMensaje('Producto eliminado', 'exito');
    },
    validarCantidad(index) {
      if (this.factura.detalle[index].cantidad < 1) {
        this.factura.detalle[index].cantidad = 1;
      }
    },
    validarPrecio(index) {
      if (this.factura.detalle[index].precio < 0) {
        this.factura.detalle[index].precio = 0;
      }
    },
    validarFormulario() {
      let valido = true;
      this.errores = { proveedor: '', numero: '', fecha: '' };

      if (!this.factura.proveedor.trim()) {
        this.errores.proveedor = 'El proveedor es obligatorio';
        valido = false;
      }

      if (!this.factura.numero.trim()) {
        this.errores.numero = 'El número de factura es obligatorio';
        valido = false;
      }

      if (!this.factura.fecha) {
        this.errores.fecha = 'La fecha es obligatoria';
        valido = false;
      }

      if (this.factura.detalle.length === 0) {
        this.mostrarMensaje('Debe agregar al menos un producto', 'error');
        valido = false;
      }

      for (let i = 0; i < this.factura.detalle.length; i++) {
        const item = this.factura.detalle[i];
        if (!item.codigo.trim() || !item.nombre.trim() || item.cantidad < 1) {
          this.mostrarMensaje(
            'Complete todos los campos de los productos',
            'error'
          );
          valido = false;
          break;
        }
      }

      return valido;
    },
    async guardarFactura() {
      if (!this.validarFormulario()) return;

      this.guardando = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Factura guardada:', this.factura);
        this.mostrarMensaje('Factura guardada con éxito', 'exito');

        setTimeout(() => {
          this.limpiarFormulario();
        }, 2000);
      } catch (error) {
        this.mostrarMensaje('Error al guardar la factura', 'error');
        console.error('Error:', error);
      } finally {
        this.guardando = false;
      }
    },
    limpiarFormulario() {
      this.factura = {
        proveedor: '',
        numero: '',
        fecha: new Date().toISOString().split('T')[0],
        detalle: [],
      };
      this.errores = {
        proveedor: '',
        numero: '',
        fecha: '',
      };
      this.mensaje.texto = '';
    },
    mostrarMensaje(texto, tipo) {
      this.mensaje = { texto, tipo };
      // Ocultar mensaje después de 5 segundos
      if (texto) {
        setTimeout(() => {
          this.mensaje.texto = '';
        }, 5000);
      }
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async obtenerProveedores() {
      try {
        const proveedorCarga = await api.v1.inventario.ObtenerProveedores();
        this.proveedores = proveedorCarga.data.proveedores;
      } catch (error) {
        console.log(error);
        this.mostrarAlertaError('Error al obtener proveedores');
      }
    },
    obtenerDatosIniciales() {
      this.obtenerProveedores();
    },
  },
  mounted() {
    this.agregarItem();
    this.obtenerDatosIniciales();
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
