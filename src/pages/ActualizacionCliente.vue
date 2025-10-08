<template>
  <div class="bg-gradiente-personal from-gray-50 to-blue-50 p-4">
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-6">
      <div class="max-w-7xl mx-auto px-4 py-4">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">
              {{
                !usuarioCliente
                  ? 'Actualizacion Datos de Cliente'
                  : 'Actualización de Datos'
              }}
            </h1>
            <p class="text-xs md:text-sm text-gray-600">
              Complete y actualice su información personal
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Información Personal -->
        <div class="p-4 md:p-6 border-b border-gray-200">
          <h2 class="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            Información Personal
          </h2>
          <div
            role="alert"
            class="alert text-sm h-10 px-1 py-0 mb-3 bg-slate-200 border border-gray-200 text-gray-700"
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
            <span v-if="!usuarioCliente"
              >Busque al cliente para actualizar sus datos.</span
            >
            <span v-else
              >Actualizar tus datos nos ayudara a finalizar rapido tus
              pedidos.</span
            >
          </div>

          <div
            v-if="!usuarioCliente"
            class="md:col-span-2 mb-5 flex flex-col md:flex-row gap-2 items-end"
          >
            <label
              class="gap-2 flex flex-row items-center text-sm font-medium text-gray-700 mb-2"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Buscar por Correo Electrónico
            </label>

            <VueSelect
              v-model="correoBuscado"
              :options="correosBusquedas"
              label="correo"
              :reduce="(valor) => valor.value"
              placeholder="correo@ejemplo.com"
              searchable
              class="w-full text-gray-700 text-sm"
              no-options-text="No cliente"
              @input="buscarCliente"
            >
              <!-- cómo se muestra cada opción -->
              <template
                class="text-gray-800 bg-gray-950 overflow-auto"
                #option="{ correo }"
              >
                {{ correo }}
              </template>

              <!-- mensaje si no hay resultados -->
              <template #no-options>
                <span class="text-gray-900">No se encontraron clientes</span>
              </template>
            </VueSelect>

            <button
              :disabled="!correoSeleccionado"
              class="btn md:min-w-6 min-w-full disabled:bg-gray-600 disabled:btn-neutral animate-pulse disabled:animate-none btn-primary flex items-center gap-1 px-3 py-2 rounded-lg"
              @click="seleccionarCliente"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                />
              </svg>
              Seleccionar
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Primer Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Primer Nombre *
              </label>
              <input
                v-model="cliente.p_nombre"
                type="text"
                :disabled="!seleccionado && !usuarioCliente"
                class="disabled:bg-gray-600 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su primer nombre"
              />
            </div>

            <!-- Segundo Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Segundo Nombre
              </label>
              <input
                v-model="cliente.s_nombre"
                :disabled="!seleccionado && !usuarioCliente"
                type="text"
                class="disabled:bg-gray-600 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su segundo nombre"
              />
            </div>

            <!-- Primer Apellido -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Primer Apellido *
              </label>
              <input
                v-model="cliente.p_apellido"
                :disabled="!seleccionado && !usuarioCliente"
                type="text"
                class="disabled:bg-gray-600 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su primer apellido"
              />
            </div>

            <!-- Segundo Apellido -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Segundo Apellido
              </label>
              <input
                v-model="cliente.s_apellido"
                :disabled="!seleccionado && !usuarioCliente"
                type="text"
                class="disabled:bg-gray-600 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su segundo apellido"
              />
            </div>

            <!-- Sexo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Sexo
              </label>
              <select
                v-model="cliente.id_sexo"
                :disabled="!seleccionado && !usuarioCliente"
                class="disabled:bg-gray-900 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione su sexo</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>

            <!-- Correo Electrónico -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                v-model="cliente.correo"
                type="email"
                :disabled="true"
                class="disabled:bg-gray-600 cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
        </div>

        <!-- Identificación -->
        <div class="p-4 md:p-6 border-b border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-gray-900">
              Documentos de Identificación
            </h2>
            <button
              :disabled="
                identificaciones.length === identificacionesCatalogo.length
              "
              @click="agregarIdentificacion"
              class="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Agregar ({{ identificaciones.length }}/{{
                identificacionesCatalogo.length
              }})
            </button>
          </div>

          <!-- Versión Desktop - Tabla -->
          <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Tipo Documento
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Número
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ident, index) in identificaciones" :key="index">
                  <td class="border border-gray-200 p-3">
                    <select
                      v-model="ident.tipoDoc"
                      class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccione tipo</option>
                      <option
                        v-for="identificaciones in tiposDocumentosIdentificacionFiltrados(
                          ident.tipoDoc,
                          ident.id
                        )"
                        :value="identificaciones.id_tipo_documento"
                      >
                        {{ identificaciones.valor }}
                      </option>
                    </select>
                  </td>
                  <td class="border border-gray-200 p-3">
                    <input
                      v-model="ident.id"
                      type="text"
                      class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Número de documento"
                    />
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <button
                      @click="eliminarIdentificacion(index)"
                      class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition"
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
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="identificaciones.length === 0">
                  <td
                    colspan="4"
                    class="border border-gray-200 p-4 text-center text-gray-500"
                  >
                    No hay documentos de identificación registrados
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Versión Mobile - Cards -->
          <div class="md:hidden space-y-4">
            <div
              v-for="(ident, index) in identificaciones"
              :key="index"
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">
                    {{ obtenerNombreTipoDocumento(ident.tipoDoc) }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ ident.id_cliente_identificacion }}
                  </p>
                </div>
                <button
                  @click="eliminarIdentificacion(index)"
                  class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition ml-2"
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
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1"
                    >Tipo Documento</label
                  >
                  <select
                    v-model="ident.tipoDoc"
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccione tipo</option>
                    <option
                      v-for="identificaciones in tiposDocumentosIdentificacionFiltrados(
                        ident.tipoDoc,
                        ident.id
                      )"
                      :value="identificaciones.id_tipo_documento"
                    >
                      {{ identificaciones.valor }}
                    </option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-medium text-gray-500 mb-1"
                    >Número</label
                  >
                  <input
                    v-model="ident.id"
                    type="text"
                    class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Número de documento"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="identificaciones.length === 0"
              class="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500"
            >
              No hay documentos de identificación registrados
            </div>
          </div>
        </div>

        <!-- Teléfonos -->
        <div class="p-4 md:p-6 border-b border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-gray-900">
              Teléfonos de Contacto
            </h2>
            <button
              @click="agregarTelefono"
              :disabled="telefonos.length === maximoNumerosTelefonos"
              class="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Agregar ({{ telefonos.length }}/{{ maximoNumerosTelefonos }})
            </button>
          </div>

          <!-- Versión Desktop - Tabla -->
          <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Teléfono
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Estado Teléfono
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tel, index) in telefonos" :key="index">
                  <td class="border border-gray-200 p-3">
                    <input
                      v-model="tel.telefono"
                      type="tel"
                      class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Número de teléfono"
                    />
                  </td>
                  <td class="border border-gray-200 p-3">
                    <select
                      v-model="tel.id_estado_telefono"
                      class="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="" :disabled="true">
                        Seleccione un estado
                      </option>
                      <option
                        v-for="estado in estados"
                        :value="estado.id_estado_telefono"
                      >
                        {{ estado.nombre_estado }}
                      </option>
                    </select>
                  </td>

                  <td class="border border-gray-200 p-3 text-center">
                    <button
                      @click="eliminarTelefono(index)"
                      class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition"
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
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="telefonos.length === 0">
                  <td
                    colspan="4"
                    class="border border-gray-200 p-4 text-center text-gray-500"
                  >
                    No hay teléfonos registrados
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Versión Mobile - Cards -->
          <div class="md:hidden space-y-4">
            <div
              v-for="(tel, index) in telefonos"
              :key="index"
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ tel.telefono }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ obtenerEstadoTelefonoTexto(tel.id_estado_telefono) }}
                  </p>
                </div>
                <button
                  @click="eliminarTelefono(index)"
                  class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition ml-2"
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
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1"
                    >Teléfono</label
                  >
                  <input
                    v-model="tel.telefono"
                    type="tel"
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Número de teléfono"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1"
                    >Estado Teléfono</label
                  >
                  <select
                    v-model="tel.id_estado_telefono"
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                    <option value="3">Suspendido</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              v-if="telefonos.length === 0"
              class="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500"
            >
              No hay teléfonos registrados
            </div>
          </div>
        </div>

        <!-- Direcciones de Facturación -->
        <div class="p-4 md:p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg md:text-xl font-semibold text-gray-900">
              Direcciones de Facturación
            </h2>
            <button
              @click="agregarDireccion"
              :disabled="direcciones.length >= 1"
              class="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Agregar ({{ direcciones.length }}/1)
            </button>
          </div>

          <!-- Versión Desktop - Tabla -->
          <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Dirección
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dir, index) in direcciones" :key="index">
                  <td class="border border-gray-200 p-3">
                    <input
                      v-model="dir.direccion"
                      :disabled="true"
                      type="text"
                      class="disabled:bg-gray-600 disabled:cursor-not-allowed w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Dirección completa"
                    />
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <button
                      @click="eliminarDireccion(index)"
                      class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition"
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
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr v-if="direcciones.length === 0">
                  <td
                    colspan="3"
                    class="border border-gray-200 p-4 text-center text-gray-500"
                  >
                    No hay direcciones registradas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Versión Mobile - Cards -->
          <div class="md:hidden space-y-4">
            <div
              v-for="(dir, index) in direcciones"
              :key="index"
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 text-sm">
                    {{ dir.direccion || 'Nueva dirección' }}
                  </h3>
                </div>
                <button
                  @click="eliminarDireccion(index)"
                  class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition ml-2"
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
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-gray-500 mb-1"
                    >Dirección</label
                  >
                  <input
                    v-model="dir.direccion"
                    type="text"
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Dirección completa"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="direcciones.length === 0"
              class="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500"
            >
              No hay direcciones registradas
            </div>
          </div>

          <div
            v-if="direcciones.length >= 1"
            class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <p class="text-sm text-yellow-800 text-center">
              ✅ Máximo de direcciones alcanzado (1/1)
            </p>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
          <div
            class="flex flex-col-reverse md:flex-row justify-end space-y-4 space-y-reverse md:space-y-0 md:space-x-4"
          >
            <button
              @click="limpiarFormulario"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition w-full md:w-auto"
            >
              Cancelar
            </button>
            <button
              @click="guardarDatos"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full md:w-auto"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </main>
    <direccion
      :mostrarModalDireccion="mostrarModalDireccion"
      :esEdicionDireccion="esEdicion"
      :datos-edicion="direccionEditando"
      @guardar="guardarDireccion"
      @cerrar="cerrarModal"
    />
  </div>
</template>

<script>
import direccion from '../components/direccion.vue';
import VueSelect from 'vue3-select';
import _ from 'lodash';
import 'vue3-select/dist/vue3-select.css';
import { api } from '../axios';
import { mostrarAlertaGlobal } from '../components/contenedorDeAlertas.vue';

export default {
  name: 'ActualizacionCliente',
  components: {
    VueSelect,
    direccion,
  },
  data() {
    return {
      maximoNumerosTelefonos: 3,
      direccionEditando: null,
      esEdicion: false,
      mostrarModalDireccion: false,
      usuarioCliente: false,
      cliente: {
        p_nombre: '',
        s_nombre: '',
        p_apellido: '',
        s_apellido: '',
        id_sexo: '',
        correo: '',
      },
      identificaciones: [],
      telefonos: [],
      direcciones: [],
      identificacionesCatalogo: [],
      seleccionado: false,
      correosBusqueda: [],
      debounceTimer: null,
      correoBuscado: null,
      correoSeleccionado: false,
    };
  },
  mounted() {
    this.obtenerEstadoTelefono();
    this.obtenerTiposDocumento();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.rol === 'CLIENTE') {
      this.usuarioCliente = true;
      this.seleccionarCliente(usuario.correo);
    }
  },
  computed: {
    correosBusquedas() {
      const correos = [];

      return correos.concat(
        this.correosBusqueda.map((busqueda) => ({
          value: busqueda.correo,
          correo: ` ${busqueda.correo}`,
        }))
      );
    },
  },
  watch: {
    correoBuscado(nuevo) {
      if (nuevo) {
        this.correoSeleccionado = true;
      } else {
        this.correoSeleccionado = false;
      }
    },
  },
  methods: {
    tiposDocumentosIdentificacionFiltrados(tipoDoc, numero) {
      if (!this.identificaciones || this.identificaciones.length === 0) {
        return this.identificacionesCatalogo;
      }
      if (
        this.identificacionesCatalogo.some(
          (a) => a.id_tipo_documento === tipoDoc
        ) &&
        numero !== undefined &&
        numero !== ''
      ) {
        return this.identificacionesCatalogo.filter(
          (a) => a.id_tipo_documento === tipoDoc
        );
      }
      console.log(this.identificaciones);
      if (this.identificaciones.length > 1) {
        return this.identificacionesCatalogo.filter(
          (catalogo) =>
            !this.identificaciones.some(
              (cliente) =>
                cliente.tipoDoc === catalogo.id_tipo_documento &&
                cliente.id !== ''
            )
        );
      }
      return this.identificacionesCatalogo;
    },
    async obtenerTiposDocumento() {
      try {
        const tiposDocumentoAPi =
          await api.v1.opcionesGenerales.obtenerTiposIdentificacion();
        this.identificacionesCatalogo =
          tiposDocumentoAPi.data.tiposIdentificacion;
      } catch (error) {
        this.mostrarAlertaError('Error al obtener tipos de documento');
      }
    },
    abrirModalNuevo() {
      this.esEdicion = false;
      this.direccionEditando = null;
      this.mostrarModalDireccion = true;
    },
    abrirModalEditar(direccion) {
      this.esEdicion = true;
      this.direccionEditando = { ...direccion };
      this.mostrarModalDireccion = true;
    },
    cerrarModal() {
      this.mostrarModalDireccion = false;
      this.direccionEditando = null;
    },
    guardarDireccion(datos) {
      if (this.esEdicion) {
        const index = this.direcciones.findIndex(
          (d) => d.id_direccion === this.direccionEditando.id_direccion
        );
        if (index !== -1) {
          this.direcciones[index] = {
            ...this.direcciones[index],
            ...datos,
          };
        }
      } else {
        if (this.direcciones.length < 3) {
          this.direcciones.push({
            direccion:
              datos.departamento +
              ', ' +
              ', ' +
              datos.municipio +
              ', ' +
              datos.direccion_detallada +
              ', No calle.' +
              datos.no_calle +
              ', No casa.' +
              datos.no_casa,
            id_estado_registro: '1',
            ...datos,
          });
        }
        console.log(this.direcciones);
      }

      this.cerrarModal();
      console.log('Dirección guardada:', datos);
    },
    mostrarAlertaError(mensaje) {
      mostrarAlertaGlobal(mensaje, 'error', 'sm', 'top-center', 300);
    },
    mostrarAlertaExito(mensaje) {
      mostrarAlertaGlobal(mensaje, 'success', 'sm', 'top-center', 300);
    },
    async buscarCliente(correo) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(async () => {
        try {
          const correos = await api.v1.venta.obtenerConsidenciasCorreo(
            correo.target.value
          );
          this.correosBusqueda = correos.data.correos;
        } catch (error) {
          console.error(error);
          console.log(error.response);
          this.mostrarAlertaError(
            error.response.data.mensaje || 'Error al buscar cliente'
          );
        }
      }, 500);
    },
    async seleccionarCliente(correo) {
      try {
        const cliente = await api.v1.venta.obtenerClientePorCorreo(
          this.correoBuscado ?? correo
        );
        this.cliente = {};
        this.direcciones = [];
        this.telefonos = [];
        this.cliente = cliente.data.cliente;
        this.telefonos = cliente.data.cliente.telefonos;
        const direccion =
          cliente.data.cliente?.direccionRaw[0]?.direccion_detallada ?? '';
        if (direccion !== '') {
          this.direcciones.push({
            direccion: direccion,
            id_estado_registro: '1',
          });
        }
        this.identificaciones = cliente.data.cliente.identificaciones;
        this.mostrarAlertaExito('Cliente Seleccionado');
        if (!this.usuarioCliente) this.seleccionado = true;
      } catch (error) {
        this.mostrarAlertaError('Erro al obtener cliente');
      }
    },
    agregarIdentificacion() {
      this.identificaciones.push({
        id: '',
        id_cliente_identificacion: '',
        tipoDoc: 0,
        id_estado_registro: '1',
      });
    },
    eliminarIdentificacion(index) {
      this.identificaciones.splice(index, 1);
    },
    agregarTelefono() {
      this.telefonos.push({
        telefono: '',
        id_estado_telefono: '1',
        id_estado_registro: '1',
      });
    },
    eliminarTelefono(index) {
      this.telefonos.splice(index, 1);
    },
    agregarDireccion() {
      this.abrirModalNuevo();
    },
    eliminarDireccion(index) {
      this.direcciones.splice(index, 1);
    },
    obtenerNombreTipoDocumento(id) {
      const tipos = {
        1: 'DPI',
        2: 'Pasaporte',
        3: 'Licencia',
        4: 'NIT',
      };
      return tipos[id] || 'Seleccione tipo';
    },
    obtenerEstadoTelefonoTexto(id) {
      if (id === null || id === undefined) return;
      const estado = this.estados.find((a) => a.id_estado_telefono === id);
      return estado ? estado.nombre_estado : '';
    },
    async obtenerEstadoTelefono(id) {
      try {
        const estadostelefonoAPi =
          await api.v1.opcionesGenerales.obtenerEstadotelefono();
        this.estados = estadostelefonoAPi.data.estadosTelefono;
      } catch (error) {
        this.mostrarAlertaError('Error en el servidor al traer estados');
      }
    },
    limpiarFormulario() {
      this.cliente = {
        p_nombre: '',
        s_nombre: '',
        p_apellido: '',
        s_apellido: '',
        id_sexo: '',
        correo: '',
      };
      this.identificaciones = [];
      this.telefonos = [];
      this.direcciones = [];
    },
    async crearDireccionAPi(idCliente) {
      try {
        const direccion = this.direcciones[0]; // actualmente se manejara una direccion
        console.log(direccion.direccion_detallada);
        if (direccion.direccion_detallada === undefined) return;
        const payload = {
          id_pais: direccion.id_pais,
          id_departamento: direccion.id_departamento,
          id_municipio: direccion.id_municipio,
          direccion_detallada: direccion.direccion_detallada,
          id_cliente: idCliente,
          id_usuario: 0,
          no_casa: direccion.no_casa,
          no_calle: direccion.no_calle,
        };
        const apiCreadirecion =
          await api.v1.opcionesGenerales.crearDireccion(payload);
      } catch (error) {
        this.mostrarAlertaError('Error al actualizar direccion');
        throw new Error('');
      }
    },
    async ActualizarCLienteApi(idCliente) {
      try {
        const payaload = {
          id_cliente: idCliente,
          p_nombre: this.cliente.p_nombre,
          s_nombre: this.cliente.s_nombre,
          p_apellido: this.cliente.p_apellido,
          s_apellido: this.cliente.s_apellido,
          id_sexo: Number(this.cliente.id_sexo),
          correo: this.cliente.correo,
        };
        const apiActualizaCliente =
          await api.v1.cliente.actualizarCliente(payaload);
      } catch (error) {
        this.mostrarAlertaError('Error al crear actualizar datos perfil');
        throw new Error('');
      }
    },
    async crearDocumentosIdentificacionApi(idCliente) {
      try {
        if (this.identificaciones.length === 0) return;
        await _.forEach(this.identificaciones, async (ident) => {
          const payload = {
            id_tipo_documento: ident.tipoDoc,
            id_cliente: idCliente,
            id_cliente_identificacion: ident.id,
          };

          await api.v1.cliente.crearDocumentoIdentificacion(payload);
        });
      } catch (error) {
        this.mostrarAlertaError('Error al crear o actualizar identificación');
        throw new Error('');
      }
    },
    async crearTelefonosContactoApi(idCliente) {
      try {
        const payload = {
          id_cliente: idCliente,
          telefonos: this.telefonos,
          id_estado_telefono: 0,
        };
        const apiTelefonosContacto =
          await api.v1.cliente.crearTelefonosContacto(payload);
      } catch (error) {
        this.mostrarAlertaError('Error al crear actualizar telefonos');
        throw new Error('');
      }
    },
    async guardarDatos() {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        let idCliente = 0;
        if (usuario.rol === 'CLIENTE') {
          idCliente = usuario.id;
        } else {
          idCliente = this.cliente.id_cliente;
        }
        await this.crearDireccionAPi(idCliente);
        await this.ActualizarCLienteApi(idCliente);
        await this.crearDocumentosIdentificacionApi(idCliente);
        await this.crearTelefonosContactoApi(idCliente);
        this.mostrarAlertaExito('Datos Actualizados correctamente');
        if (usuario.rol !== 'CLIENTE') {
          this.limpiarFormulario();
          this.seleccionado = false;
        }
      } catch (error) {
        this.mostrarAlertaError('Vuelve a intentarlo');
      }
    },
  },
};
</script>
