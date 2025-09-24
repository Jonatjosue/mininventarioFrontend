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
          <!-- Select para móvil -->
          <div class="block md:hidden px-4 py-2">
            <select
              v-model="tab"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option
                v-for="(tabItem, index) in tabs"
                :key="index"
                :value="tabItem.id"
                class="flex items-center"
              >
                {{ tabItem.label }}
                {{ tabItem.count !== undefined ? `(${tabItem.count})` : '' }}
              </option>
            </select>
          </div>

          <!-- Tabs para desktop -->
          <nav class="hidden md:flex space-x-8 px-6">
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
              <div class="mt-2 pt-3 border-t-2 flex flex-row justify-between">
                <div class="flex flex-row">
                  <button
                    class="btn btn-secondary flex items-center gap-2 bg-slate-500 hover:bg-gray-700 border-gray-500 text-white rounded-lg shadow-none focus:outline-none focus:ring-0"
                    @click="nuevoProducto.publicado = !nuevoProducto.publicado"
                  >
                    <!-- Estado Publicar -->
                    <template v-if="nuevoProducto.publicado">
                      <span>Publicar</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </template>

                    <template v-else>
                      <span>Ocultar</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="size-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                          clip-rule="evenodd"
                        />
                        <path
                          d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z"
                        />
                      </svg>
                    </template>
                  </button>
                  <div
                    role="alert"
                    class="alert ml-1 py-0 px-1 bg-white text-gray-600 border-slate-300"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      class="stroke-slate-300 h-6 w-6 shrink-0"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span class="text-xs"
                      >Muestre o oculte el producto al publico</span
                    >
                  </div>
                </div>

                <div class="flex flex-row gap-2">
                  <label class="btn border border-slate-500 bg-slate-500">
                    Cargar Imagen
                    <input type="file" :disabled="true" class="hidden" />
                  </label>
                  <label class="btn border border-slate-500 bg-slate-500">
                    Ver Imagenes
                    <input type="file" :disabled="true" class="hidden" />
                  </label>
                </div>
              </div>
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
                              class="text-xs px-2 rounded-full font-medium text-gray-500 bg-gray-200 font-mono tracking-tight min-w-[60px] text-center"
                            >
                              {{ producto.codigo || 'Sin Codigo' }}
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
                        Q{{
                          producto.precioCompra?.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Q{{
                          producto.precioVenta?.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}
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
                        {{ producto.codigo || 'Sin Codigo' }}
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
                      Q{{
                        producto.precioCompra?.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Precio Venta</p>
                    <p class="text-sm font-medium text-gray-900">
                      Q{{
                        producto.precioVenta?.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
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
          <div v-if="tab === 'oferta'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Gestión de Ofertas por Producto
              </h2>
              <div
                class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div class="relative">
                  <input
                    v-model="filtroBusquedaOfertas"
                    type="text"
                    placeholder="Buscar productos con ofertas..."
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
                    />
                  </svg>
                </div>
                <select
                  v-model="filtroEstadoOferta"
                  class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="activa">Ofertas activas</option>
                  <option value="programada">Ofertas programadas</option>
                  <option value="finalizada">Ofertas finalizadas</option>
                </select>
              </div>
            </div>

            <!-- Productos con ofertas - Vista acordeón -->
            <div class="space-y-4">
              <div
                v-for="(producto, index) in productosPaginados"
                :key="'producto-' + producto.id"
                class="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <!-- Encabezado del producto -->
                <div class="p-4 flex items-center justify-between bg-gray-50">
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
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ producto.nombre }}
                      </h3>
                      <div class="flex flex-row">
                        <p class="text-sm text-gray-500 mr-2">
                          {{ producto.codigo }}
                        </p>
                        <p class="text-sm text-gray-500 mr-1">
                          Precio original
                        </p>
                        <p class="text-sm text-gray-500 ml-1">
                          {{
                            producto.precio_original.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600">
                      {{ producto.ofertas.length }} oferta(s)
                    </span>
                    <button
                      @click="toggleOfertasProducto(producto.id)"
                      class="p-1 text-gray-400 hover:text-gray-600 transition"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          v-if="!producto.mostrarOfertas"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                        <path
                          v-else
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Lista de ofertas del producto (acordeón) -->
                <div
                  v-if="producto.mostrarOfertas"
                  class="border-t border-gray-100"
                >
                  <!-- Tabla de ofertas para desktop -->
                  <div class="hidden lg:block">
                    <table class="w-full">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Precio Oferta
                          </th>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Descuento
                          </th>
                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Vigencia
                          </th>

                          <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(oferta, ofertaIndex) in producto.ofertas"
                          :key="oferta.id"
                          class="hover:bg-gray-50 transition"
                        >
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600"
                          >
                            Q{{
                              oferta.precio_oferta?.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span
                              v-if="oferta.aplica_por_porcentaje"
                              class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"
                            >
                              {{ oferta.porcentaje_descuento }}% OFF
                            </span>
                            <span
                              v-else
                              class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"
                            >
                              {{ oferta.porcentaje_descuento }} Q
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ formatFecha(oferta.fecha_inicio) }} -
                            {{ formatFecha(oferta.fecha_fin) }}
                          </td>

                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          >
                            <button
                              @click="
                                eliminarOferta(
                                  producto.id,
                                  oferta.id_producto_oferta
                                )
                              "
                              class="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Tarjetas de ofertas para móvil -->
                  <div class="lg:hidden space-y-3 p-4">
                    <div
                      v-for="(oferta, ofertaIndex) in producto.ofertas"
                      :key="'mobile-oferta-' + oferta.id"
                      class="bg-gray-50 rounded-lg p-3"
                    >
                      <div class="grid grid-cols-2 gap-3 mb-2">
                        <div>
                          <p class="text-xs text-gray-500">Precio Oferta</p>
                          <p class="text-sm font-semibold text-green-600">
                            Q{{
                              oferta.precio_oferta?.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }}
                          </p>
                        </div>
                        <div>
                          <p class="text-xs text-gray-500">Descuento</p>
                          <p class="text-sm font-semibold text-red-600">
                            {{ oferta.porcentaje_descuento }}% OFF
                          </p>
                        </div>
                        <div>
                          <p class="text-xs text-gray-500">Vigencia</p>
                          <p class="text-xs text-gray-900">
                            {{ formatFechaCorta(oferta.fecha_fin) }}
                          </p>
                        </div>
                      </div>
                      <div class="flex space-x-2 pt-2 border-t border-gray-200">
                        <button
                          @click="
                            eliminarOferta(
                              producto.id,
                              oferta.id_producto_oferta
                            )
                          "
                          class="flex-1 bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="p-4 bg-gray-50 border-t border-gray-100 flex flex-row justify-between"
                  >
                    <span class="text-gray-700">{{
                      'Mejor Descuento Q ' +
                      producto.precio_calculado.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}</span>
                    <div>
                      <button
                        @click="mostrarModalNuevaOferta(producto)"
                        class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition flex items-center space-x-1"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span>Agregar otra oferta</span>
                      </button>
                    </div>
                  </div>
                  <!-- Botón para agregar más ofertas a este producto -->
                </div>
              </div>

              <!-- Mensaje cuando no hay productos con ofertas -->
              <div
                v-if="productosConOfertasFiltrados.length === 0"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2 15.5V19a2 2 0 002 2h16a2 2 0 002-2v-3.5"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 12V5a2 2 0 00-2-2H8a2 2 0 00-2 2v7"
                  />
                </svg>
                <p class="text-gray-500 text-lg">
                  No se encontraron productos con ofertas
                </p>
                <p class="text-gray-400 text-sm">
                  Crea tu primera oferta para empezar a promocionar productos
                </p>
              </div>
              <div
                v-if="
                  productosConOfertasFiltrados.length > 0 && totalPaginas > 1
                "
                class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
              >
                <div class="flex flex-1 justify-between sm:hidden">
                  <button
                    @click="paginaActual--"
                    :disabled="paginaActual === 1"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    :class="{
                      'opacity-50 cursor-not-allowed': paginaActual === 1,
                    }"
                  >
                    Anterior
                  </button>
                  <button
                    @click="paginaActual++"
                    :disabled="paginaActual === totalPaginas"
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        paginaActual === totalPaginas,
                    }"
                  >
                    Siguiente
                  </button>
                </div>
                <div
                  class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
                >
                  <div>
                    <p class="text-sm text-gray-700">
                      Mostrando
                      <span class="font-medium">{{
                        (paginaActual - 1) * productosPorPagina + 1
                      }}</span>
                      a
                      <span class="font-medium">{{
                        Math.min(
                          paginaActual * productosPorPagina,
                          productosConOfertasFiltrados.length
                        )
                      }}</span>
                      de
                      <span class="font-medium">{{
                        productosConOfertasFiltrados.length
                      }}</span>
                      resultados
                    </p>
                  </div>
                  <div>
                    <nav
                      class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        @click="paginaActual--"
                        :disabled="paginaActual === 1"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{
                          'opacity-50 cursor-not-allowed': paginaActual === 1,
                        }"
                      >
                        <span class="sr-only">Anterior</span>
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>

                      <!-- Números de página -->
                      <button
                        v-for="pagina in paginasParaMostrar"
                        :key="'pagina-' + pagina"
                        @click="paginaActual = pagina"
                        :class="[
                          pagina === paginaActual
                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                          'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                        ]"
                        aria-current="page"
                      >
                        {{ pagina }}
                      </button>

                      <button
                        @click="paginaActual++"
                        :disabled="paginaActual === totalPaginas"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{
                          'opacity-50 cursor-not-allowed':
                            paginaActual === totalPaginas,
                        }"
                      >
                        <span class="sr-only">Siguiente</span>
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
              <!-- finaliza paginación-->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- Modal para agregar oferta -->
  <div v-if="mostrarModalOferta" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Fondo del modal -->
      <div
        class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        @click="cerrarModalOferta"
      ></div>

      <!-- Contenido del modal -->
      <div
        class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl sm:max-w-lg"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ modoEdicion ? 'Editar Oferta' : 'Agregar Oferta al Producto' }}
          </h3>
          <button
            @click="cerrarModalOferta"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="guardarOferta">
          <!-- Selección de Producto (si no viene pre-seleccionado) -->
          <div v-if="!productoSeleccionado" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Producto</label
            >
            <select
              v-model="nuevaOferta.id_producto"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar producto</option>
              <option
                v-for="producto in productos"
                :key="producto.id_producto"
                :value="producto.id_producto"
              >
                {{ producto.nombre }} - {{ producto.codigo }}
              </option>
            </select>
          </div>
          <div v-else class="mb-4 p-3 bg-gray-100 rounded-md">
            <p class="text-lg font-semibold text-gray-700">
              {{ productoSeleccionado.nombre }}
            </p>
            <p class="text-sm text-gray-700">
              {{ productoSeleccionado.codigo }}
            </p>
          </div>

          <!-- Selección de Tipo de Oferta -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Oferta</label
            >
            <select
              v-model="nuevaOferta.id_oferta"
              required
              @change="calcularPrecioOferta"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar tipo de oferta</option>
              <option
                v-for="oferta in ofertasDisponibles"
                :key="oferta.id_oferta"
                :value="oferta.id_oferta"
                :disabled="!oferta.activa"
              >
                {{ oferta.nombre }} -
                <template v-if="oferta.valor_oferta_numerico > 0">
                  Q{{ oferta.valor_oferta_numerico }} descuento
                </template>
                <template v-else-if="oferta.valor_oferta_porcentaje > 0">
                  {{ oferta.valor_oferta_porcentaje }}% descuento
                </template>
                {{ oferta.activa ? '(Activa)' : '(Inactiva)' }}
              </option>
            </select>
          </div>

          <!-- Información de la oferta seleccionada -->
          <div v-if="ofertaSeleccionada" class="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 class="font-medium text-gray-900 mb-2">
              {{ ofertaSeleccionada.nombre }}
            </h4>
            <p class="text-sm text-gray-600 mb-2">
              {{ ofertaSeleccionada.descripcion_tipo }}
            </p>
            <div class="flex flex-row justify-between items-center">
              <div>
                <p class="text-black">Aplicar por:</p>
              </div>

              <label
                class="relative inline-flex items-center cursor-pointer my-2"
              >
                <input
                  v-model="aplica_por_porcentaje"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div
                  class="w-36 h-6 bg-primary peer-checked:bg-secondary rounded-full transition-colors duration-300 ease-in-out"
                ></div>
                <span
                  class="absolute left-1 top-1 bg-white w-8 h-4 rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-24"
                ></span>
                <span
                  class="absolute left-3 top-1 text-xs font-semibold text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                  >Porcentaje</span
                >
                <span
                  class="absolute right-3 top-1 text-xs font-semibold text-white opacity-100 peer-checked:opacity-0 transition-opacity duration-300"
                  >Cantidad</span
                >
              </label>
            </div>

            <div
              v-if="productoSeleccionado && !aplica_por_porcentaje"
              class="grid grid-cols-2 gap-2"
            >
              <div>
                <span class="text-sm text-gray-600">Precio original:</span>
                <p class="font-semibold text-gray-700">
                  Q{{
                    productoSeleccionado.precio_original?.toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  }}
                </p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Precio con oferta:</span>
                <p class="font-semibold text-gray-700">
                  Q{{
                    (
                      productoSeleccionado.precio_original -
                      ofertaSeleccionada.valor_oferta_numerico
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                </p>
              </div>
            </div>

            <div
              v-else-if="productoSeleccionado && aplica_por_porcentaje"
              class="grid grid-cols-2 gap-2"
            >
              <div>
                <span class="text-sm text-gray-500">Precio original:</span>
                <p class="font-semibold text-gray-700">
                  Q{{
                    productoSeleccionado.precio_original?.toLocaleString(
                      'en-US',
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )
                  }}
                </p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Precio con oferta:</span>
                <p class="font-semibold text-gray-700">
                  Q{{
                    (
                      productoSeleccionado.precio_original *
                      (1 - ofertaSeleccionada.valor_oferta_porcentaje / 100)
                    ).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Fechas de vigencia -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Fecha de inicio</label
              >
              <input
                v-model="nuevaOferta.fecha_inicio"
                type="date"
                :disabled="true"
                required
                :min="fechaHoy"
                class="w-full px-3 py-2 border disabled:bg-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Fecha de fin</label
              >
              <input
                v-model="nuevaOferta.fecha_fin"
                type="date"
                required
                :min="nuevaOferta.fecha_inicio || fechaHoy"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Footer del modal -->
          <div
            class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3"
          >
            <button
              type="button"
              @click="cerrarModalOferta"
              class="mt-3 sm:mt-0 w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="guardando"
              class="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <span v-if="guardando">Guardando...</span>
              <span v-else
                >{{ modoEdicion ? 'Actualizar' : 'Agregar' }} Oferta</span
              >
            </button>
          </div>
        </form>
      </div>
    </div>
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
      publicar: false,
      paginaActual: 1,
      productosPorPagina: 5,
      aplica_por_porcentaje: false,
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
        publicado: false,
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
        { id: 'oferta', label: 'Ofertas Producto', icon: PlusIcon },
      ],
      filtroBusquedaOfertas: '',
      filtroEstadoOferta: '',
      productosNuevos: [],
      mostrarModalOferta: false,
      modoEdicion: false,
      guardando: false,
      productoSeleccionado: null,
      ofertasDisponibles: [],
      nuevaOferta: {
        id_producto: '',
        id_oferta: '',
        fecha_inicio: '',
        fecha_fin: '',
        observaciones: '',
      },
      ofertaEditando: null,
    };
  },
  computed: {
    productosPaginados() {
      const inicio = (this.paginaActual - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      return this.productosConOfertasFiltrados.slice(inicio, fin);
    },
    totalPaginas() {
      return Math.ceil(
        this.productosConOfertasFiltrados.length / this.productosPorPagina
      );
    },
    paginasParaMostrar() {
      const paginas = [];
      const maxPaginasVisibles = 5;
      let inicio = Math.max(
        1,
        this.paginaActual - Math.floor(maxPaginasVisibles / 2)
      );
      const fin = Math.min(inicio + maxPaginasVisibles - 1, this.totalPaginas);

      inicio = Math.max(1, fin - maxPaginasVisibles + 1);

      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
      return paginas;
    },
    fechaHoy() {
      return new Date().toISOString().split('T')[0];
    },
    ofertaSeleccionada() {
      if (!this.nuevaOferta.id_oferta) return null;
      return this.ofertasDisponibles.find(
        (o) => o.id_oferta == this.nuevaOferta.id_oferta
      );
    },
    productosConOfertasFiltrados() {
      return this.productosNuevos.filter((producto) => {
        const searchTerm = this.filtroBusquedaOfertas?.toLowerCase() ?? '';

        const matchesSearch =
          producto?.nombre?.toLowerCase()?.includes(searchTerm) ||
          producto?.codigo?.toLowerCase()?.includes(searchTerm);

        let matchesStatus = true;
        if (this.filtroEstadoOferta) {
          matchesStatus =
            producto?.ofertas?.some(
              (oferta) => oferta.estado === this.filtroEstadoOferta
            ) ?? false;
        }

        return matchesSearch && matchesStatus;
      });
    },
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
    productosConOfertasFiltrados() {
      this.actualizarPaginacion();
    },
  },
  mounted() {
    this.validarCatalogosParaCreacionProducto();
  },
  methods: {
    actualizarPaginacion() {
      this.paginaActual = 1;
    },
    async eliminarOferta(id, idOfertaProducto) {
      try {
        const response =
          await api.v1.inventario.borrarProductoOferta(idOfertaProducto);
        if (response.status <= 200) {
          const producto = this.productosNuevos.find((p) => p.id === id);
          if (producto) {
            producto.ofertas = producto.ofertas.filter(
              (oferta) => oferta.id_producto_oferta !== idOfertaProducto
            );
          }
          this.mostrarAlertaExito('Oferta removida con éxito');
        }
      } catch (error) {
        console.error('Error al eliminar oferta', error);
        const mensaje = error?.response?.data?.mensaje
          ? error?.response?.data?.mensaje
          : 'Error al eliminar oferta';
        this.mostrarAlertaError(mensaje);
      }
    },
    async obtenerProductosOferta() {
      try {
        const response = await api.v1.inventario.ofertasProducto();
        this.productosNuevos = response.data;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar productos');
      }
    },
    // Abrir modal para nuevo o edición
    mostrarModalNuevaOferta(producto = null) {
      this.productoSeleccionado = producto;
      this.modoEdicion = false;
      this.mostrarModalOferta = true;

      // Resetear formulario
      this.nuevaOferta = {
        id_producto: producto ? producto.id : '',
        id_oferta: '',
        fecha_inicio: this.fechaHoy,
        fecha_fin: '',
        observaciones: '',
      };
    },

    // Editar oferta existente
    editarOferta(productoId, ofertaId) {
      // Buscar la oferta a editar
      const producto = this.productos.find((p) => p.id === productoId);
      const oferta = producto.ofertas.find((o) => o.id === ofertaId);

      this.modoEdicion = true;
      this.ofertaEditando = oferta;
      this.productoSeleccionado = producto;
      this.mostrarModalOferta = true;

      // Llenar formulario con datos existentes
      this.nuevaOferta = {
        id_producto: productoId,
        id_oferta: oferta.id_oferta,
        fecha_inicio: oferta.fecha_inicio,
        fecha_fin: oferta.fecha_fin,
        observaciones: oferta.observaciones || '',
      };
    },

    cerrarModalOferta() {
      console.log('llega aqui');
      this.mostrarModalOferta = false;
      this.productoSeleccionado = null;
      this.ofertaEditando = null;
    },

    async guardarOferta() {
      try {
        this.guardando = true;
        if (
          new Date(this.nuevaOferta.fecha_fin) <
          new Date(this.nuevaOferta.fecha_inicio)
        ) {
          this.mostrarAlertaError(
            'La fecha de fin debe ser posterior a la fecha de inicio'
          );
          return;
        }

        const ofertaData = {
          ...this.nuevaOferta,
          fecha_vigencia: this.nuevaOferta.fecha_fin,
          precio_final: this.calcularPrecioFinal(),
          estado: this.calcularEstadoOferta(),
          aplica_por_porcentaje: this.aplica_por_porcentaje,
        };

        if (this.modoEdicion) {
          await api.v1.inventario.actualizarOferta({
            ...ofertaData,
            id: this.ofertaEditando.id,
          });
        } else {
          const { data } =
            await api.v1.inventario.agregarOfertaProducto(ofertaData);
          const dataPush = data.data;
          const index = this.productosNuevos.findIndex(
            (a) => a.id === dataPush.id
          );
          if (index !== -1) {
            this.productosNuevos[index] = dataPush;
          } else {
            this.productosNuevos.push(dataPush);
          }
          console.log(this.productosNuevos);
        }
        this.guardando = false;
        this.cerrarModalOferta();
        this.mostrarAlertaExito('Oferta agregada a producto');
      } catch (error) {
        console.error('Error guardando oferta:', error);
        this.mostrarAlertaError('Error al guardar la oferta');
      } finally {
        this.guardando = false;
      }
    },

    calcularPrecioFinal() {
      if (!this.productoSeleccionado || !this.ofertaSeleccionada) return 0;

      const precioOriginal = this.productoSeleccionado.precioVenta;
      const descuentoNumerico =
        parseFloat(this.ofertaSeleccionada.valor_oferta_numerico) || 0;
      const descuentoPorcentaje =
        parseFloat(this.ofertaSeleccionada.valor_oferta_porcentaje) || 0;

      if (descuentoNumerico > 0) {
        return precioOriginal - descuentoNumerico;
      } else if (descuentoPorcentaje > 0) {
        return precioOriginal * (1 - descuentoPorcentaje / 100);
      }

      return precioOriginal;
    },

    calcularEstadoOferta() {
      const hoy = new Date();
      const inicio = new Date(this.nuevaOferta.fecha_inicio);
      const fin = new Date(this.nuevaOferta.fecha_fin);

      if (hoy < inicio) return 'programada';
      if (hoy > fin) return 'finalizada';
      return 'activa';
    },
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
      await this.obtenerProductosOferta();
      await this.cargarCategorias();
      await this.cargarProveedores();
      await this.cargarEstadosProducto();
      await this.cargarProductos();
      await this.obtenerOfertas();
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
          publicado: this.nuevoProducto.publicado,
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
          publicado: this.nuevoProducto.publicado,
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
        publicado: productoEdicion.publicado,
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
    toggleOfertasProducto(productoId) {
      const producto = this.productosConOfertasFiltrados.find(
        (p) => p.id === productoId
      );
      if (producto) {
        producto.mostrarOfertas = !producto.mostrarOfertas;
      }
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString();
    },
    formatFechaCorta(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
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
    async obtenerOfertas() {
      try {
        const ofertaReponse = await api.v1.inventario.obtenerOfertas();
        this.ofertasDisponibles = ofertaReponse.data.ofertas;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar ofertas');
      }
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

@media (max-width: 640px) {
  .max-w-md {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}

select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle::after {
  content: 'On'; /* o el texto que quieras */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}
</style>
