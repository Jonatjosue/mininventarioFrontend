<template>
  <div class="min-h-screen bg-gradiente-personal from-gray-50 to-blue-100 p-4">
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Gestión de Inventario
              </h1>
              <p class="text-sm text-gray-600">
                Administra tus productos eficientemente
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="exportarDatos"
              class="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Tabs Mejoradas -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              v-for="(tabItem, index) in tabs"
              :key="index"
              @click="tab = tabItem.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition',
                tab === tabItem.id
                  ? 'border-blue-500 text-blue-600'
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
          <!-- Agregar Producto -->
          <div v-if="tab === 'agregar'" class="space-y-6">
            <!--Mensajes de alerta-->
            <div
              v-if="categorias.length <= 0"
              role="alert"
              class="alert alert-warning"
            >
              <svg
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Alerta: Agregue una categoria</span>
              <a
                @click.prevent="tab = 'categoria'"
                class="hover:text-white underline cursor-pointer"
              >
                Agregar Categoria
              </a>
            </div>
            <div
              v-if="proveedores.length <= 0"
              role="alert"
              class="alert alert-warning"
            >
              <svg
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Alerta: Agregue un Proveedor</span>
              <a
                @click="irAProveedor"
                class="hover:text-white underline cursor-pointer"
              >
                Agregar Proveedor
              </a>
            </div>

            <!--Mensajes de alerta-->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <fieldset class="relative w-full p-0 m-0 border-0">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Nombre del producto</label
                  >
                  <input
                    v-model="nuevoProducto.nombre"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Libro"
                  />
                  <div
                    v-if="errores.nombre"
                    class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                    :data-tip="errores.nombre"
                  ></div>
                </fieldset>
              </div>
              <fieldset class="relative w-full p-0 m-0 border-0">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Categoría</label
                >
                <select
                  v-model="nuevoProducto.categoria"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccione una categoría</option>
                  <option
                    v-for="cat in categorias"
                    :key="cat.id_tipo_producto"
                    :value="cat.id_tipo_producto"
                  >
                    {{ cat.nombre }}
                  </option>
                </select>
                <div
                  v-if="errores.categoria"
                  class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                  :data-tip="errores.categoria"
                ></div>
              </fieldset>
              <fieldset class="relative w-full p-0 m-0 border-0">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Precio Compra(Q)</label
                >
                <input
                  v-model.number="nuevoProducto.precioCompra"
                  type="number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 1500"
                />
                <div
                  v-if="errores.precioCompra"
                  class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                  :data-tip="errores.precioCompra"
                ></div>
              </fieldset>
              <fieldset class="relative w-full p-0 m-0 border-0">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Precio Venta(Q)</label
                >
                <input
                  v-model.number="nuevoProducto.precioVenta"
                  type="number"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 1500"
                />
                <div
                  v-if="errores.precioVenta"
                  class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                  :data-tip="errores.precioVenta"
                ></div>
              </fieldset>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Stock disponible</label
                >
                <input
                  v-model.number="nuevoProducto.stock"
                  type="number"
                  :disabled="!edicionActiva"
                  class="disabled:bg-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Código</label
                >
                <input
                  v-model="nuevoProducto.codigo"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: PROD-001"
                />
              </div>
              <fieldset class="relative w-full p-0 m-0 border-0">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Proveedor</label
                >
                <select
                  v-model="nuevoProducto.proveedor"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccione un proveedor</option>
                  <option
                    v-for="prov in proveedores"
                    :key="prov.id_proveedor"
                    :value="prov.id_proveedor"
                  >
                    {{ prov.nombre_proveedor }}
                  </option>
                </select>
                <div
                  v-if="errores.proveedor"
                  class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                  :data-tip="errores.proveedor"
                ></div>
              </fieldset>
              <fieldset class="relative w-full p-0 m-0 border-0">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Estado Producto</label
                >
                <select
                  v-model="nuevoProducto.id_estado_producto"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccione un estado</option>
                  <option
                    v-for="estado in estadosProducto"
                    :key="estado.id_estado_producto"
                    :value="estado.id_estado_producto"
                  >
                    {{ estado.estado }}
                  </option>
                </select>
                <div
                  v-if="errores.id_estado_producto"
                  class="tooltip tooltip-open tooltip-error absolute right-1/4 transform -translate-x-1/2"
                  :data-tip="errores.id_estado_producto"
                ></div>
              </fieldset>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Descripción</label
              >
              <textarea
                v-model="nuevoProducto.descripcion"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe las características del producto..."
              ></textarea>
            </div>

            <div class="flex space-x-4">
              <button
                v-if="categorias.length > 0 && proveedores.length > 0"
                @click="guardarProducto"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <svg
                  v-if="!edicionActiva"
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
                <span v-if="!edicionActiva">Agregar Producto</span>
                <span v-else>Actualizar Producto</span>
              </button>

              <button
                @click="limpiarFormulario"
                class="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Limpiar
              </button>
            </div>
          </div>

          <!-- Ver Productos -->
          <!-- Ver Productos - Versión Responsiva -->
          <div v-if="tab === 'ver'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Productos en Inventario
              </h2>
              <div
                class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div class="relative">
                  <input
                    v-model="filtroBusqueda"
                    type="text"
                    placeholder="Buscar productos..."
                    class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                <select
                  v-model="filtroCategoria"
                  class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas las categorías</option>
                  <option
                    v-for="cat in categorias"
                    :key="cat.id_tipo_producto"
                    :value="cat.nombre"
                  >
                    {{ cat.nombre }}
                  </option>
                </select>
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
                      Producto
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio Compra
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio Venta
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categoría
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
                    v-for="(producto, index) in productosFiltrados"
                    :key="index"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div
                          class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            class="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                          </svg>
                        </div>
                        <div class="ml-3 flex flex-col gap-1.5">
                          <div
                            class="text-sm font-semibold text-gray-900 rounded-md px-1"
                          >
                            {{ producto.nombre }}
                          </div>
                          <div class="flex items-center gap-1">
                            <span
                              class="text-xs px-2 rounded-full font-medium text-gray-500  bg-gray-200  font-mono tracking-tight min-w-[60px] text-center"
                            >
                              {{ producto.codigo || 'Sin SKU' }}
                            </span>
                            <span
                              :class="[
                                'text-xs px-2   font-medium rounded-full  tracking-tight min-w-[60px] text-center',
                                estadoColores[producto.nombre_estado] ||
                                  'bg-gray-400 text-gray-500 border-gray-300',
                              ]"
                            >
                              {{ producto.nombre_estado || 'Sin estado' }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Q{{ producto.precioCompra?.toLocaleString() }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Q{{ producto.precioVenta?.toLocaleString() }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 py-1 text-xs font-semibold rounded-full',
                          producto.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : producto.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800',
                        ]"
                      >
                        {{ producto.stock }} unidades
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ producto.categoria }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        @click="editarProducto(index)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminarProducto(index)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                v-if="productosFiltrados.length === 0"
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
                <p class="text-gray-500 text-lg">No se encontraron productos</p>
                <p class="text-gray-400 text-sm">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            </div>

            <!-- Vista de tarjetas para móvil -->
            <div class="lg:hidden space-y-4">
              <div
                v-for="(producto, index) in productosFiltrados"
                :key="'mobile-' + index"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ producto.nombre }}
                      </h3>
                      <p class="text-sm text-gray-500">
                        {{ producto.codigo || 'Sin SKU' }}
                      </p>
                    </div>
                  </div>
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      producto.stock > 10
                        ? 'bg-green-100 text-green-800'
                        : producto.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ producto.stock }} und
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p class="text-xs text-gray-500">Precio compra</p>
                    <p class="text-sm font-medium text-gray-900">
                      Q{{ producto.precioCompra?.toLocaleString() }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Precio Venta</p>
                    <p class="text-sm font-medium text-gray-900">
                      Q{{ producto.precioVenta?.toLocaleString() }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Categoría</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ producto.categoria }}
                    </p>
                  </div>
                </div>

                <div class="flex space-x-2 pt-3 border-t border-gray-100">
                  <button
                    @click="editarProducto(index)"
                    class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminarProducto(index)"
                    class="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div
                v-if="productosFiltrados.length === 0"
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
                <p class="text-gray-500 text-lg">No se encontraron productos</p>
                <p class="text-gray-400 text-sm">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            </div>

            <div
              class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
            >
              <span class="text-sm text-gray-700">
                Mostrando {{ productosFiltrados.length }} de
                {{ productos.length }} productos
              </span>
              <div class="flex space-x-2">
                <button
                  class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                >
                  Anterior
                </button>
                <button
                  class="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded text-sm"
                >
                  1
                </button>
                <button
                  class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          <!-- Categoria Producto -->
          <div v-if="tab === 'categoria'" class="p-4">
            <h2 class="text-xl font-semibold text-gray-900">
              Categoría de Productos
            </h2>
            <!-- Card para agregar categoría -->
            <div class="bg-white shadow-md rounded-xl p-6 mb-8">
              <!-- Inputs -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Categoría
                  </label>
                  <input
                    v-model="nuevaCategoria.nombre"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Laptop Dell XPS 13"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Notas
                  </label>
                  <input
                    v-model="nuevaCategoria.observacion"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Equipos de alta gama"
                  />
                </div>
              </div>

              <!-- Botón -->
              <div class="mt-6 flex justify-end">
                <button
                  v-if="!editarCategoriaBool"
                  @click="agregarCategoria"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
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
                    />
                  </svg>
                  <span>Agregar Categoría</span>
                </button>
                <button
                  v-else
                  @click="editarCategoriaPost"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <span>Editar Categoría</span>
                </button>
              </div>
            </div>
            <h2 class="text-xl font-semibold text-gray-600 mb-4">
              Listado de categorías
            </h2>
            <!-- Listado de productos -->
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="(categoria, index) in categorias"
                :key="'del' + index"
                class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ categoria.nombre }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ categoria.observacion }}
                    </p>
                  </div>
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      categoria.cantidad > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ categoria.cantidad }} unidades
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <button
                    @click="editarCategoria(index)"
                    class="bg-slate-200 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-sky-500 hover:text-white transition flex items-center gap-1"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Editar</span>
                  </button>
                  <button
                    v-if="categoria.catTieneProducto === false"
                    @click="eliminarCategoria(index)"
                    class="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition flex items-center gap-1"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Estado vacío -->
            <div
              v-if="productos.length === 0"
              class="text-center py-12 bg-gray-50 rounded-lg mt-6"
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
                />
              </svg>
              <p class="text-gray-500 text-lg">
                No hay productos para eliminar
              </p>
            </div>
          </div>
        </div>
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

const PlusIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`,
};

const EyeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
};

const TrashIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`,
};

export default {
  name: 'GestionProductos',
  data() {
    return {
      tab: 'agregar',
      errores: {},
      edicionActiva: false,
      estadoColores: {
        ACTIVO: 'bg-green-100 text-green-700',
        INACTIVO: 'bg-red-100 text-red-700',
        VENCIDO: 'bg-yellow-100 text-yellow-700',
        PERDIDO: 'bg-orange-100 text-orange-700',
        REEABASTECER: 'bg-pink-100 text-orange-700',
      },
      nuevoProducto: {
        p_producto_Id: 0,
        nombre: '',
        precioCompra: null,
        precioVenta: null,
        stock: null,
        categoria: '',
        id_estado_producto: '',
        codigo: '',
        proveedor: '',
        descripcion: '',
      },
      nuevaCategoria: {
        id_tipo_producto: 0,
        nombre: '',
        observacion: '',
        catTieneProducto: false,
      },
      estadosProducto: [],
      productos: [],
      proveedores: [],
      categorias: [],
      filtroBusqueda: '',
      filtroCategoria: '',
      editarCategoriaBool: false,
      mensajeNotificacion: '',
      tabs: [
        { id: 'agregar', label: 'Agregar Producto', icon: PlusIcon },
        { id: 'ver', label: 'Ver Productos', icon: EyeIcon, count: 0 },
        { id: 'categoria', label: 'Categoria Producto', icon: PlusIcon },
      ],
    };
  },
  computed: {
    productosFiltrados() {
      return this.productos.filter((producto) => {
        const coincideBusqueda =
          producto.nombre
            .toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase()) ||
          producto.sku
            ?.toLowerCase()
            .includes(this.filtroBusqueda.toLowerCase());
        const coincideCategoria =
          !this.filtroCategoria || producto.categoria === this.filtroCategoria;
        return coincideBusqueda && coincideCategoria;
      });
    },
  },
  watch: {
    productos: {
      handler(productos) {
        this.tabs.find((t) => t.id === 'ver').count = productos.length;
      },
      deep: true,
    },
  },
  mounted() {
    this.validarCatalogosParaCreacionProducto();
  },
  methods: {
    async agregarCategoria() {
      try {
        var payload = {
          nombre: this.nuevaCategoria.nombre,
          observacion: this.nuevaCategoria.observacion,
        };
        const response =
          await api.v1.inventario.crearCategoriaProducto(payload);

        if (response.data.mensaje) {
          this.mostrarAlertaExito('Categoria Creada exitosamente');
          var formatoRepuesta = {
            id_tipo_producto: response.data.categoria.id_tipo_producto,
            catTieneProducto: false,
            cantidad: 0,
            nombre: response.data.categoria.nombre,
            observacion: response.data.categoria.observacion,
          };
          this.categorias.push(formatoRepuesta);
          this.nuevaCategoria = {
            id_tipo_producto: null,
            nombre: '',
            observacion: '',
            catTieneProducto: false,
          };
        }
      } catch (error) {
        this.mostrarAlertaError('Error al crear categoria');
      }
    },
    async eliminarCategoria(index) {
      try {
        const id_tipo_producto = this.categorias[index].id_tipo_producto;
        const result =
          await api.v1.inventario.eliminarCategoriaProducto(id_tipo_producto);
        this.categorias = this.categorias.filter(
          (a) => a.id_tipo_producto !== id_tipo_producto
        );

        if (result.data.categoria)
          this.mostrarAlertaExito('Categoria eliminada exitosamente');
      } catch (error) {
        console.error('Error al eliminar categoria', error);
        this.mostrarAlertaError('Error al eliminar categoria');
      }
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async validarCatalogosParaCreacionProducto() {
      await this.cargarCategorias();
      await this.cargarProveedores();
      await this.cargarEstadosProducto();
      await this.cargarProductos();
    },
    async cargarEstadosProducto() {
      try {
        const estados = await api.v1.inventario.obtenerEstadosProducto();
        this.estadosProducto = estados.data.estados;
      } catch (error) {
        console.error('Error al cargar estados producto', estados);
        this.mostrarAlertaError('Error al cargar estados');
      }
    },
    async cargarProveedores() {
      try {
        const resultado = await api.v1.inventario.obtenerProveedoresProducto();
        this.proveedores = resultado.data.proveedores;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar los proveedores');
      }
    },
    async editarCategoriaPost() {
      try {
        var categoriaEditada = {
          id_tipo_producto: this.nuevaCategoria.id_tipo_producto,
          nombre: this.nuevaCategoria.nombre,
          observacion: this.nuevaCategoria.observacion,
        };
        const resultado =
          await api.v1.inventario.actualizarCategoriaProducto(categoriaEditada);
        if (resultado.data.categoria) {
          this.categorias = this.categorias.filter(
            (a) => a.id_tipo_producto !== categoriaEditada.id_tipo_producto
          );

          const CategoriaActualizada = {
            id_tipo_producto: resultado.data.categoria.id_tipo_producto,
            nombre: resultado.data.categoria.nombre,
            observacion: resultado.data.categoria.observacion,
            catTieneProducto: this.nuevaCategoria.catTieneProducto,
            cantidad: this.nuevaCategoria.cantidad,
          };

          this.categorias.push(CategoriaActualizada);
          this.nuevaCategoria = {};
          this.mostrarAlertaExito('Categoria Editada exitosamente');
          this.editarCategoriaBool = false;
        }
      } catch (error) {
        console.error('Error al editar categoria', error);
        this.mostrarAlertaError('Error al editar categoria');
      }
    },
    editarCategoria(index) {
      this.editarCategoriaBool = true;
      var categoriaAEditar = {
        id_tipo_producto: this.categorias[index].id_tipo_producto,
        nombre: this.categorias[index].nombre,
        observacion: this.categorias[index].observacion,
        catTieneProducto: this.categorias[index].catTieneProducto,
        cantidad: this.categorias[index].cantidad,
      };
      this.nuevaCategoria = categoriaAEditar;
    },
    async postAgregarProducto() {
      if (!this.validarFormulario()) {
        this.mostrarAlertaError('Valide los campos señalados');
        return;
      }
      try {
        const payloadProducto = {
          descripcion: this.nuevoProducto.descripcion,
          id_proveedor: this.nuevoProducto.proveedor,
          id_tipo_producto: this.nuevoProducto.categoria,
          id_estado_producto: this.nuevoProducto.id_estado_producto,
          nombre_producto: this.nuevoProducto.nombre,
          valor_compra: this.nuevoProducto.precioCompra,
          valor_unitario: this.nuevoProducto.precioVenta,
          codigo: this.nuevoProducto.codigo,
        };

        const nuevoProductoAgregado =
          await api.v1.inventario.crearProducto(payloadProducto);

        this.productos.push({
          ...this.nuevoProducto,
          categoria: nuevoProductoAgregado.data.producto.categoria,
          p_producto_Id: nuevoProductoAgregado.data.producto.p_producto_Id,
          stock: 0,
        });
        const categoria = this.categorias.find(
          (cat) => cat.id_tipo_producto === this.nuevoProducto.categoria
        );

        if (categoria) {
          categoria.cantidad += 1;
        }
        this.mostrarAlertaExito('Producto agregado exitosamente');
        this.limpiarFormulario();
        this.tab = 'ver';
      } catch (error) {
        this.mostrarAlertaError('Error al crear producto');
      }
    },
    guardarProducto() {
      this.errores = {};
      if (!this.edicionActiva) {
        this.postAgregarProducto();
      } else {
        this.postActualixaProducto();
      }
    },
    async postActualixaProducto() {
      try {
        const payloadProducto = {
          p_producto_Id: this.nuevoProducto.p_producto_Id,
          descripcion: this.nuevoProducto.descripcion,
          id_proveedor: this.nuevoProducto.proveedor,
          id_tipo_producto: this.nuevoProducto.categoria,
          id_estado_producto: this.nuevoProducto.id_estado_producto,
          nombre_producto: this.nuevoProducto.nombre,
          valor_compra: this.nuevoProducto.precioCompra,
          valor_unitario: this.nuevoProducto.precioVenta,
          codigo: this.nuevoProducto.codigo,
        };

        const response =
          await api.v1.inventario.actualizarProducto(payloadProducto);
        const productoActualizado = response.data.producto;

        this.productos = this.productos.map((prod) =>
          prod.p_producto_Id === this.nuevoProducto.p_producto_Id
            ? { ...productoActualizado }
            : prod
        );

        this.mostrarAlertaExito('Producto actualizado exitosamente');
        this.limpiarFormulario();
        this.tab = 'ver';
      } catch (error) {
        this.mostrarAlertaError('Error al actualizar producto');
      }
    },
    async eliminarProducto(index) {
      if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
          const productoEliminado = this.productos[index];
          const elimarProducto = await api.v1.inventario.borrarProducto(
            productoEliminado.p_producto_Id
          );
          if (elimarProducto.data.mensaje !== 'Producto eliminado')
            return this.mostrarAlertaError('Error al eliminar producto');
          this.productos.splice(index, 1);
          this.mostrarAlertaExito(`"${productoEliminado.nombre}" eliminado`);
        } catch (error) {
          this.mostrarAlertaError('Error al eliminar producto');
        }
      }
    },

    editarProducto(index) {
      this.edicionActiva = true;
      const productoEdicion = { ...this.productos[index] };
      this.nuevoProducto = {
        p_producto_Id: productoEdicion.p_producto_Id,
        nombre: productoEdicion.nombre,
        precioCompra: productoEdicion.precioCompra,
        precioVenta: productoEdicion.precioVenta,
        stock: productoEdicion.stock,
        categoria: productoEdicion.id_tipo_producto,
        id_estado_producto: productoEdicion.id_estado_producto,
        codigo: productoEdicion.codigo,
        proveedor: productoEdicion.id_proveedor,
        descripcion: productoEdicion.descripcion,
      };
      this.tab = 'agregar';
    },

    limpiarFormulario() {
      this.edicionActiva = false;
      this.nuevoProducto = {
        nombre: '',
        precio: null,
        stock: null,
        categoria: '',
        codigo: '',
        proveedor: '',
        id_estado_producto: '',
        descripcion: '',
      };
    },

    validarFormulario() {
      if (!validarCampoVacio(this.nuevoProducto.nombre))
        this.errores.nombre = 'Nombre es requerido';

      if (!validarSoloNumeros(this.nuevoProducto.precioCompra))
        this.errores.precioCompra = 'Precio compra es requerido';

      if (!validarSoloNumeros(this.nuevoProducto.precioVenta))
        this.errores.precioVenta = 'Precio venta es requerido';

      if (!validarSoloNumeros(this.nuevoProducto.categoria))
        this.errores.categoria = 'categoria es requerido';

      if (!validarSoloNumeros(this.nuevoProducto.id_estado_producto))
        this.errores.id_estado_producto = 'estado producto es requerido';

      if (!validarSoloNumeros(this.nuevoProducto.proveedor))
        this.errores.proveedor = 'proveedor es requerido';

      if (Object.keys(this.errores).length > 0) {
        return false;
      }
      return true;
    },

    async cargarCategorias() {
      try {
        const result = await api.v1.inventario.obtenerCategoriasProducto();
        this.categorias = result.data.categorias;
      } catch (error) {
        console.error('Error al cargar categorías', error);
        this.mostrarAlertaError(
          'No se pudo cargar las categorias de inventario'
        );
      }
    },

    async cargarProductos() {
      try {
        const productos = await api.v1.inventario.obtenerProductos();
        this.productos = productos.data.productos;
      } catch (error) {
        console.error('Error al cargar productos', error);
        this.mostrarAlertaError('Error al cargar productos');
      }
    },

    exportarDatos() {
      const dataStr = JSON.stringify(this.productos, null, 2);
      const dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = 'inventario.json';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    irAProveedor() {
      this.$router.push('/Proveedores');
    },
  },
};
</script>

<style scoped>
.transition {
  transition: all 0.3s ease;
}

.hover\:shadow-md:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
