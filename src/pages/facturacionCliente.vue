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
                Ingreso de Facturas Clientes
              </h1>
              <p class="text-sm text-gray-600">
                Registrar ventas a traves de facturas
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
            <div class="flex flex-row justify-between mb-5">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                Datos de la Factura
              </h2>
              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-700">
                  Estado factura
                </label>
                <select
                  v-model="factura.id_estado_factura"
                  :disabled="bloquearCampos"
                  class="disabled:bg-slate-600 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.id_estado_factura }"
                >
                  <option value="" disabled>Seleccione un estado</option>
                  <option
                    v-for="estado in estadosFactura"
                    :key="estado.id_estado_factura"
                    :value="estado.id_estado_factura"
                  >
                    {{ estado.estado }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">


              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Fecha Emisión*</label
                >
                <input
                  v-model="factura.fecha"
                  type="date"
                  :disabled="true"
                  class="disabled:bg-gray-600 disabled:cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  v-model="factura.fechaVencimiento"
                  type="date"
                  :disable="bloquearCampos"
                  class="disabled:bg-slate-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.fechaVencimiento }"
                />
                <p
                  v-if="errores.fechaVencimiento"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errores.fechaVencimiento }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tipo de pago</label
                >
                <select
                  v-model="factura.id_tipo_pago"
                  :disabled="bloquearCampos"
                  class="disabled:bg-slate-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  :class="{ 'border-red-500': errores.id_tipo_pago }"
                >
                  <option value="" disabled>Seleccione un tipo de pago</option>
                  <option
                    v-for="tipopago in tiposDePago"
                    :key="tipopago.id_tipo_pago"
                    :value="tipopago.id_tipo_pago"
                  >
                    {{ tipopago.descripcion_pago }}
                  </option>
                </select>
                <p
                  v-if="errores.id_tipo_pago"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errores.id_tipo_pago }}
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
                    <!-- Producto -->
                    <td class="border border-gray-200 p-3">
                      <select
                        v-model="item.p_producto_Id"
                        :disabled="bloquearCampos"
                        class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        @change="asignarPrecio(item)"
                      >
                        <option disabled value="">
                          Seleccione un producto
                        </option>
                        <option
                          v-for="producto in productos"
                          :key="producto.p_producto_Id"
                          :value="producto.p_producto_Id"
                        >
                          {{ producto.nombre }}
                        </option>
                      </select>
                    </td>

                    <!-- Cantidad -->
                    <td class="border border-gray-200 p-3">
                      <input
                        v-model.number="item.cantidad"
                        type="number"
                        :disabled="bloquearCampos"
                        min="1"
                        class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                        @change="validarCantidad(index, item)"
                      />
                    </td>

                    <!-- Precio Unitario -->
                    <td class="border border-gray-200 p-3">
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >Q</span
                        >
                        <input
                          v-model.number="item.precio"
                          :disabled="bloquearCampos"
                          type="number"
                          step="0.01"
                          min="0"
                          class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 pl-8 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                          @change="validarPrecio(index, item)"
                        />
                      </div>
                    </td>

                    <!-- Subtotal -->
                    <td
                      class="border border-gray-200 p-3 text-right font-medium text-gray-700"
                    >
                      {{ formatoMoneda(item.cantidad * item.precio) }}
                    </td>

                    <!-- Descuento -->
                    <td class="border border-gray-200 p-3">
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >Q</span
                        >
                        <input
                          v-model.number="item.descuento"
                          type="number"
                          :disabled="bloquearCampos"
                          min="0"
                          class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                          @change="actualizarTotal(item)"
                        />
                      </div>
                    </td>

                    <!-- Es Lote -->
                    <td class="border border-gray-200 p-3 text-center">
                      <input type="checkbox" v-model="item.esLote" />
                    </td>

                    <!-- Precio Lote -->
                    <td class="border border-gray-200 p-3">
                      <input
                        :disabled="!item.esLote || bloquearCampos"
                        v-model.number="item.precioLote"
                        type="number"
                        min="0"
                        class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </td>

                    <!-- Total -->
                    <td
                      class="border border-gray-200 p-3 text-right font-medium text-gray-700"
                    >
                      {{ formatoMoneda(item.total ?? 0) }}
                    </td>

                    <!-- Acciones -->
                    <td class="border border-gray-200 p-3 text-center">
                      <button
                        @click="confirmarEliminacion(index)"
                        :disabled="bloquearCampos"
                        class="disabled:text-gray-700 text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
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

                  <!-- Cuando no hay productos -->
                  <tr v-if="factura.detalle.length === 0">
                    <td
                      colspan="9"
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
              :disabled="!isNumber(factura.proveedor) || bloquearCampos"
              @click="agregarItem"
              class="disabled:bg-slate-500 mt-4 flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
              :disabled="guardando || bloquearCampos"
              class="disabled:bg-slate-600 flex items-center justify-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg
                v-if="guardando"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              {{
                guardando
                  ? 'Procesando...'
                  : editar
                    ? 'Actulizar Factura'
                    : 'Guardar Factura'
              }}
            </button>
          </div>
        </div>
        <div v-if="tab === 'HFactura'" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              Historial de Facturas
            </h2>

            <!-- Filtros -->
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input
                  v-model="filtroBusqueda"
                  type="text"
                  placeholder="Buscar por número o serie..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <svg
                  class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
                v-model="filtroEstado"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                <option
                  v-for="estado in estadosFactura"
                  :key="estado.id_estado_factura"
                  :value="estado.id_estado_factura"
                >
                  {{ estado.estado }}
                </option>
              </select>
            </div>
          </div>

          <!-- Tabla de Historial -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Número
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Serie
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Proveedor
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha Emisión
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo Pago
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Productos
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
                  v-for="factura in facturasFiltradas"
                  :key="factura.id"
                  class="hover:bg-gray-50"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ factura.numero }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ factura.serie }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ obtenerNombreProveedor(factura.proveedor) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatoFecha(factura.fecha) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        factura.id_estado_factura === 1
                          ? 'bg-green-100 text-green-800'
                          : factura.id_estado_factura === 2
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800',
                      ]"
                    >
                      {{ obtenerEstadoFactura(factura.id_estado_factura) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ obtenerTipoPago(factura.id_tipo_pago) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ factura.detalle ? factura.detalle.length : 0 }}
                      productos
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="verDetalleFactura(factura)"
                      class="text-orange-600 hover:text-orange-900 mr-3"
                      title="Ver detalle"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="borrarFactura(factura)"
                      class="text-red-600 hover:text-red-800 mr-3"
                      title="Ver detalle"
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
                    <button
                      @click="descargarFactura(factura)"
                      class="text-green-600 hover:text-green-900"
                      title="Descargar"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>

                <!-- Mensaje cuando no hay resultados -->
                <tr v-if="facturasFiltradas.length === 0">
                  <td
                    colspan="8"
                    class="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No se encontraron facturas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Paginación -->
          <div
            class="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
          >
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando
                  <span class="font-medium">{{
                    (paginaActual - 1) * itemsPorPagina + 1
                  }}</span>
                  a
                  <span class="font-medium">{{
                    Math.min(
                      paginaActual * itemsPorPagina,
                      historialFacturas.length
                    )
                  }}</span>
                  de
                  <span class="font-medium">{{
                    historialFacturas.length
                  }}</span>
                  resultados
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    @click="paginaActual--"
                    :disabled="paginaActual === 1"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                      paginaActual === 1 ? 'opacity-50 cursor-not-allowed' : '',
                    ]"
                  >
                    <span class="sr-only">Anterior</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-for="page in paginasTotales"
                    :key="page"
                    @click="paginaActual = page"
                    :class="[
                      page === paginaActual
                        ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    ]"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="paginaActual++"
                    :disabled="paginaActual === paginasTotales"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                      paginaActual === paginasTotales
                        ? 'opacity-50 cursor-not-allowed'
                        : '',
                    ]"
                  >
                    <span class="sr-only">Siguiente</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Modal
      v-model:abierto="modalAbierto"
      :titulo="'¿Está seguro de eliminar la factura? Esta acción NO AFECTARA las cantidades de productos en el inventario.'"
      :botones="botonesModal"
      orientacion="horizontal"
      @accion="handleAccion"
    >
      <template #contenido>
        <p class="text-gray-600 text-sm mb-2"></p>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/modal.vue';
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
import { useAuthStore } from '../stores/auth.js';
const TypeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`,
};
const OfferIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
};

export default {
  name: 'IngresoFactura',
  components: { Modal },
  data() {
    return {
      modalAbierto: false,
      botonesModal: [],
      historialFacturas: [],
      filtroBusqueda: '',
      filtroEstado: '',
      paginaActual: 1,
      itemsPorPagina: 10,
      tiposDePago: [],
      productos: [],
      estadosFactura: [],
      editar: false,
      bloquearCampos: false,
      tabs: [
        { id: 'IFactura', label: 'Ingreso Factura', icon: TypeIcon },
        { id: 'HFactura', label: 'Historial Facturas', icon: OfferIcon },
      ],
      tab: 'HFactura',
      factura: {
        total: '',
        id_estado_factura: '',
        proveedor: '',
        numero: '',
        serie: '',
        fecha: new Date().toISOString().split('T')[0],
        fechaVencimiento: new Date().toISOString().split('T')[0],
        detalle: [],
        id_tipo_pago: '',
      },
      errores: {
        proveedor: '',
        numero: '',
        fecha: '',
      },
      mensaje: {
        texto: '',
        tipo: '',
      },
      guardando: false,
    };
  },
  computed: {
    totalFactura() {
      return this.factura.detalle.reduce(
        (acc, item) => acc + item.cantidad * item.precio - item.descuento,
        0
      );
    },
    facturasFiltradas() {
      let filtered = this.historialFacturas;

      if (this.filtroBusqueda) {
        const searchTerm = this.filtroBusqueda.toLowerCase();
        filtered = filtered.filter(
          (factura) =>
            factura.numero.toLowerCase().includes(searchTerm) ||
            factura.serie.toLowerCase().includes(searchTerm)
        );
      }
      if (this.filtroEstado) {
        filtered = filtered.filter(
          (factura) => factura.id_estado_factura == this.filtroEstado
        );
      }
      const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
      return filtered.slice(startIndex, startIndex + this.itemsPorPagina);
    },
    paginasTotales() {
      return Math.ceil(this.historialFacturas.length / this.itemsPorPagina);
    },
  },
  watch: {
    'factura.proveedor': {
      async handler(proveedor) {
        await this.obtenerProductosPorProveedor(proveedor);
      },
    },
    modalAbierto: {
      handler(valor) {
        if (!valor) {
          facturaStore.cerrarModal();
        }
      },
    },
  },
  methods: {
    async handleAccion(btn) {
      if (btn.botonEjectuado === 'borrar') {
        console.log('borrando');
        console.log(facturaStore.facturaSeleccionada.id_factura);
        try {
          const borrar = await api.v1.inventario.borrarFacturayDetalle(
            facturaStore.facturaSeleccionada.id_factura
          );
          facturaStore.cerrarModal();
          this.cargarHistorialFacturas();
          this.mostrarAlertaExito('Factura y detalles borrados');
        } catch (error) {
          facturaStore.cerrarModal();
          this.mostrarAlertaError('Factura no pudo ser borrada');
        }
      } else if (btn.botonEjectuado === 'cancelar') {
        facturaStore.cerrarModal();
      }
    },
    cargarBotonesModal() {
      this.botonesModal = [
        {
          texto: 'Aceptar',
          color: 'bg-secondary',
          mostrar: true,
          botonEjectuado: 'borrar',
          hoverColor: 'hover:bg-yellow-600',
          textColor: 'text-white',
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
        {
          texto: 'Cancelar',
          botonEjectuado: 'cancelar',
          color: 'bg-gray-200', // gris neutro
          mostrar: true,
          hoverColor: 'hover:bg-gray-400',
          textColor: 'text-gray-800', // texto más oscuro pero menos llamativo
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
      ];
    },
    obtenerNombreProveedor(idProveedor) {
      const proveedor = this.proveedores.find((p) => p.id === idProveedor);
      return proveedor ? proveedor.nombre_proveedor : 'Desconocido';
    },
    obtenerEstadoFactura(idEstado) {
      const estado = this.estadosFactura.find(
        (e) => e.id_estado_factura === idEstado
      );
      return estado ? estado.estado : 'Desconocido';
    },
    obtenerTipoPago(idTipoPago) {
      const tipoPago = this.tiposDePago.find(
        (t) => t.id_tipo_pago === idTipoPago
      );
      return tipoPago ? tipoPago.descripcion_pago : 'Desconocido';
    },
    formatoFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES');
    },
    borrarFactura(factura) {
      this.modalAbierto = true;
      facturaStore.guardarFactura(factura);
    },
    verDetalleFactura(factura) {
      this.factura = factura;
      this.tab = 'IFactura';
      if (factura.estado_factura.toLowerCase() === 'borrador') {
        this.editar = true;
      } else {
        this.bloquearCampos = true;
        this.mostrarAlertaExito('solo podra ver la factura no editar');
      }
    },
    descargarFactura(factura) {
      const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura ${factura.serie}-${factura.numero}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
      
      :root {
        --primary-color: #2c3e50;
        --secondary-color: #3498db;
        --accent-color: #e74c3c;
        --light-bg: #f9f9f9;
        --border-color: #ddd;
        --text-color: #333;
        --success-color: #27ae60;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Roboto', sans-serif;
        color: var(--text-color);
        background-color: #fff;
        line-height: 1.6;
        padding: 30px;
        max-width: 1000px;
        margin: 0 auto;
      }
      
      .invoice-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        padding: 40px;
        margin: 20px 0;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid var(--border-color);
      }
      
      .company-info {
        flex: 2;
      }
      
      .invoice-info {
        flex: 1;
        text-align: right;
      }
      
      .logo {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 10px;
      }
      
      .invoice-title {
        font-size: 28px;
        color: var(--primary-color);
        margin-bottom: 5px;
      }
      
      .invoice-number {
        font-size: 18px;
        color: #777;
      }
      
      .status-badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        margin-top: 10px;
        background-color: ${factura.estado_factura === 'Pagada' ? 'var(--success-color)' : 'var(--accent-color)'};
        color: white;
      }
      
      .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }
      
      .detail-card {
        background: var(--light-bg);
        padding: 15px;
        border-radius: 8px;
        border-left: 4px solid var(--secondary-color);
      }
      
      .detail-card h3 {
        font-size: 14px;
        text-transform: uppercase;
        color: #777;
        margin-bottom: 8px;
      }
      
      .detail-card p {
        font-size: 16px;
        font-weight: 500;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 25px 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
      }
      
      thead {
        background-color: var(--primary-color);
        color: white;
      }
      
      th {
        padding: 15px;
        text-align: left;
        font-weight: 500;
      }
      
      td {
        padding: 15px;
        border-bottom: 1px solid var(--border-color);
      }
      
      tbody tr:hover {
        background-color: rgba(52, 152, 219, 0.05);
      }
      
      tfoot {
        background-color: var(--light-bg);
        font-weight: bold;
      }
      
      tfoot td {
        border-bottom: none;
        font-size: 16px;
      }
      
      .total-row {
        color: var(--primary-color);
        font-size: 18px;
      }
      
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
        text-align: center;
        color: #777;
        font-size: 14px;
      }
      
      @media (max-width: 768px) {
        body {
          padding: 15px;
        }
        
        .invoice-container {
          padding: 20px;
        }
        
        .header {
          flex-direction: column;
        }
        
        .invoice-info {
          text-align: left;
          margin-top: 20px;
        }
        
        .details-grid {
          grid-template-columns: 1fr;
        }
        
        table {
          font-size: 14px;
        }
        
        th, td {
          padding: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <div class="header">
        <div class="company-info">
          <div class="logo">Libreria SHALAH</div>
          <p>Dirección de la empresa</p>
          <p>Guatemala, Guatemala</p>
          <p>Teléfono: 5500550</p>
          <p>Email: info@miempresa.com</p>
        </div>
        
        <div class="invoice-info">
          <h1 class="invoice-title">FACTURA</h1>
          <p class="invoice-number">${factura.serie}-${factura.numero}</p>
          <div class="status-badge">${factura.estado_factura}</div>
        </div>
      </div>
      
      <div class="details-grid">
        <div class="detail-card">
          <h3>Fecha de emisión</h3>
          <p>${new Date(factura.fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>
        
        <div class="detail-card">
          <h3>Método de pago</h3>
          <p>${factura.tipo_pago}</p>
        </div>
        
        <div class="detail-card">
          <h3>Proveedor</h3>
          <p>${factura.proveedorNombre}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${factura.detalle
            .map(
              (item) => `
             <tr>
              <td>${item.codigo || '-'}</td>
              <td>${item.nombre || '-'}</td>
              <td>${item.cantidad}</td>
              <td>${Number(item.precio).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ',
              })}</td>
              <td>${Number(item.descuento).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ',
              })}</td>
              <td>${Number(item.total).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ',
              })}</td>
            </tr>
            `
            )
            .join('')}
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="5" style="text-align: right;">TOTAL</td>
            <td>${factura.detalle
              .reduce((acc, item) => acc + Number(item.total), 0)
              .toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ',
              })}</td>
          </tr>
        </tfoot>
      </table>
      
      <div class="footer">
        <p>Gracias por su preferencia</p>
        <p>Para cualquier consulta, contacte a: soporte@miempresa.com</p>
      </div>
    </div>
  </body>
  </html>
`;

      // Crear un Blob con el contenido HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });

      // Crear un enlace temporal para descargar
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Factura_${factura.serie}-${factura.numero}.html`;
      link.click();

      // Liberar memoria
      URL.revokeObjectURL(link.href);
    },
    async cargarHistorialFacturas() {
      try {
        this.historialFacturas = [];
        const facturaHistorial =
          await api.v1.inventario.obtenerMovimientosInventario();
        this.historialFacturas = facturaHistorial.data.data;
      } catch (error) {
        this.mostrarAlertaError('Error al cargar Historial de facturas');
      }
    },

    asignarPrecio(item) {
      const producto = this.productos.find(
        (p) => p.p_producto_Id === item.p_producto_Id
      );
      if (producto) {
        item.precio = Number(producto.precioCompra);
        this.actualizarTotal(item);
      }
    },
    actualizarTotal(item) {
      const subtotal = (item.cantidad || 0) * (item.precio || 0);
      const descuento = item.descuento || 0;
      item.total = subtotal - descuento;
    },
    isNumber(value) {
      return !isNaN(parseInt(value)) && value !== '';
    },
    async obtenerProductosPorProveedor(proveedor) {
      try {
        console.log(proveedor);
        const productos =
          await api.v1.inventario.obtenerProductosPorProveedor(proveedor);
        this.productos = productos.data.productos;
      } catch (error) {
        this.mostrarAlertaError('Error al obtener productos');
      }
    },
    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
        minimumFractionDigits: 2,
      }).format(valor);
    },
    agregarItem() {
      this.factura.detalle.push({
        p_producto_Id: '',
        codigo: '',
        nombre: '',
        cantidad: 1,
        precio: 0,
        descuento: 0,
      });
    },
    confirmarEliminacion(index) {
      this.eliminarItem(index);
      this.mostrarAlertaExito('linea producto borrada');
    },
    eliminarItem(index) {
      this.factura.detalle.splice(index, 1);
    },
    validarCantidad(index, item) {
      this.actualizarTotal(item);
      if (this.factura.detalle[index].cantidad < 1) {
        this.factura.detalle[index].cantidad = 1;
      }
    },
    validarPrecio(index, item) {
      this.actualizarTotal(item);
      if (this.factura.detalle[index].precio < 0) {
        this.factura.detalle[index].precio = 0;
      }
    },
    validarFormulario() {
      let valido = true;
      this.errores = {
        id_estado_factura: '',
        proveedor: '',
        numero: '',
        serie: '',
        id_tipo_pago: '',
      };

      if (!this.isNumber(this.factura.proveedor)) {
        this.errores.proveedor = 'El proveedor es obligatorio';
        valido = false;
      }

      if (!this.isNumber(this.factura.id_estado_factura)) {
        this.errores.id_estado_factura =
          'El estado de la factura es obligatorio';
        valido = false;
      }

      if (!this.isNumber(this.factura.id_tipo_pago)) {
        this.errores.id_tipo_pago = 'El tipo de pago es obligatorio';
        valido = false;
      }

      if (!this.factura.numero.trim()) {
        this.errores.numero = 'El número de factura es obligatorio';
        valido = false;
      }

      if (!this.factura.serie.trim()) {
        this.errores.serie = 'El número de serie es obligatorio';
        valido = false;
      }

      if (this.factura.detalle.length === 0) {
        this.mostrarAlertaError('Debe agregar al menos un producto', 'error');
        valido = false;
      }

      for (let i = 0; i < this.factura.detalle.length; i++) {
        const item = this.factura.detalle[i];
        if (this.factura.detalle[i].p_producto_Id === '') {
          this.mostrarAlertaError(
            'No deben haber lineas de producto sin producto'
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
        this.factura.total = this.totalFactura;
        console.log('Factura guardada:', this.factura);
        const factura = await api.v1.inventario.agregarMovimientoProducto(
          this.factura
        );
        if (factura.data.ok) {
          this.guardando = false;
          this.mostrarAlertaExito(
            this.editar
              ? 'Factrua actualizada con exito'
              : 'Factrua guardada con exito'
          );
          this.limpiarFormulario();
          this.cargarHistorialFacturas();
          this.tab = 'HFactura';
        } else {
          this.mostrarAlertaError('Error al guardar la factura');
          this.guardando = false;
        }
      } catch (error) {
        this.mostrarAlertaError('Error al guardar la factura');
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

      this.editar = false;
      this.errores = {
        proveedor: '',
        numero: '',
        fecha: '',
      };
      this.mensaje.texto = '';
      if (this.bloquearCampos === true) {
        this.bloquearCampos = false;
        this.tab = 'HFactura';
      }
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
    async obtenerEstadosFactura() {
      try {
        const estadosFact = await api.v1.inventario.obtenerEstadosFactura();
        this.estadosFactura = estadosFact.data.estadosFactura;
      } catch (error) {
        console.log(error);
        this.mostrarAlertaError('Error al obtener estados factura');
      }
    },
    async obtenerMetodosDePago() {
      try {
        const tiposDePago = await api.v1.inventario.obtenerTiposPago();
        this.tiposDePago = tiposDePago.data.tiposPago;
        console.log(tiposDePago);
        console.log(this.tiposDePago);
      } catch (error) {
        console.log(error);
        this.mostrarAlertaError('Error al obtener tipos de pago');
      }
    },

    obtenerDatosIniciales() {
      this.obtenerEstadosFactura();
      this.obtenerMetodosDePago();
      this.obtenerProveedores();
    },
  },
  mounted() {
    this.cargarBotonesModal();
    this.cargarHistorialFacturas();
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
