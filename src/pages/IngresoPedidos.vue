<template>
  <div class="bg-gradiente-personal from-gray-50 to-orange-100">
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
            <div
              v-if="!datos_actualizados"
              role="alert"
              class="animate-pulse alert alert-warning"
            >
              <svg
                class="h-6 w-6 stroke-current"
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
              <a
                @click="$router.push('/ActualizacionCliente')"
                class="cursor-pointer text-sm"
                >Actualiza tus datos!</a
              >
            </div>
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
              <div v-if="!esCliente" class="form-control">
                <label class="label">
                  <span class="label-text text-sm text-gray-700"
                    >Seleccionar Fecha y Hora de entrega</span
                  >
                </label>

                <VDatePicker
                  v-model="fechaHora"
                  mode="dateTime"
                  class="bg-white"
                  is24hr
                  :popover="{ visibility: 'click' }"
                  :min-date="new Date()"
                  :rules="rules"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <div class="relative w-full text-sm">
                      <input
                        class="input input-bordered w-full text-sm pr-10 bg-white text-gray-700 border border-gray-400"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="Selecciona fecha y hora"
                        readonly
                      />
                      <!-- Icono de calendario -->
                      <svg
                        class="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </template>
                </VDatePicker>
              </div>
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
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Cliente *
                  </label>

                  <VueSelect
                    v-model="nuevoPedido.id_cliente"
                    :options="opcionesClientes"
                    label="texto"
                    :reduce="(cliente) => cliente.value"
                    placeholder="Buscar cliente..."
                    searchable
                    class="text-gray-700"
                    no-options-text="no cliente"
                  >
                    <template #option="{ texto }">
                      {{ texto }}
                    </template>
                    <template #no-options>
                      <span class="text-gray-700"
                        >No se encontraron clientes</span
                      >
                    </template>
                  </VueSelect>
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
                      <th
                        class="border border-gray-300 p-3 text-left text-gray-700"
                      >
                        Producto
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-700"
                      >
                        Precio Unitario
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-700"
                      >
                        Cantidad
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-700"
                      >
                        Subtotal
                      </th>
                      <th class="border border-gray-300 p-3 text-gray-700"></th>
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
                      <td
                        class="border border-gray-200 p-3 text-right text-gray-700"
                      >
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
                          <span class="w-8 text-center text-gray-700">{{
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
                        class="border border-gray-200 p-3 text-right font-medium text-gray-700"
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
                        class="border border-gray-200 p-3 text-right font-medium text-gray-700"
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
                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition flex items-center"
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

            <!-- Filtros de estado -->
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                @click="filtroEstado = 'todos'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  filtroEstado === 'todos'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Todos
              </button>
              <button
                @click="filtroEstado = 'en recepcion'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  filtroEstado === 'en recepcion'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                En Recepción
              </button>
              <button
                @click="filtroEstado = 'en preparacion'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  filtroEstado === 'en preparacion'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                En Preparación
              </button>
              <button
                @click="filtroEstado = 'listo'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  filtroEstado === 'listo'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Listos
              </button>
              <button
                @click="filtroEstado = 'entregado'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  filtroEstado === 'entregado'
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Entregados
              </button>
            </div>

            <!-- Sección de Pedidos Recién Ingresados -->
            <div v-if="pedidosPendientes.length > 0 && !esCliente" class="mb-8">
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 text-yellow-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Pedidos en Recepción ({{ pedidosPendientes.length }})
              </h3>
              <div class="grid gap-4 md:grid-cols-2">
                <div
                  v-for="pedido in pedidosPendientes"
                  :key="'pendiente-' + pedido.id_cliente_pedido"
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h4 class="font-semibold text-gray-900">
                        Pedido #{{ pedido.id_cliente_pedido }}
                      </h4>
                      <p class="text-sm text-gray-600">
                        {{ formatFecha(pedido.fecha_creacion) }}
                      </p>
                      <p
                        v-if="pedido.fecha_entrega || pedido.hora_entrega"
                        class="text-sm text-gray-500"
                      >
                        Fecha y hora de entrega:
                        {{
                          formatearFechaHoraEntrega(
                            pedido.fecha_entrega,
                            pedido.hora_entrega
                          )
                        }}
                      </p>

                      <p class="text-sm text-gray-600">
                        Cliente: {{ obtenerNombreCliente(pedido.id_cliente) }}
                      </p>
                    </div>
                    <span
                      class="px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full"
                    >
                      Pendiente
                    </span>
                  </div>
                  <p class="text-sm text-gray-700 mb-2">
                    {{ pedido.cantidad_productos }} producto(s) -
                    <span class="font-semibold">{{
                      formatoMoneda(pedido.valor_total)
                    }}</span>
                  </p>
                  <button
                    @click="verDetallePedido(pedido)"
                    class="w-full bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-700 transition"
                  >
                    Atender Pedido
                  </button>
                </div>
              </div>
            </div>

            <!-- Lista principal de pedidos -->
            <div class="space-y-4">
              <div
                v-for="pedido in pedidosPaginados"
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
                    <p
                      v-if="pedido.fecha_entrega || pedido.hora_entrega"
                      class="text-sm text-gray-500"
                    >
                      Fecha y hora aproximada entrega:
                      {{
                        formatearFechaHoraEntrega(
                          pedido.fecha_entrega,
                          pedido.hora_entrega
                        )
                      }}
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

            <!-- Paginación -->
            <div
              v-if="totalPaginas > 1"
              class="flex justify-center items-center mt-8 space-x-2"
            >
              <button
                @click="paginaActual--"
                :disabled="paginaActual === 1"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium',
                  paginaActual === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Anterior
              </button>

              <div class="flex space-x-1">
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
                <span v-if="mostrarPuntos" class="px-2 py-2">...</span>
              </div>

              <button
                @click="paginaActual++"
                :disabled="paginaActual === totalPaginas"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium',
                  paginaActual === totalPaginas
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                Siguiente
              </button>
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
    <!-- Modal Detalle Pedido -->
    <div
      v-if="mostrarModalDetalle"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div class="p-6 border-b border-gray-200 flex flex-row justify-between">
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
                <div v-if="!esCliente" class="mr-3">
                  <dt class="text-sm text-gray-500 mb-1">Asignar Estado:</dt>
                  <dd class="text-sm">
                    <select
                      v-model="id_estado_pedido"
                      class="px-1 py-1 rounded-full text-sm font-medium focus:outline-none"
                    >
                      <option value="">Seleccione un estado</option>
                      <option
                        v-for="estado in estadosPedido"
                        :key="estado.id_estado_pedido"
                        :value="estado.id_estado_pedido"
                      >
                        {{ estado.estado_pedido }}
                      </option>
                    </select>
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
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-700"
                  >
                    Producto
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-right text-gray-700"
                  >
                    Precio Unitario
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-right text-gray-700"
                  >
                    Cantidad
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-right text-gray-700"
                  >
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
                  <td
                    class="border border-gray-200 p-3 text-right text-gray-700"
                  >
                    {{ formatoMoneda(item.precio) }}
                  </td>
                  <td
                    class="border border-gray-200 p-3 text-right text-gray-700"
                  >
                    {{ item.cantidad }}
                  </td>
                  <td
                    class="border border-gray-200 p-3 text-right font-medium text-gray-700"
                  >
                    {{ formatoMoneda(item.cantidad * item.precio) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colspan="3"
                    class="border border-gray-200 p-3 text-right font-medium text-gray-700"
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
        <div
          class="flex flex-row gap-3 justify-between border-t border-gray-200"
        >
          <div class="p-6 flex justify-end">
            <button
              @click="mostrarModalDetalle = false"
              class="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Cerrar
            </button>
          </div>
          <div v-if="!esCliente" class="p-6 flex justify-end">
            <button
              @click="guardarCambio(pedidoSeleccionado)"
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Confirmar Cambio
            </button>
          </div>
        </div>
      </div>
    </div>

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
              @input="resetearPaginacionProductos"
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

          <!-- Información de resultados -->
          <div
            class="flex justify-between items-center mb-4 text-sm text-gray-500"
          >
            <span>
              Mostrando {{ productosPaginados.length }} de
              {{ productosFiltrados.length }} productos
            </span>
            <span>
              Página {{ paginaActualProductos }} de {{ totalPaginasProductos }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="producto in productosPaginados"
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

          <!-- Paginación -->
          <div
            v-if="totalPaginasProductos > 1"
            class="flex justify-center items-center mt-6 space-x-2"
          >
            <button
              @click="paginaActualProductos--"
              :disabled="paginaActualProductos === 1"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium',
                paginaActualProductos === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div class="flex space-x-1">
              <button
                v-for="pagina in paginasMostradasProductos"
                :key="pagina"
                @click="paginaActualProductos = pagina"
                :class="[
                  'w-8 h-8 rounded-lg text-sm font-medium',
                  pagina === paginaActualProductos
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                {{ pagina }}
              </button>
              <span v-if="mostrarPuntosProductos" class="px-2 py-2">...</span>
            </div>

            <button
              @click="paginaActualProductos++"
              :disabled="paginaActualProductos === totalPaginasProductos"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium',
                paginaActualProductos === totalPaginasProductos
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- Selector de items por página -->
          <div
            v-if="productosFiltrados.length > 0"
            class="flex items-center justify-end mt-4 space-x-2"
          >
            <span class="text-sm text-gray-500">Mostrar:</span>
            <select
              v-model="itemsPorPaginaProductos"
              @change="paginaActualProductos = 1"
              class="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="20">20</option>
            </select>
            <span class="text-sm text-gray-500">productos por página</span>
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
  </div>
</template>

<script>
import VueSelect from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
import {
  obtenerHoraParaBackend,
  fechaParaBackend,
  fechaParaBackendLocal,
  numeroHoraABackend,
  formatearFechaLegible,
  formatearFechaHoraEntrega,
  formatearHoraLegible,
  formatearHora,
} from '../helper/utils.js';
import { api } from '../axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';

// Iconos para las pestañas
const NewOrderIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`,
};

const HistoryIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>`,
};

export default {
  name: 'GestionPedidos',
  components: {
    VueSelect,
  },
  data() {
    return {
      rules: {
        hours: (hour) => {
          const ahora = new Date();
          const fechaSeleccion = this.fechaHora;

          const esHoy =
            fechaSeleccion.getFullYear() === ahora.getFullYear() &&
            fechaSeleccion.getMonth() === ahora.getMonth() &&
            fechaSeleccion.getDate() === ahora.getDate();

          if (esHoy && hour < ahora.getHours()) return false;

          const horasPermitidas = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ];
          return horasPermitidas.includes(hour);
        },
      },
      fechaHora: new Date(),
      paginaActualProductos: 1,
      itemsPorPaginaProductos: 8,
      filtroEstado: 'todos',
      paginaActual: 1,
      id_estado_pedido: '',
      itemsPorPagina: 3,
      tab: 'nuevo',
      esCliente: false,
      usuario: {
        id: 0,
        nombre: '',
        email: '',
        esEmpleado: false,
      },
      clientes: [],
      productos: [],
      estadosPedido: [],
      pedidos: [],
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
      datos_actualizados: true,
      pedidoSeleccionado: {},
      guardando: false,
      mostrarNotificacion: false,
      tabs: [
        { id: 'nuevo', label: 'Nuevo Pedido', icon: NewOrderIcon },
        { id: 'historial', label: 'Historial', icon: HistoryIcon, count: 0 },
      ],
    };
  },
  computed: {
    opcionesClientes() {
      const opciones = [{ value: 'anonimo', texto: 'Cliente Anónimo' }];

      return opciones.concat(
        this.clientes.map((cliente) => ({
          value: cliente.id_cliente,
          texto: `${cliente.nombre} - ${cliente.correo}`,
        }))
      );
    },
    pedidosFiltrados() {
      let pedidos = this.pedidos;

      if (this.filtroPedidos) {
        const busqueda = this.filtroPedidos.toLowerCase();
        pedidos = pedidos.filter(
          (pedido) =>
            pedido.id_cliente_pedido.toString().includes(busqueda) ||
            this.obtenerNombreCliente(pedido.id_cliente)
              .toLowerCase()
              .includes(busqueda)
        );
      }
      if (this.filtroEstado !== 'todos') {
        pedidos = pedidos.filter((pedido) => {
          const estado = this.obtenerNombreEstado(
            pedido.id_estado_pedido
          ).toLowerCase();
          return estado.includes(this.filtroEstado);
        });
      }
      return pedidos;
    },
    productosFiltrados() {
      if (!this.filtroProductos) return this.productos;

      return this.productos.filter((producto) => {
        const searchTerm = this.filtroProductos.toLowerCase();
        return (
          producto.nombre?.toLowerCase().includes(searchTerm) ||
          producto.codigo?.toLowerCase().includes(searchTerm) ||
          producto.descripcion?.toLowerCase().includes(searchTerm)
        );
      });
    },
    totalPaginasProductos() {
      return Math.ceil(
        this.productosFiltrados.length / this.itemsPorPaginaProductos
      );
    },

    productosPaginados() {
      const start =
        (this.paginaActualProductos - 1) * this.itemsPorPaginaProductos;
      const end = start + this.itemsPorPaginaProductos;
      return this.productosFiltrados.slice(start, end);
    },

    paginasMostradasProductos() {
      const paginas = [];
      const maxPaginas = 5;

      let start = Math.max(
        1,
        this.paginaActualProductos - Math.floor(maxPaginas / 2)
      );
      let end = Math.min(this.totalPaginasProductos, start + maxPaginas - 1);

      if (end - start + 1 < maxPaginas) {
        start = Math.max(1, end - maxPaginas + 1);
      }

      for (let i = start; i <= end; i++) {
        paginas.push(i);
      }

      return paginas;
    },

    mostrarPuntosProductos() {
      return this.totalPaginasProductos > this.paginasMostradasProductos.length;
    },
    totalPaginas() {
      return Math.ceil(this.pedidosFiltrados.length / this.itemsPorPagina);
    },

    pedidosPaginados() {
      const start = (this.paginaActual - 1) * this.itemsPorPagina;
      const end = start + this.itemsPorPagina;
      return this.pedidosFiltrados.slice(start, end);
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

    mostrarPuntos() {
      return this.totalPaginas > this.paginasMostradas.length;
    },
    pedidosPendientes() {
      return this.pedidosFiltrados.filter((pedido) =>
        this.obtenerNombreEstado(pedido.id_estado_pedido)
          .toLowerCase()
          .includes('en recepcion')
      );
    },
    totalPedido() {
      return this.nuevoPedido.detalle.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
      );
    },
  },
  mounted() {
    this.cargarProductos();
    this.obtenerClientes();
    this.obtenerPedidos();
    this.obtenerEstadosPedido();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.rol === 'CLIENTE') this.esCliente = true;
    if (this.esCliente) {
      this.nuevoPedido.id_cliente = this.usuario.id;
      this.usuario = {
        id: usuario.id,
        nombre: usuario.correo,
        email: usuario.correo,
        esEmpleado: false,
      };
      this.clienteDebeActualizar(usuario.correo);
    }
    const carrito = JSON.parse(this.$route.query.carrito || '[]');
    carrito.forEach((a) => {
      const productoDesdeCarrito = {
        p_producto_id: a.p_producto_Id,
        codigo: a.codigo,
        nombre: a.nombre,
        precio: a.precio,
        cantidad: a.cantidad,
      };
      this.agregarProducto(productoDesdeCarrito);
    });
  },
  methods: {
    async clienteDebeActualizar(correo) {
      try {
        const apiActualizacion =
          await api.v1.venta.clienteDebeActualizar(correo);
        this.datos_actualizados = apiActualizacion.data.datos_actualizados;
      } catch (error) {
        console.error('Error al obtner actualizacion');
      }
    },
    formatearFechaHoraEntrega(fecha, hora) {
      return formatearFechaHoraEntrega(fecha, hora);
    },
    formatearFechaHoraLegible(fecha, hora) {
      return formatearFechaHoraLegible(fecha, hora);
    },
    formatearFechaLegible(fecha) {
      return formatearFechaLegible(fecha);
    },
    formatearHoraLegible(fecha) {
      return formatearHoraLegible(fecha);
    },
    async obtenerPedidos() {
      try {
        const pedidosApi = await api.v1.venta.obtenerPedidos();
        this.pedidos = pedidosApi.data.pedidos;
        const cantidad = this.tabs.find((a) => a.id === 'historial');
        cantidad.count = this.pedidos.length;
      } catch (error) {
        this.mostrarAlertaError('error al obtener pedidos');
      }
    },
    async cargarProductos() {
      try {
        const productosApi = await api.v1.venta.obtenerProductosPedido();
        this.productos = productosApi.data.productos;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar productos');
      }
    },
    resetearPaginacionProductos() {
      this.paginaActualProductos = 1;
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async obtenerEstadosPedido() {
      try {
        const estadosAPi = await api.v1.venta.obtenerEstadosPedido();
        this.estadosPedido = estadosAPi.data.estados;
      } catch (error) {
        this.mostrarAlertaError('Error al traer estados del pedido');
      }
    },
    async obtenerClientes() {
      try {
        const clientesAPi = await api.v1.venta.obtnerClientes();
        this.clientes = clientesAPi.data.clientes;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar clientes');
      }
    },
    async guardarCambio(pedidoSeleccionado) {
      try {
        if (this.id_estado_pedido === '')
          return this.mostrarAlertaError('Seleccione un estado');
        const payloadCambio = {
          id_cliente_pedido: pedidoSeleccionado.id_cliente_pedido,
          id_estado_pedido: this.id_estado_pedido,
        };
        const guardarCambioAPi =
          await api.v1.venta.actualizarEstadoPedido(payloadCambio);
        if (guardarCambioAPi.status > 400) {
          return this.mostrarAlertaError('No se pudo realizar el cambio');
        }
        this.mostrarAlertaExito('Cambio guardado');
        pedidoSeleccionado.id_estado_pedido = this.id_estado_pedido;
        this.id_estado_pedido = '';
        this.mostrarModalDetalle = false;
      } catch (error) {
        this.mostrarAlertaError('Error al guardar cambio');
      }
    },
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
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
      return estado?.clase ? estado.clase : 'bg-gray-800 text-white';
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
          cantidad: producto?.cantidad ?? 1,
        });
      }
      this.mostrarAlertaExito('Producto agregado al pedido');
    },
    eliminarProducto(index) {
      this.nuevoPedido.detalle.splice(index, 1);
    },
    async crearPedido() {
      this.guardando = true;
      console.log(this.fechaHora);
      const fechaParaBackendHora = formatearHora(this.fechaHora);
      const fechaParaBackendposjpra2 = obtenerHoraParaBackend(this.fechaHora);
      const fechaHoraEntrega = fechaParaBackendLocal(this.fechaHora);
      const timestamp = fechaParaBackend(this.fechaHora, 'timestamp');
      const isoString = fechaParaBackend(this.fechaHora, 'iso');
      /*console.log('fecha', fecuita);
      console.log('Timestamp para backend:', timestamp);
      console.log(new Date());
      console.log('ISO string para backend:', isoString);
      console.log('Original:', this.fechaHora);
      console.log('Formateada para backend:', fechaParaBackendHora);
      console.log('Formateada para backend3:', fechaParaBackendposjpra2);*/
      // return false;
      try {
        const nuevoPedido = {
          id_cliente_pedido:
            Math.max(...this.pedidos.map((p) => p.id_cliente_pedido), 0) + 1,
          fecha_creacion: new Date().toISOString().split('T')[0],
          id_cliente: this.esCliente
            ? this.usuario.id
            : this.nuevoPedido.id_cliente,
          id_estado_pedido: 1,
          observacion: this.nuevoPedido.observacion,
          fecha_entrega: this.esCliente ? null : fechaHoraEntrega,
          valor_total: this.totalPedido,
          cantidad_productos: this.nuevoPedido.detalle.reduce(
            (sum, item) => sum + item.cantidad,
            0
          ),
          productos: this.nuevoPedido.detalle,
          UID_PEDIDO: this.generarUID(),
          id_estado_registro: true,
          id_usuario_creacion: this.usuario.id,
        };
        const creaPedido = await api.v1.venta.crearPedido(nuevoPedido);
        if (creaPedido.data?.pedido) {
          this.pedidos.unshift(nuevoPedido);

          //Actualizar el contador de la pestaña de histroil
          this.tabs[1].count = this.pedidos.length;

          // Limpiar el formulario
          this.limpiarPedido();
          this.tab = 'historial';
          this.mostrarAlertaExito('Pedido creado con exito');
        }
      } catch (error) {
        console.error('Error creando pedido:', error);
        this.mostrarAlertaError(
          error.response.data.mensaje || 'Error al crear pedido'
        );
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
    async verDetallePedido(pedido) {
      try {
        const detallePedidoAPi = await api.v1.venta.obtenerDetallePedido(
          pedido.id_cliente_pedido
        );
        this.detallePedido = detallePedidoAPi.data.detalles;
        this.pedidoSeleccionado = pedido;
        this.mostrarModalDetalle = true;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar detalles de pedido');
      }
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
