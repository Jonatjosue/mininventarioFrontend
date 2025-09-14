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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Gestión de Pedidos
              </h1>
              <p class="text-sm text-gray-600">
                {{
                  esCliente
                    ? 'Realiza y sigue tus pedidos'
                    : 'Gestiona pedidos de clientes'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
              class="hidden md:inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"
            ></span>
            <span class="text-xs text-green-600 font-medium">Conectado</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto">
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

        <!-- Content -->
        <div class="p-6">
          <!-- Nuevo Pedido -->
          <div v-if="tab === 'nuevo'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                {{ esCliente ? 'Nuevo Pedido' : 'Crear Pedido para Cliente' }}
              </h2>
            </div>

            <!-- Datos del Pedido -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Información del Cliente
                </h3>

                <div v-if="esCliente">
                  <div
                    class="flex items-center space-x-3 p-3 bg-white rounded-lg border"
                  >
                    <div
                      class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ usuario.nombre }}
                      </p>
                      <p class="text-sm text-gray-500">Cliente</p>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Seleccionar Cliente *</label
                  >
                  <select
                    v-model="nuevoPedido.id_cliente"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Seleccione un cliente</option>
                    <option value="anonimo">Cliente Anónimo</option>
                    <option
                      v-for="cliente in clientes"
                      :key="cliente.id_cliente"
                      :value="cliente.id_cliente"
                    >
                      {{ cliente.nombre }} - {{ cliente.email }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Detalles del Pedido
                </h3>

                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Observaciones</label
                    >
                    <textarea
                      v-model="nuevoPedido.observacion"
                      rows="2"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Observaciones adicionales para el pedido..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Productos -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Productos del Pedido
                </h3>
                <button
                  @click="mostrarModalProductos = true"
                  class="bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-700 transition flex items-center space-x-2 text-sm"
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
                    ></path>
                  </svg>
                  <span>Agregar Productos</span>
                </button>
              </div>

              <div
                v-if="nuevoPedido.detalle.length === 0"
                class="text-center py-8 bg-gray-50 rounded-lg"
              >
                <svg
                  class="w-12 h-12 text-gray-400 mx-auto mb-3"
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
                <p class="text-gray-500">No hay productos agregados</p>
                <p class="text-gray-400 text-sm">
                  Agrega productos para continuar con el pedido
                </p>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-200">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="border border-gray-300 p-3 text-left">
                        Producto
                      </th>
                      <th class="border border-gray-300 p-3 text-right">
                        Precio Unitario
                      </th>
                      <th class="border border-gray-300 p-3 text-right">
                        Cantidad
                      </th>
                      <th class="border border-gray-300 p-3 text-right">
                        Subtotal
                      </th>
                      <th class="border border-gray-300 p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in nuevoPedido.detalle"
                      :key="index"
                    >
                      <td class="border border-gray-200 p-3">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <p class="font-medium text-gray-900">
                              {{ item.nombre }}
                            </p>
                            <p class="text-sm text-gray-500">
                              Código: {{ item.codigo }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="border border-gray-200 p-3 text-right">
                        {{ formatoMoneda(item.precio) }}
                      </td>
                      <td class="border border-gray-200 p-3">
                        <div class="flex items-center justify-end space-x-2">
                          <button
                            @click="modificarCantidad(index, -1)"
                            class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
                            :disabled="item.cantidad <= 1"
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
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </button>
                          <span class="w-8 text-center">{{
                            item.cantidad
                          }}</span>
                          <button
                            @click="modificarCantidad(index, 1)"
                            class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td
                        class="border border-gray-200 p-3 text-right font-medium"
                      >
                        {{ formatoMoneda(item.cantidad * item.precio) }}
                      </td>
                      <td class="border border-gray-200 p-3 text-center">
                        <button
                          @click="eliminarProducto(index)"
                          class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition"
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
                  </tbody>
                  <tfoot v-if="nuevoPedido.detalle.length > 0">
                    <tr>
                      <td
                        colspan="3"
                        class="border border-gray-200 p-3 text-right font-medium"
                      >
                        Total:
                      </td>
                      <td
                        class="border border-gray-200 p-3 text-right font-bold text-green-600 text-lg"
                      >
                        {{ formatoMoneda(totalPedido) }}
                      </td>
                      <td class="border border-gray-200 p-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4">
              <button
                @click="limpiarPedido"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                @click="crearPedido"
                :disabled="
                  nuevoPedido.detalle.length === 0 ||
                  (!esCliente && !nuevoPedido.id_cliente)
                "
                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition flex items-center"
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
                {{ guardando ? 'Procesando...' : 'Crear Pedido' }}
              </button>
            </div>
          </div>

          <!-- Historial de Pedidos -->
          <div v-if="tab === 'historial'">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                {{ esCliente ? 'Mis Pedidos' : 'Historial de Pedidos' }}
              </h2>
              <div class="flex space-x-4">
                <div class="relative">
                  <input
                    v-model="filtroPedidos"
                    type="text"
                    placeholder="Buscar pedidos..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
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

            <div class="space-y-4">
              <div
                v-for="pedido in pedidosFiltrados"
                :key="pedido.id_cliente_pedido"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      Pedido #{{ pedido.id_cliente_pedido }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ formatFecha(pedido.fecha_creacion) }}
                    </p>
                    <p class="text-sm text-gray-500" v-if="!esCliente">
                      Cliente: {{ obtenerNombreCliente(pedido.id_cliente) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        obtenerClaseEstado(pedido.id_estado_pedido),
                      ]"
                    >
                      {{ obtenerNombreEstado(pedido.id_estado_pedido) }}
                    </span>
                    <p class="text-lg font-bold text-green-600 mt-1">
                      {{ formatoMoneda(pedido.valor_total) }}
                    </p>
                  </div>
                </div>

                <div class="mb-4">
                  <p class="text-sm text-gray-600" v-if="pedido.observacion">
                    <span class="font-medium">Observaciones:</span>
                    {{ pedido.observacion }}
                  </p>
                </div>

                <div class="border-t border-gray-100 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="text-sm text-gray-500">
                      {{ pedido.cantidad_productos }} producto(s)
                    </p>
                    <button
                      @click="verDetallePedido(pedido)"
                      class="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center"
                    >
                      Ver detalles
                      <svg
                        class="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="pedidosFiltrados.length === 0"
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              <p class="text-gray-500 text-lg">No hay pedidos registrados</p>
              <p class="text-gray-400 text-sm">
                {{
                  esCliente
                    ? 'Realiza tu primer pedido'
                    : 'Aún no se han realizado pedidos'
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de Productos -->
    <div
      v-if="mostrarModalProductos"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Seleccionar Productos
          </h3>
        </div>

        <div class="p-6 flex-1 overflow-y-auto">
          <div class="relative mb-4">
            <input
              v-model="filtroProductos"
              type="text"
              placeholder="Buscar productos..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 w-full"
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="producto in productosFiltrados"
              :key="producto.p_producto_id"
              class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
              @click="agregarProducto(producto)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium text-gray-900">
                    {{ producto.nombre }}
                  </h4>
                  <p class="text-sm text-gray-500">
                    Código: {{ producto.codigo }}
                  </p>
                </div>
                <span class="font-semibold text-green-600">{{
                  formatoMoneda(producto.precio)
                }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                {{ producto.descripcion }}
              </p>
            </div>
          </div>

          <div v-if="productosFiltrados.length === 0" class="text-center py-8">
            <p class="text-gray-500">No se encontraron productos</p>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            @click="mostrarModalProductos = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            @click="mostrarModalProductos = false"
            class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Finalizar selección
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detalle Pedido -->
    <div
      v-if="mostrarModalDetalle"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Detalles del Pedido #{{ pedidoSeleccionado.id_cliente_pedido }}
          </h3>
        </div>

        <div class="p-6 flex-1 overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">
                Información del Pedido
              </h4>
              <dl class="space-y-2">
                <div>
                  <dt class="text-sm text-gray-500">Fecha:</dt>
                  <dd class="text-sm text-gray-900">
                    {{ formatFecha(pedidoSeleccionado.fecha_creacion) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500">Estado:</dt>
                  <dd class="text-sm">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        obtenerClaseEstado(pedidoSeleccionado.id_estado_pedido),
                      ]"
                    >
                      {{
                        obtenerNombreEstado(pedidoSeleccionado.id_estado_pedido)
                      }}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-500">Valor Total:</dt>
                  <dd class="text-sm font-semibold text-green-600">
                    {{ formatoMoneda(pedidoSeleccionado.valor_total) }}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 mb-2">
                Información del Cliente
              </h4>
              <dl class="space-y-2">
                <div>
                  <dt class="text-sm text-gray-500">Cliente:</dt>
                  <dd class="text-sm text-gray-900">
                    {{ obtenerNombreCliente(pedidoSeleccionado.id_cliente) }}
                  </dd>
                </div>
                <div v-if="pedidoSeleccionado.observacion">
                  <dt class="text-sm text-gray-500">Observaciones:</dt>
                  <dd class="text-sm text-gray-900">
                    {{ pedidoSeleccionado.observacion }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <h4 class="font-medium text-gray-900 mb-4">Productos del Pedido</h4>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 p-3 text-left">Producto</th>
                  <th class="border border-gray-300 p-3 text-right">
                    Precio Unitario
                  </th>
                  <th class="border border-gray-300 p-3 text-right">
                    Cantidad
                  </th>
                  <th class="border border-gray-300 p-3 text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in detallePedido" :key="index">
                  <td class="border border-gray-200 p-3">
                    <p class="font-medium text-gray-900">{{ item.nombre }}</p>
                    <p class="text-sm text-gray-500">
                      Código: {{ item.codigo }}
                    </p>
                  </td>
                  <td class="border border-gray-200 p-3 text-right">
                    {{ formatoMoneda(item.precio) }}
                  </td>
                  <td class="border border-gray-200 p-3 text-right">
                    {{ item.cantidad }}
                  </td>
                  <td class="border border-gray-200 p-3 text-right font-medium">
                    {{ formatoMoneda(item.cantidad * item.precio) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colspan="3"
                    class="border border-gray-200 p-3 text-right font-medium"
                  >
                    Total:
                  </td>
                  <td
                    class="border border-gray-200 p-3 text-right font-bold text-green-600"
                  >
                    {{ formatoMoneda(pedidoSeleccionado.valor_total) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex justify-end">
          <button
            @click="mostrarModalDetalle = false"
            class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Notificación Toast -->
    <div
      v-if="mostrarNotificacion"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50"
      :class="notificacionClase"
    >
      <div class="flex items-center space-x-2">
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
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span>{{ mensajeNotificacion }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Iconos para las pestañas
const NewOrderIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`,
};

const HistoryIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`,
};

export default {
  name: 'GestionPedidos',
  data() {
    return {
      tab: 'nuevo',
      esCliente: false, // Esto debería determinarse según el rol del usuario autenticado
      usuario: {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        esEmpleado: false,
      },
      clientes: [
        { id_cliente: 1, nombre: 'Cliente Uno', email: 'cliente1@example.com' },
        { id_cliente: 2, nombre: 'Cliente Dos', email: 'cliente2@example.com' },
        {
          id_cliente: 3,
          nombre: 'Cliente Tres',
          email: 'cliente3@example.com',
        },
      ],
      productos: [
        {
          p_producto_id: 1,
          codigo: 'PROD001',
          nombre: 'Producto Uno',
          descripcion: 'Descripción del producto uno',
          precio: 100.0,
        },
        {
          p_producto_id: 2,
          codigo: 'PROD002',
          nombre: 'Producto Dos',
          descripcion: 'Descripción del producto dos',
          precio: 200.0,
        },
        {
          p_producto_id: 3,
          codigo: 'PROD003',
          nombre: 'Producto Tres',
          descripcion: 'Descripción del producto tres',
          precio: 150.0,
        },
        {
          p_producto_id: 4,
          codigo: 'PROD004',
          nombre: 'Producto Cuatro',
          descripcion: 'Descripción del producto cuatro',
          precio: 75.5,
        },
        {
          p_producto_id: 5,
          codigo: 'PROD005',
          nombre: 'Producto Cinco',
          descripcion: 'Descripción del producto cinco',
          precio: 300.0,
        },
      ],
      estadosPedido: [
        {
          id_estado_pedido: 1,
          estado_pedido: 'Pendiente',
          clase: 'bg-yellow-100 text-yellow-800',
        },
        {
          id_estado_pedido: 2,
          estado_pedido: 'Confirmado',
          clase: 'bg-blue-100 text-blue-800',
        },
        {
          id_estado_pedido: 3,
          estado_pedido: 'En preparación',
          clase: 'bg-orange-100 text-orange-800',
        },
        {
          id_estado_pedido: 4,
          estado_pedido: 'En camino',
          clase: 'bg-purple-100 text-purple-800',
        },
        {
          id_estado_pedido: 5,
          estado_pedido: 'Entregado',
          clase: 'bg-green-100 text-green-800',
        },
        {
          id_estado_pedido: 6,
          estado_pedido: 'Cancelado',
          clase: 'bg-red-100 text-red-800',
        },
      ],
      pedidos: [
        {
          id_cliente_pedido: 1,
          fecha_creacion: '2023-10-15',
          id_cliente: 1,
          id_estado_pedido: 3,
          observacion: 'Entregar antes de las 5pm',
          valor_total: 450.5,
          cantidad_productos: 3,
          UID_PEDIDO: 'abc123',
        },
        {
          id_cliente_pedido: 2,
          fecha_creacion: '2023-10-16',
          id_cliente: 2,
          id_estado_pedido: 5,
          observacion: '',
          valor_total: 200.0,
          cantidad_productos: 1,
          UID_PEDIDO: 'def456',
        },
      ],
      detallePedido: [],
      nuevoPedido: {
        id_cliente: null,
        observacion: '',
        detalle: [],
      },
      filtroPedidos: '',
      filtroProductos: '',
      mostrarModalProductos: false,
      mostrarModalDetalle: false,
      pedidoSeleccionado: {},
      guardando: false,
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      tabs: [
        { id: 'nuevo', label: 'Nuevo Pedido', icon: NewOrderIcon },
        { id: 'historial', label: 'Historial', icon: HistoryIcon, count: 2 },
      ],
    };
  },
  computed: {
    pedidosFiltrados() {
      if (!this.filtroPedidos) return this.pedidos;

      return this.pedidos.filter((pedido) => {
        const searchTerm = this.filtroPedidos.toLowerCase();
        return (
          pedido.id_cliente_pedido.toString().includes(searchTerm) ||
          this.obtenerNombreCliente(pedido.id_cliente)
            .toLowerCase()
            .includes(searchTerm) ||
          pedido.observacion.toLowerCase().includes(searchTerm)
        );
      });
    },
    productosFiltrados() {
      if (!this.filtroProductos) return this.productos;

      return this.productos.filter((producto) => {
        const searchTerm = this.filtroProductos.toLowerCase();
        return (
          producto.nombre.toLowerCase().includes(searchTerm) ||
          producto.codigo.toLowerCase().includes(searchTerm) ||
          producto.descripcion.toLowerCase().includes(searchTerm)
        );
      });
    },
    totalPedido() {
      return this.nuevoPedido.detalle.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
      );
    },
    notificacionClase() {
      return this.mostrarNotificacion ? 'translate-x-0' : 'translate-x-full';
    },
  },
  mounted() {
    // Determinar si el usuario es cliente o empleado
    // En una aplicación real, esto vendría de la autenticación
    this.esCliente = !this.usuario.esEmpleado;

    // Si es cliente, establecer su ID como cliente por defecto
    if (this.esCliente) {
      this.nuevoPedido.id_cliente = this.usuario.id;
    }
  },
  methods: {
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(valor);
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    obtenerNombreCliente(idCliente) {
      if (idCliente === 'anonimo') return 'Cliente Anónimo';

      const cliente = this.clientes.find((c) => c.id_cliente === idCliente);
      return cliente ? cliente.nombre : 'Cliente no encontrado';
    },
    obtenerNombreEstado(idEstado) {
      const estado = this.estadosPedido.find(
        (e) => e.id_estado_pedido === idEstado
      );
      return estado ? estado.estado_pedido : 'Desconocido';
    },
    obtenerClaseEstado(idEstado) {
      const estado = this.estadosPedido.find(
        (e) => e.id_estado_pedido === idEstado
      );
      return estado ? estado.clase : 'bg-gray-100 text-gray-800';
    },
    modificarCantidad(index, cambio) {
      const nuevaCantidad = this.nuevoPedido.detalle[index].cantidad + cambio;
      if (nuevaCantidad > 0) {
        this.nuevoPedido.detalle[index].cantidad = nuevaCantidad;
      }
    },
    agregarProducto(producto) {
      // Verificar si el producto ya está en el pedido
      const productoExistente = this.nuevoPedido.detalle.find(
        (item) => item.p_producto_id === producto.p_producto_id
      );

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        this.nuevoPedido.detalle.push({
          p_producto_id: producto.p_producto_id,
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        });
      }

      this.mostrarNotificacion('Producto agregado al pedido', 'exito');
    },
    eliminarProducto(index) {
      this.nuevoPedido.detalle.splice(index, 1);
    },
    async crearPedido() {
      this.guardando = true;

      try {
        // Simular una llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Crear el objeto de pedido según la estructura de la base de datos
        const nuevoPedido = {
          id_cliente_pedido:
            Math.max(...this.pedidos.map((p) => p.id_cliente_pedido), 0) + 1,
          fecha_creacion: new Date().toISOString().split('T')[0],
          id_cliente: this.nuevoPedido.id_cliente,
          id_estado_pedido: 1, // Pendiente
          observacion: this.nuevoPedido.observacion,
          valor_total: this.totalPedido,
          cantidad_productos: this.nuevoPedido.detalle.reduce(
            (sum, item) => sum + item.cantidad,
            0
          ),
          UID_PEDIDO: this.generarUID(),
          id_estado_registro: true,
          id_usuario_creacion: this.usuario.id,
        };

        // Agregar a la lista de pedidos
        this.pedidos.unshift(nuevoPedido);

        // Actualizar el contador de la pestaña
        this.tabs[1].count = this.pedidos.length;

        // Limpiar el formulario
        this.limpiarPedido();

        this.mostrarNotificacion('Pedido creado con éxito', 'exito');
      } catch (error) {
        console.error('Error creando pedido:', error);
        this.mostrarNotificacion('Error al crear el pedido', 'error');
      } finally {
        this.guardando = false;
      }
    },
    limpiarPedido() {
      this.nuevoPedido = {
        id_cliente: this.esCliente ? this.usuario.id : null,
        observacion: '',
        detalle: [],
      };
    },
    verDetallePedido(pedido) {
      this.pedidoSeleccionado = pedido;

      // Simular la carga del detalle del pedido
      // En una aplicación real, esto vendría de una API
      this.detallePedido = [
        {
          p_producto_id: 1,
          codigo: 'PROD001',
          nombre: 'Producto Uno',
          precio: 100.0,
          cantidad: 2,
        },
        {
          p_producto_id: 3,
          codigo: 'PROD003',
          nombre: 'Producto Tres',
          precio: 150.0,
          cantidad: 1,
        },
        {
          p_producto_id: 4,
          codigo: 'PROD004',
          nombre: 'Producto Cuatro',
          precio: 75.5,
          cantidad: 2,
        },
      ];

      this.mostrarModalDetalle = true;
    },
    generarUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    mostrarNotificacion(mensaje, tipo) {
      this.mensajeNotificacion = mensaje;
      this.mostrarNotificacion = true;

      setTimeout(() => {
        this.mostrarNotificacion = false;
      }, 3000);
    },
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
