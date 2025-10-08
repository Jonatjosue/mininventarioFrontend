<template>
  <div
    class="max-h-full min-w-full bg-gradiente-personal from-gray-50 to-orange-100 p-4"
  >
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
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
    <main class="mx-0 px-0 md:mx-10">
      <div class="bg-white rounded-2xl shadow-xl">
        <!-- Content -->

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex px-5">
            <button
              v-for="(tabItem, index) in tabs"
              :key="index"
              id="ingresoFactura"
              @click="tab = tabItem.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm flex items-center  transition',
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
          <!-- Datos de Factura -->
          <div class="p-6">
            <h2
              class="text-xl md:text-3xl font-semibold text-gray-900 mb-4 md:w-72"
            >
              Datos de la Factura
            </h2>
            <div
              class="flex flex-col md:flex-row justify-between mb-5 gap-2 md:gap-0"
            >
              <div class="flex flex-col md:flex-row m-0">
                <div
                  class="flex flex-col gap-0 items-start"
                  id="crearFacturaPor"
                >
                  <div>
                    <p class="text-black text-sm">Crear por:</p>
                  </div>

                  <label
                    class="relative inline-flex items-center cursor-pointer my-2"
                  >
                    <input
                      v-model="crearPorPedido"
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
                      >Pedido</span
                    >
                    <span
                      class="absolute right-3 top-1 text-xs font-semibold text-white opacity-100 peer-checked:opacity-0 transition-opacity duration-300"
                      >Factura Normal</span
                    >
                  </label>
                </div>
                <div v-if="crearPorPedido" class="md:ml-5" id="buscarPedido">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Buscar Pedido
                  </label>
                  <div class="flex">
                    <input
                      v-model="busquedaPedido"
                      @keyup.enter="buscarPedido"
                      type="text"
                      class="px-4 py-1 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ingrese número de pedido..."
                    />
                    <button
                      @click="buscarPedido"
                      class="bg-slate-200 rounded-e-lg pr-2 hover:shadow-lg"
                    >
                      <svg
                        class="w-6 h-6 text-gray-600 hover:text-gray-800 ml-2"
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
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  role="alert"
                  class="alert mt-0 md:mt-5 ml-2 md:ml-4 text-sm h-8 px-1 py-0 bg-slate-200 border border-gray-200 text-gray-700"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    class="stroke-info h-6 w-6 shrink-0"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span
                    >Busque un pedido existente o cree una factura sin
                    pedido.</span
                  >
                </div>
              </div>

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

            <div
              class="grid grid-cols-1 md:flex md:flex-row mb-5"
              id="llenarCampos"
            >
              <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5">
                <div>
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <fieldset class="fieldset relative w-full">
                    <input
                      v-model="factura.cliente"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ej: Juan..."
                    />
                    <div
                      v-if="errores.cliente"
                      class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                      :data-tip="errores.cliente"
                    ></div>
                  </fieldset>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Nit #
                  </label>
                  <fieldset class="fieldset relative w-full">
                    <input
                      v-model="factura.nit"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ej: 298986582."
                    />
                    <div
                      v-if="errores.nit"
                      class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                      :data-tip="errores.nit"
                    ></div>
                  </fieldset>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Direccion
                  </label>
                  <fieldset class="fieldset relative w-full">
                    <input
                      v-model="factura.direccion"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ej: Colonia las rosas."
                    />
                    <div
                      v-if="errores.direccion"
                      class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                      :data-tip="errores.direccion"
                    ></div>
                  </fieldset>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Telefono
                  </label>
                  <fieldset class="fieldset relative w-full">
                    <input
                      v-model="factura.telefono"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Ej: xxxxx-x455."
                    />
                    <div
                      v-if="errores.telefono"
                      class="tooltip tooltip-open tooltip-error absolute -top-0 right-1/4 transform -translate-x-1/2"
                      :data-tip="errores.telefono"
                    ></div>
                  </fieldset>
                </div>
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
          <!-- Detalle de Productos -->
          <div class="px-5 md:p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg md:text-xl font-semibold text-gray-900">
                Productos de la Factura
              </h2>
              <span class="text-sm text-gray-500"
                >{{ factura.detalle.length }} producto(s)</span
              >
            </div>

            <!-- Versión Desktop - Tabla -->
            <div
              class="hidden md:block relative border border-gray-300 rounded-lg bg-white"
            >
              <div class="overflow-x-auto">
                <table
                  class="min-w-full border-collapse border border-gray-200"
                >
                  <thead class="bg-gray-100">
                    <tr>
                      <th
                        class="border border-gray-300 p-3 text-left text-gray-600 whitespace-nowrap"
                      >
                        Producto
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-600 whitespace-nowrap"
                      >
                        Cantidad
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-600 whitespace-nowrap"
                      >
                        Precio Unitario
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-600 whitespace-nowrap"
                      >
                        Subtotal
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-600 whitespace-nowrap"
                      >
                        Descuento
                      </th>
                      <th
                        class="border border-gray-300 p-3 text-right text-gray-600 whitespace-nowrap"
                      >
                        Total
                      </th>
                      <th
                        class="border border-gray-300 p-3 whitespace-nowrap"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in factura.detalle" :key="index">
                      <!-- Producto -->
                      <td class="border border-gray-200 p-3 whitespace-nowrap">
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
                      <td class="border border-gray-200 p-3 whitespace-nowrap">
                        <input
                          v-model.number="item.cantidad"
                          type="number"
                          :disabled="bloquearCampos"
                          min="1"
                          class="disabled:bg-slate-600 w-24 border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                          @change="validarCantidad(index, item)"
                        />
                      </td>

                      <!-- Precio Unitario -->
                      <td class="border border-gray-200 p-3 whitespace-nowrap">
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
                            class="disabled:bg-slate-600 w-32 border border-gray-300 rounded px-3 py-2 pl-8 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                            @change="validarPrecio(index, item)"
                          />
                        </div>
                      </td>

                      <!-- Subtotal -->
                      <td
                        class="border border-gray-200 p-3 text-right font-medium text-gray-700 whitespace-nowrap"
                      >
                        {{ formatoMoneda(item.cantidad * item.precio) }}
                      </td>

                      <!-- Descuento -->
                      <td class="border border-gray-200 p-3 whitespace-nowrap">
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
                            class="disabled:bg-slate-600 w-24 border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                            @change="actualizarTotal(item)"
                          />
                        </div>
                      </td>

                      <!-- Total -->
                      <td
                        class="border border-gray-200 p-3 text-right font-medium text-gray-700 whitespace-nowrap"
                      >
                        {{ formatoMoneda(item.total ?? 0) }}
                      </td>

                      <!-- Acciones -->
                      <td
                        class="border border-gray-200 p-3 text-center whitespace-nowrap"
                      >
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
                        No hay productos agregados. Haz clic en "Agregar
                        Producto" para comenzar.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Versión Mobile - Cards -->
            <div class="md:hidden space-y-4">
              <div
                v-for="(item, index) in factura.detalle"
                :key="index"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <!-- Header de la card -->
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <select
                      v-model="item.p_producto_Id"
                      :disabled="bloquearCampos"
                      class="disabled:bg-slate-600 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 text-base"
                      @change="asignarPrecio(item)"
                    >
                      <option disabled value="">Seleccione un producto</option>
                      <option
                        v-for="producto in productos"
                        :key="producto.p_producto_Id"
                        :value="producto.p_producto_Id"
                      >
                        {{ producto.nombre }}
                      </option>
                    </select>
                  </div>
                  <button
                    @click="confirmarEliminacion(index)"
                    :disabled="bloquearCampos"
                    class="disabled:text-gray-400 text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition ml-2"
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
                </div>

                <!-- Grid de información -->
                <div class="grid grid-cols-2 gap-3">
                  <!-- Cantidad -->
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1"
                      >Cantidad</label
                    >
                    <input
                      v-model.number="item.cantidad"
                      type="number"
                      :disabled="bloquearCampos"
                      min="1"
                      class="disabled:bg-slate-600 w-full border border-gray-300 rounded px-3 py-2 text-right focus:outline-none focus:ring-1 focus:ring-orange-500"
                      @change="validarCantidad(index, item)"
                    />
                  </div>

                  <!-- Precio Unitario -->
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1"
                      >Precio Unitario</label
                    >
                    <div class="relative">
                      <span
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
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
                  </div>

                  <!-- Subtotal -->
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1"
                      >Subtotal</label
                    >
                    <div
                      class="w-full border border-gray-300 rounded px-3 py-2 text-right bg-gray-50"
                    >
                      <span class="font-medium text-gray-700">{{
                        formatoMoneda(item.cantidad * item.precio)
                      }}</span>
                    </div>
                  </div>

                  <!-- Descuento -->
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1"
                      >Descuento</label
                    >
                    <div class="relative">
                      <span
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
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
                  </div>

                  <!-- Total -->
                  <div class="col-span-2">
                    <div class="bg-gray-50 rounded-lg p-3">
                      <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-700"
                          >Total:</span
                        >
                        <span class="text-lg font-bold text-green-600">{{
                          formatoMoneda(item.total ?? 0)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cuando no hay productos (Mobile) -->
              <div
                v-if="factura.detalle.length === 0"
                class="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500"
              >
                No hay productos agregados. Haz clic en "Agregar Producto" para
                comenzar.
              </div>
            </div>

            <button
              @click="agregarItem"
              :disabled="bloquearCampos"
              class="disabled:bg-slate-500 mt-4 flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full md:w-auto justify-center"
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
            class="class=p-6 flex flex-col items-end p-4 bg-gray-50 rounded-lg"
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
          <div class="p-6 flex gap-2 flex-col-reverse md:flex-row justify-end">
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
          <div
            class="flex md:flex-row flex-col justify-between items-center mb-6"
          >
            <h2 class="text-xl font-semibold text-gray-900">
              Historial de Facturas
            </h2>

            <!-- Filtros -->
            <div
              class="flex md:flex-row flex-col w-full items-center gap-2 md:mt-0 mt-2"
            >
              <div class="relative w-full">
                <input
                  v-model="filtroBusqueda"
                  type="text"
                  placeholder="Buscar por número o serie..."
                  class="pl-10 pr-4 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                class="px-4 py-2 border w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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

          <!-- Versión Desktop - Tabla -->
          <div
            class="hidden md:block bg-white rounded-lg shadow overflow-hidden"
          >
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
                    Cliente
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
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    {{ factura.numero_factura }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ factura.serie_factura }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ factura.persona }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatoFecha(factura.fecha_emision) }}
                  </td>
                  <td class="px-6 py-4">
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
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ obtenerTipoPago(factura.id_tipo_pago) }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ factura.detalle ? factura.detalle.length : 0 }}
                      productos
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm font-medium">
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

          <!-- Versión Mobile - Cards -->
          <div class="md:hidden space-y-4">
            <div
              v-for="factura in facturasFiltradas"
              :key="factura.id"
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <!-- Header con número y estado -->
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    #{{ factura.numero_factura }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    Serie: {{ factura.serie_factura }}
                  </p>
                </div>
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
              </div>

              <!-- Información de la factura -->
              <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500">Fecha:</span>
                  <span class="text-sm text-gray-900">{{
                    formatoFecha(factura.fecha_emision)
                  }}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500"
                    >Tipo Pago:</span
                  >
                  <span class="text-sm text-gray-900">{{
                    obtenerTipoPago(factura.id_tipo_pago)
                  }}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500"
                    >Productos:</span
                  >
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ factura.detalle ? factura.detalle.length : 0 }} productos
                  </span>
                </div>
              </div>

              <!-- Acciones -->
              <div class="flex justify-between pt-3 border-t border-gray-200">
                <button
                  @click="verDetalleFactura(factura)"
                  class="flex items-center text-orange-600 hover:text-orange-800 text-sm font-medium"
                  title="Ver detalle"
                >
                  <svg
                    class="w-4 h-4 mr-1"
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
                  Ver
                </button>

                <button
                  @click="descargarFactura(factura)"
                  class="flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                  title="Descargar"
                >
                  <svg
                    class="w-4 h-4 mr-1"
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
                  Descargar
                </button>
              </div>
            </div>

            <!-- Mensaje cuando no hay resultados (Mobile) -->
            <div
              v-if="facturasFiltradas.length === 0"
              class="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500"
            >
              No se encontraron facturas
            </div>
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
                  class="relative z-0 inline-flex rounded-md shadow-sm"
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

            <!-- Paginación móvil simplificada -->
            <div class="sm:hidden flex items-center justify-between w-full">
              <div class="flex-1 flex justify-between items-center">
                <button
                  @click="paginaActual--"
                  :disabled="paginaActual === 1"
                  :class="[
                    'relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
                    paginaActual === 1 ? 'opacity-50 cursor-not-allowed' : '',
                  ]"
                >
                  Anterior
                </button>
                <span class="text-sm text-gray-700">
                  Página {{ paginaActual }} de {{ paginasTotales }}
                </span>
                <button
                  @click="paginaActual++"
                  :disabled="paginaActual === paginasTotales"
                  :class="[
                    'relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
                    paginaActual === paginasTotales
                      ? 'opacity-50 cursor-not-allowed'
                      : '',
                  ]"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Modal
      v-model:abierto="modalAbierto"
      :titulo="'Opciones de ayuda'"
      :botones="botonesModal"
      orientacion="vertical"
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
import html2pdf from 'html2pdf.js';
import { useUiStore } from '../stores/uiStore';
import { watch, onBeforeUnmount } from 'vue';
const uiStore = useUiStore();
let stopWatch;
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
      crearPorPedido: false,
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
        cliente: '',
        nit: '',
        iva: '',
        total: '',
        id_estado_factura: '',
        proveedor: '',
        numero: '',
        telefono: '',
        direccion: '',
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
        cliente: '',
        nit: '',
        id_tipo_pago: '',
        detalle: '',
        cantidad: '',
        precio: '',
        descuento: '',
        id_estado_factura: '',
        direccion: '',
        telefono: '',
        id_cliente: null,
        id_cliente_pedido: null,
      },
      busquedaPedido: 0,
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
  watch: {},
  methods: {
    inicioFacturacliente() {
      const driverObj = this.$driver({
        animate: true,
        showProgress: true,
        showButtons: ['next', 'previous'],
        steps: [
          {
            popover: {
              title: 'Bievenido facturacion para clientes',
              description:
                'Veamos como crear una factura para un cliente, ¡Estas no son certificadas!',
              side: 'left',
              align: 'start',
            },
          },
          {
            element: '#ingresoFactura',
            popover: {
              title: 'Ve al pastaña de ingreso',
              description:
                'Clickea en la pestaña de ingreso factura para crear la factura',
              side: 'bottom',
              align: 'start',
            },
          },
          {
            element: '#crearFacturaPor',
            popover: {
              title: 'Como crear la factura',
              description:
                'aqui puesde seleccionar si quieres crear la factura por medio de un pedido o por de forma normal',
              side: 'bottom',
              align: 'start',
            },
          },
          {
            element: '#crearFacturaPor',
            popover: {
              title: 'Da click para crear por pedido',
              description: '',
              side: 'left',
              align: 'start',
            },
          },
          {
            element: '#buscarPedido',
            popover: {
              title: 'Buscar Pedido',
              description:
                'Aqui puedes buscar por pedido para crear la factura, es importante mencionar que solo podras buscar los pedidos que ya se encuentre en un estado "Listo"',
              side: 'top',
              align: 'start',
            },
          },
          {
            element: '#llenarCampos',
            popover: {
              title: 'Llena los campos',
              description:
                'Una vez tengas definido como crearas la factura llena los campos que falten, cuando creas por pedido los datos se llenaran solos, a no ser que el cliente no tenga sus datos actualizados',
              side: 'top',
              align: 'start',
            },
          },
        ],
      });
      driverObj.drive();
    },
    handleAccion(valor) {
      if (valor.botonEjectuado === 'inicio') {
        this.inicioFacturacliente();
      } else if (valor.botonEjectuado === 'siguiente') {
        this.$router.push('/Proveedores');
      }
    },
    async buscarPedido() {
      try {
        const apiBuscarPedido = await api.v1.venta.obtenerPedidosPorNumero(
          Number(this.busquedaPedido)
        );
        if (apiBuscarPedido.data.length === 0) {
          this.mostrarAlertaError('No se encontro el pedido');
          return;
        }
        const pedido = apiBuscarPedido.data.pedidos[0];
        this.factura.cliente = pedido.nombre;
        this.factura.id_cliente = pedido.id_cliente;
        this.factura.id_cliente_pedido = pedido.id_cliente_pedido;
        this.factura.nit = pedido.nit;
        this.factura.iva = pedido.iva;
        this.factura.total = pedido.total;
        this.factura.id_estado_factura = 1; // Asignar estado "Borrador"
        this.factura.proveedor = pedido.proveedor;
        this.factura.numero = pedido.numero;
        this.factura.telefono = pedido.telefono;
        this.factura.direccion = pedido.direccion;
        this.factura.serie = pedido.serie;
        this.factura.fecha = new Date().toISOString().split('T')[0];
        this.factura.fechaVencimiento = new Date().toISOString().split('T')[0];
        this.factura.detalle = pedido.detalle_pedido.map((item) => ({
          p_producto_Id: item.p_producto_id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          descuento: item.descuento || 0,
        }));
        this.factura.detalle.forEach((item) => {
          this.actualizarTotal(item);
        });
        this.mostrarAlertaExito('Pedido encontrado, cargando datos...');
      } catch (error) {
        console.log(error);
        this.mostrarAlertaError(
          error.response.data.mensaje || 'Error al buscar el pedido'
        );
      }
    },
    cargarBotonesModal() {
      this.botonesModal = [
        {
          texto: '¿Como Facturar clientes?',
          color: 'bg-secondary',
          mostrar: true,
          botonEjectuado: 'inicio',
          hoverColor: 'hover:bg-yellow-600',
          textColor: 'text-white',
          icon: null,
          size: 'base',
          fullWidth: true,
          accion: () => null,
        },
        {
          texto: 'Siguiente tutorial',
          botonEjectuado: 'siguiente',
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
    verDetalleFactura(factura) {
      this.factura = factura;
      this.crearPorPedido = factura.crearPorPedido;
      this.factura.fecha = factura.fecha_emision;
      this.factura.direccion = factura.direccion_factura;
      this.factura.cliente = factura.nombre_cliente;
      this.factura.fechaVencimiento = factura.fecha_vencimiento
        .split('T')[0]
        .replace(/-/g, '-');
      this.tab = 'IFactura';
      if (factura?.estado_factura?.toLowerCase() === 'borrador') {
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
          <h3>Cliente</h3>
          <p>${factura.cliente}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Codigo</th>
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
              <td>${item.Codigo || '-'}</td>
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
        const facturaHistorial = await api.v1.venta.obtenerFacturasClientes();
        this.historialFacturas = facturaHistorial.data.facturas;
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

      if (!this.isNumber(this.factura.id_estado_factura)) {
        this.errores.id_estado_factura =
          'El estado de la factura es obligatorio';
        valido = false;
      }

      if (!this.isNumber(this.factura.id_tipo_pago)) {
        this.errores.id_tipo_pago = 'El tipo de pago es obligatorio';
        valido = false;
      }

      if (!this.factura.cliente || this.factura.cliente.trim() === '') {
        this.errores.cliente = 'El nombre del cliente es obligatorio';
        valido = false;
      }
      if (!this.factura.nit || this.factura.nit.trim() === '') {
        this.errores.nit = 'El NIT del cliente es obligatorio';
        valido = false;
      }

      if (!this.factura.direccion || this.factura.direccion.trim() === '') {
        this.errores.direccion = 'La direccion del clientes es obligatorio';
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
      if (!this.validarFormulario())
        return this.mostrarAlertaError('Valide los campos señalados');

      this.guardando = true;

      const payloadFacturaCliente = {
        id_factura_cliente: null,
        id_cliente: this.factura.id_cliente,
        id_cliente_pedido: this.factura.id_cliente_pedido,
        id_estado_factura: this.factura.id_estado_factura,
        id_tipo_pago: this.factura.id_tipo_pago,
        direccion_factura: this.factura.direccion,
        telefono: this.factura.telefono,
        nit: this.factura.nit,
        persona: this.factura.cliente,
        fecha_vencimiento: this.factura.fechaVencimiento,
        detalle: this.factura.detalle.map((item) => ({
          p_producto_id: item.p_producto_Id,
          cantidad: item.cantidad,
          precio: item.precio,
          descuento: item.descuento || 0,
        })),
      };

      try {
        this.factura.total = this.totalFactura;
        console.log('Factura guardada:', this.factura);
        const factura = await api.v1.venta.crearFacturaCliente(
          payloadFacturaCliente
        );

        console.log('Respuesta api', factura);
        if (factura?.data.ok) {
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
          console.log(factura);
          this.mostrarAlertaError(
            factura.data.mensaje || 'Error al guardar la factura'
          );
          this.guardando = false;
        }
      } catch (error) {
        console.log(error);
        this.mostrarAlertaError(
          error.response.data.mensaje || 'Error al guardar la factura'
        );
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

    async obtenerEstadosFactura() {
      try {
        const estadosFact =
          await api.v1.inventario.obtenerEstadosFactura('FacturaCliente');
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
      this.obtenerProductos();
    },
    async obtenerProductos() {
      try {
        const productos = await api.v1.inventario.obtenerProductos();
        this.productos = productos.data.productos;
      } catch (error) {
        this.mostrarAlertaError('Error al obtener productos');
      }
    },
  },
  beforeUnmount() {
    if (stopWatch) stopWatch();
  },
  mounted() {
    const driverObj = this.$driver();
    driverObj.drive();
    this.$nextTick(() => {
      stopWatch = watch(
        () => uiStore.botonPresionado,
        (nuevo) => {
          if (nuevo) {
            this.modalAbierto = true;
          }
        }
      );
    });
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

@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }

  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }

  .overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .overflow-x-auto::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>
