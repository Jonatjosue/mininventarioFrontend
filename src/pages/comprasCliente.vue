<template>
  <div class="bg-gray-50 bg-gradiente-personal">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center"
            >
              <i class="fas fa-store text-white text-lg"></i>
            </div>
            <h1 class="text-xl font-bold text-gray-900">
              Catálogo de Productos
            </h1>
          </div>

          <!-- Carrito y acciones -->
          <div class="flex items-center">
            <!-- Carrito -->
            <button
              @click="mostrarCarrito = !mostrarCarrito"
              class="relative p-2 text-gray-600 hover:text-orange-600 transition"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path
                  d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                />
              </svg>

              <span
                v-if="carrito.length > 0"
                class="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ totalItemsCarrito }}
              </span>
            </button>

            <!-- Usuario -->
            <div class="flex items-center">
              <div
                class="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" class="size-5">
                  <path
                    d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
                  />
                </svg>
              </div>
              <span
                class="text-sm font-medium text-gray-700 line-clamp-1 truncate max-w-[120px] md:max-w-96"
                >{{ usuario.nombre }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div
        class="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white mb-8"
      >
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold mb-4">Descubre nuestros productos</h2>
          <p class="text-orange-100 mb-6">
            Encuentra todo lo que necesitas con la mejor calidad y precios
            increíbles
          </p>

          <!-- Buscador -->
          <div class="">
            <input
              v-model="filtroBusqueda"
              type="text"
              placeholder="Buscar productos..."
              class="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white"
              @input="resetearPaginacion"
            />
          </div>
        </div>
      </div>

      <!-- Filtros y ordenamiento -->
      <div
        class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6"
      >
        <div
          class="relative flex flex-row justify-between items-center max-w-[90dvw] md:w-full"
        >
          <!-- Botón Izquierda -->
          <button
            @click="scrollLeft"
            class="absolute left-0 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-200"
          >
            ‹
          </button>

          <!-- Contenedor scrollable -->
          <div
            ref="scrollContainer"
            class="flex gap-2 overflow-x-auto scrollbar-thin rounded-full scrollbar-thumb-gray-800 scrollbar-track-gray-100 p-2 mx-8 scroll-smooth"
          >
            <button
              v-for="categoria in categorias"
              :key="categoria.id_tipo_producto"
              @click="toggleCategoria(categoria.id_tipo_producto)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition',
                categoriasSeleccionadas.includes(categoria.id_tipo_producto)
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              {{ categoria.nombre }}
            </button>
          </div>

          <!-- Botón Derecha -->
          <button
            @click="scrollRight"
            class="absolute right-0 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-200"
          >
            ›
          </button>
        </div>
      </div>
      <select
        v-model="ordenamiento"
        class="px-3 py-1 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        @change="resetearPaginacion"
      >
        <option value="nombre">Ordenar por nombre</option>
        <option value="precio-asc">Precio: Menor a mayor</option>
        <option value="precio-desc">Precio: Mayor a menor</option>
        <option value="relevancia">Relevancia</option>
      </select>

      <!-- Grid de Productos -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        <div
          v-for="producto in productosPaginados"
          :key="producto.p_producto_id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
        >
          <!-- Imagen del producto -->
          <div class="">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-60 pl-6 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <div class="absolute top-3 right-3">
              <span
                v-if="producto.descuento"
                class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
              >
                -{{ producto.descuento }}%
              </span>
            </div>
          </div>

          <!-- Información del producto -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ producto.nombre }}
            </h3>
            <p
              v-if="false"
              class="text-sm hidden text-gray-600 mb-3 line-clamp-2"
            >
              {{ producto.descripcion }}
            </p>

            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-lg font-bold text-green-600">
                  {{ formatoMoneda(calcularPrecioConDescuento(producto)) }}
                </span>
                <span
                  v-if="producto.descuento"
                  class="text-sm text-gray-500 line-through ml-2"
                >
                  {{ formatoMoneda(producto.precio) }}
                </span>
              </div>
              <span class="text-sm text-gray-500"
                >Código: {{ producto.codigo }}</span
              >
            </div>

            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star text-sm"
                  :class="{ 'text-gray-300': star > producto.rating }"
                ></i>
              </div>
              <span class="text-sm hidden text-gray-500 ml-2"
                >({{ producto.reviews }})</span
              >
            </div>

            <!-- Botones de acción -->
            <div class="flex gap-1">
              <button
                @click="verDetalleProducto(producto)"
                class="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
              >
                Ver detalles
              </button>
              <button
                @click="agregarAlCarrito(producto)"
                class="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 transition text-sm font-medium flex items-center justify-center"
              >
                <i class="fas fa-cart-plus mr-1"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div
        v-if="totalPaginas > 1"
        class="flex justify-center items-center gap-1"
      >
        <button
          @click="paginaActual--"
          :disabled="paginaActual === 1"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium',
            paginaActual === 1
              ? 'bg-gray-400 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="flex gap-1">
          <button
            v-for="pagina in paginasMostradas"
            :key="pagina"
            @click="paginaActual = pagina"
            :class="[
              'w-8 h-8 rounded-lg text-sm font-medium',
              pagina === paginaActual
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            {{ pagina }}
          </button>
        </div>

        <button
          @click="paginaActual++"
          :disabled="paginaActual === totalPaginas"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium',
            paginaActual === totalPaginas
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-400 text-gray-700 hover:bg-gray-300',
          ]"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Mensaje sin resultados -->
      <div v-if="productosFiltrados.length === 0" class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-500 mb-2">
          No se encontraron productos
        </h3>
        <p class="text-gray-400">
          Intenta con otros términos de búsqueda o filtros
        </p>
      </div>
    </main>

    <!-- Modal Detalle Producto -->
    <div
      v-if="mostrarModalDetalle"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div
          class="p-6 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            Detalles del Producto
          </h3>
          <button
            @click="mostrarModalDetalle = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="text-xl bg-red-400 px-2 rounded-lg text-white">X</i>
          </button>
        </div>

        <div class="p-6 flex-1 overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Imágenes -->
            <div>
              <img
                :src="
                  imagenPrincipal ||
                  productoSeleccionado.imagen
                "
                :alt="productoSeleccionado.nombre"
                class="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div
                v-if="productoSeleccionado.imagenes"
                class="grid grid-cols-4 gap-2"
              >
                <div
                  v-for="(img, index) in productoSeleccionado.imagenes"
                  :key="index"
                  class="h-16 cursor-pointer border-2 rounded"
                  :class="{ 'border-orange-500': imagenPrincipal === img }"
                  @click="imagenPrincipal = img"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <!-- Información -->
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                {{ productoSeleccionado.nombre }}
              </h2>
              <p class="text-gray-600 mb-4">
                {{ productoSeleccionado.descripcion }}
              </p>

              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400 mr-2">
                  <i
                    v-for="star in 5"
                    :key="star"
                    class="fas fa-star"
                    :class="{
                      'text-gray-300': star > productoSeleccionado.rating,
                    }"
                  ></i>
                </div>
                <span class="text-sm text-gray-500"
                  >({{ productoSeleccionado.reviews }} reseñas)</span
                >
              </div>

              <div class="mb-6">
                <span class="text-3xl font-bold text-green-600">
                  {{
                    formatoMoneda(
                      calcularPrecioConDescuento(productoSeleccionado)
                    )
                  }}
                </span>
                <span
                  v-if="productoSeleccionado.descuento"
                  class="text-lg text-gray-500 line-through ml-2"
                >
                  {{ formatoMoneda(productoSeleccionado.precio) }}
                </span>
                <span
                  v-if="productoSeleccionado.descuento"
                  class="ml-2 text-red-600 font-semibold"
                >
                  {{ productoSeleccionado.descuento }}% OFF
                </span>
              </div>

              <div class="mb-6">
                <h4 class="font-medium text-gray-900 mb-2">Características:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li
                    v-for="(
                      caracteristica, index
                    ) in productoSeleccionado.caracteristicas"
                    :key="index"
                  >
                    • {{ caracteristica }}
                  </li>
                </ul>
              </div>

              <div class="flex space-x-4">
                <div class="flex items-center border rounded-lg">
                  <button
                    @click="
                      cantidadSeleccionada > 1 ? cantidadSeleccionada-- : null
                    "
                    class="px-3 py-2 text-gray-600 hover:text-orange-600"
                  >
                    <i class="fas fa-minus">-</i>
                  </button>
                  <span class="px-4 py-2 text-gray-700">{{
                    cantidadSeleccionada
                  }}</span>
                  <button
                    @click="cantidadSeleccionada++"
                    class="px-3 py-2 text-gray-600 hover:text-orange-600"
                  >
                    <i class="fas fa-plus">+</i>
                  </button>
                </div>
                <button
                  @click="agregarAlCarritoConCantidad(productoSeleccionado)"
                  class="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition font-medium"
                >
                  <i class="fas fa-cart-plus mr-2"></i>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrito Lateral -->
    <div v-if="mostrarCarrito" class="fixed inset-0 z-50 overflow-hidden">
      <div
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="mostrarCarrito = false"
      ></div>
      <div
        class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
      >
        <div class="h-full flex flex-col justify-between">
          <!-- Header -->
          <div
            class="p-4 border-b flex flex-col items-end justify-end border-gray-200"
          >
            <div class="flex items-start">
              <button
                @click="mostrarCarrito = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <i
                  class="px-2 pb-1 text-xl font-semibold text-end bg-red-400 text-white shadow-gray-200 rounded-md"
                  >x</i
                >
              </button>
            </div>
            <div class="p-1 flex mr-16 flex-row justify-evenly">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-16 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
              <div class="ml-1 mt-2">
                <h3 class="text-lg font-semibold text-gray-900">Tu Carrito</h3>
                <p class="text-sm text-gray-500">
                  {{ carrito.length }} producto(s) en el carrito
                </p>
              </div>
            </div>
          </div>

          <!-- Lista de productos -->
          <div class="flex-1 overflow-y-auto p-6">
            <div v-if="carrito.length === 0" class="text-center py-12">
              <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">Tu carrito está vacío</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(item, index) in carrito"
                :key="index"
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  v-if="item.imagen"
                  :src="item.imagen"
                  class="w-16 h-16 object-cover rounded"
                />
                <svg
                  v-else
                  data-v-0da8fd7f=""
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-28 text-gray-500"
                >
                  <path
                    data-v-0da8fd7f=""
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  ></path>
                </svg>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.nombre }}</h4>
                  <p class="text-sm text-gray-500">
                    {{ formatoMoneda(item.precio) }} c/u
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="modificarCantidadCarrito(index, -1)"
                    class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                  >
                    <i class="fas fa-minus text-xs">-</i>
                  </button>
                  <span class="w-8 text-center text-gray-500">{{
                    item.cantidad
                  }}</span>
                  <button
                    @click="modificarCantidadCarrito(index, 1)"
                    class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                  >
                    <i class="fas fa-plus text-xs">+</i>
                  </button>
                </div>
                <button
                  @click="eliminarDelCarrito(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Total y acciones -->
          <div class="p-6 border-t border-gray-200">
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-medium text-gray-500">{{
                  formatoMoneda(totalCarrito)
                }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold">
                <span class="text-gray-700">Total:</span>
                <span class="text-gray-700">{{
                  formatoMoneda(totalCarrito)
                }}</span>
              </div>
            </div>

            <button
              @click="procederAlPago"
              class="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Proceder a crear pedido
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificación Toast -->
    <div
      v-if="mostrarNotificacion"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300"
    >
      <div class="flex items-center space-x-2">
        <i class="fas fa-check-circle"></i>
        <span>{{ mensajeNotificacion }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';
import { useFacturaStore } from '../stores/facturaStore.js';
const facturaStore = useFacturaStore();
import {
  validarTextoSoloLetras,
  validarCorreo,
  validarCampoVacio,
  validarSoloNumeros,
  validarSimilaridadContrasena,
} from '../helper/validators.js';
export default {
  name: 'CatalogoProductos',
  data() {
    return {
      filtroBusqueda: '',
      categoriasSeleccionadas: [],
      ordenamiento: 'nombre',
      paginaActual: 1,
      itemsPorPagina: 8,
      mostrarModalDetalle: false,
      productoSeleccionado: {},
      imagenPrincipal: '',
      cantidadSeleccionada: 1,
      mostrarCarrito: false,
      carrito: [],
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      usuario: {
        id: 0,
        nombre: '',
        email: '',
        esEmpleado: false,
      },
      // Datos de ejemplo
      productos: [],
      categorias: [],
      /*categorias: [
        { id: 1, nombre: 'Tecnología' },
        { id: 2, nombre: 'Electrónicos' },
        { id: 3, nombre: 'Hogar' },
        { id: 4, nombre: 'Deportes' },
        { id: 5, nombre: 'Ropa' },
      ],*/
    };
  },
  computed: {
    productosFiltrados() {
      let filtered = this.productos;

      // Filtrar por búsqueda
      if (this.filtroBusqueda) {
        const searchTerm = this.filtroBusqueda.toLowerCase();
        filtered = filtered.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(searchTerm) ||
            producto.descripcion.toLowerCase().includes(searchTerm) ||
            producto.codigo.toLowerCase().includes(searchTerm)
        );
      }

      // Filtrar por categorías
      if (this.categoriasSeleccionadas.length > 0) {
        filtered = filtered.filter((producto) =>
          this.categoriasSeleccionadas.includes(producto.id_tipo_producto)
        );
      }

      // Ordenar
      switch (this.ordenamiento) {
        case 'precio-asc':
          filtered.sort((a, b) => a.precio - b.precio);
          break;
        case 'precio-desc':
          filtered.sort((a, b) => b.precio - a.precio);
          break;
        case 'nombre':
          filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case 'relevancia':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }

      return filtered;
    },
    totalPaginas() {
      return Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
    },
    productosPaginados() {
      const start = (this.paginaActual - 1) * this.itemsPorPagina;
      const end = start + this.itemsPorPagina;
      return this.productosFiltrados.slice(start, end);
    },
    paginasMostradas() {
      const paginas = [];
      const maxPaginas = 5;

      let start = Math.max(1, this.paginaActual - Math.floor(maxPaginas / 2));
      let end = Math.min(this.totalPaginas, start + maxPaginas - 1);

      if (end - start + 1 < maxPaginas) {
        start = Math.max(1, end - maxPaginas + 1);
      }

      for (let i = start; i <= end; i++) {
        paginas.push(i);
      }

      return paginas;
    },
    totalCarrito() {
      return this.carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
      );
    },
    totalItemsCarrito() {
      return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    },
  },
  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async obtenerProductos() {
      try {
        const apiObtenerProductos =
          await api.v1.venta.obtenerProductosParaCompra();
        this.productos = apiObtenerProductos.data.productos;
      } catch (error) {
        this.mostrarAlertaError('Error al obtener los productos');
      }
    },
    async obtenerCategorias() {
      try {
        const apiCategorias =
          await api.v1.inventario.obtenerCategoriasProducto();
        this.categorias = apiCategorias.data.categorias.map((a) => ({
          id: a.id_tipo_producto,
          ...a,
        }));
      } catch (error) {
        console.error(error);
        this.mostrarAlertaError('Error al obtener categorias');
      }
    },
    toggleCategoria(categoriaId) {
      const index = this.categoriasSeleccionadas.indexOf(categoriaId);
      if (index > -1) {
        this.categoriasSeleccionadas.splice(index, 1);
      } else {
        this.categoriasSeleccionadas.push(categoriaId);
      }
      this.paginaActual = 1;
    },
    resetearPaginacion() {
      this.paginaActual = 1;
    },
    verDetalleProducto(producto) {
      this.productoSeleccionado = producto;
      this.imagenPrincipal = producto.imagen;
      this.cantidadSeleccionada = 1;
      this.mostrarModalDetalle = true;
    },
    agregarAlCarrito(producto) {
      const existingItem = this.carrito.find(
        (item) => item.p_producto_Id === producto.p_producto_Id
      );

      if (existingItem) {
        existingItem.cantidad++;
      } else {
        this.carrito.push({
          ...producto,
          cantidad: 1,
        });
      }
      this.mostrarAlertaExito('Producto agregado al carrito');
      this.mostrarCarrito = true;
    },
    agregarAlCarritoConCantidad(producto) {
      const existingItem = this.carrito.find(
        (item) => item.p_producto_id === producto.p_producto_id
      );

      if (existingItem) {
        existingItem.cantidad += this.cantidadSeleccionada;
      } else {
        this.carrito.push({
          ...producto,
          cantidad: this.cantidadSeleccionada,
        });
      }

      // this.mostrarNotificacion('Producto agregado al carrito');
      this.mostrarModalDetalle = false;
      this.mostrarCarrito = true;
      this.cantidadSeleccionada = 1;
    },
    modificarCantidadCarrito(index, cambio) {
      const nuevaCantidad = this.carrito[index].cantidad + cambio;
      if (nuevaCantidad > 0) {
        this.carrito[index].cantidad = nuevaCantidad;
      } else {
        this.carrito.splice(index, 1);
      }
    },
    eliminarDelCarrito(index) {
      this.carrito.splice(index, 1);
    },
    procederAlPago() {
      // Aquí iría la lógica para proceder al pago
      console.log(this.carrito);

      this.$router.push({
        path: '/IngresoPedidos',
        query: { carrito: JSON.stringify(this.carrito) },
      });

      this.mostrarCarrito = false;
    },
    calcularPrecioConDescuento(producto) {
      if (producto.descuento) {
        return producto.precio - producto.descuento;
      }
      return producto.precio;
    },
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
      }).format(valor);
    },
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.rol === 'CLIENTE') this.esCliente = true;
    if (this.esCliente) {
      this.usuario = {
        id: usuario.id,
        nombre: usuario.correo,
        email: usuario.correo,
        esEmpleado: false,
      };
    }
    this.obtenerProductos();
    this.obtenerCategorias();
  },
};
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: none;
  scrollbar-color: #c1c1c1 #f1f1f1;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
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
